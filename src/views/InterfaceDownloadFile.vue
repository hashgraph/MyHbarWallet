<template>
    <InterfaceForm :title="$t('interfaceDownloadFile.title')">
        <div class="download-container">
            <IdInput
                ref="idInput"
                class="file-id"
                file
                :error="state.idErrorMessage"
                :label="$t('downloadFile.fileId')"
                show-validation
                @valid="handleValid"
                @input="handleFileId"
            />
            <Button
                class="button"
                :label="$t('downloadFile.download')"
                :disabled="!state.idValid"
                @click="handleDownloadClick"
            />
        </div>
        <ModalFeeSummary
            v-model="state.modalFeeSummaryState"
            @submit="handleFeeSubmit"
        />
        <ModalSuccess
            v-model="state.success"
            @change="handleDownloadFinish"
            @dismiss="handleDownloadFinish"
            @action="triggerDownload"
        >
            <i18n path="modalSuccess.downloadFile">
                <strong>{{ formattedFileId }}</strong>
            </i18n>
        </ModalSuccess>
    </InterfaceForm>
</template>

<script lang="ts">
import InterfaceForm from "../components/InterfaceForm.vue";
import {
    defineComponent,
    reactive,
    ref,
    computed,
    Ref
} from "@vue/composition-api";
import ModalFeeSummary, { State as ModalFeeSummaryState, Item } from "../components/ModalFeeSummary.vue";
import ModalSuccess, { State as SuccessState } from "../components/ModalSuccess.vue";
import { formatHbar } from "../formatter";
import BigNumber from "bignumber.js";
import Button from "../components/Button.vue";
import * as fileType from "file-type";
import IdInput from "../components/IDInput.vue";
import { Vue } from "vue/types/vue";
import { actions, store } from "../store";

interface Summary {
    value: BigNumber | string;
    description: string;
}

interface FileId {
    shard?: number;
    realm?: number;
    file: number;
}

interface FileContentsResponse {
    contents: string | Uint8Array;
    fileId: number | string | FileId;
}

// Shim for IDInput ref
type IdInput = Vue & {
    clear(): void;
};

export default defineComponent({
    components: {
        InterfaceForm,
        Button,
        IdInput,
        ModalFeeSummary,
        ModalSuccess
    },
    props: {},
    setup(props, context) {
        const state = reactive({
            fee: new BigNumber(0),
            fileId: { shard: 0, realm: 0, file: 0 } as FileId,
            idValid: false,
            idErrorMessage: "",
            modalFeeSummaryState: {
                isOpen: false,
                isBusy: false,
                isFileSummary: true,
                account: "",
                amount: "",
                items: [],
                txType: "downloadFile",
                submitLabel: context.root.$t("interfaceDownloadFile.feeSummary.submit").toString(),
                cancelLabel: context.root.$t("interfaceDownloadFile.feeSummary.cancel").toString(),
                termsShowNonOperator: false
            } as ModalFeeSummaryState,
            success: {
                isOpen: false,
                hasAction: true,
                actionLabel: "Save File",
                copyInfo: null
            } as SuccessState
        });

        const idInput: Ref<Vue | null> = ref(null);

        const formattedFileId = computed(() => `${state.fileId.shard}.${state.fileId.realm}.${state.fileId.file}`);

        function handleValid(valid: boolean): void {
            state.idValid = valid;
        }

        function handleFileId(
            value: string,
            fileId: { shard: number; realm: number; file: number } | null
        ): void {
            state.idErrorMessage = "";
            if (fileId) state.fileId = fileId;
        }

        const summaryAmount = computed(() => formatHbar(new BigNumber(state.fee.toFixed(4, 2))));

        function handleFeeSubmit(): void {
            state.modalFeeSummaryState.isOpen = false;
            state.success.isOpen = true;
        }

        async function handleDownloadClick(): Promise<void> {
            if (!store.state.wallet.session) {
                throw new Error(context.root.$t("common.error.noSession").toString());
            }

            const { FileContentsQuery, Hbar } = await import("@hashgraph/sdk");
            const client = store.state.wallet.session.client;
            client.setMaxQueryPayment(Hbar.fromTinybar(100000000));

            try {
                const getEstimate = await new FileContentsQuery()
                    .setFileId(state.fileId)
                    .getCost(client);

                state.fee = new BigNumber(await getEstimate.value());
                state.modalFeeSummaryState.amount = summaryAmount.value;
                const items: Item[] = [
                    {
                        description: context.root.$t("common.estimatedFee").toString(),
                        value: new BigNumber(state.fee.toFixed(4, 2))
                    }
                ];
                state.modalFeeSummaryState.items = items;
                state.modalFeeSummaryState.account = formattedFileId.value;
                state.modalFeeSummaryState.isOpen = true;
            } catch (error) {
                if (
                    error.toString() ===
                    "Error: invalid file ID: [object Object]"
                ) {
                    state.idErrorMessage = context.root
                        .$t("downloadFile.invalidFileId", { 0: formattedFileId.value })
                        .toString();
                } else {
                    actions.alert({
                        level: "error",
                        message: error.toString()
                    });
                }
            }
        }

        const fileLink = ref<HTMLAnchorElement | null>(null);

        async function triggerDownload(): Promise<void> {
            if (!store.state.wallet.session) {
                throw new Error(context.root.$t("common.error.noSession").toString());
            }

            const { FileContentsQuery, Hbar } = await import("@hashgraph/sdk");
            const client = store.state.wallet.session.client;
            client.setMaxQueryPayment(Hbar.fromTinybar(100000000));

            try {
                const file = ref<Uint8Array | null>(null);

                file.value = await new FileContentsQuery()
                    .setFileId(state.fileId)
                    .execute(client);

                if (file.value == null) {
                    throw new Error(context.root
                        .$t("common.error.nullTransaction")
                        .toString());
                }

                const type = await fileType.fromBuffer(file.value);

                const fileBlob = new Blob([ file.value ]);
                const fileUrl = URL.createObjectURL(fileBlob);

                fileLink.value = document.createElement("a") as HTMLAnchorElement;
                fileLink.value.href = fileUrl;
                fileLink.value.download = `MHW_File_${state.fileId.shard}_${
                    state.fileId.realm
                }_${state.fileId.file}${type ? `.${type.ext}` : ""}`;

                context.root.$el.append(fileLink.value as Node);
                fileLink.value.click();
                context.root.$el.removeChild(fileLink.value as HTMLAnchorElement);
                await actions.refreshBalanceAndRate();
            } catch (error) {
                actions.alert({
                    level: "error",
                    message: error.toString()
                });
            }
        }

        function handleDownloadFinish(): void {
            state.modalFeeSummaryState.isBusy = false;
            state.modalFeeSummaryState.isOpen = false;
            state.fee = new BigNumber(0);
            state.fileId = { shard: 0, realm: 0, file: 0 } as FileId;
            state.idValid = false;
            state.idErrorMessage = "";
            state.success = {
                isOpen: false,
                hasAction: true,
                actionLabel: "Save File",
                copyInfo: null
            } as SuccessState;
            (idInput.value! as IdInput).clear();
        }

        return {
            state,
            formattedFileId,
            handleDownloadFinish,
            handleValid,
            handleDownloadClick,
            handleFileId,
            handleFeeSubmit,
            triggerDownload,
            idInput
        };
    }
});
</script>
<style lang="postcss" scoped>
.file-id {
    margin-block-end: 50px;
}

.download-container {
    align-items: center;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.button {
    margin-block-end: 20px;
}
</style>
