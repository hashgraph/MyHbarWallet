<template>
    <Modal
        v-model="state.isOpen"
        :title="$t('modalEditTransfer.title')"
        @change="this.$listeners.change"
    >
        <form
            v-if="state.transfer"
            @submit.prevent.stop="handleSubmit"
        >
            <IDInput
                v-model="state.transfer.from"
                class="input"
            />

            <IDInput
                v-model="state.transfer.to"
                class="input"
            />

            <AssetInput
                v-if="state.transfer"
                class="input"
                :asset="state.transfer.asset"
                :amount="state.transfer.amount"
                @asset="handleAssetChange"
                @amount="handleAmountChange"
            />

            <Button
                :label="$t('modalEditTransfer.save')"
                type="submit"
            />
        </form>
    </Modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { BigNumber } from "bignumber.js";

import { Transfer } from "../../domain/transfer";

import AssetInput from "./AssetInput.vue";
import Button from "./Button.vue";
import IDInput from "./IDInput.vue";
import Modal from "./Modal.vue";

export interface State {
    isOpen: boolean;
    transfer: Transfer | null;
}

export default defineComponent({
    name: "ModalEditTransfer",
    model: {
        prop: "state",
        event: "change"
    },
    props: { state: { type: Object as PropType<State>, required: true }},
    components: {
        AssetInput,
        Button,
        IDInput,
        Modal
    },
    setup(props, context) {
        function handleAssetChange(asset: string): void {
            if (props.state.transfer) props.state.transfer.asset = asset;
        }

        function handleAmountChange(amount: BigNumber): void {
            if (props.state.transfer) props.state.transfer.amount = amount;
        }

        function handleSubmit(): void {
            context.emit("submit", props.state.transfer);
        }

        return {
            handleAssetChange,
            handleAmountChange,
            handleSubmit
        };
    }
});
</script>

<style lang="postcss" scoped>
.input {
    padding-block-end: 5px;
}
</style>
