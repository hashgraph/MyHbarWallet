<template>
    <InterfaceForm :title="$t('common.createAccount')">
        <Notice :symbol="mdiHelpCircleOutline">
            {{ $t("interfaceCreateAccount.toCreateAccount") }}
        </Notice>

        <TextInput
            v-model="state.newBalance"
            :error="state.newBalanceError"
            :min="1"
            :suffix="Unit.Hbar"
            :valid="validBalance"
            has-input
            :label="$t('interfaceCreateAccount.initialBalance')"
            show-validation
        />

        <TextInput
            v-model="state.publicKey"
            :error="state.keyError"
            :valid="validKey"
            :label="$t('interfaceCreateAccount.publicKey')"
            show-validation
        />

        <template v-slot:footer>
            <Button
                :busy="state.isBusy"
                :disabled="!validKey || !validBalance"
                :label="$t('common.createAccount')"
                @click="handleShowSummary"
            />
        </template>

        <ModalCreateAccountSuccess
            :account-id="state.account"
            :is-open="state.successModalIsOpen"
            @change="handleSuccessModalChange"
        />

        <ModalFeeSummary
            v-model="state.summaryModalIsOpen"
            :amount="summaryAmount"
            :items="summaryItems"
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
import {
    computed,
    createComponent,
    reactive,
    SetupContext
} from "@vue/composition-api";
import store from "../store";
import ModalCreateAccountSuccess from "../components/ModalCreateAccountSuccess.vue";
import ModalFeeSummary, { Item } from "../components/ModalFeeSummary.vue";
import { getValueOfUnit, Unit } from "../units";
import { BigNumber } from "bignumber.js";
import { mdiHelpCircleOutline } from "@mdi/js";
import Notice from "../components/Notice.vue";
import { formatHbar, validateHbar } from "../formatter";

import {
    ESTIMATED_FEE_HBAR,
    ESTIMATED_FEE_TINYBAR,
    MAX_FEE_TINYBAR
} from "../store/getters";

const ED25519_PREFIX = "302a300506032b6570032100";
const estimatedFeeHbar = store.getters[ESTIMATED_FEE_HBAR];
const estimatedFeeTinybar = store.getters[ESTIMATED_FEE_TINYBAR];

interface State {
    newBalance: string;
    publicKey: string;
    isBusy: boolean;
    successModalIsOpen: boolean;
    summaryModalIsOpen: boolean;
    keyError: string;
    newBalanceError: string;
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
    setup(_: object | null, context: SetupContext) {
        const state = reactive<State>({
            newBalance: "",
            publicKey: "",
            isBusy: false,
            successModalIsOpen: false,
            summaryModalIsOpen: false,
            keyError: "",
            newBalanceError: "",
            account: ""
        });

        const validBalance = computed(() => {
            return (
                new BigNumber(state.newBalance).isGreaterThan(
                    new BigNumber(0)
                ) && validateHbar(state.newBalance)
            );
        });

        const validKey = computed(
            () =>
                state.publicKey.startsWith(ED25519_PREFIX) &&
                state.publicKey.length == 88
        );

        // Just for display in modal title
        const summaryAmount = computed(() => {
            return formatHbar(new BigNumber(state.newBalance));
        });

        const summaryItems = computed(() => {
            return [
                {
                    description: "Initial Balance",
                    value: validBalance.value
                        ? new BigNumber(state.newBalance)
                        : new BigNumber(0)
                },
                { description: "Estimated Fee", value: estimatedFeeHbar }
            ] as Item[];
        });

        async function handleCreateAccount(): Promise<void> {
            state.isBusy = true;

            if (store.state.wallet.session == null) {
                throw new Error(
                    "Session should not be null if inside Create Account Interface"
                );
            }

            const client = store.state.wallet.session.client;

            const { HederaError, ResponseCodeEnum } = await (import(
                "@hashgraph/sdk/src/errors"
            ) as Promise<typeof import("@hashgraph/sdk/src/errors")>);

            try {
                // The new wallet's initial balance
                const newBalanceTinybar = new BigNumber(
                    state.newBalance
                ).multipliedBy(getValueOfUnit(Unit.Hbar));

                // The current user's balance
                const balanceTinybar =
                    store.state.wallet.balance == null
                        ? new BigNumber(0)
                        : store.state.wallet.balance;

                if (
                    balanceTinybar < newBalanceTinybar.plus(estimatedFeeTinybar)
                ) {
                    state.newBalanceError = context.root
                        .$t(
                            "interfaceCreateAccount.userBalanceError.amountIsGreaterThanCurrentBalance"
                        )
                        .toString();
                    return;
                }

                const {
                    AccountCreateTransaction,
                    Client,
                    Ed25519PublicKey
                } = await (import("@hashgraph/sdk") as Promise<
                    typeof import("@hashgraph/sdk")
                >);

                const key = Ed25519PublicKey.fromString(state.publicKey);
                const maxTxFeeTinybar = store.getters[MAX_FEE_TINYBAR](
                    balanceTinybar.minus(
                        newBalanceTinybar.plus(estimatedFeeTinybar)
                    )
                );

                const accountIdIntermediate = (await new AccountCreateTransaction(
                    client as InstanceType<typeof Client>
                )
                    .setInitialBalance(newBalanceTinybar)
                    .setTransactionFee(maxTxFeeTinybar)
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
                state.newBalanceError = "";

                state.successModalIsOpen = true;
            } catch (error) {
                if (error instanceof HederaError) {
                    if (
                        error.code ===
                        ResponseCodeEnum.INSUFFICIENT_PAYER_BALANCE
                    ) {
                        state.newBalanceError = context.root
                            .$t("common.error.insufficientPayerBalance")
                            .toString();
                    } else if (
                        error
                            .toString()
                            .includes("INSUFFICIENT_ACCOUNT_BALANCE")
                    ) {
                        state.newBalanceError = "Insufficient Balance";
                    }
                }

                throw error;
            } finally {
                state.isBusy = false;
            }
        }

        function handleSuccessModalChange(isOpen: boolean): void {
            if (!isOpen) {
                state.successModalIsOpen = isOpen;
                state.isBusy = false;
                state.publicKey = "";
                state.newBalance = "";
            }
        }

        function handleShowSummary(): void {
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
