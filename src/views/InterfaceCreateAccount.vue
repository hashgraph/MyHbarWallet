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
            :valid="state.validBalance"
            has-input
            :label="$t('interfaceCreateAccount.initialBalance')"
            show-validation
        />

        <TextInput
            v-model="state.publicKey"
            :error="state.keyError"
            :valid="state.isPublicKeyValid"
            :spellcheck-disabled="true"
            :autocomplete-disabled="true"
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
            :items="summaryItems.value"
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
    Ref,
    ref,
    SetupContext,
    watch
} from "@vue/composition-api";
import store from "../store";
import ModalCreateAccountSuccess from "../components/ModalCreateAccountSuccess.vue";
import ModalFeeSummary, { Item } from "../components/ModalFeeSummary.vue";
import { Unit } from "../units";
import { mdiHelpCircleOutline } from "@mdi/js";
import Notice from "../components/Notice.vue";
import { formatHbar } from "../formatter";
import { ESTIMATED_FEE_HBAR, MAX_FEE_TINYBAR } from "../store/getters";
import {
    ALERT,
    HANDLE_HEDERA_ERROR,
    HANDLE_LEDGER_ERROR,
    REFRESH_BALANCE_AND_RATE
} from "../store/actions";

const estimatedFee = store.getters[ESTIMATED_FEE_HBAR];

interface State {
    newBalance: string;
    publicKey: string;
    isBusy: boolean;
    validBalance: boolean;
    successModalIsOpen: boolean;
    summaryModalIsOpen: boolean;
    summaryAmount: string;
    keyError: string;
    newBalanceError: string;
    account: string;
    isPublicKeyValid: boolean;
}

async function isPublicKeyValid(key: string): Promise<boolean> {
    try {
        const { Ed25519PublicKey } = await (import("@hashgraph/sdk") as Promise<
            typeof import("@hashgraph/sdk")
        >);

        Ed25519PublicKey.fromString(key);
        return true;
    } catch (error) {
        if (error instanceof Error) {
            // The exception message changes depending on the input
            if (error.message === "invalid public key: " + key) {
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
            keyError: "",
            newBalanceError: "",
            account: "",
            isPublicKeyValid: false
        });

        const summaryItems: Ref<Item[]> = ref(new Array<Item>());

        watch(
            () => state.newBalance,
            async (newBalance: string) => {
                const { Hbar } = await (import("@hashgraph/sdk") as Promise<
                    typeof import("@hashgraph/sdk")
                >);

                const newBalanceHbar = Hbar.from(newBalance, "hbar");

                state.validBalance =
                    newBalance != null &&
                    newBalanceHbar.isGreaterThanOrEqualTo(Hbar.ZERO);

                // used for display in modal title
                state.summaryAmount = formatHbar(newBalanceHbar);

                summaryItems.value = [
                    {
                        description: "Initial Balance",
                        value: state.validBalance ? newBalanceHbar : Hbar.zero()
                    },
                    { description: "Estimated Fee", value: estimatedFee }
                ] as Item[];
            }
        );

        const validBalance = computed(() => {
            // All we should check is that this is, in fact, a number
            return !isNaN(parseInt(state.newBalance, 10));
        });

        watch(async () => {
            state.isPublicKeyValid = await isPublicKeyValid(state.publicKey);
        });

        async function handleCreateAccount(): Promise<void> {
            state.isBusy = true;

            if (store.state.wallet.session == null) {
                throw new Error(
                    context.root
                        .$t("common.error.nullAccountOnInterface")
                        .toString()
                );
            }

            const client = store.state.wallet.session.client;

            const { HederaError, ResponseCodeEnum, Hbar } = await (import(
                "@hashgraph/sdk"
            ) as Promise<typeof import("@hashgraph/sdk")>);

            try {
                // The new wallet's initial balance
                const newBalance = Hbar.from(state.newBalance, "hbar");

                // The current user's balance
                const userBalance = !store.state.wallet.balance
                    ? Hbar.zero()
                    : store.state.wallet.balance;

                const {
                    AccountCreateTransaction,
                    Client,
                    Ed25519PublicKey
                } = await (import("@hashgraph/sdk") as Promise<
                    typeof import("@hashgraph/sdk")
                >);

                const key = Ed25519PublicKey.fromString(state.publicKey);
                const maxTxFee = store.getters[MAX_FEE_TINYBAR](
                    userBalance.minus(estimatedFee)
                );

                const accountIdIntermediate = (await new AccountCreateTransaction(
                    client as InstanceType<typeof Client>
                )
                    .setInitialBalance(newBalance)
                    .setTransactionFee(maxTxFee)
                    .setKey(key)
                    .build()
                    .executeForReceipt()).accountId;

                // Handle undefined
                if (accountIdIntermediate == null) {
                    throw new Error(
                        context.root
                            .$t("common.error.invalidAccount")
                            .toString()
                    );
                }

                // state.accountIdIntermediate must be AccountID
                // get shard, realm, state.account separately and construct a new object
                state.account =
                    accountIdIntermediate.shard +
                    "." +
                    accountIdIntermediate.realm +
                    "." +
                    accountIdIntermediate.account;

                // If creating state.account succeeds then remove all the error
                state.newBalanceError = "";

                // Refresh Balance
                await store.dispatch(REFRESH_BALANCE_AND_RATE);

                state.successModalIsOpen = true;
            } catch (error) {
                if (error instanceof HederaError) {
                    const errorMessage = await store.dispatch(
                        HANDLE_HEDERA_ERROR,
                        { error, showAlert: false }
                    );

                    // Small duplication of effort to assign errorMessage to correct TextInput
                    switch (error.code) {
                        case ResponseCodeEnum.INSUFFICIENT_ACCOUNT_BALANCE:
                        case ResponseCodeEnum.INSUFFICIENT_PAYER_BALANCE:
                            state.newBalanceError = errorMessage;
                            break;
                        default:
                            if (errorMessage !== "") {
                                store.dispatch(ALERT, {
                                    message: errorMessage,
                                    level: "warn"
                                });
                            } else {
                                throw error; // Unhandled Error Modal will open
                            }
                    }
                } else if (error.name === "TransportStatusError") {
                    store.dispatch(HANDLE_LEDGER_ERROR, {
                        error,
                        showAlert: true
                    });
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
            summaryItems,
            validBalance,
            handleCreateAccount,
            handleShowSummary,
            handleSuccessModalChange,
            Unit,
            mdiHelpCircleOutline
        };
    }
});
</script>
