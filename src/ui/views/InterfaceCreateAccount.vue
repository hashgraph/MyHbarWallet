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

        <ModalSuccess
            v-model="state.modalSuccessState"
            @action="handleModalSuccessAction"
            @dismiss="handleModalSuccessDismiss"
        >
            <div class="success">
                <i18n path="modalSuccess.txId">
                    <strong>{{ state.transactionId }}</strong>
                </i18n>
                <i18n path="modalSuccess.createdAccount">
                    <span
                        ref="accountInput"
                        :key="compKey"
                    >
                        <strong>{{ state.account }}</strong>
                    </span>
                    <strong>{{ state.newBalance }}</strong>
                </i18n>
            </div>
        </ModalSuccess>

        <ModalFeeSummary
            v-model="state.modalSummaryState"
            @submit="handleCreateAccount"
        />
    </InterfaceForm>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, SetupContext, watch, Ref, ref } from "@vue/composition-api";
import { BigNumber } from "bignumber.js";
import { mdiHelpCircleOutline } from "@mdi/js";
import { BadKeyError } from "@hashgraph/sdk";

import Button from "../components/Button.vue";
import InterfaceForm from "../components/InterfaceForm.vue";
import ModalFeeSummary, { Item, State as ModalSummaryState } from "../components/ModalFeeSummary.vue";
import ModalSuccess, { State as ModalSuccessState } from "../components/ModalSuccess.vue";
import Notice from "../components/Notice.vue";
import TextInput from "../components/TextInput.vue";
import { LoginMethod } from "../../domain/wallets/Wallet";
import { actions, getters } from "../store";
import { formatHbar } from "../../service/format";
import { getValueOfUnit, Unit } from "../../service/units";
import { writeToClipboard } from "../../service/clipboard";

const estimatedFeeHbar = new BigNumber(0.5);
const estimatedFeeTinybar = estimatedFeeHbar.multipliedBy(getValueOfUnit(Unit.Hbar));

interface State {
    newBalance: string;
    publicKey: string;
    isBusy: boolean;
    keyError: string;
    newBalanceError: string;
    account: string;
    transactionId: string;
    isPublicKeyValid: boolean;
    modalSummaryState: ModalSummaryState;
    modalSuccessState: ModalSuccessState;
}

async function isPublicKeyValid(key: string, retry: boolean | undefined): Promise<boolean> {
    try {
        const { Ed25519PublicKey } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");
        Ed25519PublicKey.fromString(key);
        return true;
    } catch (error) {
        if (error instanceof BadKeyError) {
            if (retry) return isPublicKeyValid(key, false);
            // The exception message changes depending on the input
            return false;
        }

        throw error;
    }
}

