<template>
    <InterfaceForm :title="$t('common.createAccount')">
        <Notice :symbol="mdiHelpCircleOutline">
            {{
                $t("interfaceCreateAccount.toCreateAccount")
            }}
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
            <PublicKeyRing @keyRing="handleKeyRing" />
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
import { actions, getters, store } from "../store";
import ModalFeeSummary, { Item } from "../components/ModalFeeSummary.vue";
import { getValueOfUnit, Unit } from "../units";
import { BigNumber } from "bignumber.js";
import { mdiHelpCircleOutline } from "@mdi/js";
import Notice from "../components/Notice.vue";
import { formatHbar } from "../formatter";
import ModalSuccess, { State as ModalSuccessState } from "../components/ModalSuccess.vue";
import { writeToClipboard } from "../clipboard";
import { LoginMethod } from "../wallets/Wallet";
import {
    Ed25519PublicKey,
    ThresholdKey,
    KeyList
} from "@hashgraph/sdk";
import PublicKeyRing, { FormatedKey } from "../components/PublicKeyRing.vue";

const estimatedFeeHbar = new BigNumber(0.3);
const estimatedFeeTinybar = estimatedFeeHbar.multipliedBy(getValueOfUnit(Unit.Hbar));
function buildThresholdKeys(
    keys: FormatedKey
): ThresholdKey {
    // build the initail threshold key
    const thresholdKey = new ThresholdKey(keys.threshold as number);
    // for each key in this key we need to check what kind of key it is and add it to the threshold properly
    (keys.keyList as FormatedKey[]).forEach((key) => {
        if (key.threshold !== key.keyList.length && key.threshold !== 0) {
            // if the user made a list and selected a threshold
            thresholdKey.addAll(buildThresholdKeys(key));
        } else if (key.keyList.length > 1) {
            // user built a list with max threshold
            thresholdKey.addAll(buildKeyList(key));
        } else {
            // single key
            thresholdKey.add(
                Ed25519PublicKey.fromString(key.keyList[ 0 ].toString())
            );
        }
    });
    return thresholdKey;
}
function buildKeyList(
    keys: FormatedKey
): KeyList {
    // key list, similar procedure as above.
    const keyList = new KeyList();
    (keys.keyList as FormatedKey[]).forEach((key) => {
        if (key.threshold !== key.keyList.length && key.threshold !== 0) {
            keyList.addAll(buildThresholdKeys(key));
        } else if (key.keyList.length > 1) {
            keyList.addAll(buildKeyList(key));
        } else {
            keyList.add(Ed25519PublicKey.fromString(key.keyList[ 0 ].toString()));
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
        PublicKeyRing,
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

        // Just for display in modal title
        const summaryAmount = computed(() => formatHbar(new BigNumber(state.newBalance)));

        const validBalance = computed(() =>
            // All we should check is that this is, in fact, a number
            !isNaN(parseInt(summaryAmount.value)));

        const summaryItems = computed(() => [
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
                value: getters.ESTIMATED_FEE_HBAR()
            }
        ] as Item[]);

        // checks for determining the type of key you will be creating and returns the generated key
        function keyGen(keyRing: FormatedKey):
        Ed25519PublicKey |
        KeyList |
        ThresholdKey {
            if (
                keyRing.keyList.length !== keyRing.threshold &&
                    keyRing.threshold !== 0
            ) {
                return buildThresholdKeys(keyRing);
            } else if (
                keyRing.keyList.length > 1 &&
                    keyRing.threshold === keyRing.keyList.length
            ) {
                return buildKeyList(keyRing);
            }
            return Ed25519PublicKey.fromString(
                (keyRing
                    .keyList[ 0 ] as FormatedKey).keyList[ 0 ].toString()
            );
        }

        // eslint-disable-next-line sonarjs/cognitive-complexity
        async function handleCreateAccount(): Promise<void> {
            state.isBusy = true;

            if (store.state.wallet.session == null) {
                throw new Error(context.root
                    .$t("common.error.nullAccountOnInterface")
                    .toString());
            }

            const client = store.state.wallet.session.client;

            const { HederaStatusError, Status, Hbar } = await import("@hashgraph/sdk");

            try {
                // The new wallet's initial balance
                const newBalanceTinybar = new BigNumber(state.newBalance).multipliedBy(getValueOfUnit(Unit.Hbar));

                // The current user's balance
                const balanceTinybar =
                    store.state.wallet.balance == null ?
                        new BigNumber(0) :
                        store.state.wallet.balance;
                const { AccountCreateTransaction } = await import("@hashgraph/sdk");

                // convert the "KeyRing" into valid keylist structure for executing transaction
                const key = keyGen(state.keys as FormatedKey);

                const accountIdIntermediate = (await (await new AccountCreateTransaction()
                    .setInitialBalance(Hbar.fromTinybar(newBalanceTinybar))
                    .setMaxTransactionFee(Hbar.fromTinybar(estimatedFeeTinybar))
                    .setKey(key)
                    .execute(client))
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

                // If creating state.account succeeds then remove all the error
                state.newBalanceError = "";

                // Refresh Balance
                await actions.refreshBalanceAndRate();

                state.modalSuccessState.isOpen = true;
            } catch (error) {
                if (error instanceof HederaStatusError) {
                    const errorMessage = (await actions.handleHederaError({
                        error,
                        showAlert: false
                    })).message;

                    // Small duplication of effort to assign errorMessage to correct TextInput
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
                    store.state.wallet.session.wallet.getLoginMethod() ===
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

