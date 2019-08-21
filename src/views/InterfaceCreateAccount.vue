<template>
    <InterfaceForm title="Create Account">
        <TextInput
            v-model="userBalance"
            has-input
            label="Initial Balance"
            show-validation
            :min="1"
            :valid="validBalance"
            suffix="Hbar"
            type="number"
        />

        <TextInput
            v-model="publicKey"
            label="Public Key"
            show-validation
            :valid="validKey"
        />

        <TextInput
            v-model="maxFee"
            label="Maximum Transaction Fee"
            :valid="validMaxFee"
            :min="0"
            show-validation
            suffix="Tinybar"
            type="number"
            :error="maxFeeError"
        />

        <template v-slot:footer>
            <Button
                :busy="isBusy"
                :disabled="!validKey || !validBalance || !validMaxFee"
                label="Create Account"
                @click="handleCreateAccount"
            />
        </template>

        <ModalSendTransferSuccess
            v-model="successModalIsOpen"
            @change="handleSuccessModalChange"
        />
    </InterfaceForm>
</template>

<script lang="ts">
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";
import InterfaceForm from "../components/InterfaceForm.vue";
import { computed, createComponent, value, Wrapper } from "vue-function-api";
import store from "@/store";
import { AccountCreateTransaction, decodePublicKey } from "hedera-sdk-js";
import { ALERT } from "@/store/actions";
import ModalSendTransferSuccess from "../components/ModalSendTransferSuccess.vue";
import { getValueOfUnit, Unit } from "@/components/UnitConverter.vue";
import { BigNumber } from "bignumber.js";

// make this a global const?
const ED25519_PREFIX = "302a300506032b6570032100";
export default createComponent({
    components: {
        TextInput,
        InterfaceForm,
        Button,
        ModalSendTransferSuccess
    },
    setup() {
        // fixme: get actual user balance
        const userBalance = value("10");
        const maxFee = value("100000000");
        const publicKey = value("");
        const isBusy = value(false);
        const successModalIsOpen = value(false);
        const maxFeeError: Wrapper<string | null> = value(null);
        const account: Wrapper<string | null> = value(null);

        // 5 is used a default starting balance
        const validBalance = computed(() => {
            try {
                return parseFloat(userBalance.value) > 0;
            } catch {
                return false;
            }
        });
        const validKey = computed(
            () =>
                publicKey.value.startsWith(ED25519_PREFIX) &&
                publicKey.value.length == 88
        );
        const validMaxFee = computed(() => parseInt(maxFee.value) > 0);

        async function handleCreateAccount() {
            isBusy.value = true;

            try {
                if (store.state.wallet.session == null) {
                    throw new Error(
                        "Session should not be null if inside Create Account Interface"
                    );
                }

                const client = store.state.wallet.session.client;
                const balance = BigInt(
                    new BigNumber(parseFloat(userBalance.value)).multipliedBy(
                        getValueOfUnit(Unit.Hbar)
                    )
                );
                const fee = parseInt(maxFee.value);
                const key = decodePublicKey(publicKey.value);

                const accountIdIntermediate = (await new AccountCreateTransaction(
                    client
                )
                    .setInitialBalance(balance)
                    .setTransactionFee(fee)
                    .setKey(key)
                    .build()
                    .executeForReceipt()).getAccountid();

                // Handle undefied
                if (accountIdIntermediate == null) {
                    throw new Error("Account Id returned is null");
                }

                // accountIdIntermediate must be AccountID
                // get shard, realm, account separately and construct a new object
                account.value =
                    accountIdIntermediate.getShardnum() +
                    "." +
                    accountIdIntermediate.getRealmnum() +
                    "." +
                    accountIdIntermediate.getAccountnum();

                // If creating account succeeds then remove all the error
                maxFeeError.value = null;
            } catch (error) {
                console.log(error);

                if (error instanceof Error) {
                    if (error.message === "INSUFFICIENT_TX_FEE") {
                        maxFeeError.value =
                            "Insufficient maximum transaction fee";
                    } else {
                        store.dispatch(ALERT, {
                            level: "error",
                            message: "Failed to create account"
                        });
                    }
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
            isBusy,
            successModalIsOpen,
            userBalance,
            publicKey,
            maxFee,
            maxFeeError,
            account,
            validBalance,
            validKey,
            validMaxFee,
            handleCreateAccount,
            handleSuccessModalChange
        };
    }
});
</script>
