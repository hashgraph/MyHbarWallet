<template>
    <InterfaceForm :title="$t('common.createAccount')">
        <Notice :symbol="mdiHelpCircleOutline">
            {{ $t("interfaceCreateAccount.toCreateAccount") }}
        </Notice>

        <TextInput
            v-model="state.newBalance"
            :error="state.newBalanceError"
            :min="1"
            :suffix="ħ"
            :valid="state.validBalance"
            has-input
            :label="$t('interfaceCreateAccount.initialBalance')"
            show-validation
        />

        <TextInput
            v-model="state.publicKey"
            :error="state.keyError"
            :valid="state.isPublicKeyValid"
            :label="$t('interfaceCreateAccount.publicKey')"
            show-validation
        />

        <template v-slot:footer>
            <Button
                :busy="state.isBusy"
                :disabled="!state.isPublicKeyValid || !validBalance"
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
            :amount="state.summaryAmount"
            :items="state.summaryItems"
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
    createComponent,
    reactive,
    SetupContext,
    watch
} from "@vue/composition-api";
import store from "../store";
import ModalCreateAccountSuccess from "../components/ModalCreateAccountSuccess.vue";
import ModalFeeSummary, { Item } from "../components/ModalFeeSummary.vue";
import { mdiHelpCircleOutline } from "@mdi/js";
import Notice from "../components/Notice.vue";
import { formatHbar, validateHbar } from "../formatter";
import {
    ESTIMATED_FEE_HBAR,
    ESTIMATED_FEE_TINYBAR,
    MAX_FEE_TINYBAR
} from "../store/getters";
import { ALERT, REFRESH_BALANCE_AND_RATE } from "../store/actions";
import { Hbar } from "@hashgraph/sdk/src/Hbar";

const ED25519_PREFIX = "302a300506032b6570032100";
const estimatedFeeHbar = store.getters[ESTIMATED_FEE_HBAR];
const estimatedFeeTinybar = store.getters[ESTIMATED_FEE_TINYBAR];

interface State {
    newBalance: string;
    publicKey: string;
    isBusy: boolean;
    validBalance: boolean;
    successModalIsOpen: boolean;
    summaryModalIsOpen: boolean;
    summaryAmount: string;
    summaryItems: Item[];
    keyError: string;
    newBalanceError: string;
    account: string;
    isPublicKeyValid: boolean;
}

async function isPublicKeyValid(key: string): Promise<boolean> {
    try {
        const { Ed25519PrivateKey } = await (import(
            "@hashgraph/sdk"
        ) as Promise<typeof import("@hashgraph/sdk")>);

        Ed25519PrivateKey.fromString(key);
        return true;
    } catch (error) {
        if (error instanceof Error) {
            // The exception message changes depending on the input
            if (error.message === "invalid private key: " + key) {
                return false;
            }
        }

        throw error;
    }
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
            validBalance: true,
            successModalIsOpen: false,
            summaryModalIsOpen: false,
            summaryAmount: "",
            summaryItems: [] as Item[],
            keyError: "",
            newBalanceError: "",
            account: "",
            isPublicKeyValid: false
        });

        watch(
            () => state.newBalance,
            async (newBalance: string) => {
                const { Hbar } = await (import(
                    "@hashgraph/sdk/src/Hbar"
                ) as Promise<typeof import("@hashgraph/sdk/src/Hbar")>);

                const newBalanceHbar = Hbar.from(newBalance, "hbar");

                state.validBalance =
                    newBalanceHbar.comparedTo(Hbar.fromTinybar(0)) > 0 &&
                    validateHbar(newBalance);
                state.summaryAmount = formatHbar(newBalanceHbar);
                state.summaryItems = [
                    {
                        description: "Initial Balance",
                        value: state.validBalance
                            ? newBalanceHbar
                            : (Hbar.fromTinybar(0) as Hbar)
                    } as Item,
                    {
                        description: "Estimated Fee",
                        value: estimatedFeeHbar as Hbar
                    } as Item
                ] as Item[];
            }
        );

        watch(async () => {
            state.isPublicKeyValid = await isPublicKeyValid(state.publicKey);
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
                "@hashgraph/sdk"
            ) as Promise<typeof import("@hashgraph/sdk")>);

            const { Hbar } = await (import(
                "@hashgraph/sdk/src/Hbar"
            ) as Promise<typeof import("@hashgraph/sdk/src/Hbar")>);

            try {
                // The new wallet's initial balance
                const newBalance = Hbar.from(state.newBalance, "hbar");

                // The current user's balance
                const balance =
                    store.state.wallet.balance == null
                        ? Hbar.fromTinybar(0)
                        : store.state.wallet.balance;

                if (balance.comparedTo(estimatedFeeTinybar) < 0) {
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
                    balance.minus(newBalance.plus(estimatedFeeTinybar))
                );

                const accountIdIntermediate = (await new AccountCreateTransaction(
                    client as InstanceType<typeof Client>
                )
                    .setInitialBalance(newBalance)
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

                // Refresh Balance
                store.dispatch(REFRESH_BALANCE_AND_RATE);

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
                        error.code ===
                        ResponseCodeEnum.INSUFFICIENT_ACCOUNT_BALANCE
                    ) {
                        state.newBalanceError = "Insufficient Account Balance";
                    } else {
                        store.dispatch(ALERT, {
                            message: `Received unhandled error from Hedera:  ${error.codeName}`,
                            level: "error"
                        });
                        throw error;
                    }
                } else {
                    throw error;
                }
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
            handleCreateAccount,
            handleShowSummary,
            handleSuccessModalChange,
            mdiHelpCircleOutline
        };
    }
});
</script>
