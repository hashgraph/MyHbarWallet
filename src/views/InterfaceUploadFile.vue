<template>
    <InterfaceForm :title="$t('interfaceUploadFile.title')">
        <div class="upload-file">
            <UploadZone
                class="upload"
                :is-uploading="state.isUploading"
                :file-name="state.fileName"
                @fileSelect="handleFileSelect"
            />

            <div class="buttons">
                <Button
                    :disabled="state.isBusy || state.buttonsDisabled"
                    class="upload-button"
                    :label="$t('uploadFile.upload')"
                    @click="handleUploadClick"
                />
                <Button
                    :disabled="state.isBusy || state.buttonsDisabled"
                    :label="$t('uploadFile.uploadHash')"
                    @click="handleHashUploadClick"
                />
            </div>
        </div>
        <ModalFeeSummary
            v-model="state.modalFeeSummaryState"
            @submit="handleUploadSubmit"
        />
        <ModalUploadProgress
            v-model="state.uploadProgress"
            @change="handleUploadCancel"
            @retry="handleUploadRetry"
        />
        <ModalSuccess
            v-model="state.success"
            @action="handleCopyFileID"
            @dismiss="handleUploadFinish"
        >
            <i18n path="modalSuccess.uploadedFile">
                <strong>{{ fileIDString }}</strong>
            </i18n>
        </ModalSuccess>
    </InterfaceForm>
</template>

<script lang="ts">
import InterfaceForm from "../components/InterfaceForm.vue";
import Button from "../components/Button.vue";
import {
    createComponent,
    computed,
    reactive,
    Ref,
    ref,
    SetupContext
} from "@vue/composition-api";
import UploadZone from "../components/UploadZone.vue";
import ModalUploadProgress, { State as UploadProgressState } from "../components/ModalUploadProgress.vue";
import ModalFeeSummary, { State as ModalFeeSummaryState, Item } from "../components/ModalFeeSummary.vue";
import ModalSuccess, { State as SuccessState } from "../components/ModalSuccess.vue";
import { formatHbar } from "../formatter";
import BigNumber from "bignumber.js";
import { writeToClipboard } from "../clipboard";
import { actions, store } from "../store";

async function hashFile(file: Uint8Array): Promise<Uint8Array> {
    const digest = await crypto.subtle.digest("SHA-384", file);

    return new Uint8Array(digest);
}

// The approximate maximum size of a chunk - formerly 2923 which would sometimes cause transaction oversize error
const MAX_CHUNK_LENGTH = 2900;

