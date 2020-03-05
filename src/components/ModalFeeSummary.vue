<template>
    <Modal
        :is-open="state.isOpen"
        :title="$t('modalFeeSummary.title')"
        not-closable
        @change="handleCancel"
    >
        <ModalFeeSummaryTitle
            :amount="state.amount"
            :account="state.account"
            :type="state.txType"
        />
        <div class="separator" />
        <ModalFeeSummaryTerms
            :state="termsState"
        />
        <div class="separator" />
        <ModalFeeSummaryItems :items="state.items" />
        <div class="buttons">
            <Button
                compact
                outline
                :label="state.cancelLabel ? state.cancelLabel : $t('common.cancel')"
                class="button"
                type="button"
                @click="handleCancel"
            />
            <Button
                compact
                :busy="state.isBusy"
                :label="state.submitLabel ? state.submitLabel : $t('common.continue')"
                class="button"
                type="submit"
                @submit="handleSubmit"
                @click="handleSubmit"
            />
        </div>
    </Modal>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext, computed, ref } from "@vue/composition-api";
import BigNumber from "bignumber.js";
import Button from "../components/Button.vue";
import Modal from "../components/Modal.vue";
import ModalFeeSummaryTitle from "../components/ModalFeeSummaryTitle.vue";
import ModalFeeSummaryItems from "../components/ModalFeeSummaryItems.vue";
import ModalFeeSummaryTerms from "../components/ModalFeeSummaryTerms.vue";
import { getters } from "../store";

export interface Item {
    description: string;
    value: BigNumber | string;
}

export interface State {
    isOpen: boolean;
    isBusy: boolean;
    isFileSummary: boolean;
    account: string;
    amount: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: any[] | readonly any[];
    txType: string;
    submitLabel: string | null;
    cancelLabel: string | null;
    termsShowNonOperator: boolean;
}

export default defineComponent({
    props: { state: Object as PropType<State> },
    components: {
        Button,
        Modal,
        ModalFeeSummaryTitle,
        ModalFeeSummaryItems,
        ModalFeeSummaryTerms
    },
    model: {
        prop: "state",
        event: "change"
    },
    setup(
        props,
        context: SetupContext
    ): object {
        const user = getters.CURRENT_USER();
        const operator = computed(() => {
            if (user != null) {
                return `${user.shard}.${user.realm}.${user.account}`;
            }

            return null;
        });

        const termsState = computed(() => ({
            operator: operator.value,
            sender: props.state!.termsShowNonOperator ? operator.value : null,
            receiver: props.state!.termsShowNonOperator ? props.state!.account : null
        }));

        function handleCancel(): void {
            props.state!.isBusy = false;
            props.state!.isOpen = false;
            context.emit("change", { ...props.state });
        }

        function handleSubmit(): void {
            if (!props.state!.isFileSummary) {
                context.emit("submit");
            } else {
                context.emit("submit", true);
            }
        }

        return {
            props,
            termsState,
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
