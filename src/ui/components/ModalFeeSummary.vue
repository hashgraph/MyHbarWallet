<template>
    <Modal
        :is-open="state.isOpen"
        :title="$t('modalFeeSummary.title')"
        not-closable
        @change="handleChange"
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
                @click="handleChange"
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
import { computed, defineComponent, PropType, SetupContext } from "@vue/composition-api";
import { BigNumber } from "bignumber.js";

import { getters } from "../store";

import Button from "./Button.vue";
import Modal from "./Modal.vue";
import ModalFeeSummaryTitle from "./ModalFeeSummaryTitle.vue";
import ModalFeeSummaryItems from "./ModalFeeSummaryItems.vue";
import ModalFeeSummaryTerms from "./ModalFeeSummaryTerms.vue";

export interface Item {
    description: string;
    value: BigNumber | import("@hashgraph/sdk").Hbar | string;
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
    name: "ModalFeeSummary",
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
        const account = computed(() => {
            if (getters.currentUser() != null) {
                const user = getters.currentUser();
                return user.session.account;
            }
            return null;
        });

        const operator = computed(() => {
            if (account.value != null) {
                return `${account.value.shard}.${account.value.realm}.${account.value.account}`;
            }

            return null;
        });

        const termsState = computed(() => ({
            operator: operator.value,
            sender: props.state!.termsShowNonOperator ? operator.value : null,
            receiver: props.state!.termsShowNonOperator ? props.state!.account : null
        }));

        function handleChange(): void {
            context.emit("change", { ...props.state, isOpen: false, isBusy: false });
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
            handleChange,
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
