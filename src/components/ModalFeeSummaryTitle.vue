<template>
    <div class="modal-fee-summary-title">
        <span v-if="props.type === 'transfer'" class="title">
            <i18n path="modalFeeSummaryTitle.sendingToAccount">
                <strong>{{ props.amount }}</strong>
                <strong>{{ props.account }}</strong>
            </i18n>
        </span>
        <span v-else-if="props.type === 'createAccount'" class="title">
            <i18n path="modalFeeSummaryTitle.creatingAccountWithBalance">
                <strong>{{ props.amount }}</strong>
            </i18n>
        </span>
        <span v-else-if="props.type === 'uploadFile'" class="title">
            <i18n path="modalFeeSummaryTitle.uploadFile" />
        </span>
        <span v-else-if="props.type === 'uploadFileHash'" class="title">
            <i18n path="modalFeeSummaryTitle.uploadFileHash" />
        </span>
        <span v-else-if="props.type === 'downloadFile'" class="title">
            <i18n path="modalFeeSummaryTitle.downloadFile">
                <strong>{{ props.account }}</strong>
            </i18n>
        </span>
        <span v-else>
            <i18n path="modalFeeSummaryTitle.transaction">
                <strong>{{ props.amount }}</strong>
            </i18n>
        </span>
    </div>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";

export default createComponent({
    props: {
        amount: String,
        account: String,
        type: String
    },
    setup(props: { amount: string; account: string; type: string }) {
        return {
            props
        };
    }
});
</script>

<style lang="postcss" scoped>
.title {
    color: var(--color-washed-black);
    font-size: 18px;
    text-overflow: ellipsis;
}
</style>
