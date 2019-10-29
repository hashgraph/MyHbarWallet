<template>
    <div class="upload-file">
        <div
            class="upload-zone"
            :class="{ 'file-hover': state.isFileHovering }"
            @dragenter.prevent="handleDragEnter"
            @dragleave.prevent="handleDragLeave"
            @dragover.prevent
            @drop.prevent="handleDrop"
        >
            <div class="drop-text">{{ $t("uploadFile.drop") }}</div>
            <div class="or-text">{{ $t("uploadFile.or") }}</div>
            <Button
                class="button"
                :label="$t('uploadFile.select')"
                @click="handleBrowseClick"
            />
            <div v-if="state.filename" class="file-name-container">
                <MaterialDesignIcon class="icon" :icon="mdiFileUpload" />
                <span class="file-name">{{ state.filename }}</span>
            </div>
            <input
                v-show="false"
                id="file-upload"
                ref="fileTarget"
                type="file"
                @change="prepareFile"
            />
        </div>
        <div class="buttons">
            <Button
                :disabled="state.disableButton"
                class="upload-button"
                :label="uploadButtonLabel"
                :busy="state.isBusy"
                :busy-progress="state.showProgress"
                @click="handleUploadClick"
            />
            <Button
                :disabled="state.disableButton"
                :label="uploadHashButtonLabel"
                :busy="state.isBusy"
                :busy-progress="state.showProgress"
                @click="handleHashUploadClick"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { createComponent, computed, ref, reactive } from "@vue/composition-api";
import Button from "../components/Button.vue";
import MaterialDesignIcon from "../components/MaterialDesignIcon.vue";
import { mdiFileUpload } from "@mdi/js";
import store from "../store";
import { ALERT } from "../store/actions";

//!Can remove with next sdk publish

type AccountId = {
    shard: number;
    realm: number;
    account: number;
};

type FileId = {
    shard: number;
    realm: number;
    file: number;
};

type ContractId = {
    shard: number;
    realm: number;
    contract: number;
};

type ExchangeRate = {
    hbarEquiv: number;
    centEquiv: number;
    expirationTime: Date;
};

type ExchangeRateSet = {
    currentRate: ExchangeRate;
    nextRate: ExchangeRate;
};

type TransactionReceipt = {
    status: number;
    accountId?: AccountId;
    fileId?: FileId;
    contractId?: ContractId;
    exchangeRateSet?: ExchangeRateSet;
};

//! end remove bit

async function uint8ArrayOf(file: File): Promise<Uint8Array> {
    const fileBuff = await new Promise<ArrayBuffer>((resolve, reject) => {
        const reader = new FileReader();

        reader.addEventListener("error", reject);
        reader.addEventListener("loadend", (): void => {
            resolve(reader.result as ArrayBuffer);
        });

        reader.readAsArrayBuffer(file);
    });

    return new Uint8Array(fileBuff);
}

// The approximate maximum size of a chunk
const MAX_CHUNK_LENGTH = 2923;

