<template>
    <div class="upload-file">
        <div class="upload-zone">
            <div v-if="false" class="drag">Drag your file here!</div>
            <div v-if="false" class="or">Or</div>
            <Button
                class="button"
                label="Select a file from your computer"
                @click="handleBrowseClick"
            ></Button>
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
            label="Upload File"
            :busy="state.isBusy"
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

const MAX_FILE_LENGTH = 4096;

export default createComponent({
    components: {
        Button,
        MaterialDesignIcon
    },

    setup(props, context) {
        const state = reactive({
            filename: "",
            fileUint8Array: null as Uint8Array | null,
            isBusy: false
        });

        const file = ref<HTMLInputElement | null>(null);

        const hash = ref<HTMLInputElement | null>(null);

        function handleBrowseClick(): void {
            if (file.value != null) {
                file.value.click(); // triggers loadTextFromFile via hidden input @click
            }
        }

        async function prepareFile(event: Event): Promise<void> {
            const target = event.target as HTMLInputElement;

            if (target.files == null) {
                // User hit cancel
                return;
            }

            const file = target.files[0];

            state.filename = file.name;

            const fileBuff = await new Promise<ArrayBuffer>(
                (resolve, reject) => {
                    const reader = new FileReader();

                    reader.addEventListener("error", reject);
                    reader.addEventListener("loadend", (): void => {
                        resolve(reader.result as ArrayBuffer);
                    });

                    reader.readAsArrayBuffer(file);
                }
            );

            target.value = ""; // change back to initial state to gaurantee that click fires next time
            state.fileUint8Array = new Uint8Array(fileBuff);
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

            try {
                state.isBusy = true;
                console.log("uploading");

                const {
                    FileCreateTransaction,
                    FileAppendTransaction,
                    Client
                } = await (import("@hashgraph/sdk") as Promise<
                    typeof import("@hashgraph/sdk")
                >);

                const file: Uint8Array = state.fileUint8Array as Uint8Array;
                const chunks = [];

                const chunkCount = Math.ceil(file.byteLength / MAX_FILE_LENGTH);
                console.log("file chunks " + chunkCount);

                for (let i = 0; i < chunkCount; i++) {
                    console.log("chunk " + i);

                    const start = i * MAX_FILE_LENGTH;
                    chunks.push(file.slice(start, start + MAX_FILE_LENGTH));
                }

                const receipt = ref<TransactionReceipt | null>(null);

                const publicKey = (await store.state.wallet.session.wallet.getPublicKey()) as import("@hashgraph/sdk").Ed25519PublicKey;

                // TODO[2019-10-18]: send alert to user and back out of interface
                if (!publicKey) {
                    throw new Error("not logged in");
                }

                receipt.value = await new FileCreateTransaction(
                    client as InstanceType<typeof Client>
                )
                    .setContents(chunks.pop() as Uint8Array)
                    .setExpirationTime(Date.now() + 7890000000)
                    .addKey(publicKey)
                    .setTransactionFee(1e12)
                    .build()
                    .executeForReceipt();

                const fileId = receipt.value.fileId;

                // TODO[2019-10-18]: handle this properly lol
                if (!fileId) {
                    throw new Error("no file id :(");
                }

                for (const chunk in chunks) {
                    console.log("chunk!");

                    await new FileAppendTransaction(client as InstanceType<
                        typeof Client
                    >)
                        .setFileId(fileId)
                        .setContents(chunk)
                        .setTransactionFee(1e12)
                        .build()
                        .executeForReceipt();
                }

                context.emit("gotReceipt", fileId);
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
                    throw new Error(error);
                }
            } finally {
                state.isBusy = false;
            }
        }

        const fileReady = computed(() => {
            return state.filename != "";
        });

        return {
            handleBrowseClick,
            file,
            state,
            fileReady,
            mdiFileUpload,
            hash,
            prepareFile,
            handleUploadClick
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
    height: 200px;
    justify-content: center;
    width: 100%;
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

.drag {
    color: var(--color-washed-black);
    margin-block-end: 20px;
    opacity: 0.5;
}

.upload-button {
    margin-block-start: 20px;
}
</style>
