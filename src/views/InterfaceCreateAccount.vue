<template>
    <InterfaceForm :title="$t('common.createAccount')">
        <Notice :symbol="mdiHelpCircleOutline">{{
            $t("interfaceCreateAccount.toCreateAccount")
        }}</Notice>

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
            <CreateAccountKeyRing @keyRing="handleKeyRing" />
        </div>

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
            v-model="state.summaryModalIsOpen"
            :amount="summaryAmount"
            :items="summaryItems"
            account
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
import ModalFeeSummary, { Item } from "../components/ModalFeeSummary.vue";
import { getValueOfUnit, Unit } from "../units";
import { BigNumber } from "bignumber.js";
import { mdiHelpCircleOutline } from "@mdi/js";
import Notice from "../components/Notice.vue";
import { formatHbar } from "../formatter";
import {
    ESTIMATED_FEE_HBAR,
    ESTIMATED_FEE_TINYBAR,
    MAX_FEE_TINYBAR
} from "../store/getters";
import {
    ALERT,
    HANDLE_HEDERA_ERROR,
    HANDLE_LEDGER_ERROR,
    REFRESH_BALANCE_AND_RATE
} from "../store/actions";
import ModalSuccess, {
    State as ModalSuccessState
} from "../components/ModalSuccess.vue";
import { writeToClipboard } from "../clipboard";
import { LoginMethod } from "../wallets/Wallet";
import CreateAccountKeyRing, {
    FormatedKey
} from "../components/CreateAccountKeyRing.vue";

const estimatedFeeHbar = store.getters[ESTIMATED_FEE_HBAR];
const estimatedFeeTinybar = store.getters[ESTIMATED_FEE_TINYBAR];

async function buildThresholdKeys(
    keys: FormatedKey
): Promise<import("@hashgraph/sdk").ThresholdKey> {
    const { ThresholdKey, Ed25519PublicKey } = await (import(
        "@hashgraph/sdk"
    ) as Promise<typeof import("@hashgraph/sdk")>);
    console.log("107", keys);
    const thresholdKey = new ThresholdKey(keys.threshold as number);
    (keys.keyList as FormatedKey[]).forEach(async key => {
        if (key.threshold !== key.keyList.length && key.threshold !== 0) {
            thresholdKey.addAll(await buildThresholdKeys(key));
        } else if (key.keyList.length > 1) {
            thresholdKey.addAll(await buildKeyList(key));
        } else {
            thresholdKey.add(
                await Ed25519PublicKey.fromString(key.keyList[0].toString())
            );
        }
    });
    return thresholdKey;
}
async function buildKeyList(
    keys: FormatedKey
): Promise<import("@hashgraph/sdk").KeyList> {
    const { Ed25519PublicKey, KeyList } = await (import(
        "@hashgraph/sdk"
    ) as Promise<typeof import("@hashgraph/sdk")>);
    //key list
    const keyList = new KeyList();
    (keys.keyList as FormatedKey[]).forEach(async key => {
        if (key.threshold !== key.keyList.length && key.threshold !== 0) {
            keyList.addAll(await buildThresholdKeys(key));
        } else if (key.keyList.length > 1) {
            keyList.addAll(await buildKeyList(key));
        } else {
            keyList.add(Ed25519PublicKey.fromString(key.keyList[0].toString()));
        }
    });
    return keyList;
}

interface State {
    newBalance: string;
    publicKey: string;
    keys?: FormatedKey;
    isBusy: boolean;
    summaryModalIsOpen: boolean;
    newBalanceError: string;
    account: string;
    isPublicKeyValid: boolean;
    modalSuccessState: ModalSuccessState;
}

export default createComponent({
    components: {
        TextInput,
        InterfaceForm,
        Button,
        ModalSuccess,
        Notice,
        CreateAccountKeyRing,
        ModalFeeSummary
    },
    setup(_: object | null, context: SetupContext) {
        const state = reactive<State>({
            newBalance: "",
            publicKey: "",
            keys: undefined,
            isBusy: false,
            summaryModalIsOpen: false,
            newBalanceError: "",
            account: "",
            isPublicKeyValid: false,
            modalSuccessState: {
                isOpen: false,
                hasAction: true,
                actionLabel: "Copy Account ID"
            }
        });

        const validBalance = computed(() => {
            // All we should check is that this is, in fact, a number
            return !isNaN(parseInt(state.newBalance, 10));
        });

        // Just for display in modal title
        const summaryAmount = computed(() => {
            return formatHbar(new BigNumber(state.newBalance));
        });

        const summaryItems = computed(() => {
            return [
                {
                    description: context.root
                        .$t("interfaceCreateAccount.initialBalance")
                        .toString(),
                    value: validBalance.value
                        ? new BigNumber(state.newBalance)
                        : new BigNumber(0)
                },
                {
                    description: context.root
                        .$t("common.estimatedFee")
                        .toString(),
                    value: estimatedFeeHbar
                }
            ] as Item[];
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

            const { HederaError, ResponseCodeEnum } = await (import(
                "@hashgraph/sdk"
            ) as Promise<typeof import("@hashgraph/sdk")>);

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

                const {
                    AccountCreateTransaction,
                    Client,
                    Ed25519PublicKey
                } = await (import("@hashgraph/sdk") as Promise<
                    typeof import("@hashgraph/sdk")
                >);

                const keyRing = state.keys as FormatedKey;
                let key;
                //checks for determining the type of key you will be creating
                if (
                    keyRing.keyList.length != keyRing.threshold &&
                    keyRing.threshold != 0
                ) {
                    key = await buildThresholdKeys(keyRing);
                } else if (
                    keyRing.keyList.length > 1 &&
                    keyRing.threshold == keyRing.keyList.length
                ) {
                    key = await buildKeyList(keyRing);
                } else {
                    key = Ed25519PublicKey.fromString(
                        (keyRing
                            .keyList[0] as FormatedKey).keyList[0].toString()
                    );
                }

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

                state.modalSuccessState.isOpen = true;
            } catch (error) {
                if (error instanceof HederaError) {
                    const errorMessage = await store.dispatch(
                        HANDLE_HEDERA_ERROR,
                        {
                            error,
                            showAlert: false
                        }
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
                } else if (
                    error.name === "TransportStatusError" &&
                    store.state.wallet.session.wallet.getLoginMethod() ===
                        LoginMethod.LedgerNanoS
                ) {
                    await store.dispatch(HANDLE_LEDGER_ERROR, {
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

        async function handleModalSuccessAction(): Promise<void> {
            // Copy created AccountID
            await writeToClipboard(state.account);
            store.dispatch(ALERT, {
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

        function handleShowSummary(): void {
            state.summaryModalIsOpen = true;
        }

        function handleKeyRing(keyRing: {
            key: FormatedKey;
            validity: boolean;
        }): void {
            state.keys = keyRing.key;
            state.isPublicKeyValid = keyRing.validity;
        }

        return {
            state,
            summaryAmount,
            summaryItems,
            handleKeyRing,
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
