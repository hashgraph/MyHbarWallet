<template>
    <div class="download-container">
        <IdInput
            class="file-id"
            file
            :error="state.idErrorMessage"
            label="File ID"
            show-validation
            @valid="handleValid"
            @input="handleFileId"
        />
        <Button
            class="button"
            label="Download File"
            :disabled="!state.idValid"
            @click="handleDownloadClick"
        ></Button>
    </div>
</template>

<script lang="ts">
import { createComponent, ref, reactive } from "@vue/composition-api";
import Button from "../components/Button.vue";
import store from "../store";
import fileType from "file-type";
import IdInput from "../components/IDInput.vue";

export default createComponent({
    components: {
        Button,
        IdInput
    },

    setup(props, context) {
        // const highlight = false;  //for dragndrop
        const state = reactive({
            filename: "",
            fileArrayBuff: null as Uint8Array | null,
            fileId: { shard: 0, realm: 0, file: 0 },
            input: "",
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

        const fileLink = ref<HTMLAnchorElement | null>(null);

        // eslint-disable-next-line unicorn/consistent-function-scoping
        async function handleDownloadClick(): Promise<void> {
            if (!store.state.wallet.session) {
                throw new Error("session should not be null");
            }
            const client = store.state.wallet.session.client;
            client.setMaxQueryPayment(1000000000000);
            try {
                // state.isBusy = true;
                const { FileContentsQuery, Client } = await (import(
                    "@hashgraph/sdk"
                ) as Promise<typeof import("@hashgraph/sdk")>);

                const file = ref<object | null>(null);

                file.value = await new FileContentsQuery(client as InstanceType<
                    typeof Client
                >)
                    .setFileId(state.fileId)
                    .execute();

                if (file.value.contents == null) {
                    throw new Error("transaction returned is null");
                }

                const type = fileType(file.value.contents);

                const fileBlob = new Blob([file.value.contents as Uint8Array]);
                const fileUrl = URL.createObjectURL(fileBlob);

                fileLink.value = document.createElement(
                    "a"
                ) as HTMLAnchorElement;
                fileLink.value.href = fileUrl;
                fileLink.value.download =
                    "MHW_File" + (type ? "." + type.ext : "");

                context.root.$el.append(fileLink.value as Node);
                fileLink.value.click();
                context.root.$el.removeChild(
                    fileLink.value as HTMLAnchorElement
                );
            } catch (error) {
                console.log(error);
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
    margin-block-end: 20px;
}

.download-container {
    align-items: center;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.fileform {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
}

.button {
    margin-block-end: 20px;
}
</style>
