<template>
    <div id="transfer-summary">
        <span class="title">{{ $t("interfaceWrapHbar.summary") }}</span>
        <div class="separator" />
        <p class="row">
            <span class="label">{{ $t("interfaceWrapHbar.asset") }}<InfoButton :message="$t('interfaceWrapHbar.assetInfo')" /></span>
            <span class="value">{{ props.asset }}</span>
        </p>
        <p class="row">
            <span class="label">{{ $t("interfaceWrapHbar.receiver") }}</span>
            <span class="value">{{ props.receiver }}</span>
        </p>
        <p class="row">
            <span class="label">{{ $t("common.amount") }}</span>
            <span class="value">{{ props.amount }}</span>
        </p>
        <p class="row">
            <span class="label">{{ $t("interfaceWrapHbar.service.fee") }}<InfoButton :message="$t('interfaceWrapHbar.serviceFeeInfo')" /></span>
            <span class="value">{{ props.serviceFee }}</span>
        </p>
        <div class="separator" />
        <p class="row">
            <span class="label">{{ $t("interfaceWrapHbar.totalToReceive") }}</span>
            <span class="value">{{ props.totalToReceive }}</span>
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

import InfoButton from "../InfoButton.vue";

export default defineComponent({
    name: "ModalWrapTokens",
    components: { InfoButton },
    props: {
        asset: { type: String },
        receiver: { type: String },
        amount: { type: String },
        serviceFee: { type: String },
        totalToReceive: { type: String }
    },
    setup(props): object {
        return { props };
    }
});

</script>

<style lang="postcss" scoped>
.title{
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    color: #333333;
}

.row{
    display: flex;
    justify-content: space-between;
}

.row .label{
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #828282;
    display: flex;
    align-items: center;
}

.row .value{
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;
    color: #333333;
}

.separator {
    border-bottom: 1px solid var(--color-jupiter);
    height: 1px;
    margin-block: 15px;
    width: 100%;
}
</style>

<style>
#transfer-summary .icon{
    width: 15px;
    margin-left: 2px;
}
</style>