export default createComponent({
    components: {
        Button,
        MaterialDesignIcon
    },

    setup(props, context) {
        const state = reactive({
            filename: "",
            fileUint8Array: null as Uint8Array | null,
            currentChunk: 0,
            totalChunks: 0,
            isBusy: false,
            uploadButtonLabel: context.root.$t("uploadFile.upload").toString(),
            isFileHovering: false,
            estimatedFee: 0,
            showProgress: false,
            disableButton: true,
            dragCounter: 0,
            hashFileArray: null as Uint8Array | null
        });

        const fileTarget = ref<HTMLInputElement | null>(null);

        function handleBrowseClick(): void {
            if (fileTarget.value != null) {
                fileTarget.value.click(); // triggers loadTextFromFile via hidden input @click
            }
        }

        async function handleDragEnter(): Promise<void> {
            state.dragCounter++;
            if (state.dragCounter >= 0) state.isFileHovering = true;
        }

        async function handleDragLeave(): Promise<void> {
            state.dragCounter--;
            if (state.dragCounter === 0) state.isFileHovering = false;
        }

        async function handleDrop(event: DragEvent): Promise<void> {
            state.dragCounter = 0;
            state.isFileHovering = false;

            if (!event.dataTransfer || event.dataTransfer.files.length === 0) {
                // no file was present
                return;
            }

            // only handle one file
            const file = event.dataTransfer.items[0].getAsFile();

            if (!file) {
                // file did not actually exist
                return;
            }

            state.filename = file.name;

            state.fileUint8Array = await uint8ArrayOf(file);

            state.disableButton = false;
        }

        // prepares file for upload, resets file states if file has changed, gets total Chunks for fee estimate, gets hashed file if 'Hash file' is selected, gets fee estimate
        async function prepareFile(): Promise<void> {
            if (!fileTarget.value) {
                throw new Error("fileTarget should not be null");
            }
            state.fileUint8Array = null as Uint8Array | null;

            if (fileTarget.value.files == null) {
                // User hit cancel
                return;
            }

            const fileData = fileTarget.value.files[0];

            state.filename = fileData.name;
            state.fileUint8Array = await uint8ArrayOf(fileData);

            state.disableButton = false;
        }

        const fileReady = computed(() => {
            return state.filename != "";
        });

        async function handleHashUploadClick(): Promise<void> {
            await hashFile();
            const file = state.hashFileArray as Uint8Array;
            state.totalChunks = 1;
            await handleUpload(file);
        }

        async function handleUploadClick(): Promise<void> {
            const file = state.fileUint8Array as Uint8Array;
            state.totalChunks = Math.ceil(file.byteLength / MAX_CHUNK_LENGTH);
            estimateFee();
            await handleUpload(file);
        }

        async function hashFile(): Promise<void> {
            state.isBusy = true;
            const digest = await crypto.subtle.digest(
                "SHA-384",
                state.fileUint8Array as Uint8Array
            );
            state.hashFileArray = new Uint8Array(digest);
            state.totalChunks = 1;
            state.estimatedFee = 1.075;
        }

        // 2.6 Hbar is current (10-21-19) full chunk estimate - (~1 hbar for empty tx plus .55 hbar per kB, then rounded up a bit)
        // second part of expression finds estimate for the last chunk which will (most likely) not be a full chunk
        //Estimate gives a bit of room on top - actual average is ~2.57 Hbar; deviations and ranges on file tx's seem very low (10-21-19)
        function estimateFee(): void {
            state.estimatedFee =
                2.6 * (state.totalChunks - 1) +
                ((((state.fileUint8Array as Uint8Array).byteLength %
                    MAX_CHUNK_LENGTH) /
                    1000) *
                    0.55 +
                    1.05);
        }

        async function handleUpload(file: Uint8Array): Promise<void> {
            if (!store.state.wallet.session) {
                throw new Error(
                    context.root.$t("common.error.noSession").toString()
                );
            }

            const client = store.state.wallet.session.client;
            if (file == null) {
                throw new Error(
                    context.root.$t("uploadFile.errors.earlyUpload").toString()
                );
            }

            // prepare chunks
            const chunks: Uint8Array[] = [];

            for (let i = 0; i < state.totalChunks; i++) {
                const start = i * MAX_CHUNK_LENGTH;
                chunks.push(file.subarray(start, start + MAX_CHUNK_LENGTH));
            }

            // FileCreateTransaction - first chunk
            const fileId = await fileCreateUpload(chunks, client);

            if (!fileId) {
                state.isBusy = false;
                return;
            }

            // FileAppendTransaction - rest of chunks
            await fileAppendUploads(chunks, fileId, client);

            // notifies file was uploaded
            context.emit("gotReceipt", fileId);
        }

        async function fileCreateUpload(
            chunks: Uint8Array[],
            client: object
        ): Promise<FileId> {
            if (!store.state.wallet.session) {
                throw new Error("session should not be null");
            }

            const { FileCreateTransaction, Client } = await (import(
                "@hashgraph/sdk"
            ) as Promise<typeof import("@hashgraph/sdk")>);

            state.isBusy = true;
            state.showProgress = true;

            const receipt = ref<TransactionReceipt | null>(null);
            const publicKey = (await store.state.wallet.session.wallet.getPublicKey()) as import("@hashgraph/sdk").Ed25519PublicKey;

            if (!publicKey) {
                throw new Error(
                    context.root
                        .$t("uploadFile.errors.nullPublicKey")
                        .toString()
                );
            }

            let fileId: import("@hashgraph/sdk").FileId | undefined = undefined;

            try {
                state.currentChunk = 0;
                const chunk = chunks.shift() as Uint8Array;
                receipt.value = await new FileCreateTransaction(
                    client as InstanceType<typeof Client>
                )
                    .setContents(chunk)
                    .setExpirationTime(Date.now() + 7890000000)
                    .addKey(publicKey)
                    .setTransactionFee(520000000)
                    .build()
                    .executeForReceipt();

                state.currentChunk += 1;

                fileId = receipt.value.fileId;
            } catch (error) {
                if (
                    error.message.includes(
                        "upstream connect error or disconnect/reset before headers. reset reason: remote reset"
                    )
                ) {
                    await store.dispatch(ALERT, {
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
            return fileId as FileId;
        }

        async function fileAppendUploads(
            chunks: Uint8Array[],
            fileId: FileId,
            client: object
        ): Promise<void> {
            const { FileAppendTransaction, Client } = await (import(
                "@hashgraph/sdk"
            ) as Promise<typeof import("@hashgraph/sdk")>);
            try {
                while (chunks.length > 0) {
                    await new FileAppendTransaction(client as InstanceType<
                        typeof Client
                    >)
                        .setFileId(fileId)
                        .setContents(chunks.shift() as Uint8Array)
                        .setTransactionFee(520000000)
                        .build()
                        .executeForReceipt();

                    state.currentChunk += 1;
                }
            } catch (error) {
                if (
                    error.message.includes(
                        "upstream connect error or disconnect/reset before headers. reset reason: remote reset"
                    )
                ) {
                    await store.dispatch(ALERT, {
                        level: "error",
                        message: context.root
                            .$t("common.error.noConnection")
                            .toString()
                    });
                } else {
                    state.isBusy = false;
                    throw new Error(error);
                }
            } finally {
                state.isBusy = false;
                state.showProgress = false;
            }
        }

        const uploadButtonLabel = computed(() => {
            let completionPercentage =
                state.currentChunk < state.totalChunks
                    ? (state.currentChunk / state.totalChunks) * 100
                    : 0;
            if (!state.isBusy) {
                completionPercentage = 0;
                return context.root.$t("uploadFile.upload").toString();
            }

            return (state.uploadButtonLabel =
                completionPercentage.toFixed(2) + "%");
        });

        const uploadHashButtonLabel = computed(() => {
            return context.root.$t("uploadFile.uploadHash").toString();
        });

        return {
            handleBrowseClick,
            handleDragEnter,
            handleDragLeave,
            handleDrop,
            fileTarget,
            state,
            fileReady,
            mdiFileUpload,
            prepareFile,
            handleHashUploadClick,
            handleUploadClick,
            uploadButtonLabel,
            uploadHashButtonLabel,
            hashFile
        };
    }
});
</script>

<style lang="postcss" scoped>
input {
    margin-inline-end: 10px;
}

.upload-zone {
    align-items: center;
    background-color: var(--color-boysenberry-shadow);
    border: 4px dashed var(--color-ashen-wind);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 200px;
    padding-block-end: 100px;
    width: 100%;
}

.file-hover {
    background-color: var(--color-boysenberry-shadow-transparent);
    border: 4px dashed var(--color-washed-black);
    border-radius: 5px;
    cursor: copy;
}

.upload-file {
    align-items: center;
    display: flex;
    flex-direction: column;
}

.button {
    margin-block-start: 8px;
}

.file-name-container {
    display: flex;
    margin-block-start: 20px;
}

.icon {
    color: var(--color-melbourne-cup);
    height: 30px;
    width: 30px;
}

.file-name {
    align-self: center;
    display: inline;
}

.drop-text {
    color: var(--color-washed-black);
    margin-block-start: 100px;
}

.or-text {
    color: var(--color-washed-black);
    margin-block-start: 5px;
    opacity: 0.5;
}

.buttons {
    display: flex;
    margin-block-start: 50px;
}

.upload-button {
    margin-inline-end: 20px;
}
</style>
