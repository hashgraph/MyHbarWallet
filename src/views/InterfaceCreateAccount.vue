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
            :error="state.keyError"
        />

        <template v-slot:footer>
            <Button
                :busy="state.isBusy"
                :disabled="!validKey || !validBalance"
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
            v-model="state.summaryModalIsOpen"
            :items="summaryItems"
            :title="summaryTitle"
            @submit="handleCreateAccount"
        />
    </InterfaceForm>
</template>

<script lang="ts">
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";
import InterfaceForm from "../components/InterfaceForm.vue";
import { computed, createComponent, reactive } from "@vue/composition-api";
import store from "../store";
import { AccountCreateTransaction, Ed25519PublicKey } from "@hashgraph/sdk";
import { ALERT } from "../store/actions";
import ModalCreateAccountSuccess from "../components/ModalCreateAccountSuccess.vue";
import ModalFeeSummary, { Item } from "../components/ModalFeeSummary.vue";
import { getValueOfUnit, Unit } from "../units";
import { BigNumber } from "bignumber.js";
import { mdiHelpCircleOutline } from "@mdi/js";
import Notice from "../components/Notice.vue";
import { formatHbar, validateHbar } from "../formatter";

// make this a global const?
const ED25519_PREFIX = "302a300506032b6570032100";

// TODO: SDK BigInt --> BigNumber
const ESTIMATED_FEE = new BigNumber(0.000_100_000);

// Summary Items
const summaryItems = [
    { description: "Initial Balance", value: new BigNumber(0) },
    { description: "Public Key", value: "" },
    { description: "Estimated Fee", value: ESTIMATED_FEE }
] as Item[];

interface State {
    userBalance: string;
    publicKey: string;
    isBusy: boolean;
    successModalIsOpen: boolean;
    summaryModalIsOpen: boolean;
    keyError: string;
    userBalanceError: string;
    account: string;
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
            userBalance: "",
            publicKey: "",
            isBusy: false,
            successModalIsOpen: false,
            summaryModalIsOpen: false,
            keyError: "",
            userBalanceError: "",
            account: ""
        });

        const validBalance = computed(() => {
            return (
                new BigNumber(state.userBalance).isGreaterThan(
                    new BigNumber(0)
                ) && validateHbar(state.userBalance)
            );
        });

        const validKey = computed(
            () =>
                state.publicKey.startsWith(ED25519_PREFIX) &&
                state.publicKey.length == 88
        );

        const summaryTitle = computed(
            () =>
                "Creating account with balance " +
                formatHbar(new BigNumber(state.userBalance)) +
                " ℏ"
        );

        async function handleCreateAccount(): Promise<void> {
            state.isBusy = true;

            if (store.state.wallet.session == null) {
                throw new Error(
                    "Session should not be null if inside Create Account Interface"
                );
            }

            const client = store.state.wallet.session.client;

            try {
                const balance = new BigNumber(state.userBalance).multipliedBy(
                    getValueOfUnit(Unit.Hbar)
                );

                if (
                    store.state.wallet.balance != null &&
                    store.state.wallet.balance <= balance
                ) {
                    state.userBalanceError =
                        "Amount is greater than current balance";
                    return;
                }

                const fee = ESTIMATED_FEE;
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
                state.userBalanceError = "";

                state.successModalIsOpen = true;
            } catch (error) {
                if (error instanceof Error) {
                    if (error.message === "INSUFFICIENT_PAYER_BALANCE") {
                        state.userBalanceError = "Insufficient Payer Balance";
                    } else {
                        throw error;
                    }
                }
            } finally {
                state.isBusy = false;
            }
        }

        function handleSuccessModalChange(isOpen: boolean): void {
            state.successModalIsOpen = isOpen;
            state.isBusy = false;
        }

        function handleShowSummary(): void {
            summaryItems[0].value = new BigNumber(state.userBalance);
            summaryItems[1].value = "..." + state.publicKey.substring(65);
            state.summaryModalIsOpen = true;
        }

        return {
            state,
            summaryTitle,
            summaryItems,
            validBalance,
            validKey,
            handleCreateAccount,
            handleShowSummary,
            handleSuccessModalChange,
            Unit,
            mdiHelpCircleOutline
        };
    }
});
</script>
