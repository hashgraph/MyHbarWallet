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

        <div>
            <PublicKeyRing
                @keyRing="handleKeyRing"
                @formOpen="handleFormOpen"
            />
        </div>
        <template v-slot:footer>
            <Button
                :busy="state.isBusy"
                :disabled="!state.isPublicKeyValid || !validBalance || state.isFormOpen"
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
import { BadKeyError, PublicKey } from "@hashgraph/sdk";

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
import PublicKeyRing, { FormatedKey } from "../components/PublicKeyRing.vue";

const estimatedFeeHbar = new BigNumber(0.5);
const estimatedFeeTinybar = estimatedFeeHbar.multipliedBy(getValueOfUnit(Unit.Hbar));

interface State {
    newBalance: string;
    publicKey: string;
    keys?: FormatedKey;
    isBusy: boolean;
    keyError: string;
    isFormOpen: boolean;
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
async function buildThresholdKeys(
    keys: FormatedKey
): Promise<PublicKey> {
    const { ThresholdKey, Ed25519PublicKey } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");
    // build the initail threshold key
    const thresholdKey = new ThresholdKey(keys.threshold as number);
    // for each key in this key we need to check what kind of key it is and add it to the threshold properly
    (keys.keyList as FormatedKey[]).forEach(async(key) => {
        if (key.threshold !== key.keyList.length && key.threshold !== 0) {
            // if the user made a list and selected a threshold
            thresholdKey.addAll(await buildThresholdKeys(key));
        } else if (key.keyList.length > 1) {
            // user built a list with max threshold
            thresholdKey.addAll(await buildKeyList(key));
        } else {
            // single key
            thresholdKey.add(
                Ed25519PublicKey.fromString(key.keyList[ 0 ].toString())
            );
        }
    });
    return thresholdKey;
}
async function buildKeyList(
    keys: FormatedKey
): Promise<PublicKey> {
    const { KeyList, Ed25519PublicKey } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");
    // key list, similar procedure as above.
    const keyList = new KeyList();
    (keys.keyList as FormatedKey[]).forEach(async(key) => {
        if (key.threshold !== key.keyList.length && key.threshold !== 0) {
            keyList.addAll(await buildThresholdKeys(key));
        } else if (key.keyList.length > 1) {
            keyList.addAll(await buildKeyList(key));
        } else {
            keyList.add(Ed25519PublicKey.fromString(key.keyList[ 0 ].toString()));
        }
    });
    return keyList;
}

export default defineComponent({
    components: {
        TextInput,
        InterfaceForm,
        Button,
        ModalSuccess,
        Notice,
        ModalFeeSummary,
        PublicKeyRing
    },
    setup(_: object | null, context: SetupContext) {
        const state = reactive<State>({
            newBalance: "",
            publicKey: "",
            keys: undefined,
            isBusy: false,
            keyError: "",
            newBalanceError: "",
            account: "",
            isPublicKeyValid: false,
            isFormOpen: false,
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

                const client = getters.currentUser().session.client;
                let key;
                if (
                    state.keys!.keyList.length !== state.keys!.threshold &&
                    state.keys!.threshold !== 0
                ) {
                    key = await buildThresholdKeys(state.keys!);
                } else if (
                    state.keys!.keyList.length > 1 &&
                    state.keys!.threshold === state.keys!.keyList.length
                ) {
                    key = await buildKeyList(state.keys!);
                }
                key = Ed25519PublicKey.fromString(
                    (state.keys!
                        .keyList[ 0 ] as FormatedKey).keyList[ 0 ].toString()
                );

                const transaction = await new AccountCreateTransaction()
                    .setInitialBalance(Hbar.fromTinybar(newBalanceTinybar))
                    .setMaxTransactionFee(Hbar.fromTinybar(estimatedFeeTinybar))
                    .setKey(key);

                // NOTE: We should consider adding OptionalMemo for Account Creation
                if (getters.currentUser().wallet.getLoginMethod() === LoginMethod.Ledger) {
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

        function handleKeyRing(keyRing: {
            key: FormatedKey;
            validity: boolean;
        }): void {
            state.keys = keyRing.key;
            state.isPublicKeyValid = keyRing.validity;
        }

        function handleFormOpen(isFormOpen: boolean): void {
            state.isFormOpen = isFormOpen;
        }

        return {
            state,
            validBalance,
            PublicKeyRing,
            handleKeyRing,
            handleCreateAccount,
            handleShowSummary,
            handleModalSuccessAction,
            handleModalSuccessDismiss,
            Unit,
            handleFormOpen,
            mdiHelpCircleOutline
        };
    }
});
</script>
