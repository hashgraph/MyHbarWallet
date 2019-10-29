<template>
    <InterfaceForm :title="$t('interfaceUploadFile.title')">
        <UploadFile class="upload" @gotReceipt="handleReceipt"></UploadFile>
    </InterfaceForm>
</template>

<script lang="ts">
import InterfaceForm from "../components/InterfaceForm.vue";
import Button from "../components/Button.vue";
import { createComponent, reactive } from "@vue/composition-api";
import UploadFile from "../components/UploadFile.vue";
import ModalUploadProgress from "../components/ModalUploadProgress.vue";

export default createComponent({
    components: {
        InterfaceForm,
        UploadFile,
        Button,
        ModalUploadProgress
    },
    setup() {
        const state = reactive({
            fileId: "",
            successModalIsOpen: false
        });

        function handleReceipt(fileId: {
            file: number;
            realm: number;
            shard: number;
        }): void {
            state.fileId =
                fileId.shard.toString() +
                "." +
                fileId.realm.toString() +
                "." +
                fileId.file.toString();
            state.successModalIsOpen = true;
        }

        function handleSuccessModalChange(isOpen: boolean): void {
            if (!isOpen) {
                state.successModalIsOpen = isOpen;
            }
        }

        return { handleReceipt, handleSuccessModalChange, state };
    }
});
</script>
