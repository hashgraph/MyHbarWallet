<template>
    <InterfaceForm :title="$t('interfaceSendTransfer.title')">
        <TextInput
            :value="state.amount"
            :error="state.amountErrorMessage"
            :suffix="hbarSuffix"
            :valid="isAmountValid"
            has-input
            :label="$t('common.amount')"
            show-validation
            @input="handleInput"
        />

        <IDInput
            ref="idInput"
            :error="state.idErrorMessage"
            :valid="state.idValid"
            can-copy
            :label="$t('common.toAccount')"
            show-validation
            @valid="handleValid"
            @input="handleAccount"
        />

        <OptionalMemoField v-model.trim="state.memo" />

        <template v-slot:footer>
            <Button
                :busy="state.isBusy"
                :disabled="!state.idValid || !isAmountValid"
                :label="buttonLabel"
                @click="handleShowSummary"
            />
        </template>

        <ModalSuccess
            v-model="state.modalSuccessState"
            @dismiss="handleModalSuccessDismiss"
        >
            <i18n path="modalSuccess.transferred">
                <strong>{{ amount }}</strong>
                <strong>{{ state.accountString }}</strong>
            </i18n>
        </ModalSuccess>

        <ModalFeeSummary
            v-model="state.modalSummaryState"
            @submit="handleSendTransfer"
        />
    </InterfaceForm>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, Ref, SetupContext, watch } from "@vue/composition-api";
import { BigNumber } from "bignumber.js";
import { AccountId } from "@hashgraph/sdk";

import TextInput from "../components/TextInput.vue";
import InterfaceForm from "../components/InterfaceForm.vue";
import Button from "../components/Button.vue";
import IDInput, { IdInputElement } from "../components/IDInput.vue";
import { convert, getValueOfUnit, Unit } from "../../service/units";
import ModalFeeSummary, { Item, State as ModalSummaryState } from "../components/ModalFeeSummary.vue";
import { formatHbar, validateHbar } from "../../service/format";
import OptionalMemoField from "../components/OptionalMemoField.vue";
import ModalSuccess, { State as ModalSuccessState } from "../components/ModalSuccess.vue";
import { LoginMethod } from "../../domain/wallets/Wallet";
import { actions, getters } from "../store";

interface State {
    amount: string | null;
    account: AccountId | null;
    accountString: string | null;
    memo: string | null;
    isBusy: boolean;
    idErrorMessage: string | null;
    amountErrorMessage: string | null;
    idValid: boolean;
    modalSummaryState: ModalSummaryState;
    modalSuccessState: ModalSuccessState;
}

const estimatedFeeHbar = new BigNumber(0.01);
const estimatedFeeTinybar = estimatedFeeHbar.multipliedBy(getValueOfUnit(Unit.Hbar));

