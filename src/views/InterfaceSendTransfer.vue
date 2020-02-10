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
import { computed, createComponent, onMounted, reactive, Ref, ref, SetupContext, watch } from "@vue/composition-api";
import BigNumber from "bignumber.js";

import TextInput from "../components/TextInput.vue";
import InterfaceForm from "../components/InterfaceForm.vue";
import Button from "../components/Button.vue";
import IDInput, { IdInputElement } from "../components/IDInput.vue";
import { Unit, convert } from "../units";
import ModalFeeSummary, { Item } from "../components/ModalFeeSummary.vue";
import { formatHbar, validateHbar } from "../formatter";
import OptionalMemoField from "../components/OptionalMemoField.vue";
import ModalSuccess, { State as ModalSuccessState } from "../components/ModalSuccess.vue";
import { LoginMethod } from "../wallets/Wallet";
import { actions, getters, store } from "../store";

// eslint-disable-next-line sonarjs/no-duplicate-string
const hashgraph = "@hashgraph/sdk";

interface State {
    amount: string | null;
    account: import("@hashgraph/sdk").AccountId | null;
    accountString: string | null;
    memo: string | null;
    isBusy: boolean;
    idErrorMessage: string | null;
    amountErrorMessage: string | null;
    summaryIsOpen: boolean;
    idValid: boolean;
    modalSuccessState: ModalSuccessState;
}

let estimatedFeeHbar: BigNumber | null = null;
let estimatedFeeTinybar: BigNumber | null = null;

async function updateFees(): Promise<void> {
    estimatedFeeHbar = await getters.estimatedFeeHbar();
    estimatedFeeTinybar = await getters.estimatedFeeTinybar();
}

export default createComponent({
    props: {}, // ts hack
    components: {
        TextInput,
        InterfaceForm,
        Button,
        ModalSuccess,
        ModalFeeSummary,
        OptionalMemoField,
        IDInput
    },
    setup(props, context: SetupContext) {
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

        function handleAccount(
            value: string,
            account: import("@hashgraph/sdk").AccountId | null
        ): void {
            state.idErrorMessage = "";
            state.account = account;
        }

        watch(
            () => state.account,
            (newValue: import("@hashgraph/sdk").AccountId | null) => {
                if (newValue) {
                    state.accountString = `${newValue.shard}.${newValue.realm}.${newValue.account}`;
                }
            }
        );

        function handleValid(valid: boolean): void {
            state.idValid = valid;
        }

        const isAmountValid = computed((): boolean => {
            if (state.amount) {
                return (
                    new BigNumber(state.amount).isGreaterThan(new BigNumber(0)) &&
                    validateHbar(state.amount)
                );
            }

            return false;
        });

        const amount = computed((): string | null => {
            if (state.amount) {
                return formatHbar(new BigNumber(state.amount));
            }

            return null;
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
            const { Hbar } = await import(hashgraph);

            if (balance == null) {
                return;
            }

            state.amount = "";

            if (estimatedFeeTinybar != null) {
                const tinybar = new BigNumber(balance).minus(estimatedFeeTinybar);
                state.amount = Hbar.fromTinybar(tinybar).toString();
            }
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
                    /[^\d.]/u,
                    ""
                );
            }
        }

        // Taken from [UnitConverter]
        function handleInput(value: string, event: Event): void {
            let _value = value;
            if (!/^\d*\.?\d*$/u.test(value)) {
                _value = state.amount || "";
            }

            state.amount = _value;
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

            boundInput(event, _value, state.amount);
        }

        // eslint-disable-next-line sonarjs/cognitive-complexity
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

                if (estimatedFeeTinybar == null) {
                    throw new Error(context.root.$t("estimatedFeeError").toString());
                }

                const recipient: import("@hashgraph/sdk").AccountId | null =
                        state.account;

                const Hbar = (await import("@hashgraph/sdk")).Hbar;
                const sendAmountTinybar = new Hbar(state.amount).asTinybar();

                const { CryptoTransferTransaction } = await import(hashgraph);

                // Max Transaction Fee, otherwise known as Transaction Fee,
                // is the max of 1 Hbar and the user's remaining balance
                // Oh also, check for null balance to appease typescript
                const safeBalance =
                        store.state.wallet.balance == null ?
                            new BigNumber(0) :
                            store.state.wallet.balance;

                // eslint-disable-next-line max-len
                const maxTxFeeTinybar = await getters.maxFeeTinybar(safeBalance.minus(sendAmountTinybar.plus(estimatedFeeTinybar)));

                const tx = new CryptoTransferTransaction()
                    .addSender(
                        store.state.wallet.session.account,
                        sendAmountTinybar
                    )
                    .addRecipient(recipient, sendAmountTinybar)
                    .setMaxTransactionFee(maxTxFeeTinybar);

                if (state.memo !== "" && state.memo != null) {
                    tx.setTransactionMemo(state.memo);
                }

                (await tx.build(client).execute(client)).getReceipt(client);

                // Refresh Balance
                await actions.refreshBalanceAndRate();

                // eslint-disable-next-line require-atomic-updates
                state.modalSuccessState.isOpen = true;
            } catch (error) {
                // eslint-disable-next-line require-atomic-updates
                state.idErrorMessage = "";
                // eslint-disable-next-line require-atomic-updates
                state.amountErrorMessage = "";

                const { HederaError, Status } = await import(hashgraph);

                if (error instanceof HederaError) {
                    const errorMessage = (
                        await actions.handleHederaError({
                            error,
                            showAlert: false
                        })
                    ).message;

                    // Small duplication of effort to assign errorMessage to correct TextInput
                    switch (error.code) {
                        case Status.InvalidAccountId.code:
                        case Status.PayerAccountUnauthorized.code:
                            state.idErrorMessage = errorMessage;
                            break;
                        case Status.InsufficientAccountBalance.code:
                        case Status.InsufficientPayerBalance.code:
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

        onMounted(updateFees);

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
