<template>
    <InterfaceForm :title="$t('interfaceDownloadFile.title')">
        <DownloadFile
            class="download"
            :is-downloading="state.isDownloading"
            @summary="handleFee"
            @trigger="handleFeeModalChange"
        />
        <ModalFeeSummary
            :is-open="state.isOpen"
            :is-file-summary="true"
            :items="[summary]"
            :amount="amount"
            tx-type="file"
            @change="handleFeeModalChange"
            @submit="handleFeeSubmit"
        />
        <template v-slot:footer> </template>
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
        ModalFeeSummary
    },
    setup(props, context) {
        const state = reactive({
            isDownloading: false,
            isOpen: false,
            fee: new BigNumber(0)
        });

        const summary: Ref<Summary | null> = ref({
            value: new BigNumber(0),
            description: ""
        });

        const amount = computed(() => {
            return formatHbar(new BigNumber(state.fee.toFixed(4, 2)));
        });

        function handleFee(value: number): void {
            console.log(value);
            state.fee = new BigNumber(value.toPrecision(4));
            summary.value = {
                value: new BigNumber(
                    new BigNumber(value.toPrecision(4)).toFixed(4, 2)
                ),
                description: context.root
                    .$t("modalFeeSummaryDesc.download")
                    .toString() //needs i18t
            };
        }

        function handleFeeSubmit(isDownloading: boolean): void {
            state.isDownloading = isDownloading;
            state.isOpen = false;
        }

        function handleFeeModalChange(isOpen: boolean): void {
            state.isOpen = isOpen;
            if (state.isDownloading) state.isDownloading = false;
        }

        return {
            state,
            summary,
            amount,
            handleFeeSubmit,
            handleFee,
            handleFeeModalChange
        };
    }
});
</script>
