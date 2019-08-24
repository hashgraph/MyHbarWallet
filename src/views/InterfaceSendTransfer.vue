<template>
    <InterfaceForm title="Send Transfer">
        <TextInput
            v-model="amount"
            has-input
            label="Amount"
            action="Entire Balance"
            :suffix="Unit.Hbar"
            show-validation
            :valid="isAmountValid"
            :error="amountErrorMessage"
            @action="handleClickEntireBalance"
        />

        <TextInput
            v-model="toAccount"
            placeholder="shard.realm.account"
            label="To Account"
            show-validation
            :valid="isIdValid"
            :error="idErrorMessage"
            can-copy
        />

        <TextInput
            v-model="maxFee"
            label="Maximum Transaction Fee"
            show-validation
            :suffix="Unit.Tinybar"
            :valid="true"
            :error="txFeeErrorMessage"
        />

        <template v-slot:footer>
            <Button
                :busy="isBusy"
                :label="buttonLabel"
                :disabled="!isIdValid || !isAmountValid"
                @click="handleSendTransfer"
            />
        </template>

        <ModalSendTransferSuccess
            :open="successModalIsOpen"
            :to-account="toAccount"
            :amount="amount"
            @change="handleSuccessModalChange"
        />
    </InterfaceForm>
</template>

<script lang="ts">
import TextInput from "../components/TextInput.vue";
import InterfaceForm from "../components/InterfaceForm.vue";
import Button from "../components/Button.vue";
import { createComponent, value, computed } from "vue-function-api";
import store from "../store";
import { AccountId } from "@hashgraph/sdk/src/Client";
import { ALERT } from "../store/actions";
import ModalSendTransferSuccess from "../components/ModalSendTransferSuccess.vue";
import { CryptoTransferTransaction } from "@hashgraph/sdk";
import { Unit, getValueOfUnit } from "../components/UnitConverter.vue";
import BigNumber from "bignumber.js";

export default createComponent({
    components: {
        TextInput,
        InterfaceForm,
        Button,
        ModalSendTransferSuccess
    },
    setup() {
        // Using regex to validate user input
        const amountRegex = /^0*\d+(\.\d{1,9})?$/;
        const maxFeeRegex = /^0*[1-9]\d{0,17}$/;

        const amount = value("0");
        const toAccount = value("");
        const idRegex = /^\d+\.\d+\.\d+$/;
        const isBusy = value(false);
        const maxFee = value("100000");

        const idErrorMessage = value("");
        const amountErrorMessage = value("");
        const txFeeErrorMessage = value("");

        const isIdValid = computed(() => idRegex.test(toAccount.value));
        const isAmountValid = computed(() => {
            return (
                new BigNumber(amount.value).isGreaterThan(new BigNumber(0)) &&
                amountRegex.test(amount.value)
            );
        });
        const isMaxFeeValid = computed(() => {
            return maxFeeRegex.test(maxFee.value);
        });
        const successModalIsOpen = value(false);
        const truncate = computed(() =>
            amount.value.length > 15
                ? amount.value.substring(0, 13) + "..."
                : amount.value
        );

        const buttonLabel = computed(() =>
            new BigNumber(amount.value).isGreaterThan(new BigNumber(0))
                ? "Send " + truncate.value + " Hbars"
                : "Send Hbar"
        );

        async function handleClickEntireBalance() {
            const balance = value(store.state.wallet.balance);
            if (balance.value == null) {
                return;
            }
            const hbar = new BigNumber(balance.value.toString()).dividedBy(
                getValueOfUnit(Unit.Hbar)
            );
            amount.value = hbar.toString();
        }

        async function handleSendTransfer() {
            isBusy.value = true;

            try {
                // TODO: Annotate error for each field
                if (!isAmountValid || !isIdValid || !isMaxFeeValid) {
                    return;
                }

                if (store.state.wallet.session == null) {
                    throw new Error(
                        "Session should not be null if inside Send Transfer"
                    );
                }

                const client = store.state.wallet.session.client;
                const parts = toAccount.value.split(".");

                const recipient: AccountId = {
                    shard: parseInt(parts[0]),
                    realm: parseInt(parts[1]),
                    account: parseInt(parts[2])
                };

                const sendAmount = BigInt(
                    new BigNumber(amount.value).multipliedBy(
                        getValueOfUnit(Unit.Hbar)
                    )
                );

                if (
                    store.state.wallet.balance != null &&
                    store.state.wallet.balance <= sendAmount
                ) {
                    amountErrorMessage.value =
                        "Amount is greater than current balance";
                    return;
                }

                await new CryptoTransferTransaction(client)
                    .addSender(store.state.wallet.session.account, sendAmount)
                    .addRecipient(recipient, sendAmount)
                    .setTransactionFee(parseInt(maxFee.value))
                    .build()
                    .executeForReceipt();

                successModalIsOpen.value = true;
            } catch (error) {
                isBusy.value = false;
                idErrorMessage.value = "";
                amountErrorMessage.value = "";

                if (error.toString().includes("INVALID_ACCOUNT_ID")) {
                    idErrorMessage.value = "Account ID not found on network";
                } else if (
                    error
                        .toString()
                        .includes("ACCOUNT_REPEATED_IN_ACCOUNT_AMOUNTS")
                ) {
                    idErrorMessage.value = "Cannot send HBar to yourself";
                } else if (error.toString().includes("INSUFFICIENT_TX_FEE")) {
                    txFeeErrorMessage.value =
                        "Insufficient Transaction Fee Amount";
                } else {
                    store.dispatch(ALERT, {
                        level: "error",
                        message: "Transaction Failed"
                    });
                }
            } finally {
                isBusy.value = false;
            }
        }

        function handleSuccessModalChange(isOpen: boolean) {
            successModalIsOpen.value = isOpen;
            isBusy.value = false;
        }

        return {
            amount,
            buttonLabel,
            maxFee,
            txFeeErrorMessage,
            isBusy,
            toAccount,
            isIdValid,
            idErrorMessage,
            isAmountValid,
            amountErrorMessage,
            successModalIsOpen,
            Unit,
            handleClickEntireBalance,
            handleSendTransfer,
            handleSuccessModalChange,
            truncate
        };
    }
});
</script>
