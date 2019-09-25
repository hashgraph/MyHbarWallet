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

        <TextInput
            v-model="state.toAccount"
            :error="state.idErrorMessage"
            :valid="isIdValid"
            can-copy
            :label="$t('common.toAccount')"
            :placeholder="$t('common.accountSyntax')"
            show-validation
        />

        <OptionalMemoField v-model.trim="state.memo" />

        <template v-slot:footer>
            <Button
                :busy="state.isBusy"
                :disabled="!isIdValid || !state.isAmountValid"
                :label="state.buttonLabel"
                @click="handleShowSummary"
            />
        </template>

        <ModalSendTransferSuccess
            :amount="state.amount"
            :is-open="state.successModalIsOpen"
            :to-account="state.toAccount"
            @change="handleSuccessModalChange"
        />

        <ModalFeeSummary
            v-model="state.summaryIsOpen"
            :account="summaryAccount"
            :amount="state.summaryAmount"
            :items="state.summaryItems"
            tx-type="transfer"
            @submit="handleSendTransfer"
        />
    </InterfaceForm>
</template>

<script lang="ts">
import TextInput from "../components/TextInput.vue";
import InterfaceForm from "../components/InterfaceForm.vue";
import Button from "../components/Button.vue";
import {
    createComponent,
    reactive,
    computed,
    watch,
    SetupContext
} from "@vue/composition-api";
import store from "../store";
import { ALERT, REFRESH_BALANCE_AND_RATE } from "../store/actions";
import ModalSendTransferSuccess from "../components/ModalSendTransferSuccess.vue";
import { Unit } from "../units";
import ModalFeeSummary from "../components/ModalFeeSummary.vue";
import { formatHbar, validateHbar } from "../formatter";
import {
    ESTIMATED_FEE_HBAR,
    ESTIMATED_FEE_TINYBAR,
    MAX_FEE_TINYBAR
} from "../store/getters";
import OptionalMemoField from "../components/OptionalMemoField.vue";
import { Item } from "../components/ModalFeeSummaryItems.vue";

const shardRealmAccountRegex = /^\d+\.\d+\.\d+$/;
const estimatedFeeHbar = store.getters[ESTIMATED_FEE_HBAR];

