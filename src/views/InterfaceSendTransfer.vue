<template>
    <InterfaceForm title="Send Transfer">
        <TextInput
            v-model="amount"
            has-input
            label="Amount"
            type="number"
            action="Entire Balance"
            show-validation
            :valid="amount.length > 0 && amount[0] !== '-'"
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
            label="Maximum Transaction Fee"
            show-validation
            :valid="true"
        />

        <template v-slot:footer>
            <!-- FIXME: Pluralize appropriately -->
            <Button
                :label="amount > 0 ? `Send ${amount} Hbars` : 'Send Hbars'"
                :disabled="false"
                @click="handleSendTransfer"
            />
        </template>
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

export default createComponent({
    components: {
        TextInput,
        InterfaceForm,
        Button
    },
    setup(): {} {
        const amount = value("0");
        const toAccount = value("");
        const idRegex = /^\d+\.\d+\.\d+$/;

        const isIdValid = computed(() => idRegex.test(toAccount.value));
        const isAmountValid = computed(() => amount.value.length > 0);

        function handleClickEntireBalance() {
            console.log("handleClickEnterBalance");
        }

        async function handleSendTransfer() {
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

            const sendAmount = parseInt(amount.value);
            if (sendAmount === 0) {
                store.dispatch(ALERT, {
                    level: "error",
                    message: "Cannot send 0 HBar"
                });
                return;
            }

            try {
                // transferCryptoTo(recipient: AccountId, amount: number | BigInt)
                await client.transferCryptoTo(recipient, sendAmount);
                store.dispatch(ALERT, {
                    level: "info",
                    message: "Sent crypto to " + toAccount.value
                });
            } catch (error) {
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
                        message: "Cannot transfer crypto to yourself"
                    });
                } else {
                    store.dispatch(ALERT, {
                        level: "error",
                        message: "Failed to transfer crypto"
                    });
                }
            }
        }

        return {
            amount,
            toAccount,
            isIdValid,
            handleClickEntireBalance,
            handleSendTransfer
        };
    }
});
</script>
