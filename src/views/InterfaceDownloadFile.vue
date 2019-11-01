<template>
    <InterfaceForm :title="$t('interfaceDownloadFile.title')">
        <DownloadFile
            class="download"
            :is-downloading="state.isDownloading"
            @summary="handleFee"
            @trigger="handleFeeModalChange"
            @fileId="handleFileId"
        />
        <ModalFeeSummary
            :is-open="state.isOpen"
            :is-file-summary="true"
            :items="[summary]"
            :amount="amount"
            :account="state.fileId"
            tx-type="downloadFile"
            @change="handleFeeModalChange"
            @submit="handleFeeSubmit"
        />
        <ModalSuccess
            v-model="state.success"
            @change="handleDownloadFinish"
            @continue="handleDownloadFinish"
        >
            <i18n path="modalSuccess.downloadFile">
                <strong>{{ state.fileId }}</strong>
            </i18n>
        </ModalSuccess>
    </InterfaceForm>
</template>

<script lang="ts">
import InterfaceForm from "../components/InterfaceForm.vue";
import {
    createComponent,
    reactive,
    Ref,
    ref,
    computed
} from "@vue/composition-api";
import DownloadFile from "../components/DownloadFile.vue";
import ModalFeeSummary from "../components/ModalFeeSummary.vue";
import ModalSuccess, {
    State as SuccessState
} from "../components/ModalSuccess.vue";
import { formatHbar } from "../formatter";
import BigNumber from "bignumber.js";

type Summary = {
    value: BigNumber | string;
    description: string;
};

export default createComponent({
    components: {
        InterfaceForm,
        DownloadFile,
        ModalFeeSummary,
        ModalSuccess
    },
    setup(props, context) {
        const state = reactive({
            isDownloading: false,
            isOpen: false,
            fee: new BigNumber(0),
            fileId: "",
            success: {
                isOpen: false,
                copyInfo: null
            } as SuccessState
        });

        const summary: Ref<Summary | null> = ref({
            value: new BigNumber(0),
            description: ""
        });

        const amount = computed(() => {
            return formatHbar(new BigNumber(state.fee.toFixed(4, 2)));
        });

        function handleFee(value: number): void {
            state.fee = new BigNumber(value.toPrecision(4));
            summary.value = {
                value: new BigNumber(
                    new BigNumber(value.toPrecision(4)).toFixed(4, 2)
                ),
                description: context.root.$t("common.estimatedFee").toString() //needs i18t
            };
        }

        function handleFeeSubmit(isDownloading: boolean): void {
            state.isDownloading = isDownloading;
            state.isOpen = false;
            state.success.isOpen = true;
        }

        function handleFeeModalChange(isOpen: boolean): void {
            state.isOpen = isOpen;
            if (state.isDownloading) state.isDownloading = false;
        }

        function handleFileId(fileId: string): void {
            state.fileId = fileId;
        }

        function handleDownloadFinish(): void {
            state.isDownloading = false;
            state.isOpen = false;
            state.fee = new BigNumber(0);
            state.fileId = "";
            state.success = {
                isOpen: false,
                copyInfo: null
            } as SuccessState;
        }

        return {
            state,
            summary,
            amount,
            handleDownloadFinish,
            handleFee,
            handleFeeModalChange,
            handleFeeSubmit,
            handleFileId
        };
    }
});
</script>