export default defineComponent({
    components: {
        TextInput,
        InterfaceForm,
        Button,
        ModalSuccess,
        ModalFeeSummary,
        OptionalMemoField,
        IDInput
    },
    props: {},
    setup(_: object | null, context: SetupContext) {
        const state = reactive<State>({
            amount: "",
            account: null,
            accountString: "",
            memo: "",
            isBusy: false,
            idErrorMessage: "",
            amountErrorMessage: "",
            idValid: false,
            modalSummaryState: {
                isOpen: false,
                isBusy: false,
                isFileSummary: false,
                account: "",
                amount: "",
                items: [],
                txType: "transfer",
                submitLabel: context.root.$t("interfaceSendTransfer.feeSummary.continue").toString(),
                cancelLabel: context.root.$t("interfaceSendTransfer.feeSummary.dismiss").toString(),
                termsShowNonOperator: true
            },
            modalSuccessState: {
                isOpen: false,
                hasAction: false
            }
        });

        const idInput: Ref<IdInputElement | null> = ref(null);

        function handleAccount(value: string, account: AccountId | null): void {
            state.idErrorMessage = "";
            state.account = account;
        }

        watch(
            () => state.account,
            (newValue: AccountId | null) => {
                if (newValue) {
                    state.accountString = `${newValue.shard}.${newValue.realm}.${newValue.account}`;
                }
            }
        );

        function handleValid(valid: boolean): void {
            state.idValid = valid;
        }

        const isAmountValid = computed(() => {
            if (state.amount) {
                return (
                    new BigNumber(state.amount).isGreaterThan(new BigNumber(0)) && validateHbar(state.amount)
                );
            }
            return false;
        });

        const amount = computed(() => {
            if (state.amount) {
                return formatHbar(new BigNumber(state.amount));
            }
            return formatHbar(new BigNumber(0));
        });

        const truncate = computed(() => amount.value && amount.value.length > 15 ?
            `${amount.value.slice(0, 13)}...` :
            amount.value);

        const buttonLabel = computed(() => {
            let testAmount = 0;

            if (state.amount != null) {
                const amount = new BigNumber(state.amount);

                if (amount.gt(1)) testAmount = 2;
                else if (amount.lt(1)) testAmount = 0;
                else testAmount = 1;
            }

            return context.root
                .$tc("interfaceSendTransfer.sendHbar", testAmount, { count: truncate.value })
                .toString();
        });

        // Modal Fee Summary State
        const summaryAmount = computed(() => amount.value);
        const summaryAccount = computed(() => state.accountString);
        const summaryItems = computed((): Item[] => [
            {
                description: context.root.$t("interfaceSendTransfer.transferAmount").toString(),
                value:
                            isAmountValid && state.amount ?
                                new BigNumber(state.amount) :
                                new BigNumber(0)
            },
            {
                description: context.root.$t("common.estimatedFee").toString(),
                value: estimatedFeeHbar
            }
        ]);

        function handleShowSummary(): void {
            state.modalSummaryState.account = summaryAccount.value!;
            state.modalSummaryState.amount = summaryAmount.value!;
            const items: readonly Item[] = summaryItems.value!;
            state.modalSummaryState.items = items;
            state.modalSummaryState.isOpen = true;
        }

        // Taken from [UnitConverter]
        function boundInput(
            event: Event,
            inputValue: string,
            stateValue: string
        ): void {
            // If the computed value from the round-trip from {input} -> left -> right
            // is different than {input} then we should replace {input} so as
            // to prevent typing more

            const computedValueNum = new BigNumber(stateValue);
            const valueNum = new BigNumber(inputValue);

            if (!computedValueNum.eq(valueNum)) {
                // Computed value is different from input value; replace
                (event.target as HTMLInputElement).value = stateValue;
            } else {
                // Strip non-digit chars from input
                (event.target as HTMLInputElement).value = inputValue.replace(
                    /[^\d.]/,
                    ""
                );
            }
        }

        // Taken from [UnitConverter]
        function handleInput(value: string, event: Event): void {
            if (!/^\d*\.?\d*$/.test(value)) {
                value = state.amount || "";
            }

            state.amount = value;
            state.amountErrorMessage = "";

            const roundTrippedAmount = convert(
                state.amount,
                Unit.Hbar,
                Unit.Tinybar,
                false
            );

            state.amount = convert(
                roundTrippedAmount,
                Unit.Tinybar,
                Unit.Hbar,
                false
            );

            boundInput(event, value, state.amount);
        }

        // eslint-disable-next-line sonarjs/cognitive-complexity
        async function handleSendTransfer(): Promise<void> {
            state.isBusy = true;
            state.modalSummaryState.isBusy = true;
            const client = getters.currentUser().session.client;

            try {
                if (state.account == null) {
                    throw new Error(context.root
                        .$t("common.error.nullAccountOnInterface")
                        .toString());
                }

                if (state.amount == null) {
                    throw new Error(context.root
                        .$t("common.error.nullTransferAmount")
                        .toString());
                }

                const recipient: AccountId | null = state.account;
                const { CryptoTransferTransaction, Hbar } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");
                const sendAmount = new Hbar(state.amount);

                const tx = new CryptoTransferTransaction()
                    .addSender(
                        getters.currentUser().session.account,
                        sendAmount
                    )
                    .addRecipient(recipient, sendAmount)
                    .setMaxTransactionFee(Hbar.fromTinybar(estimatedFeeTinybar));

                if (state.memo == null) {
                    state.memo = " "; // Hack for Nano X paging
                }

                tx.setTransactionMemo(state.memo);

                await (await tx.execute(client)).getReceipt(client);

                // Refresh Balance
                await actions.refreshBalanceAndRate();

                // eslint-disable-next-line require-atomic-updates
                state.modalSummaryState.isOpen = false;
                state.modalSuccessState.isOpen = true;
            } catch (error) {
                // eslint-disable-next-line require-atomic-updates
                state.idErrorMessage = "";
                // eslint-disable-next-line require-atomic-updates
                state.amountErrorMessage = "";

                const { HederaStatusError, Status } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");

                if (error instanceof HederaStatusError) {
                    const errorMessage = (await actions.handleHederaError({
                        error,
                        showAlert: false
                    })).message;

                    // Small duplication of effort to assign errorMessage to correct TextInput
                    switch (error.status.code) {
                        case Status.InvalidAccountId.code:
                        case Status.AccountRepeatedInAccountAmounts.code:
                            state.idErrorMessage = errorMessage;
                            break;
                        case Status.InsufficientAccountBalance.code:
                            state.amountErrorMessage = errorMessage;
                            break;
                        default:
                            if (errorMessage !== "") {
                                actions.alert({
                                    message: errorMessage,
                                    level: "warn"
                                });
                            } else {
                                throw error; // Unhandled Error Modal will open
                            }
                    }
                } else if (
                    error.name === "TransportStatusError" &&
                    getters.currentUser().wallet.getLoginMethod() ===
                        LoginMethod.Ledger
                ) {
                    actions.handleLedgerError({
                        error,
                        showAlert: true
                    });
                } else {
                    throw error;
                }
            } finally {
                // eslint-disable-next-line require-atomic-updates
                state.modalSummaryState.isBusy = false;
                state.modalSummaryState.isOpen = false;
                state.isBusy = false;
            }
        }

        function handleModalSuccessDismiss(): void {
            state.modalSuccessState.isOpen = false;
            state.isBusy = false;
            state.amount = "";
            state.account = null;
            state.accountString = "";
            (idInput.value! as IdInputElement).clear();
            state.memo = "";
            state.accountString = "";
        }

        return {
            amount,
            state,
            summaryAmount,
            summaryAccount,
            summaryItems,
            buttonLabel,
            isAmountValid,
            hbarSuffix: Unit.Hbar,
            tinybarSuffix: Unit.Tinybar,
            idInput,
            handleShowSummary,
            handleSendTransfer,
            handleModalSuccessDismiss,
            truncate,
            handleInput,
            handleValid,
            handleAccount
        };
    }
});
</script>
