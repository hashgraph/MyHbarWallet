<template>
    <div class="modal-fee-summary-title">
        <span v-if="props.type === 'transfer'" class="title">
            Sending
            <strong>{{ props.amount }}</strong>
            ℏ to account
            <strong>{{ props.account }}</strong>
        </span>
        <span v-else-if="props.type === 'createAccount'" class="title">
            Creating account with balance
            <strong>{{ props.amount }}</strong>
        </span>
        <span v-else>
            Transaction:
            <strong>{{ props.amount }}</strong>
            ℏ
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
