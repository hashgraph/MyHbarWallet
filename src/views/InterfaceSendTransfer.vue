<template>
    <InterfaceForm title="Send">
        <TextInput
            v-model="state.amount"
            :error="state.amountErrorMessage"
            :suffix="hbarSuffix"
            :valid="isAmountValid"
            action="Entire Balance"
            has-input
            label="Amount"
            show-validation
            @action="handleClickEntireBalance"
            @input="handleInput"
        />

        <TextInput
            v-model="state.toAccount"
            :error="state.idErrorMessage"
            :valid="isIdValid"
            can-copy
            label="To Account"
            placeholder="shard.realm.account"
            show-validation
        />

        <TextInput
            v-model.trim="state.memo"
            label="Memo"
            placeholder="Optional Memo"
        />

        <template v-slot:footer>
            <Button
                :busy="state.isBusy"
                :disabled="!isIdValid || !isAmountValid"
                :label="buttonLabel"
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
import { computed, createComponent, reactive } from "@vue/composition-api";
import store from "../store";
import { AccountId } from "@hashgraph/sdk";
import { REFRESH_BALANCE } from "../store/actions";
import ModalSendTransferSuccess from "../components/ModalSendTransferSuccess.vue";
import { getValueOfUnit, Unit } from "../units";
import BigNumber from "bignumber.js";
import ModalFeeSummary, { Item } from "../components/ModalFeeSummary.vue";
import { formatHbar, validateHbar } from "../formatter";
import {
    ESTIMATED_FEE_HBAR,
    ESTIMATED_FEE_TINYBAR,
    MAX_FEE_TINYBAR
} from "../store/getters";

const shardRealmAccountRegex = /^\d+\.\d+\.\d+$/;
const estimatedFeeHbar = store.getters[ESTIMATED_FEE_HBAR];
const estimatedFeeTinybar = store.getters[ESTIMATED_FEE_TINYBAR];

export default createComponent({
    components: {
        TextInput,
        InterfaceForm,
        Button,
        ModalSendTransferSuccess,
        ModalFeeSummary
    },
    setup() {
        const state = reactive({
            amount: "",
            toAccount: "",
            memo: "",
            isBusy: false,
            idErrorMessage: "",
            amountErrorMessage: "",
            successModalIsOpen: false,
            summaryIsOpen: false
        });

        const isIdValid = computed(() =>
            shardRealmAccountRegex.test(state.toAccount)
        );
        const isAmountValid = computed(() => {
            return (
                new BigNumber(state.amount).isGreaterThan(new BigNumber(0)) &&
                validateHbar(state.amount)
            );
        });

        const amount = computed(() => formatHbar(new BigNumber(state.amount)));

        const truncate = computed((): string =>
            amount.value.length > 15
                ? amount.value.substring(0, 13) + "..."
                : amount.value
        );

        const buttonLabel = computed((): string =>
            new BigNumber(state.amount).isGreaterThan(new BigNumber(0))
                ? "Send " + truncate.value + " Hbars"
                : "Send Hbar"
        );

        const summaryAmount = computed(() => {
            return amount.value;
        });

        const summaryAccount = computed(() => {
            return state.toAccount;
        });

        const summaryItems = computed(() => {
            return [
                {
                    description: "Transfer Amount",
                    value: isAmountValid
                        ? new BigNumber(state.amount)
                        : new BigNumber(0)
                },
                {
                    description: "Estimated Fee",
                    value: estimatedFeeHbar
                }
            ] as Item[];
        });

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

            try {
                const recipient: AccountId = {
                    shard: parseInt(parts[0]),
                    realm: parseInt(parts[1]),
                    account: parseInt(parts[2])
                };

                const sendAmountTinybar = new BigNumber(
                    state.amount
                ).multipliedBy(getValueOfUnit(Unit.Hbar));

                if (
                    store.state.wallet.balance != null &&
                    store.state.wallet.balance.isLessThan(
                        sendAmountTinybar.plus(estimatedFeeTinybar)
                    )
                ) {
                    state.amountErrorMessage =
                        "Amount plus fee is greater than current balance";
                    return;
                }

                const { CryptoTransferTransaction, Client } = await import(
                    "@hashgraph/sdk"
                );

                // Max Transaction Fee, otherwise known as Transaction Fee,
                // is the max of 1 Hbar and the user's remaining balance
                // Oh also, check for null balance to appease typescript
                const safeBalance =
                    store.state.wallet.balance == null
                        ? new BigNumber(0)
                        : store.state.wallet.balance;
                const maxTxFeeTinybar = store.getters[MAX_FEE_TINYBAR](
                    new BigNumber(safeBalance).minus(
                        sendAmountTinybar.plus(estimatedFeeTinybar)
                    )
                );

                const tx = new CryptoTransferTransaction(client as InstanceType<
                    typeof Client
                >)
                    .addSender(
                        store.state.wallet.session.account,
                        sendAmountTinybar
                    )
                    .addRecipient(recipient, sendAmountTinybar)
                    .setTransactionFee(maxTxFeeTinybar);

                if (state.memo !== "") {
                    tx.setMemo(state.memo);
                }

                await tx.build().executeForReceipt();

                // Refresh Balance
                store.dispatch(REFRESH_BALANCE);

                // eslint-disable-next-line require-atomic-updates
                state.successModalIsOpen = true;
            } catch (error) {
                // eslint-disable-next-line require-atomic-updates
                state.idErrorMessage = "";
                // eslint-disable-next-line require-atomic-updates
                state.amountErrorMessage = "";

                if (error.toString().includes("INVALID_ACCOUNT_ID")) {
                    // eslint-disable-next-line require-atomic-updates
                    state.idErrorMessage = "Account ID not found on network";
                } else if (
                    error
                        .toString()
                        .includes("ACCOUNT_REPEATED_IN_ACCOUNT_AMOUNTS")
                ) {
                    // eslint-disable-next-line require-atomic-updates
                    state.idErrorMessage = "Cannot send HBar to yourself";
                } else if (
                    error.toString().includes("INSUFFICIENT_ACCOUNT_BALANCE")
                ) {
                    state.amountErrorMessage = "Insufficient balance";
                }

                throw error;
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
            summaryAmount,
            summaryAccount,
            summaryItems,
            buttonLabel,
            isIdValid,
            isAmountValid,
            hbarSuffix: Unit.Hbar,
            tinybarSuffix: Unit.Tinybar,
            handleShowSummary,
            handleClickEntireBalance,
            handleSendTransfer,
            handleSuccessModalChange,
            truncate,
            handleInput
        };
    }
});
</script>
