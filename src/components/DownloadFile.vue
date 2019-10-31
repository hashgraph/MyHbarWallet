<template>
    <div class="download-container">
        <IdInput
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
        ></Button>
    </div>
</template>

<script lang="ts">
// todo [2019-15-11]: refactor this into a view https://github.com/hashgraph/MyHbarWallet/issues/74
import { createComponent, ref, reactive, watch } from "@vue/composition-api";
import Button from "../components/Button.vue";
import store from "../store";
import fileType from "file-type";
import IdInput from "../components/IDInput.vue";
import { ALERT } from "../store/actions";
import { REFRESH_BALANCE_AND_RATE } from "../store/actions";

type FileId = {
    shard?: number;
    realm?: number;
    file: number;
};

type FileContentsResponse = {
    contents: string | Uint8Array;
    fileId: number | string | FileId;
};

export default createComponent({
    components: {
        Button,
        IdInput
    },
    props: {
        isDownloading: Boolean
    },
    setup(props, context) {
        const state = reactive({
            fileId: { shard: 0, realm: 0, file: 0 },
            idValid: false,
            idErrorMessage: ""
        });

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

        watch(
            () => props.isDownloading,
            () => {
                if (props.isDownloading) {
                    triggerDownload();
                }
            }
        );

        async function handleDownloadClick(): Promise<void> {
            if (!store.state.wallet.session) {
                throw new Error(
                    context.root.$t("common.error.noSession").toString()
                );
            }

            const client = store.state.wallet.session.client;
            client.setMaxQueryPayment(100000000);
            try {
                const { FileContentsQuery, Client } = await (import(
                    "@hashgraph/sdk"
                ) as Promise<typeof import("@hashgraph/sdk")>);

                const getEstimate = await new FileContentsQuery(
                    client as InstanceType<typeof Client>
                )
                    .setFileId(state.fileId)
                    .requestCost();
                context.emit(
                    "fileId",
                    `${state.fileId.shard}.${state.fileId.realm}.${state.fileId.file}`
                );
                context.emit("summary", getEstimate.value());
                context.emit("trigger", true);
            } catch (error) {
                await store.dispatch(ALERT, {
                    level: "error",
                    message: error.toString()
                });
            }
        }

        const fileLink = ref<HTMLAnchorElement | null>(null);

        async function triggerDownload(): Promise<void> {
            if (!store.state.wallet.session) {
                throw new Error(
                    context.root.$t("common.error.noSession").toString()
                );
            }
            const client = store.state.wallet.session.client;
            client.setMaxQueryPayment(100000000);
            try {
                const { FileContentsQuery, Client } = await (import(
                    "@hashgraph/sdk"
                ) as Promise<typeof import("@hashgraph/sdk")>);

                const file = ref<FileContentsResponse | null>(null);

                file.value = await new FileContentsQuery(client as InstanceType<
                    typeof Client
                >)
                    .setFileId(state.fileId)
                    .execute();

                if (file.value.contents == null) {
                    throw new Error(
                        context.root
                            .$t("common.error.nullTransaction")
                            .toString()
                    );
                }

                const type = fileType(file.value.contents as Uint8Array);

                const fileBlob = new Blob([file.value.contents as Uint8Array]);
                const fileUrl = URL.createObjectURL(fileBlob);

                fileLink.value = document.createElement(
                    "a"
                ) as HTMLAnchorElement;
                fileLink.value.href = fileUrl;
                fileLink.value.download = `MHW_File_${state.fileId.shard}_${
                    state.fileId.realm
                }_${state.fileId.file}${type ? `.${type.ext}` : ""}`;

                context.root.$el.append(fileLink.value as Node);
                fileLink.value.click();
                context.root.$el.removeChild(
                    fileLink.value as HTMLAnchorElement
                );
                await store.dispatch(REFRESH_BALANCE_AND_RATE);
            } catch (error) {
                await store.dispatch(ALERT, {
                    level: "error",
                    message: error.toString()
                });
            }
        }

        return {
            state,
            handleDownloadClick,
            handleFileId,
            handleValid
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
