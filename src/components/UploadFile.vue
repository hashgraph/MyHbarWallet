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
                <input id="hash" ref="hash" type="checkbox" />
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
        <Button
            class="upload-button"
            :label="uploadButtonLabel"
            :busy="state.isBusy"
            busy-label
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
// todo [2019-31-10]: look into proper estimate
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
            isFileHovering: false,
            UploadButtonLabel: "Upload File"
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

            console.log(event);

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
        }

        async function prepareFile(event: Event): Promise<void> {
            const target = event.target as HTMLInputElement;

            event.preventDefault();

            console.log(event);

            if (target.files == null) {
                // User hit cancel
                return;
            }

            const file = target.files[0];

            state.filename = file.name;
            state.fileUint8Array = await uint8ArrayOf(file);

            target.value = ""; // change back to initial state to guarantee that click fires next time
        }

        async function handleUploadClick(): Promise<void> {
            if (!store.state.wallet.session) {
                throw new Error("session should not be null");
            }

            const client = store.state.wallet.session.client;
            if (state.fileUint8Array == null) {
                throw new Error("unexpected submit before upload of file");
            }

            if (hash.value && hash.value.checked) {
                const digest = await crypto.subtle.digest(
                    "SHA-384",
                    state.fileUint8Array as Uint8Array
                );
                state.fileUint8Array = new Uint8Array(digest);
            }

            const {
                FileCreateTransaction,
                FileAppendTransaction,
                Client
            } = await (import("@hashgraph/sdk") as Promise<
                typeof import("@hashgraph/sdk")
            >);

            state.isBusy = true;

            const file: Uint8Array = state.fileUint8Array as Uint8Array;
            const chunks: Uint8Array[] = [];

            state.totalChunks = Math.ceil(file.byteLength / MAX_CHUNK_LENGTH);

            for (let i = 0; i < state.totalChunks; i++) {
                const start = i * MAX_CHUNK_LENGTH;
                chunks.push(file.subarray(start, start + MAX_CHUNK_LENGTH));
            }

            const receipt = ref<TransactionReceipt | null>(null);
            const publicKey = (await store.state.wallet.session.wallet.getPublicKey()) as import("@hashgraph/sdk").Ed25519PublicKey;

            if (!publicKey) {
                throw new Error("public key should not be null");
            }

            let fileId: import("@hashgraph/sdk").FileId | undefined = undefined;

            try {
                const chunk = chunks.shift() as Uint8Array;
                receipt.value = await new FileCreateTransaction(
                    client as InstanceType<typeof Client>
                )
                    .setContents(chunk)
                    .setExpirationTime(Date.now() + 7890000000)
                    .addKey(publicKey)
                    .setTransactionFee(1e12)
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

            if (!fileId) {
                state.isBusy = false;
                return;
            }

            try {
                while (chunks.length > 0) {
                    await new FileAppendTransaction(client as InstanceType<
                        typeof Client
                    >)
                        .setFileId(fileId)
                        .setContents(chunks.shift() as Uint8Array)
                        .setTransactionFee(1e12)
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
            }

            // notifies file was uploaded
            context.emit("gotReceipt", fileId);
        }

        const fileReady = computed(() => {
            return state.filename != "";
        });

        const uploadButtonLabel = computed(() => {
            if (!state.isBusy) {
                return "Upload File";
            }
            const completionPercentage =
                (state.currentChunk / state.totalChunks) * 100;

            return (state.UploadButtonLabel =
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
            uploadButtonLabel
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
}

.file-name-container {
    display: flex;
    margin-block-end: 20px;
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
    margin-block-end: 20px;
    opacity: 0.5;
}

.upload-button {
    margin-block-start: 20px;
}

.hash-check-container {
    color: var(--color-washed-black);
    margin-block-end: 20px;
}
</style>
