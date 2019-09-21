<template>
    <InterfaceForm :title="$t('interfaceUploadFile.title')">
        <UploadFile class="upload" @gotReceipt="handleReceipt"></UploadFile>
        <ModalCreateAccountSuccess
            :account-id="state.fileId"
            :is-open="state.successModalIsOpen"
            @change="handleSuccessModalChange"
        />
    </InterfaceForm>
</template>

<script lang="ts">
import InterfaceForm from "../components/InterfaceForm.vue";
import Button from "../components/Button.vue";
import { createComponent, reactive } from "@vue/composition-api";
import UploadFile from "../components/UploadFile.vue";
import ModalCreateAccountSuccess from "../components/ModalCreateAccountSuccess.vue";

export default createComponent({
    components: {
        InterfaceForm,
        UploadFile,
        Button,
        ModalCreateAccountSuccess
    },
    setup() {
        const state = reactive({
            fileId: "",
            successModalIsOpen: false
        });
        // eslint-disable-next-line unicorn/consistent-function-scoping
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
            console.log(state.fileId);
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