export default defineComponent({
    components: {
        TextInput,
        InterfaceForm,
        Button,
        ModalSuccess,
        Notice,
        ModalFeeSummary
    },
    setup(_: object | null, context: SetupContext) {
        const state = reactive<State>({
            newBalance: "",
            publicKey: "",
            isBusy: false,
            keyError: "",
            newBalanceError: "",
            account: "",
            transactionId: "",
            isPublicKeyValid: false,
            modalSummaryState: {
                isOpen: false,
                isBusy: false,
                isFileSummary: false,
                account: "",
                amount: "",
                items: [],
                txType: "transfer",
                submitLabel: context.root.$t("interfaceCreateAccount.feeSummary.continue").toString(),
                cancelLabel: context.root.$t("interfaceCreateAccount.feeSummary.dismiss").toString(),
                termsShowNonOperator: false
            },
            modalSuccessState: {
                isOpen: false,
                hasAction: true,
                actionLabel: context.root.$t("modalViewAccountId.copyAccountId").toString()
            }
        });

        const accountInput: Ref<HTMLElement | null> = ref(null);
        const compKey = ref(0);

        watch(async() => {
            state.isPublicKeyValid = await isPublicKeyValid(state.publicKey, true);
        });

        async function handleError(error: { status: { code: any }; name: string }): Promise<void> {
            const { HederaStatusError, Status } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");
            if (error instanceof HederaStatusError) {
                const errorMessage = (await actions.handleHederaError({
                    error,
                    showAlert: false
                })).message;

                switch (error.status.code) {
                    case Status.InsufficientAccountBalance.code:
                    case Status.InsufficientPayerBalance.code:
                        state.newBalanceError = errorMessage;
                        break;
                    default:
                        if (errorMessage !== "") {
                            actions.alert({
                                message: errorMessage,
                                level: "warn"
                            });
                        } else {
                            throw error; // Unhandled Error Modal will open
                        }
                }
            } else if (
                error.name === "TransportStatusError" &&
                    getters.currentUser().wallet.getLoginMethod() ===
                        LoginMethod.Ledger
            ) {
                await actions.handleLedgerError({
                    error,
                    showAlert: true
                });
            } else {
                throw error;
            }
        }

        // eslint-disable-next-line sonarjs/cognitive-complexity
        async function handleCreateAccount(): Promise<void> {
            state.isBusy = true;
            state.modalSummaryState.isBusy = true;
            const { Hbar } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");

            try {
                // The new wallet's initial balance
                const newBalanceTinybar = new Hbar(state.newBalance).asTinybar();

                const {
                    AccountCreateTransaction,
                    Ed25519PublicKey
                } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");

                const client = getters.currentUser().session.client;
                const key = Ed25519PublicKey.fromString(state.publicKey);

                const transaction = await new AccountCreateTransaction()
                    .setInitialBalance(Hbar.fromTinybar(newBalanceTinybar))
                    .setMaxTransactionFee(Hbar.fromTinybar(estimatedFeeTinybar))
                    .setKey(key);

                // NOTE: We should consider adding OptionalMemo for Account Creation
                if (getters.currentUser().wallet.getLoginMethod() === LoginMethod.Ledger) {
                    transaction.setTransactionMemo(" "); // Hack to deal with broken Nano X paging macro
                }

                const transactionIntermediate = await transaction.execute(client);
                const transactionReceipt = await transactionIntermediate.getReceipt(client); // transaction succeeded

                if (transactionReceipt != null) {
                    const createdAccount = transactionReceipt.getAccountId();
                    state.account = `${createdAccount.shard}.${createdAccount.realm}.${createdAccount.account}`;
                }

                let accountIdIntermediate = null;
                try {
                    accountIdIntermediate = await transactionIntermediate.getRecord(client);
                } catch (error) {
                    handleError(error);
                    state.newBalanceError = ""; // if hedera error, actually no it wasn't.
                    actions.alert({
                        message: context.root.$t("common.error.failedToFetchRecord").toString(),
                        level: "warn"
                    });
                }

                // state.accountIdIntermediate must be AccountID
                // get shard, realm, state.account separately and construct a new object
                if (accountIdIntermediate != null) {
                    const { seconds, nanos } = accountIdIntermediate.transactionId.validStart;
                    const userAccount = accountIdIntermediate.transactionId.accountId;
                    state.transactionId = `${userAccount.shard}.${userAccount.realm}.${userAccount.account}@${seconds}.${nanos}`;
                }

                // Refresh Balance
                await actions.refreshBalanceAndRate();

                state.modalSummaryState.isOpen = false;
                state.modalSuccessState.isOpen = true;
            } catch (error) {
                handleError(error);
            } finally {
                state.modalSummaryState.isOpen = false;
                state.modalSummaryState.isBusy = false;
                state.isBusy = false;
            }
        }

        async function handleModalSuccessAction(): Promise<void> {
            compKey.value += 1;
            context.root.$nextTick(() => {
                if (accountInput.value != null) {
                    writeToClipboard(accountInput.value);

                    actions.alert({
                        level: "info",
                        message: context.root
                            .$t("modalSuccess.copiedAccountID")
                            .toString()
                    });
                }
            });
        }

        function handleModalSuccessDismiss(): void {
            state.modalSuccessState.isOpen = false;
            state.isBusy = false;
            state.publicKey = "";
            state.newBalance = "";
            state.account = "";
        }

        // Modal Fee Summary State
        const summaryAmount = computed(() => formatHbar(new BigNumber(state.newBalance)));
        const validBalance = computed(() =>
            // All we should check is that this is, in fact, a number
            !isNaN(parseInt(summaryAmount.value)));
        const summaryItems = computed((): Item[] => [
            {
                description: context.root
                    .$t("interfaceCreateAccount.initialBalance")
                    .toString(),
                value: validBalance.value ?
                    new BigNumber(state.newBalance) :
                    new BigNumber(0)
            },
            {
                description: context.root
                    .$t("common.estimatedFee")
                    .toString(),
                value: estimatedFeeHbar
            }
        ]);

        function handleShowSummary(): void {
            state.modalSummaryState.amount = summaryAmount.value!;
            state.modalSummaryState.items = summaryItems.value!;
            state.modalSummaryState.isOpen = true;
        }

        return {
            accountInput,
            compKey,
            state,
            validBalance,
            handleCreateAccount,
            handleShowSummary,
            handleModalSuccessAction,
            handleModalSuccessDismiss,
            Unit,
            mdiHelpCircleOutline
        };
    }
});
</script>
<style lang="postcss" scoped>
.success > span:first-of-type {
    display: block;
    padding-block-end: 20px;
}
</style>
