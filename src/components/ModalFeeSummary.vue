<template>
  <div class="modal-fee-summary">
    <Modal
      :is-open="props.isOpen"
      :title="$t('modalFeeSummary.title')"
      not-closable
    >
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
          :label="cancelLabel ? cancelLabel : $t('common.cancel')"
          class="button"
          type="button"
          @click="handleCancel"
        />
        <Button
          compact
          :label="submitLabel ? submitLabel : $t('common.continue')"
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
import { createComponent, PropType, SetupContext } from "@vue/composition-api";
import BigNumber from "bignumber.js";
import Button from "../components/Button.vue";
import Modal from "../components/Modal.vue";
import ModalFeeSummaryTitle from "../components/ModalFeeSummaryTitle.vue";
import ModalFeeSummaryItems from "../components/ModalFeeSummaryItems.vue";

export interface Item {
    description: string;
    value: BigNumber | string;
}

export default createComponent({
    props: {
        isFileSummary: Boolean,
        isOpen: Boolean,
        items: Array as PropType<Item[]>,
        amount: String,
        account: String,
        txType: String,
        submitLabel: {
            type: String,
            default: null
        },
        cancelLabel: {
            type: String,
            default: null
        }
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
            isFileSummary: boolean;
            isOpen: boolean;
            items: Item[];
            amount: string;
            account: string;
            txType: string;
            submitLabel: string | null;
            cancelLabel: string | null;
        },
        context: SetupContext
    ): object {
        function handleCancel(): void {
            context.emit("change", false);
        }

        function handleSubmit(): void {
            if (!props.isFileSummary) {
                context.emit("change", false);
                context.emit("submit");
            } else {
                context.emit("submit", true);
            }
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

    @media (max-width: 600px) {
        align-items: center;
        flex-direction: column-reverse;
    }
}

.button {
    width: 200px;

    @media (max-width: 600px) {
        width: 100%;

        &:last-child {
            margin-block-end: 15px;
        }
    }
}

.separator {
    border-bottom: 1px solid var(--color-jupiter);
    height: 1px;
    margin-block: 15px;
    width: 100%;
}
</style>
