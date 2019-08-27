<template>
    <InterfaceForm title="Create Account">
        <TextInput
            v-model="state.userBalance"
            has-input
            label="Initial Balance"
            show-validation
            :min="1"
            :valid="validBalance"
            :suffix="Unit.Hbar"
            :error="state.userBalanceError"
        />

        <TextInput
            v-model="state.publicKey"
            label="Public Key"
            show-validation
            :valid="validKey"
        />

        <TextInput
            v-model="state.maxFee"
            label="Maximum Transaction Fee"
            :valid="validMaxFee"
            :min="0"
            show-validation
            :suffix="Unit.Tinybar"
            :error="state.maxFeeError"
        />

        <template v-slot:footer>
            <Button
                :busy="state.isBusy"
                :disabled="!validKey || !validBalance || !validMaxFee"
                label="Create Account"
                @click="handleCreateAccount"
            />
        </template>

        <ModalCreateAccountSuccess
            v-model="state.successModalIsOpen"
            :account-id="state.account"
            @change="handleSuccessModalChange"
        />
    </InterfaceForm>
</template>

<script lang="ts">
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";
import InterfaceForm from "../components/InterfaceForm.vue";
import { computed, createComponent, reactive, Ref } from "@vue/composition-api";
import store from "../store";
import { AccountCreateTransaction, Ed25519PublicKey } from "@hashgraph/sdk";
import { ALERT } from "../store/actions";
import ModalCreateAccountSuccess from "../components/ModalCreateAccountSuccess.vue";
import { getValueOfUnit, Unit } from "../components/UnitConverter.vue";
import { BigNumber } from "bignumber.js";

// make this a global const?
const ED25519_PREFIX = "302a300506032b6570032100";

interface State {
    userBalance: string;
    maxFee: string;
    publicKey: string;
    isBusy: boolean;
    successModalIsOpen: boolean;
    userBalanceError: string | null;
    maxFeeError: string | null;
    account: string | null;
}

export default createComponent({
    components: {
        TextInput,
        InterfaceForm,
        Button,
        ModalCreateAccountSuccess
    },
    setup() {
        const state = reactive<State>({
            userBalance: "0",
            maxFee: "100000000",
            publicKey: "",
            isBusy: false,
            successModalIsOpen: false,
            userBalanceError: null,
            maxFeeError: null,
            account: null
        });

        // Using regex to validate user input
        const userBalanceRegex = /^0*\d+(\.\d{1,9})?$/;
        const maxFeeRegex = /^0*[1-9]\d{0,17}$/;

        // 5 is used a default starting balance
        const validBalance = computed(() => {
            return (
                new BigNumber(state.userBalance).isGreaterThan(
                    new BigNumber(0)
                ) && userBalanceRegex.test(state.userBalance)
            );
        });
        const validKey = computed(
            () =>
                state.publicKey.startsWith(ED25519_PREFIX) &&
                state.publicKey.length == 88
        );
        const validMaxFee = computed(() => maxFeeRegex.test(state.maxFee));

        async function handleCreateAccount() {
            state.isBusy = true;

            try {
                if (!validBalance || !validKey || !validMaxFee) {
                    return;
                }

                if (store.state.wallet.session == null) {
                    throw new Error(
                        "Session should not be null if inside Create Account Interface"
                    );
                }

                const client = store.state.wallet.session.client;

                const balance = BigInt(
                    new BigNumber(state.userBalance).multipliedBy(
                        getValueOfUnit(Unit.Hbar)
                    )
                );

                if (
                    store.state.wallet.balance != null &&
                    store.state.wallet.balance <= balance
                ) {
                    state.userBalanceError =
                        "Amount is greater than current balance";
                    return;
                }

                const fee = BigInt(state.maxFee);
                const key = Ed25519PublicKey.fromString(state.publicKey);
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

                // state.accountIdIntermediate must be AccountID
                // get shard, realm, state.account separately and construct a new object
                state.account =
                    accountIdIntermediate.getShardnum() +
                    "." +
                    accountIdIntermediate.getRealmnum() +
                    "." +
                    accountIdIntermediate.getAccountnum();

                // If creating state.account succeeds then remove all the error
                state.userBalanceError = null;
                state.maxFeeError = null;

                state.successModalIsOpen = true;
            } catch (error) {
                console.log(error);

                if (error instanceof Error) {
                    if (error.message === "INSUFFICIENT_TX_FEE") {
                        state.maxFeeError =
                            "Insufficient maximum transaction fee";
                    } else if (error.message === "INSUFFICIENT_PAYER_BALANCE") {
                        state.userBalanceError = "Insufficient Payer Balance";
                        state.maxFeeError = "Insufficient Payer Balance";
                    } else {
                        store.dispatch(ALERT, {
                            level: "error",
                            message: "Failed to create state.account"
                        });
                    }
                }
            } finally {
                state.isBusy = false;
            }
        }

        function handleSuccessModalChange(isOpen: boolean) {
            state.successModalIsOpen = isOpen;
            state.isBusy = false;
        }

        return {
            state,
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
