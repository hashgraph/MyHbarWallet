<template>
    <InterfaceForm :title="$t('interfaceSendTransfer.title')">
        <TextInput
            :value="state.amount"
            :error="state.amountErrorMessage"
            :suffix="hbarSuffix"
            :valid="isAmountValid"
            action="Entire Balance"
            has-input
            :label="$t('common.amount')"
            show-validation
            @action="handleClickEntireBalance"
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
            v-model="state.summaryIsOpen"
            :account="summaryAccount"
            :amount="summaryAmount"
            :items="summaryItems"
            tx-type="transfer"
            @submit="handleSendTransfer"
        />
    </InterfaceForm>
</template>

<script lang="ts">
import TextInput from "../components/TextInput.vue";
import InterfaceForm from "../components/InterfaceForm.vue";
import Button from "../components/Button.vue";
import IDInput, { IdInputElement } from "../components/IDInput.vue";
import {
    computed,
    createComponent,
    reactive,
    ref,
    Ref,
    SetupContext,
    watch
} from "@vue/composition-api";
import { getValueOfUnit, Unit, convert } from "../units";
import BigNumber from "bignumber.js";
import ModalFeeSummary, { Item } from "../components/ModalFeeSummary.vue";
import { formatHbar, validateHbar } from "../formatter";
import OptionalMemoField from "../components/OptionalMemoField.vue";
import ModalSuccess, { State as ModalSuccessState } from "../components/ModalSuccess.vue";
import { LoginMethod } from "../wallets/Wallet";
import { AccountId } from "@hashgraph/sdk";
import { actions, getters, store } from "../store";

interface State {
    amount: string | null;
    account: AccountId | null;
    accountString: string | null;
    memo: string | null;
    isBusy: boolean;
    idErrorMessage: string | null;
    amountErrorMessage: string | null;
    summaryIsOpen: boolean;
    idValid: boolean;
    modalSuccessState: ModalSuccessState;
}

const estimatedFeeHbar = getters.ESTIMATED_FEE_HBAR();
const estimatedFeeTinybar = getters.ESTIMATED_FEE_TINYBAR();

export default createComponent({
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
            summaryIsOpen: false,
            idValid: false,
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
                    state.accountString =
                        `${newValue.shard
                        }.${
                            newValue.realm
                        }.${
                            newValue.account}`;
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
        });

        const amount = computed(() => {
            if (state.amount) {
                return formatHbar(new BigNumber(state.amount));
            }
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

        const summaryAmount = computed(() => amount.value);

        const summaryAccount = computed(() => state.accountString);

        const summaryItems = computed(() => [
            {
                description: context.root.$t("interfaceSendTransfer.transferAmount"),
                value:
                            isAmountValid && state.amount ?
                                new BigNumber(state.amount) :
                                new BigNumber(0)
            },
            {
                description: context.root.$t("common.estimatedFee"),
                value: estimatedFeeHbar
            }
        ] as Item[]);

        async function handleClickEntireBalance(): Promise<void> {
            const balance = store.state.wallet.balance;

            if (balance == null) {
                return;
            }

            const hbar = new BigNumber(balance)
                .dividedBy(getValueOfUnit(Unit.Hbar))
                .minus(estimatedFeeHbar);

            state.amount = hbar.toString();
        }

        function handleShowSummary(): void {
            state.summaryIsOpen = true;
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

        async function handleSendTransfer(): Promise<void> {
            if (store.state.wallet.session == null) {
                throw new Error(context.root
                    .$t("common.error.nullAccountOnInterface")
                    .toString());
            }

            state.isBusy = true;

            const client = store.state.wallet.session.client;

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

                const sendAmountTinybar = new BigNumber(state.amount).multipliedBy(getValueOfUnit(Unit.Hbar));

                const { CryptoTransferTransaction, Client } = await import("@hashgraph/sdk");

                // Max Transaction Fee, otherwise known as Transaction Fee,
                // is the max of 1 Hbar and the user's remaining balance
                // Oh also, check for null balance to appease typescript
                const safeBalance =
                    store.state.wallet.balance == null ?
                        new BigNumber(0) :
                        store.state.wallet.balance;

                const maxTxFeeTinybar = getters.MAX_FEE_TINYBAR(safeBalance.minus(sendAmountTinybar.plus(estimatedFeeTinybar)));

                const tx = new CryptoTransferTransaction(client as InstanceType<
                    typeof Client
                >)
                    .addSender(
                        store.state.wallet.session.account,
                        sendAmountTinybar
                    )
                    .addRecipient(recipient, sendAmountTinybar)
                    .setTransactionFee(maxTxFeeTinybar);

                if (state.memo !== "" && state.memo != null) {
                    tx.setMemo(state.memo);
                }

                await tx.build().executeForReceipt();

                // Refresh Balance
                await actions.refreshBalanceAndRate();

                // eslint-disable-next-line require-atomic-updates
                state.modalSuccessState.isOpen = true;
            } catch (error) {
                // eslint-disable-next-line require-atomic-updates
                state.idErrorMessage = "";
                // eslint-disable-next-line require-atomic-updates
                state.amountErrorMessage = "";

                const { HederaError, ResponseCodeEnum } = await import("@hashgraph/sdk");

                if (error instanceof HederaError) {
                    const errorMessage = (await actions.handleHederaError({
                        error,
                        showAlert: false
                    })).message;

                    // Small duplication of effort to assign errorMessage to correct TextInput
                    switch (error.code) {
                        case ResponseCodeEnum.INVALID_ACCOUNT_ID:
                        case ResponseCodeEnum.ACCOUNT_REPEATED_IN_ACCOUNT_AMOUNTS:
                            state.idErrorMessage = errorMessage;
                            break;
                        case ResponseCodeEnum.INSUFFICIENT_ACCOUNT_BALANCE:
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
                    store.state.wallet.session.wallet.getLoginMethod() ===
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
            handleClickEntireBalance,
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
