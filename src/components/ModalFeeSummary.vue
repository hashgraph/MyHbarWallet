<template>
    <div class="modal-fee-summary">
        <Modal :is-open="props.isOpen" title="Transaction Summary" not-closable>
            <ModalFeeSummaryTitle
                :amount="props.amount"
                :account="props.account"
                :type="props.txType"
            />
            <div class="separator" />
            <ModalFeeSummaryItems :items="props.items" />
            <div class="buttons">
                <Button
                    compact
                    outline
                    label="Cancel"
                    class="button"
                    type="button"
                    @click="handleCancel"
                />
                <Button
                    compact
                    label="Continue"
                    class="button"
                    type="submit"
                    @submit="handleSubmit"
                    @click="handleSubmit"
                />
            </div>
        </Modal>
    </div>
</template>

<script lang="ts">
import { createComponent, SetupContext, PropType } from "@vue/composition-api";
import BigNumber from "bignumber.js";
import Button from "../components/Button.vue";
import Modal from "../components/Modal.vue";
import ModalFeeSummaryTitle from "../components/ModalFeeSummaryTitle.vue";
import ModalFeeSummaryItems from "../components/ModalFeeSummaryItems.vue";

export interface Item {
    description: string;
    value: BigNumber | string;
}

export interface KeyedItem extends Item {
    key: string;
}

export default createComponent({
    props: {
        isOpen: Boolean,
        items: Array as PropType<KeyedItem[]>,
        amount: String,
        account: String,
        txType: String
    },
    components: {
        Button,
        Modal,
        ModalFeeSummaryTitle,
        ModalFeeSummaryItems
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    setup(
        props: {
            isOpen: boolean;
            items: KeyedItem[];
            amount: string;
            account: string;
            txType: string;
        },
        context: SetupContext
    ): object {
        function handleCancel(): void {
            context.emit("change", false);
        }

        function handleSubmit(): void {
            context.emit("change", false);
            context.emit("submit");
        }

        return {
            props,
            BigNumber,
            handleCancel,
            handleSubmit
        };
    }
});
</script>

<style lang="postcss" scoped>
.buttons {
    display: flex;
    justify-content: space-between;
    margin-block-start: 40px;
    width: 100%;

    @media (max-width: 425px) {
        align-items: center;
        flex-direction: column-reverse;
    }
}

.button {
    width: 200px;

    @media (max-width: 425px) {
        width: 100%;

        &:last-child {
            margin-block-end: 15px;
        }
    }
}

.separator {
    border-bottom: 1px solid var(--color-jupiter);
    height: 1px;
    margin-block: 17.5px;
    width: 100%;
}
</style>
