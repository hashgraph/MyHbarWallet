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
            <i18n path="modalSuccess.createdAccount">
                <strong>{{ state.account }}</strong>
                <strong>{{ state.newBalance }}</strong>
            </i18n>
        </ModalSuccess>

        <ModalFeeSummary
            v-model="state.modalSummaryState"
            @submit="handleCreateAccount"
        />
    </InterfaceForm>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, SetupContext, watch } from "@vue/composition-api";
import { BigNumber } from "bignumber.js";
import { mdiHelpCircleOutline } from "@mdi/js";
import { BadKeyError } from "@hashgraph/sdk";

import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";
import InterfaceForm from "../components/InterfaceForm.vue";
import { actions, getters } from "../store";
import ModalFeeSummary, { Item, State as ModalSummaryState } from "../components/ModalFeeSummary.vue";
import { getValueOfUnit, Unit } from "../../service/units";
import Notice from "../components/Notice.vue";
import { formatHbar } from "../../service/format";
import ModalSuccess, { State as ModalSuccessState } from "../components/ModalSuccess.vue";
import { writeToClipboard } from "../../service/clipboard";
import { LoginMethod } from "../../domain/wallets/Wallet";

const estimatedFeeHbar = new BigNumber(0.5);
const estimatedFeeTinybar = estimatedFeeHbar.multipliedBy(getValueOfUnit(Unit.Hbar));

interface State {
    newBalance: string;
    publicKey: string;
    isBusy: boolean;
    keyError: string;
    newBalanceError: string;
    account: string;
    isPublicKeyValid: boolean;
    modalSummaryState: ModalSummaryState;
    modalSuccessState: ModalSuccessState;
}

async function isPublicKeyValid(key: string): Promise<boolean> {
    try {
        const { Ed25519PublicKey } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");
        Ed25519PublicKey.fromString(key);
        return true;
    } catch (error) {
        if (error instanceof BadKeyError) {
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
                actionLabel: "Copy Account ID"
            }
        });

        watch(async() => {
            state.isPublicKeyValid = await isPublicKeyValid(state.publicKey);
        });

        // eslint-disable-next-line sonarjs/cognitive-complexity
        async function handleCreateAccount(): Promise<void> {
            state.isBusy = true;
            state.modalSummaryState.isBusy = true;
            const { HederaStatusError, Status, Hbar } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");

            try {
                // The new wallet's initial balance
                const newBalanceTinybar = new Hbar(state.newBalance).asTinybar();

                const {
                    AccountCreateTransaction,
                    Ed25519PublicKey
                } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");

                const client = getters.USER().session.client;
                const key = Ed25519PublicKey.fromString(state.publicKey);

                const transaction = await new AccountCreateTransaction()
                    .setInitialBalance(Hbar.fromTinybar(newBalanceTinybar))
                    .setMaxTransactionFee(Hbar.fromTinybar(estimatedFeeTinybar))
                    .setKey(key);

                // NOTE: We should consider adding OptionalMemo for Account Creation
                if (getters.USER().wallet.getLoginMethod() === LoginMethod.Ledger) {
                    transaction.setTransactionMemo(" "); // Hack to deal with broken Nano X paging macro
                }

                const accountIdIntermediate = (await (await transaction.execute(client))
                    .getReceipt(client))
                    .getAccountId();

                // Handle undefined
                if (accountIdIntermediate == null) {
                    throw new Error(context.root
                        .$t("common.error.invalidAccount")
                        .toString());
                }

                // state.accountIdIntermediate must be AccountID
                // get shard, realm, state.account separately and construct a new object
                state.account =
                    `${accountIdIntermediate.shard
                    }.${
                        accountIdIntermediate.realm
                    }.${
                        accountIdIntermediate.account}`;

                // If creating state.account succeeds then remove errors
                state.newBalanceError = "";

                // Refresh Balance
                await actions.refreshBalanceAndRate();

                state.modalSummaryState.isOpen = false;
                state.modalSuccessState.isOpen = true;
            } catch (error) {
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
                    getters.USER().wallet.getLoginMethod() ===
                        LoginMethod.Ledger
                ) {
                    await actions.handleLedgerError({
                        error,
                        showAlert: true
                    });
                } else {
                    throw error;
                }
            } finally {
                state.modalSummaryState.isOpen = false;
                state.modalSummaryState.isBusy = false;
                state.isBusy = false;
            }
        }

        async function handleModalSuccessAction(): Promise<void> {
            // Copy created AccountID
            await writeToClipboard(state.account);
            actions.alert({
                level: "info",
                message: context.root
                    .$t("modalSuccess.copiedAccountID")
                    .toString()
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