export default createComponent({
    components: {
        TextInput,
        InterfaceForm,
        Button,
        ModalSendTransferSuccess,
        ModalFeeSummary,
        OptionalMemoField
    },
    setup(_: object | null, context: SetupContext) {
        const state = reactive({
            amount: "",
            isAmountValid: false,
            toAccount: "",
            memo: "",
            buttonLabel: context.root
                .$t("interfaceSendTransfer.sendHbar")
                .toString(),
            isBusy: false,
            idErrorMessage: "",
            amountErrorMessage: "",
            successModalIsOpen: false,
            summaryIsOpen: false,
            summaryAmount: "",
            summaryItems: [] as Item[]
        });

        const isIdValid = computed(() =>
            shardRealmAccountRegex.test(state.toAccount)
        );

        watch(
            () => state.amount,
            async (amount: string) => {
                if (!validateHbar(amount)) {
                    state.isAmountValid = false;
                    return;
                }

                const { Hbar } = await (import("@hashgraph/sdk") as Promise<
                    typeof import("@hashgraph/sdk")
                >);

                const amountHbar = Hbar.from(amount, "hbar");

                state.isAmountValid =
                    amountHbar.comparedTo(Hbar.fromTinybar(0)) > 0;

                const formattedAmount = formatHbar(amountHbar);
                const truncatedAmount =
                    formattedAmount.length > 15
                        ? formattedAmount.substring(0, 13) + "..."
                        : formattedAmount;

                state.buttonLabel =
                    amountHbar.comparedTo(Hbar.fromTinybar(0)) > 0
                        ? context.root
                              .$t("interfaceSendTransfer.sendHbars", [
                                  truncatedAmount
                              ])
                              .toString()
                        : context.root
                              .$t("interfaceSendTransfer.sendHbar")
                              .toString();

                state.summaryAmount = formattedAmount;

                ((state.summaryItems as unknown) as Item[]) = [
                    {
                        description: context.root
                            .$t("interfaceSendTransfer.transferAmount")
                            .toString(),
                        value: state.isAmountValid
                            ? Hbar.from(amount, "hbar")
                            : (Hbar.fromTinybar(
                                  0
                              ) as import("@hashgraph/sdk").Hbar)
                    } as Item,
                    {
                        description: context.root
                            .$t("common.estimatedFee")
                            .toString(),
                        value: estimatedFeeHbar as import("@hashgraph/sdk").Hbar
                    } as Item
                ] as Item[];
            }
        );

        const summaryAccount = computed(() => {
            return state.toAccount;
        });

        async function handleClickEntireBalance(): Promise<void> {
            const balance: import("@hashgraph/sdk").Hbar | null =
                store.state.wallet.balance;

            if (balance == null) {
                return;
            }

            const hbar: import("@hashgraph/sdk").Hbar = balance.minus(
                estimatedFeeHbar
            );

            state.amount = hbar.toString();
        }

        function handleShowSummary(): void {
            state.summaryIsOpen = true;
        }

        function handleInput(): void {
            state.amountErrorMessage = "";
        }

        async function handleSendTransfer(): Promise<void> {
            state.isBusy = true;
            if (store.state.wallet.session == null) {
                throw new Error(
                    "Session should not be null if inside Send Transfer"
                );
            }

            const client = store.state.wallet.session.client;
            const parts = state.toAccount.split(".");

            const { Hbar } = await (import("@hashgraph/sdk") as Promise<
                typeof import("@hashgraph/sdk")
            >);

            try {
                const recipient: import("@hashgraph/sdk").AccountId = {
                    shard: parseInt(parts[0]),
                    realm: parseInt(parts[1]),
                    account: parseInt(parts[2])
                };

                const sendAmount = Hbar.from(state.amount, "hbar");

                const { CryptoTransferTransaction, Client } = await import(
                    "@hashgraph/sdk"
                );

                // Max Transaction Fee, otherwise known as Transaction Fee,
                // is the max of 1 Hbar and the user's remaining balance
                // Oh also, check for null balance to appease typescript
                const safeBalance =
                    store.state.wallet.balance == null
                        ? Hbar.fromTinybar(0)
                        : store.state.wallet.balance;

                const maxTxFee = store.getters[MAX_FEE_TINYBAR](
                    safeBalance.minus(sendAmount).plus(estimatedFeeHbar)
                );

                const tx = new CryptoTransferTransaction(client as InstanceType<
                    typeof Client
                >)
                    .addSender(store.state.wallet.session.account, sendAmount)
                    .addRecipient(recipient, sendAmount)
                    .setTransactionFee(maxTxFee);

                if (state.memo !== "") {
                    tx.setMemo(state.memo);
                }

                await tx.build().executeForReceipt();

                // Refresh Balance
                store.dispatch(REFRESH_BALANCE_AND_RATE);

                // eslint-disable-next-line require-atomic-updates
                state.successModalIsOpen = true;
            } catch (error) {
                const { HederaError, ResponseCodeEnum } = await (import(
                    "@hashgraph/sdk"
                ) as Promise<typeof import("@hashgraph/sdk")>);

                // eslint-disable-next-line require-atomic-updates
                state.idErrorMessage = "";
                // eslint-disable-next-line require-atomic-updates
                state.amountErrorMessage = "";

                if (error instanceof HederaError) {
                    if (error.code === ResponseCodeEnum.INVALID_ACCOUNT_ID) {
                        // eslint-disable-next-line require-atomic-updates
                        state.idErrorMessage = context.root
                            .$t("common.error.invalidAccount")
                            .toString();
                    } else if (
                        error.code ===
                        ResponseCodeEnum.ACCOUNT_REPEATED_IN_ACCOUNT_AMOUNTS
                    ) {
                        // eslint-disable-next-line require-atomic-updates
                        state.idErrorMessage = context.root
                            .$t("common.error.cannotSendHbarToYourself")
                            .toString();
                    } else if (
                        error.code ===
                        ResponseCodeEnum.INSUFFICIENT_ACCOUNT_BALANCE
                    ) {
                        state.amountErrorMessage = context.root
                            .$t("common.error.insufficientBalance")
                            .toString();
                    } else {
                        store.dispatch(ALERT, {
                            message: `Received unhandled error from Hedera:  ${error.codeName}`,
                            level: "error"
                        });
                        throw error;
                    }
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
                state.toAccount = "";
            }
        }

        return {
            state,
            summaryAccount,
            isIdValid,
            hbarSuffix: Unit.Hbar,
            tinybarSuffix: Unit.Tinybar,
            handleShowSummary,
            handleClickEntireBalance,
            handleSendTransfer,
            handleSuccessModalChange,
            handleInput
        };
    }
});
</script>
