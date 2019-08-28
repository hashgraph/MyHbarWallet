<template>
    <InterfaceForm title="Create Account">
        <Notice :symbol="mdiHelpCircleOutline">
            To create an account, you need the public key of the person
            requesting an account and you need to fund the new account with some
            amount of hbars.
        </Notice>

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

        <template v-slot:footer>
            <Button
                :busy="state.isBusy"
                :disabled="!validKey || !validBalance || !validMaxFee"
                label="Create Account"
                @click="handleShowSummary"
            />
        </template>

        <ModalCreateAccountSuccess
            :is-open="state.successModalIsOpen"
            :account-id="state.account"
            @change="handleSuccessModalChange"
        />

        <ModalFeeSummary
            v-model="state.summaryIsOpen"
            :items="state.items"
            :title="summaryTitle"
            @submit="handleCreateAccount"
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
import ModalFeeSummary, { Item } from "../components/ModalFeeSummary.vue";
import { getValueOfUnit, Unit } from "../components/UnitConverter.vue";
import { BigNumber } from "bignumber.js";
import { mdiHelpCircleOutline } from "@mdi/js";
import Notice from "../components/Notice.vue";

// make this a global const?
const ED25519_PREFIX = "302a300506032b6570032100";

const ESTIMATED_FEE = new BigNumber(100_000);

const SUMMARY_TEMPLATE = [
    { description: "Initial Balance", value: new BigNumber(0) },
    { description: "Public Key", value: "" },
    { description: "Estimated Fee", value: ESTIMATED_FEE }
] as Item[];

interface State {
    userBalance: string;
    maxFee: string;
    publicKey: string;
    isBusy: boolean;
    successModalIsOpen: boolean;
    summaryIsOpen: boolean;
    items: Item[];
    userBalanceError: string | null;
    maxFeeError: string | null;
    account: string | null;
}

export default createComponent({
    components: {
        TextInput,
        InterfaceForm,
        Button,
        ModalCreateAccountSuccess,
        Notice,
        ModalFeeSummary
    },
    setup() {
        const state = reactive<State>({
            userBalance: "0",
            maxFee: "100000000",
            publicKey: "",
            isBusy: false,
            successModalIsOpen: false,
            summaryIsOpen: true,
            items: SUMMARY_TEMPLATE,
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

        const summaryTitle = computed(
            () => "Creating account with balance " + state.userBalance + " ℏ"
        );

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

        function handleShowSummary() {
            state.items[0].value = new BigNumber(state.userBalance);
            state.items[1].value = "..." + state.publicKey.substring(65);
            state.summaryIsOpen = true;
        }

        return {
            state,
            summaryTitle,
            validBalance,
            validKey,
            validMaxFee,
            handleCreateAccount,
            handleShowSummary,
            handleSuccessModalChange,
            Unit,
            mdiHelpCircleOutline
        };
    }
});
</script>
