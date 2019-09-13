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
            :amount="summaryAmount"
            account=""
            tx-type="createAccount"
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
import ModalCreateAccountSuccess from "../components/ModalCreateAccountSuccess.vue";
import ModalFeeSummary, { Item } from "../components/ModalFeeSummary.vue";
import { getValueOfUnit, Unit } from "../units";
import { BigNumber } from "bignumber.js";
import { mdiHelpCircleOutline } from "@mdi/js";
import Notice from "../components/Notice.vue";
import { formatHbar, validateHbar } from "../formatter";
import { HederaError, ResponseCodeEnum } from "@hashgraph/sdk/src/errors";

const ED25519_PREFIX = "302a300506032b6570032100";

const ESTIMATED_FEE_HBAR = new BigNumber(0.100_000_000);
const ESTIMATED_FEE_TINYBAR = ESTIMATED_FEE_HBAR.multipliedBy(
    getValueOfUnit(Unit.Hbar)
);

// Summary Items
const summaryItems = [
    { description: "Initial Balance", value: new BigNumber(0) },
    { description: "Estimated Fee", value: ESTIMATED_FEE_HBAR }
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

        const summaryAmount = computed(() =>
            formatHbar(new BigNumber(state.userBalance))
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

                const fee = ESTIMATED_FEE_TINYBAR;
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
                state.publicKey = "";
                state.userBalance = "";
            } catch (error) {
                if (error instanceof HederaError) {
                    if (
                        error.code ===
                        ResponseCodeEnum.INSUFFICIENT_PAYER_BALANCE
                    ) {
                        state.userBalanceError = "Insufficient Payer Balance";
                        return;
                    }
                }

                throw error;
            } finally {
                state.isBusy = false;
            }
        }

        function handleSuccessModalChange(isOpen: boolean): void {
            state.successModalIsOpen = isOpen;
            state.isBusy = false;
        }

        function handleShowSummary(): void {
            // summaryItems[0].value = "..." + state.publicKey.substring(65);
            summaryItems[1].value = new BigNumber(state.userBalance);
            state.summaryModalIsOpen = true;
        }

        return {
            state,
            summaryAmount,
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
