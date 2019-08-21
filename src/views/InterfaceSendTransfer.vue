<template>
    <InterfaceForm title="Send Transfer">
        <TextInput
            v-model="amount"
            has-input
            label="Amount"
            type="number"
            action="Entire Balance"
            :suffix="Unit.Hbar"
            show-validation
            :valid="isAmountValid"
            @action="handleClickEntireBalance"
        />

        <TextInput
            v-model="toAccount"
            placeholder="shard.realm.account"
            label="To Account"
            show-validation
            :valid="isIdValid"
            can-copy
        />

        <TextInput
            v-model="maxFee"
            label="Maximum Transaction Fee"
            show-validation
            :suffix="Unit.Tinybar"
            :valid="true"
        />

        <template v-slot:footer>
            <!-- FIXME: Pluralize appropriately -->
            <Button
                :busy="isBusy"
                :label="amount > 0 ? `Send ${truncate} Hbars` : 'Send Hbar'"
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
import store from "@/store";
import { AccountId } from "hedera-sdk-js/src/Client";
import { ALERT } from "@/store/actions";
import ModalSendTransferSuccess from "../components/ModalSendTransferSuccess.vue";
import { CryptoTransferTransaction } from "hedera-sdk-js";
import { Unit } from "@/components/UnitConverter.vue";

export default createComponent({
    components: {
        TextInput,
        InterfaceForm,
        Button,
        ModalSendTransferSuccess
    },
    setup(): {} {
        const amount = value("0");
        const toAccount = value("");
        const idRegex = /^\d+\.\d+\.\d+$/;
        const isBusy = value(false);
        const maxFee = value("100000");

        const isIdValid = computed(() => idRegex.test(toAccount.value));
        const isAmountValid = computed(() => Number(amount.value) > 0);
        const successModalIsOpen = value(false);
        const truncate = computed(() =>
            amount.value.length > 15
                ? amount.value.substring(0, 13) + "..."
                : amount.value
        );

        async function handleClickEntireBalance() {
            const hbar = Number(store.state.wallet.balance || 0) / 100000000;
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
                console.log(error);
                if (error.toString().includes("INVALID_ACCOUNT_ID")) {
                    store.dispatch(ALERT, {
                        level: "error",
                        message: "Invalid reipient Account ID"
                    });
                } else if (
                    error
                        .toString()
                        .includes("ACCOUNT_REPEATED_IN_ACCOUNT_AMOUNTS")
                ) {
                    store.dispatch(ALERT, {
                        level: "error",
                        message: "Cannot send hbars to yourself"
                    });
                } else if (error.toString().includes("INSUFFICIENT_TX_FEE")) {
                    store.dispatch(ALERT, {
                        level: "error",
                        message: "Insufficient transaction fee"
                    });
                } else {
                    store.dispatch(ALERT, {
                        level: "error",
                        message: "Failed to send hbars"
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
            maxFee,
            isBusy,
            toAccount,
            isIdValid,
            isAmountValid,
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
