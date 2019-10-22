<template>
    <div class="upload-file">
        <div
            class="upload-zone"
            :class="{ 'file-hover': state.isFileHovering }"
            @dragover="handleDragOver"
            @dragexit="handleDragExit"
            @drop="handleDrop"
        >
            <div class="drop-text">Drop your file here</div>
            <div class="or-text">or</div>
            <Button
                class="button"
                label="Select a file from your computer"
                @click="handleBrowseClick"
            />
            <div v-if="state.filename" class="file-name-container">
                <MaterialDesignIcon class="icon" :icon="mdiFileUpload" />
                <span class="file-name">{{ state.filename }}</span>
            </div>
            <div class="hash-check-container">
                <input
                    id="hash"
                    ref="hash"
                    type="checkbox"
                    @change="hashFile"
                />
                <label for="hash">Hash file</label>
            </div>
            <input
                v-show="false"
                id="file-upload"
                ref="file"
                type="file"
                @change="prepareFile"
            />
        </div>
        <div class="fee-estimate" :hidden="state.estimatedFee === 0">
            Estimated Fee: {{ state.estimatedFee.toFixed(2) }} ℏ
        </div>
        <Button
            class="upload-button"
            :label="uploadButtonLabel"
            :busy="state.isBusy"
            :busy-progress="state.showProgress"
            @click="handleUploadClick"
        />
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
            uploadButtonLabel: "Upload File",
            isFileHovering: false,
            estimatedFee: 0,
            hashedFile: null as Uint8Array | null,
            showProgress: false
        });

        const file = ref<HTMLInputElement | null>(null);

        const hash = ref<HTMLInputElement | null>(null);

        function handleBrowseClick(): void {
            if (file.value != null) {
                file.value.click(); // triggers loadTextFromFile via hidden input @click
            }
        }

        async function handleDragOver(event: DragEvent): Promise<void> {
            event.preventDefault();

            state.isFileHovering = true;
        }

        async function handleDragExit(event: DragEvent): Promise<void> {
            event.preventDefault();
            state.isFileHovering = false;
        }

        async function handleDrop(event: DragEvent): Promise<void> {
            event.preventDefault();
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

            state.totalChunks = Math.ceil(
                state.fileUint8Array.byteLength / MAX_CHUNK_LENGTH
            );

            // No need await here, hashFile will busy the submit button and estimateFee doesn't need the hashed file to get the estimate
            if (hash.value && hash.value.checked) hashFile();

            estimateFee();
        }

        // prepares file for upload, resets file states if file has changed, gets total Chunks for fee estimate, gets hashed file if 'Hash file' is selected, gets fee estimate
        async function prepareFile(event: Event): Promise<void> {
            const target = event.target as HTMLInputElement;
            state.fileUint8Array = null as Uint8Array | null;
            state.hashedFile = null as Uint8Array | null;

            event.preventDefault();

            if (target.files == null) {
                // User hit cancel
                return;
            }

            const file = target.files[0];

            state.filename = file.name;
            state.fileUint8Array = await uint8ArrayOf(file);

            target.value = ""; // change back to initial state to guarantee that click fires next time

            state.totalChunks = Math.ceil(
                state.fileUint8Array.byteLength / MAX_CHUNK_LENGTH
            );

            // No need await here, hashFile will busy the submit button and estimateFee doesn't need the hashed file to get the estimate
            if (hash.value && hash.value.checked) hashFile();

            estimateFee();
        }

        // 2.6 Hbar is current (10-21-19) full chunk estimate - (~1 hbar for empty tx plus .55 hbar per kB, then rounded up a bit)
        // second part of expression finds estimate for the last chunk which will (most likely) not be a full chunk
        //Estimate gives a bit of room on top - actual average is ~2.57 Hbar; deviations and ranges on file tx's seem very low (10-21-19)
        function estimateFee(): void {
            if (hash.value && hash.value.checked) {
                state.estimatedFee = 1.075;
            } else {
                state.estimatedFee =
                    2.6 * (state.totalChunks - 1) +
                    ((((state.fileUint8Array as Uint8Array).byteLength %
                        MAX_CHUNK_LENGTH) /
                        1000) *
                        0.55 +
                        1.05);
            }
        }

        async function hashFile(): Promise<void> {
            if (hash.value && hash.value.checked) {
                if (!state.hashedFile) {
                    state.isBusy = true;
                    const digest = await crypto.subtle.digest(
                        "SHA-384",
                        state.fileUint8Array as Uint8Array
                    );
                    state.hashedFile = new Uint8Array(digest);
                    state.isBusy = false;
                }
                state.totalChunks = 1;
            } else {
                // included for fee estimate if 'Hash file' is unselected
                state.totalChunks = Math.ceil(
                    (state.fileUint8Array as Uint8Array).byteLength /
                        MAX_CHUNK_LENGTH
                );
            }
            estimateFee();
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
                throw new Error("public key should not be null");
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
                        message: "Connection Error."
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
                        message: "Connection Error."
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

        async function handleUploadClick(): Promise<void> {
            if (state.isBusy) return; //prevents upload when busy

            let file = new Uint8Array();

            if (hash.value && hash.value.checked) {
                file = state.hashedFile as Uint8Array;
            } else {
                file = state.fileUint8Array as Uint8Array;
            }

            if (!store.state.wallet.session) {
                throw new Error("session should not be null");
            }

            const client = store.state.wallet.session.client;
            if (file == null) {
                throw new Error("unexpected upload before preparing file");
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

        const fileReady = computed(() => {
            return state.filename != "";
        });

        const uploadButtonLabel = computed(() => {
            let completionPercentage =
                state.currentChunk < state.totalChunks
                    ? (state.currentChunk / state.totalChunks) * 100
                    : 0;
            if (!state.isBusy) {
                completionPercentage = 0;
                return "Upload File";
            }

            return (state.uploadButtonLabel =
                completionPercentage.toFixed(2) + "%");
        });

        return {
            handleBrowseClick,
            handleDragOver,
            handleDragExit,
            handleDrop,
            file,
            state,
            fileReady,
            mdiFileUpload,
            hash,
            prepareFile,
            handleUploadClick,
            uploadButtonLabel,
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
    border: 4px dashed var(--color-boysenberry-shadow);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 200px;
    width: 100%;
}

.file-hover {
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
    margin-block-end: 20px;
    margin-block-start: 20px;
}

.file-name-container {
    display: flex;
    margin-block-end: 20px;
}

.hash-check-container {
    color: var(--color-washed-black);
    margin-block-end: 20px;
}

.fee-estimate {
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
    margin-block: 20px;
}

.or-text {
    color: var(--color-washed-black);
    opacity: 0.5;
}

.upload-button {
    margin-block-start: 50px;
}
</style>
