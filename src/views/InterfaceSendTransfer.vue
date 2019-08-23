<template>
    <InterfaceForm title="Send Transfer">
        <TextInput
            v-model="amount"
            has-input
            label="Amount"
            type="string"
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
import {
    createComponent,
    value,
    computed,
    watch,
    Wrapper
} from "vue-function-api";
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
        const amount = value("0");
        const amountBigN: Wrapper<BigNumber | null> = value(
            new BigNumber(amount.value)
        );
        watch(
            () => amount.value,
            () => {
                amountBigN.value = new BigNumber(amount.value);
            }
        );

        const toAccount = value("");
        const idRegex = /^\d+\.\d+\.\d+$/;
        const amountRegex = /^0*(\d{1,9})(\.\d{1,9})?$/;
        const isBusy = value(false);
        const maxFee = value("100000");

        const idErrorMessage = value("");
        const amountErrorMessage = value("");
        const txFeeErrorMessage = value("");

        const isIdValid = computed(() => idRegex.test(toAccount.value));
        const isAmountValid = computed(() => {
            if (amountBigN.value == null) return false;
            return (
                amountBigN.value.isGreaterThan(new BigNumber(0)) &&
                amountRegex.test(amount.value)
            );
        });
        const successModalIsOpen = value(false);
        const truncate = computed(() =>
            amount.value.length > 15
                ? amount.value.substring(0, 13) + "..."
                : amount.value
        );

        const buttonLabel = computed(() =>
            amountBigN.value != null
                ? amountBigN.value.isGreaterThan(new BigNumber(0))
                    ? "Send " + truncate.value + " Hbars"
                    : "Send Hbar"
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
                if (store.state.wallet.session == null) {
                    throw new Error(
                        "Session should not be null if inside Send Transfer"
                    );
                }

                const client = store.state.wallet.session.client;
                const parts = toAccount.value.split(".");

                if (!isAmountValid.value) {
                    store.dispatch(ALERT, {
                        level: "error",
                        message: "Invalid amount"
                    });

                    return;
                }

                if (!isIdValid.value) {
                    store.dispatch(ALERT, {
                        level: "error",
                        message: "Invalid recipient Account ID"
                    });

                    return;
                }

                const recipient: AccountId = {
                    shard: parseInt(parts[0]),
                    realm: parseInt(parts[1]),
                    account: parseInt(parts[2])
                };

                const sendAmount = BigInt(amount.value);
                const sendAmountTinybar = sendAmount * BigInt(100000000);

                await new CryptoTransferTransaction(client)
                    .addSender(
                        store.state.wallet.session.account,
                        sendAmountTinybar
                    )
                    .addRecipient(recipient, sendAmountTinybar)
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
