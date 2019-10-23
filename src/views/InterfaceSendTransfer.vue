<template>
    <InterfaceForm :title="$t('interfaceSendTransfer.title')">
        <TextInput
            v-model="state.amount"
            :error="state.amountErrorMessage"
            :suffix="hbarSuffix"
            :valid="state.isAmountValid"
            action="Entire Balance"
            has-input
            :label="$t('common.amount')"
            show-validation
            @action="handleClickEntireBalance"
            @input="handleInput"
        />

        <IDInput
            :error="state.idErrorMessage"
            :valid="state.idValid"
            can-copy
            :is-open="state.successModalIsOpen"
            :label="$t('common.toAccount')"
            show-validation
            @valid="handleValid"
            @input="handleAccount"
        />

        <OptionalMemoField v-model.trim="state.memo" />

        <template v-slot:footer>
            <Button
                :busy="state.isBusy"
                :disabled="!state.idValid || !state.isAmountValid"
                :label="state.buttonLabel"
                @click="handleShowSummary"
            />
        </template>

        <ModalSendTransferSuccess
            :amount="state.amount"
            :is-open="state.successModalIsOpen"
            :to-account="state.accountString"
            @change="handleSuccessModalChange"
        />

        <ModalFeeSummary
            v-model="state.summaryIsOpen"
            :account="summaryAccount"
            :amount="state.summaryAmount"
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
    createComponent,
    reactive,
    computed,
    SetupContext,
    Ref,
    ref,
    watch
} from "@vue/composition-api";
import store from "../store";
import {
    ALERT,
    HANDLE_HEDERA_ERROR,
    HANDLE_LEDGER_ERROR,
    REFRESH_BALANCE_AND_RATE
} from "../store/actions";
import ModalSendTransferSuccess from "../components/ModalSendTransferSuccess.vue";
import { Unit } from "../units";
import ModalFeeSummary, { Item } from "../components/ModalFeeSummary.vue";
import { formatHbar, validateHbar } from "../formatter";
import { Id } from "../store/modules/wallet";
import { ESTIMATED_FEE_HBAR, MAX_FEE_HBAR } from "../store/getters";
import OptionalMemoField from "../components/OptionalMemoField.vue";

interface State {
    amount: string;
    isAmountValid: boolean;
    account: Id | null;
    accountString: string | null;
    memo: string | null;
    isBusy: boolean;
    idErrorMessage: string | null;
    amountErrorMessage: string | null;
    successModalIsOpen: boolean;
    buttonLabel: string;
    summaryIsOpen: boolean;
    summaryAmount: string;
    idValid: boolean;
}

const estimatedFee = store.getters[ESTIMATED_FEE_HBAR];

