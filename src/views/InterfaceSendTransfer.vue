<template>
    <InterfaceForm title="Send">
        <TextInput
            v-model="state.amount"
            has-input
            label="Amount"
            action="Entire Balance"
            :suffix="hbarSuffix"
            show-validation
            :valid="isAmountValid"
            :error="state.amountErrorMessage"
            @action="handleClickEntireBalance"
            @input="handleInput"
        />

        <TextInput
            v-model="state.toAccount"
            placeholder="shard.realm.account"
            label="To Account"
            show-validation
            :valid="isIdValid"
            :error="state.idErrorMessage"
            can-copy
        />

        <template v-slot:footer>
            <Button
                :busy="state.isBusy"
                :label="buttonLabel"
                :disabled="!isIdValid || !isAmountValid"
                @click="handleShowSummary"
            />
        </template>

        <ModalSendTransferSuccess
            :is-open="state.successModalIsOpen"
            :to-account="state.toAccount"
            :amount="state.amount"
            @change="handleSuccessModalChange"
        />

        <ModalFeeSummary
            v-model="state.summaryIsOpen"
            :items="summaryItems"
            :amount="summaryAmount"
            :account="summaryAccount"
            tx-type="transfer"
            @submit="handleSendTransfer"
        />
    </InterfaceForm>
</template>

<script lang="ts">
import TextInput from "../components/TextInput.vue";
import InterfaceForm from "../components/InterfaceForm.vue";
import Button from "../components/Button.vue";
import { createComponent, reactive, computed } from "@vue/composition-api";
import store from "../store";
import { AccountId } from "@hashgraph/sdk";
import { REFRESH_BALANCE } from "../store/actions";
import ModalSendTransferSuccess from "../components/ModalSendTransferSuccess.vue";
import { Unit, getValueOfUnit } from "../units";
import BigNumber from "bignumber.js";
import ModalFeeSummary, { Item } from "../components/ModalFeeSummary.vue";
import { formatHbar, validateHbar } from "../formatter";

// Transactions between 1 HBar and 360 GBar **DID** cost between 85_100 and 85_500 Tinybar
// With some additional trial-error, 900_000 Tinybar seems to cover everything
const ESTIMATED_FEE_HBAR = new BigNumber(0.000_900_000);
const ESTIMATED_FEE_TINYBAR = ESTIMATED_FEE_HBAR.multipliedBy(
    getValueOfUnit(Unit.Hbar)
);

const summaryItems = [
    { description: "Transfer Amount", value: new BigNumber(0) },
    { description: "Estimated Fee", value: ESTIMATED_FEE_HBAR }
] as Item[];

const shardRealmAccountRegex = /^\d+\.\d+\.\d+$/;

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
            isBusy: false,
            maxFee: ESTIMATED_FEE_HBAR.toString(),
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

        async function handleClickEntireBalance(): Promise<void> {
            const balance = store.state.wallet.balance;

            if (balance == null) {
                return;
            }

            const hbar = new BigNumber(balance.toString())
                .dividedBy(getValueOfUnit(Unit.Hbar))
                .minus(ESTIMATED_FEE_HBAR);

            state.amount = hbar.toString();
        }

        function handleShowSummary(): void {
            summaryItems[0].value = new BigNumber(state.amount);
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
                        sendAmountTinybar.plus(ESTIMATED_FEE_TINYBAR)
                    )
                ) {
                    state.amountErrorMessage =
                        "Amount plus fee is greater than current balance";
                    return;
                }

                const { CryptoTransferTransaction, Client } = await import(
                    "@hashgraph/sdk"
                );
                await new CryptoTransferTransaction(client as InstanceType<
                    typeof Client
                >)
                    .addSender(
                        store.state.wallet.session.account,
                        sendAmountTinybar
                    )
                    .addRecipient(recipient, sendAmountTinybar)
                    .setTransactionFee(ESTIMATED_FEE_TINYBAR)
                    .build()
                    .executeForReceipt();

                // Refresh Balance
                store.dispatch(REFRESH_BALANCE);

                // eslint-disable-next-line require-atomic-updates
                state.successModalIsOpen = true;
                state.amount = "";
                state.toAccount = "";
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
                } else {
                    throw error;
                }
            } finally {
                // eslint-disable-next-line require-atomic-updates
                state.isBusy = false;
            }
        }

        function handleSuccessModalChange(isOpen: boolean): void {
            state.successModalIsOpen = isOpen;
            state.isBusy = false;
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
