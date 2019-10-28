<template>
    <InterfaceForm :title="$t('interfaceUploadFile.title')">
        <UploadFile
            class="upload"
            :is-uploading="state.isUploading"
            @upload="handleFeeModalChange"
            @summary="handleFee"
            @gotReceipt="handleReceipt"
        />
        <ModalCreateAccountSuccess
            :account-id="state.fileId"
            :is-open="state.successModalIsOpen"
            @change="handleSuccessModalChange"
        />
        <ModalFeeSummary
            :is-open="state.feeModalIsOpen"
            :items="[state.summary]"
            :amount="amount"
            :is-file-summary="true"
            tx-type="file"
            @change="handleFeeModalChange"
            @submit="handleUploadSubmit"
        />
    </InterfaceForm>
</template>

<script lang="ts">
import InterfaceForm from "../components/InterfaceForm.vue";
import Button from "../components/Button.vue";
import { createComponent, computed, reactive } from "@vue/composition-api";
import UploadFile from "../components/UploadFile.vue";
import ModalUploadProgress from "../components/ModalUploadProgress.vue";
import ModalCreateAccountSuccess from "../components/ModalCreateAccountSuccess.vue";
import ModalFeeSummary from "../components/ModalFeeSummary.vue";
import { formatHbar } from "../formatter";
import BigNumber from "bignumber.js";

type FileId = {
    file: number;
    realm: number;
    shard: number;
};

export default createComponent({
    components: {
        InterfaceForm,
        UploadFile,
        Button,
        ModalCreateAccountSuccess,
        ModalUploadProgress,
        ModalFeeSummary
    },
    setup() {
        const state = reactive({
            fileId: "",
            summary: {
                value: 0,
                description: ""
            },
            successModalIsOpen: false,
            feeModalIsOpen: false,
            isUploading: false
        });

        const amount = computed(() => {
            return formatHbar(new BigNumber(state.summary.value));
        });

        function handleReceipt(fileId: FileId): void {
            state.fileId =
                fileId.shard.toString() +
                "." +
                fileId.realm.toString() +
                "." +
                fileId.file.toString();
            state.successModalIsOpen = true;
        }

        function handleFee(value: number): void {
            state.summary = {
                value: new BigNumber(value),
                description: "Your Upload" //needs i18t
            };
        }

        function handleUploadSubmit(isUploading: boolean): void {
            state.isUploading = isUploading;
        }

        function handleSuccessModalChange(isOpen: boolean): void {
            if (!isOpen) {
                state.successModalIsOpen = isOpen;
            }
        }

        function handleFeeModalChange(isOpen: boolean): void {
            state.feeModalIsOpen = isOpen;
            if (state.isUploading) state.isUploading = false;
        }

        return {
            handleReceipt,
            handleUploadSubmit,
            handleFee,
            handleSuccessModalChange,
            handleFeeModalChange,
            amount,
            state
        };
    }
});
</script>