export default createComponent({
    components: {
        InterfaceForm,
        UploadZone,
        Button,
        ModalUploadProgress,
        ModalFeeSummary,
        ModalSuccess
    },
    props: {},
    setup(props: object, context: SetupContext) {
        const state = reactive({
            estimatedFee: 0,
            fileName: "",
            fileBytes: null as Uint8Array | null,
            uploadBytes: null as Uint8Array | null,
            uploadHash: false,
            isUploading: false,
            isBusy: false,
            buttonsDisabled: true,
            modalFeeSummaryState: {
                isOpen: false,
                isBusy: false,
                isFileSummary: true,
                account: "",
                amount: "",
                items: [],
                txType: "uploadFile",
                submitLabel: context.root.$t("interfaceDownloadFile.feeSummary.submit").toString(),
                cancelLabel: context.root.$t("interfaceDownloadFile.feeSummary.cancel").toString(),
                termsShowNonOperator: false
            } as ModalFeeSummaryState,
            uploadProgress: {
                isOpen: false,
                inProgress: false,
                wasSuccess: false,
                currentChunk: 0,
                totalChunks: 0
            } as UploadProgressState,
            success: {
                isOpen: false,
                hasAction: true,
                actionLabel: "Copy File ID"
            } as SuccessState
        });

        const fileID: Ref<import("@hashgraph/sdk").FileId | null> = ref(null);

        const fileIDString = computed(() => {
            if (fileID.value != null) {
                return `${fileID.value!.shard.toString()}.${fileID.value!.realm.toString()}.${fileID.value!.file.toString()}`;
            }

            return "";
        });

        const summary: Ref<Item | null> = ref({
            value: new BigNumber(0),
            description: ""
        });

        const summaryAmount = computed(() => formatHbar(new BigNumber(state.estimatedFee.toFixed(4))));

        function handleFileSelect(event: {
            fileName: string;
            contents: Uint8Array;
        }): void {
            state.fileName = event.fileName;
            state.fileBytes = event.contents;
            state.buttonsDisabled = false;
        }

        function handleUploadSubmit(accept: boolean): void {
            state.modalFeeSummaryState.isBusy = false;
            state.modalFeeSummaryState.isOpen = false;

            if (!accept && state.uploadBytes != null) {
                return;
            }

            state.uploadProgress.isOpen = true;
            state.uploadProgress.inProgress = true;

            handleUpload(state.uploadBytes as Uint8Array);
        }

        // 2.6 Hbar is current (10-21-19) full chunk estimate - (~1 hbar for empty tx plus .55 hbar per kB, then rounded up a bit)
        // second part of expression finds estimate for the last chunk which will (most likely) not be a full chunk
        // Estimate gives a bit of room on top - actual average is ~2.57 Hbar; deviations and ranges on file tx's seem very low (10-21-19)
        function estimateFee(): void {
            state.estimatedFee =
                2.6 * (state.uploadProgress.totalChunks - 1) +
                ((state.uploadBytes as Uint8Array).byteLength %
                    MAX_CHUNK_LENGTH /
                    1000 *
                    0.55 +
                    1.05);
        }

        async function handleUpload(file: Uint8Array): Promise<void> {
            if (!store.state.wallet.session) {
                throw new Error(context.root.$t("common.error.noSession").toString());
            }

            const client = store.state.wallet.session.client;
            if (file == null) {
                throw new Error(context.root.$t("uploadFile.errors.earlyUpload").toString());
            }

            // prepare chunks
            const chunks: Uint8Array[] = [];

            for (let i = 0; i < state.uploadProgress.totalChunks; i++) {
                const start = i * MAX_CHUNK_LENGTH;
                chunks.push(file.subarray(start, start + MAX_CHUNK_LENGTH));
            }

            // FileCreateTransaction - first chunk
            const fileId = await fileCreateUpload(chunks, client);

            if (!fileId) {
                state.isBusy = false;
                state.uploadProgress.inProgress = false;
                state.uploadProgress.wasSuccess = false;
                return;
            }

            // FileAppendTransaction - rest of chunks
            await fileAppendUploads(chunks, fileId, client);
            await actions.refreshBalanceAndRate();

            fileID.value = fileId;
            state.uploadProgress.wasSuccess = true;
            state.uploadProgress.inProgress = false;
            state.uploadProgress.isOpen = false;
            state.success.isOpen = true;
        }

        async function fileCreateUpload(
            chunks: Uint8Array[],
            client: object
        ): Promise<import("@hashgraph/sdk").FileId> {
            if (!store.state.wallet.session) {
                throw new Error("session should not be null");
            }

            const { FileCreateTransaction, Client } = await import("@hashgraph/sdk");

            state.isBusy = true;
            state.modalFeeSummaryState.isBusy = true;

            const receipt: Ref<import("@hashgraph/sdk").TransactionReceipt | null> = ref(null);
            const publicKey: import("@hashgraph/sdk").Ed25519PublicKey = await store.state.wallet.session.wallet.getPublicKey() as import("@hashgraph/sdk").Ed25519PublicKey;

            if (!publicKey) {
                throw new Error(context.root
                    .$t("uploadFile.errors.nullPublicKey")
                    .toString());
            }

            let fileId: import("@hashgraph/sdk").FileId | undefined;

            state.uploadProgress.inProgress = true;
            try {
                state.uploadProgress.currentChunk = 0;
                const chunk = chunks.shift() as Uint8Array;
                receipt.value = await (await new FileCreateTransaction()
                    .setContents(chunk)
                    .setExpirationTime(Date.now() + 7890000000)
                    .addKey(publicKey)
                    .setMaxTransactionFee(520000000)
                    .execute(client as InstanceType<typeof Client>))
                    .getReceipt(client as InstanceType<typeof Client>);

                state.uploadProgress.currentChunk += 1;

                fileId = receipt.value.getFileId();
            } catch (error) {
                state.uploadProgress.wasSuccess = false;
                state.uploadProgress.inProgress = false;

                if (
                    error.message.includes("upstream connect error or disconnect/reset before headers. reset reason: remote reset")
                ) {
                    actions.alert({
                        level: "error",
                        message: context.root
                            .$t("common.error.noConnection")
                            .toString()
                    });
                } else {
                    state.isBusy = false;
                    throw error;
                }
            }

            return fileId as import("@hashgraph/sdk").FileId;
        }

        async function fileAppendUploads(
            chunks: Uint8Array[],
            fileId: import("@hashgraph/sdk").FileId,
            client: object
        ): Promise<void> {
            const { FileAppendTransaction, Client } = await import("@hashgraph/sdk");
            try {
                while (chunks.length > 0) {
                    // eslint-disable-next-line no-await-in-loop
                    const transactionId = await new FileAppendTransaction()
                        .setFileId(fileId)
                        .setContents(chunks.shift() as Uint8Array)
                        .setMaxTransactionFee(520000000)
                        .execute(client as InstanceType<typeof Client>);
                    // eslint-disable-next-line no-await-in-loop
                    await transactionId.getReceipt(client as InstanceType<typeof Client>);
                    // Add Transaction IDs to modal success here
                    state.uploadProgress.currentChunk += 1;
                }
            } catch (error) {
                state.uploadProgress.wasSuccess = false;
                state.uploadProgress.inProgress = false;
                state.isBusy = false;
                if (
                    error.message.includes("upstream connect error or disconnect/reset before headers. reset reason: remote reset")
                ) {
                    actions.alert({
                        level: "error",
                        message: context.root
                            .$t("common.error.noConnection")
                            .toString()
                    });
                } else {
                    throw new Error(error);
                }
            } finally {
                state.isBusy = false;
            }
        }

        function openFeeSummary(): void {
            state.modalFeeSummaryState.account = fileIDString.value;
            state.modalFeeSummaryState.amount = summaryAmount.value;
            const items: Item[] = [
                {
                    description: context.root.$t("common.estimatedFee").toString(),
                    value: new BigNumber(state.estimatedFee.toFixed(4))
                }
            ];
            state.modalFeeSummaryState.items = items;
            state.modalFeeSummaryState.isOpen = true;
        }

        async function handleHashUploadClick(): Promise<void> {
            state.uploadBytes = await hashFile(state.fileBytes as Uint8Array);
            state.uploadHash = true;
            state.modalFeeSummaryState.txType = "uploadFileHash";
            state.uploadProgress.totalChunks = 1;

            estimateFee();
            openFeeSummary();
        }

        async function handleUploadClick(): Promise<void> {
            state.uploadProgress.totalChunks = Math.ceil((state.fileBytes as Uint8Array).byteLength / MAX_CHUNK_LENGTH);

            state.uploadHash = false;
            state.modalFeeSummaryState.txType = "uploadFile";
            state.uploadBytes = state.fileBytes;

            estimateFee();
            openFeeSummary();
        }

        function reset(): void {
            state.uploadProgress = {
                isOpen: false,
                inProgress: false,
                wasSuccess: false,
                currentChunk: 0,
                totalChunks: 0
            } as UploadProgressState;

            state.modalFeeSummaryState.isOpen = false;
            state.modalFeeSummaryState.isBusy = false;

            state.success = {
                isOpen: false,
                hasAction: true,
                actionLabel: "Copy File ID"
            } as SuccessState;

            state.buttonsDisabled = true;
            state.estimatedFee = 0;
            state.fileBytes = null;
            state.uploadBytes = null;
            state.fileName = "";
            fileID.value = null;
        }

        async function handleCopyFileID(): Promise<void> {
            if (fileID == null) {
                actions.alert({
                    level: "error",
                    message: context.root.$t("modalSuccess.noFileID").toString()
                });
                return;
            }

            await writeToClipboard(fileIDString.value);
            actions.alert({
                level: "info",
                message: context.root.$t("modalSuccess.copiedFileID").toString()
            });
        }

        function handleUploadFinish(): void {
            reset();
        }

        function handleUploadCancel(): void {
            reset();
        }

        async function handleUploadRetry(): Promise<void> {
            handleUpload(state.uploadBytes as Uint8Array);
        }

        return {
            handleUploadSubmit,
            handleFileSelect,
            handleUploadClick,
            handleUploadCancel,
            handleUploadRetry,
            handleHashUploadClick,
            handleCopyFileID,
            handleUploadFinish,
            fileIDString,
            state,
            summary
        };
    }
});
</script>

<style lang="postcss" scoped>
.upload-file {
    align-items: center;
    display: flex;
    flex-direction: column;
}

.buttons {
    display: flex;
    margin-block-start: 50px;
}

.upload-button {
    margin-inline-end: 20px;
}
</style>