export default createComponent({
    components: {
        TextInput,
        InterfaceForm,
        Button,
        ModalSendTransferSuccess,
        ModalFeeSummary,
        OptionalMemoField,
        IDInput
    },
    setup(_: object | null, context: SetupContext) {
        const state = reactive<State>({
            amount: "",
            isAmountValid: false,
            account: null,
            accountString: "",
            memo: "",
            isBusy: false,
            idErrorMessage: "",
            amountErrorMessage: "",
            successModalIsOpen: false,
            buttonLabel: context.root
                .$t("interfaceSendTransfer.sendHbar")
                .toString(),
            summaryIsOpen: false,
            summaryAmount: "",
            idValid: false
        });

        const summaryItems: Ref<Item[]> = ref(new Array<Item>());

        watch(
            () => state.amount,
            async (amountInput: string) => {
                if (!validateHbar(amountInput)) {
                    state.isAmountValid = false;
                    return;
                }

                const { Hbar } = await (import("@hashgraph/sdk") as Promise<
                    typeof import("@hashgraph/sdk")
                >);

                const amount = Hbar.from(amountInput, "hbar");

                state.isAmountValid = amount.isGreaterThan(Hbar.ZERO);

                const formattedAmount = formatHbar(amount);
                const truncatedAmount =
                    formattedAmount.length > 15
                        ? formattedAmount.substring(0, 13) + "..."
                        : formattedAmount;

                state.buttonLabel = amount.isGreaterThan(Hbar.ZERO)
                    ? context.root
                          .$t("interfaceSendTransfer.sendHbars", [
                              truncatedAmount
                          ])
                          .toString()
                    : context.root
                          .$t("interfaceSendTransfer.sendHbar")
                          .toString();

                state.summaryAmount = formattedAmount;

                summaryItems.value = [
                    {
                        description: context.root.$t(
                            "interfaceSendTransfer.transferAmount"
                        ),
                        value:
                            state.isAmountValid && state.amount
                                ? amount
                                : Hbar.zero()
                    },
                    {
                        description: context.root.$t("common.estimatedFee"),
                        value: estimatedFee
                    }
                ] as Item[];

                return;
            }
        );

        function handleAccount(value: string, account: Id | null): void {
            state.idErrorMessage = "";
            state.account = account;
            if (state.account) {
                state.accountString =
                    state.account.shard +
                    "." +
                    state.account.realm +
                    "." +
                    state.account.account;
            }
        }

        function handleValid(valid: boolean): void {
            state.idValid = valid;
        }

        const summaryAccount = computed(() => {
            return state.accountString;
        });

        async function handleClickEntireBalance(): Promise<void> {
            const balance = store.state.wallet.balance;

            if (balance == null) {
                return;
            }

            state.amount = balance
                .minus(estimatedFee)
                .as("hbar")
                .toString();
        }

        function handleShowSummary(): void {
            state.summaryIsOpen = true;
        }

        function handleInput(): void {
            state.amountErrorMessage = "";
        }

        async function handleSendTransfer(): Promise<void> {
            if (store.state.wallet.session == null) {
                throw new Error(
                    context.root
                        .$t("common.error.nullAccountOnInterface")
                        .toString()
                );
            }

            state.isBusy = true;

            const client = store.state.wallet.session.client;

            try {
                if (state.account == null) {
                    throw new Error(
                        context.root
                            .$t("common.error.nullAccountOnInterface")
                            .toString()
                    );
                }

                if (state.amount == null) {
                    throw new Error(
                        context.root
                            .$t("common.error.nullTransferAmount")
                            .toString()
                    );
                }

                const {
                    Hbar,
                    CryptoTransferTransaction,
                    Client
                } = await import("@hashgraph/sdk");

                const amountToSend = Hbar.from(state.amount, "hbar");

                const recipient: import("@hashgraph/sdk").AccountId | null =
                    state.account;

                // Max Transaction Fee, otherwise known as Transaction Fee,
                // is the max of 1 Hbar and the user's remaining balance
                // Oh also, check for null balance to appease typescript
                const safeBalance =
                    store.state.wallet.balance == null
                        ? Hbar.zero()
                        : store.state.wallet.balance;

                const maxTxFeeTinybar = store.getters[MAX_FEE_HBAR](
                    safeBalance.minus(amountToSend.plus(estimatedFee))
                );

                const tx = new CryptoTransferTransaction(client as InstanceType<
                    typeof Client
                >)
                    .addSender(store.state.wallet.session.account, amountToSend)
                    .addRecipient(recipient, amountToSend)
                    .setTransactionFee(maxTxFeeTinybar);

                if (state.memo !== "" && state.memo != null) {
                    tx.setMemo(state.memo);
                }

                await tx.build().executeForReceipt();

                // Refresh Balance
                await store.dispatch(REFRESH_BALANCE_AND_RATE);

                // eslint-disable-next-line require-atomic-updates
                state.successModalIsOpen = true;
            } catch (error) {
                // eslint-disable-next-line require-atomic-updates
                state.idErrorMessage = "";
                // eslint-disable-next-line require-atomic-updates
                state.amountErrorMessage = "";

                const { HederaError, ResponseCodeEnum } = await (import(
                    "@hashgraph/sdk"
                ) as Promise<typeof import("@hashgraph/sdk")>);

                if (error instanceof HederaError) {
                    const errorMessage = (await store.dispatch(
                        HANDLE_HEDERA_ERROR,
                        { error, showAlert: false }
                    )).message;

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
                                store.dispatch(ALERT, {
                                    message: errorMessage,
                                    level: "warn"
                                });
                            } else {
                                throw error; // Unhandled Error Modal will open
                            }
                    }
                } else if (error.name === "TransportStatusError") {
                    store.dispatch(HANDLE_LEDGER_ERROR, {
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

        function handleSuccessModalChange(isOpen: boolean): void {
            if (!isOpen) {
                state.successModalIsOpen = isOpen;
                state.isBusy = false;
                state.amount = "";
                state.memo = "";
                state.accountString = "";
            }
        }

        return {
            state,
            summaryAccount,
            summaryItems,
            hbarSuffix: Unit.Hbar,
            tinybarSuffix: Unit.Tinybar,
            handleShowSummary,
            handleClickEntireBalance,
            handleSendTransfer,
            handleSuccessModalChange,
            handleInput,
            handleValid,
            handleAccount
        };
    }
});
</script>
