import {LoginMethod} from "../wallets/Wallet";
<template>
  <InterfaceForm :title="$t('interfaceSendTransfer.title')">
    <TextInput
      v-model="state.amount"
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
import IDInput from "../components/IDInput.vue";
import {
    computed,
    createComponent,
    reactive,
    ref,
    Ref,
    SetupContext,
    watch
} from "@vue/composition-api";
import { getValueOfUnit, Unit } from "../units";
import BigNumber from "bignumber.js";
import ModalFeeSummary, { Item } from "../components/ModalFeeSummary.vue";
import { formatHbar, validateHbar } from "../formatter";
import { Id } from "../store/modules/wallet";
import OptionalMemoField from "../components/OptionalMemoField.vue";
import ModalSuccess, { State as ModalSuccessState } from "../components/ModalSuccess.vue";
import { Vue } from "vue/types/vue";
import { LoginMethod } from "../wallets/Wallet";
import { AccountId } from "@hashgraph/sdk";
import { actions, getters, store } from "../store";

// Shim for IDInput ref
type IdInput = Vue & {
    clear(): void;
};

interface State {
    amount: string | null;
    account: Id | null;
    accountString: string | null;
    memo: string | null;
    isBusy: boolean;
    idErrorMessage: string | null;
    amountErrorMessage: string | null;
    summaryIsOpen: boolean;
    idValid: boolean;
    modalSuccessState: ModalSuccessState;
}

const estimatedFeeHbar = getters.estimatedFeeHBar();
const estimatedFeeTinybar = getters.estimatedFeeTinyBar();

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

        const idInput: Ref<Vue | null> = ref(null);

        function handleAccount(value: string, account: Id | null): void {
            state.idErrorMessage = "";
            state.account = account;
        }

        watch(
            () => state.account,
            (newValue: Id | null) => {
                if (newValue !== null) {
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
            if (state.amount === null) {
                return false;
            }

            return (
                new BigNumber(state.amount).isGreaterThan(new BigNumber(0)) && validateHbar(state.amount)
            );
        });

        const amount = computed(() => {
            if (state.amount === null) {
                return null;
            }

            return formatHbar(new BigNumber(state.amount));
        });

        const truncate = computed(() => amount.value !== null && amount.value.length > 15 ?
            `${amount.value.slice(0, 13)}...` :
            amount.value);

        const buttonLabel = computed(() => context.root
            .$tc(
                "interfaceSendTransfer.sendHbar",
                state.amount == null ? 0 : Number(state.amount.toString()),
                { count: truncate.value }
            )
            .toString());

        const summaryAmount = computed(() => amount.value);

        const summaryAccount = computed(() => state.accountString);

        const summaryItems = computed(() => [
            {
                description: context.root.$t("interfaceSendTransfer.transferAmount"),
                value: isAmountValid.value === true && state.amount !== null ?
                    new BigNumber(state.amount) :
                    new BigNumber(0)
            },
            {
                description: context.root.$t("common.estimatedFee"),
                value: estimatedFeeHbar
            }
        ] as Item[]);

        function handleClickEntireBalance(): void {
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

        function handleInput(): void {
            state.amountErrorMessage = "";
        }

        async function handleSendTransfer(): Promise<void> {
            if (store.state.wallet.session == null) {
                throw new Error(context.root.$t("common.error.nullAccountOnInterface").toString());
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

                const maxTxFeeTinybar = getters
                    .maxFeeTinyBar(safeBalance.minus(sendAmountTinybar.plus(estimatedFeeTinybar)));

                const tx = new CryptoTransferTransaction(client)
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

                const { HederaError, ResponseCodeEnum } = await (import("@hashgraph/sdk") as Promise<typeof import("@hashgraph/sdk")>);

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
                        LoginMethod.LedgerNanoS
                ) {
                    await actions.handleLedgerError({
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
            (idInput.value! as IdInput).clear();
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
