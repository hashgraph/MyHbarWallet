<template>
    <InterfaceForm title="Send">
        <TextInput
            v-model="state.amount"
            has-input
            label="Amount"
            action="Entire Balance"
            :suffix="Unit.Hbar"
            show-validation
            :valid="isAmountValid"
            :error="state.amountErrorMessage"
            @action="handleClickEntireBalance"
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

        <TextInput
            v-if="false"
            v-model="state.maxFee"
            label="Maximum Transaction Fee"
            show-validation
            :suffix="Unit.Tinybar"
            :valid="true"
            :error="state.txFeeErrorMessage"
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
            :title="summaryTitle"
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
import { AccountId } from "@hashgraph/sdk/src/Client";
import { ALERT } from "../store/actions";
import ModalSendTransferSuccess from "../components/ModalSendTransferSuccess.vue";
import { CryptoTransferTransaction } from "@hashgraph/sdk";
import { Unit, getValueOfUnit } from "../components/UnitConverter.vue";
import BigNumber from "bignumber.js";
import ModalFeeSummary, { Item } from "../components/ModalFeeSummary.vue";
import format from "../formatter";

const ESTIMATED_FEE = new BigNumber(0.000_085_500);

const summaryItems = [
    { description: "Transfer Amount", value: new BigNumber(0) },
    { description: "Estimated Fee", value: ESTIMATED_FEE }
] as Item[];

const shardRealmAccountRegex = /^\d+\.\d+\.\d+$/;
const amountRegex = /^0*\d+(\.\d{1,9})?$/;
const maxFeeRegex = /^0*[1-9]\d{0,17}$/;

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
            amount: "0",
            toAccount: "",
            isBusy: false,
            maxFee: ESTIMATED_FEE.toString(),
            idErrorMessage: "",
            amountErrorMessage: "",
            txFeeErrorMessage: "",
            successModalIsOpen: false,
            summaryIsOpen: false
        });

        const isIdValid = computed(() =>
            shardRealmAccountRegex.test(state.toAccount)
        );
        const isAmountValid = computed(() => {
            return (
                new BigNumber(state.amount).isGreaterThan(new BigNumber(0)) &&
                amountRegex.test(state.amount)
            );
        });

        const isMaxFeeValid = computed(() => {
            return maxFeeRegex.test(state.maxFee);
        });

        const truncate = computed((): string =>
            state.amount.length > 15
                ? state.amount.substring(0, 13) + "..."
                : state.amount
        );

        const buttonLabel = computed((): string =>
            new BigNumber(state.amount).isGreaterThan(new BigNumber(0))
                ? "Send " + truncate.value + " Hbars"
                : "Send Hbar"
        );

        const summaryTitle = computed(
            () =>
                "Sending " +
                format(state.amount) +
                " ℏ to account " +
                state.toAccount
        );

        async function handleClickEntireBalance() {
            const balance = store.state.wallet.balance;
            if (balance == null) {
                return;
            }
            const hbar = new BigNumber(balance.toString()).dividedBy(
                getValueOfUnit(Unit.Hbar)
            );
            state.amount = hbar.toString();
        }

        function handleShowSummary() {
            summaryItems[0].value = new BigNumber(state.amount);
            state.summaryIsOpen = true;
        }

        async function handleSendTransfer() {
            state.isBusy = true;

            try {
                if (!isAmountValid || !isIdValid || !isMaxFeeValid) {
                    return;
                }

                if (store.state.wallet.session == null) {
                    throw new Error(
                        "Session should not be null if inside Send Transfer"
                    );
                }

                const client = store.state.wallet.session.client;
                const parts = state.toAccount.split(".");

                const recipient: AccountId = {
                    shard: parseInt(parts[0]),
                    realm: parseInt(parts[1]),
                    account: parseInt(parts[2])
                };

                const sendAmount = BigInt(
                    new BigNumber(state.amount).multipliedBy(
                        getValueOfUnit(Unit.Hbar)
                    )
                );

                if (
                    store.state.wallet.balance != null &&
                    store.state.wallet.balance <= sendAmount
                ) {
                    state.amountErrorMessage =
                        "Amount is greater than current balance";
                    return;
                }

                // TODO: SDK BigInt v BigNumber
                await new CryptoTransferTransaction(client)
                    .addSender(store.state.wallet.session.account, sendAmount)
                    .addRecipient(recipient, sendAmount)
                    // To send 1 tinybar the fee is ~85_150
                    // To send 360 gigabar the fee ~85_500
                    // So setting the limit to 85_500 _should_ be more
                    // then enough for most transactions
                    .setTransactionFee(85_500)
                    .build()
                    .executeForReceipt();

                // eslint-disable-next-line require-atomic-updates
                state.successModalIsOpen = true;
            } catch (error) {
                console.log(error);

                // eslint-disable-next-line require-atomic-updates
                state.isBusy = false;
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
                } else if (error.toString().includes("INSUFFICIENT_TX_FEE")) {
                    // eslint-disable-next-line require-atomic-updates
                    state.txFeeErrorMessage =
                        "Insufficient Transaction Fee Amount";
                } else {
                    store.dispatch(ALERT, {
                        level: "error",
                        message: "Transaction Failed"
                    });
                }
            } finally {
                // eslint-disable-next-line require-atomic-updates
                state.isBusy = false;
            }
        }

        function handleSuccessModalChange(isOpen: boolean) {
            state.successModalIsOpen = isOpen;
            state.isBusy = false;
        }

        return {
            state,
            summaryTitle,
            summaryItems,
            buttonLabel,
            isIdValid,
            isAmountValid,
            Unit,
            handleShowSummary,
            handleClickEntireBalance,
            handleSendTransfer,
            handleSuccessModalChange,
            truncate
        };
    }
});
</script>
