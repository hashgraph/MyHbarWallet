<template>
    <InterfaceForm title="Create Account">
        <TextInput
            v-model="userBalance"
            has-input
            label="Initial Balance"
            show-validation
            :min="1"
            :valid="validBalance"
            :suffix="Unit.Hbar"
            :error="userBalanceError"
            type="string"
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
            :suffix="Unit.Tinybar"
            :error="maxFeeError"
            type="number"
        />

        <template v-slot:footer>
            <Button
                :busy="isBusy"
                :disabled="!validKey || !validBalance || !validMaxFee"
                label="Create Account"
                @click="handleCreateAccount"
            />
        </template>

        <ModalCreateAccountSuccess
            v-model="successModalIsOpen"
            :account-id="account"
            @change="handleSuccessModalChange"
        />
    </InterfaceForm>
</template>

<script lang="ts">
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";
import InterfaceForm from "../components/InterfaceForm.vue";
import {
    computed,
    createComponent,
    value,
    Wrapper,
    watch
} from "vue-function-api";
import store from "../store";
import { AccountCreateTransaction, Ed25519PublicKey } from "@hashgraph/sdk";
import { ALERT } from "../store/actions";
import ModalCreateAccountSuccess from "../components/ModalCreateAccountSuccess.vue";
import { getValueOfUnit, Unit } from "../components/UnitConverter.vue";
import { BigNumber } from "bignumber.js";

// make this a global const?
const ED25519_PREFIX = "302a300506032b6570032100";
export default createComponent({
    components: {
        TextInput,
        InterfaceForm,
        Button,
        ModalCreateAccountSuccess
    },
    setup() {
        // fixme: get actual user balance
        const userBalance = value("10");
        const userBalanceBigN: Wrapper<BigNumber | null> = value(
            new BigNumber(userBalance.value)
        );
        watch(
            () => userBalance.value,
            () => {
                userBalanceBigN.value = new BigNumber(userBalance.value);
            }
        );
        const maxFee = value("100000000");
        const publicKey = value("");
        const isBusy = value(false);
        const successModalIsOpen = value(false);
        const userBalanceError: Wrapper<string | null> = value(null);
        const maxFeeError: Wrapper<string | null> = value(null);
        const account: Wrapper<string | null> = value(null);

        // Using regex to validate user input
        const userBalanceRegex = /^0*(\d{1,9})(\.\d{1,9})?$/;
        const maxFeeRegex = /^0*[1-9]\d{0,17}$/;

        // 5 is used a default starting balance
        const validBalance = computed(() => {
            return userBalanceRegex.test(userBalance.value);
        });
        const validKey = computed(
            () =>
                publicKey.value.startsWith(ED25519_PREFIX) &&
                publicKey.value.length == 88
        );
        const validMaxFee = computed(() => maxFeeRegex.test(maxFee.value));

        async function handleCreateAccount() {
            isBusy.value = true;

            try {
                if (store.state.wallet.session == null) {
                    throw new Error(
                        "Session should not be null if inside Create Account Interface"
                    );
                }

                const client = store.state.wallet.session.client;
                if (userBalanceBigN.value == null)
                    throw new Error(
                        "User Balance should not be null if creating account"
                    );
                const balance = new BigNumber(
                    userBalanceBigN.value
                ).multipliedBy(getValueOfUnit(Unit.Hbar));
                const fee = BigInt(maxFee.value);
                const key = Ed25519PublicKey.fromString(publicKey.value);
                if (balance == null)
                    throw new Error(
                        "User Balance should not be null if creating account"
                    );
                const accountIdIntermediate = (await new AccountCreateTransaction(
                    client
                )
                    .setInitialBalance(BigInt(balance))
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
                userBalanceError.value = null;
                maxFeeError.value = null;

                successModalIsOpen.value = true;
            } catch (error) {
                console.log(error);

                if (error instanceof Error) {
                    if (error.message === "INSUFFICIENT_TX_FEE") {
                        maxFeeError.value =
                            "Insufficient maximum transaction fee";
                    } else if (error.message === "INSUFFICIENT_PAYER_BALANCE") {
                        userBalanceError.value = "Insufficient Payer Balance";
                        maxFeeError.value = "Insufficient Payer Balance";
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
            userBalanceError,
            maxFee,
            maxFeeError,
            account,
            validBalance,
            validKey,
            validMaxFee,
            handleCreateAccount,
            handleSuccessModalChange,
            Unit
        };
    }
});
</script>
