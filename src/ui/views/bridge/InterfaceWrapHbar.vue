<template>
    <div id="wrapHbar">
        <InterfaceForm
            :title="$t('interfaceWrapHbar.title')"
            :description="$t('interfaceWrapHbar.description')"
        >
            <span
                v-if="state.modalPendingTransfer.pendingTransactions.length > 0"
                class="pending-transfer-bar"
            >
                <span class="pending-transfer-text">
                    {{ $t('interfaceWrapHbar.pendingTransferNotice') }}
                </span>
                <button class="pending-transfer-button">
                    <ViewPendingTransfersButton
                        :label="$t('interfaceWrapHbar.claim')"
                        @openPendingTransfersModal="handleViewPendingTransfers"
                    />
                </button>
            </span>
            <span class="connect-wallet-bar">
                <ConnectWalletButton
                    :address="state.metamask ? state.metamask.croppedSelectedAddress() : $t('interfaceWrapHbar.connectWallet')"
                    @connect="handleConnectToMetamask"
                />
            </span>
            <span class="label">{{ $t('interfaceWrapHbar.assetLabel') }}</span>
            <Select
                v-model="state.assetNameWithId"
                class="select"
                :options="availableAssets"
                @change="handleSelectChange"
            />
            <div
                v-if="state.assetSelectionError"
                class="error"
            >
                {{ state.assetSelectionError }}
            </div>

            <TextInput
                :value="state.ethAddress"
                :error="state.ethAddressErrorMessage"
                :valid="isEthAddressValid"
                has-input
                :label="$t('common.ethAddress')"
                show-validation
                @input="handleEthAddressInput"
            />
            <div>
                <div class="balance-container">
                    <span class="label-small">{{ $t('interfaceWrapHbar.balanceLabel') }}</span>
                    <span class="balance-value">{{ state.assetBalance }}</span>
                </div>

                <TextInput
                    :value="state.amount"
                    :error="state.amountErrorMessage"
                    :valid="isAmountValid"
                    has-input
                    :label="$t('common.amount')"
                    show-validation
                    :suffix="state.asset"
                    @input="handleInput"
                />
            </div>

            <template v-slot:footer>
                <Button
                    :busy="state.isBusy"
                    :disabled="!isEthAddressValid || !isAmountValid || !isSelectedAssetValid || !isMetamaskConnected"
                    :label="$t('interfaceWrapHbar.transferButton')"
                    @click="handleShowModalWrapTokens"
                />
            </template>

            <ModalSuccess
                v-model="state.modalSuccessState"
                @dismiss="handleModalSuccessDismiss"
            >
                <div class="success">
                    <p>Transferred <strong>{{ state.totalToReceive }} {{ state.asset }}</strong> to <strong>{{ state.ethAddress }}</strong></p>
                    <div class="transactions-list">
                        <p>{{ $t("interfaceWrapHbar.transaction.list.title") }}</p>
                        <a
                            :href="state.hederaExplorerTx"
                            target="_blank"
                        >{{ $t("interfaceWrapHbar.hedera.transaction") }}
                            <MaterialDesignIcon
                                class="launch-icon"
                                :icon="mdiLaunch"
                            />
                        </a><br>
                        <a
                            :href="state.evmTx"
                            target="_blank"
                        >{{ $t("interfaceWrapHbar.evm.transaction") }}
                            <MaterialDesignIcon
                                class="launch-icon"
                                :icon="mdiLaunch"
                            />
                        </a>
                    </div>
                </div>
            </ModalSuccess>

            <ModalWrapTokens
                v-model="state.modalWrapTokensState"
                @deposit="handleDeposit"
                @claim="handleClaim"
                @change="handleModalWrapTokensChange"
            />

            <ModalPendingTransfer
                v-model="state.modalPendingTransfer"
                @changeSelectedPendingTransaction="handleChangeSelectedPendingTransaction"
                @connectMetamask="handleConnectToMetamask"
                @claim="handleClaim"
                @change="handleModalPendingTransferChange"
            />
        </InterfaceForm>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, Ref, SetupContext, watch } from "@vue/composition-api";
import { BigNumber } from "bignumber.js";
import { AccountId, TokenId, Client } from "@hashgraph/sdk";
import Web3 from "web3";
import { TransactionReceipt } from "web3-core";
import { mdiLaunch, mdiHelpCircleOutline } from "@mdi/js";

import TextInput from "../../components/TextInput.vue";
import InterfaceForm from "../../components/InterfaceForm.vue";
import Button from "../../components/Button.vue";
import IDInput, { IdInputElement } from "../../components/IDInput.vue";
import { getValueOfUnit, Unit } from "../../../service/units";
import { RouterService } from "../../../service/bridge/contracts/router/router";
import { MetamaskService } from "../../../service/bridge/metamask/metamask";
import { formatHbar, validateHbar } from "../../../service/format";
import ModalSuccess, { State as ModalSuccessState } from "../../components/ModalSuccess.vue";
import Notice from "../../components/Notice.vue";
import { LoginMethod } from "../../../domain/wallets/wallet";
import { actions, getters } from "../../store";
import { txData, TransactionData } from "../../../service/hedera-validator";
import Select from "../../components/Select.vue";
import { Asset } from "../../../domain/transfer";
import { tokenTransfer } from "../../../service/bridge/hedera/hedera";
import ModalWrapTokens, { State as ModalWrapTokensState } from "../../components/bridge/ModalWrapTokens.vue";
import ConnectWalletButton from "../../components/bridge/ConnectWalletButton.vue";
import ViewPendingTransfersButton from "../../components/bridge/ViewPendingTransfersButton.vue";
import MaterialDesignIcon from "../../components/MaterialDesignIcon.vue";
import ModalPendingTransfer, { State as ModalPendingTransferState, PendingTransaction } from "../../components/bridge/ModalPendingTransfer.vue";

import { MirrorNodeToken } from "src/domain/token";

let transactionInterval: number = null;

// Defined in vue.config.js.

interface State {
    amount: string | null;
    account: AccountId | null;
    accountString: string | null;
    memo: string | null;
    isBusy: boolean;
    idErrorMessage: string | null;
    amountErrorMessage: string | null;
    idValid: boolean;
    transactionId: string;
    modalSuccessState: ModalSuccessState;
    modalWrapTokensState: ModalWrapTokensState;
    modalPendingTransfer: ModalPendingTransferState;
    ethAddress: string | null;
    ethAddressErrorMessage: string | null;
    serviceFee: string;
    evmTx: string;
    showEthMessage: boolean;
    wrapAmount: string;
    asset: string;
    assetNameWithId: string;
    assetSelectionError: string;
    bridgeTokens: Map<string, MirrorNodeToken> | null;
    routerService: RouterService | null;
    contractTokensMap: Map<string, string> | null;
    assetBalance: string;
    metamask: MetamaskService | null;
    transactionData: TransactionData;
    totalToReceive: string;
    hederaExplorerTx: string;
}

const estimatedFeeHbar = new BigNumber(0.01);
const estimatedFeeTinybar = estimatedFeeHbar.multipliedBy(getValueOfUnit(Unit.Hbar));

function getAccountFromString(accountString: string): AccountId {
    const parts = accountString.split(".");
    return new AccountId({ shard: parseInt(parts[ 0 ]), realm: parseInt(parts[ 1 ]), account: parseInt(parts[ 2 ]) });
}

function constructMemo(address: string | null): string {
    return `${address}`;
}

function padZeros(target: string): string {
    return target.padStart(9, "0");
}

export default defineComponent({
    components: {
        ConnectWalletButton,
        TextInput,
        InterfaceForm,
        Button,
        ModalSuccess,
        ModalWrapTokens,
        IDInput,
        Notice,
        Select,
        MaterialDesignIcon,
        ModalPendingTransfer,
        ViewPendingTransfersButton
    },
    props: {},
    setup(_: object | null, context: SetupContext) {
        const state = reactive<State>({
            amount: "",
            account: null,
            accountString: "",
            memo: "",
            isBusy: false,
            idErrorMessage: "",
            amountErrorMessage: "",
            idValid: false,
            transactionId: "",
            modalSuccessState: {
                isOpen: false,
                hasAction: false
            },
            modalWrapTokensState: {
                isOpen: false,
                isBusy: false,
                noticeText: "",
                depositDisabled: false,
                claimDisabled: true,
                depositBusy: false,
                claimBusy: false,
                depositCompleted: false,
                asset: "",
                receiver: "",
                amount: "",
                serviceFee: "",
                totalToReceive: "",
                hederaNetworkFee: "0.1"
            },
            modalPendingTransfer: {
                isOpen: false,
                isBusy: false,
                noticeText: context.root.$t("interfaceWrapHbar.claim.notice").toString(),
                claimDisabled: false,
                claimBusy: false,
                asset: "",
                receiver: "",
                amount: "",
                serviceFee: "",
                totalToReceive: "",
                pendingTransactions: [],
                transactionIds: [],
                selectedTransaction: "",
                depositCompleted: true,
                metamask: null
            },
            ethAddress: "",
            ethAddressErrorMessage: "",
            serviceFee: "",
            evmTx: null,
            showEthMessage: false,
            wrapAmount: "",
            asset: Asset.Hbar,
            assetNameWithId: Asset.Hbar,
            assetSelectionError: "",
            bridgeTokens: null,
            routerService: null,
            contractTokensMap: null,
            assetBalance: "",
            metamask: null,
            transactionData: null,
            totalToReceive: "",
            hederaExplorerTx: ""
        });

        onMounted(async() => {
            state.routerService = new RouterService();

            const transactions = localStorage.getItem("transactions");
            if (transactions) {
                state.modalPendingTransfer.pendingTransactions = JSON.parse(transactions);
                state.modalPendingTransfer.transactionIds = state.modalPendingTransfer.pendingTransactions.map((t: PendingTransaction) => t.transactionId);
                state.modalPendingTransfer.selectedTransaction = state.modalPendingTransfer.transactionIds[ 0 ];
            }

            await getBridgeTokens();

            if (getters.currentUser() != null) {
                if (getters.currentUserTokens() == null) {
                    actions.refreshBalancesAndRate();
                }
            }
        });

        state.account = getAccountFromString(getters.currentNetwork().bridge?.bridgeAccount!);

        const idInput: Ref<IdInputElement | null> = ref(null);

        function handleAccount(value: string, account: AccountId | null): void {
            state.idErrorMessage = "";
            state.account = account;
        }

        function handleEthAddressInput(value: string | null): void {
            state.ethAddressErrorMessage = "";
            state.ethAddress = value;
        }

        async function getBridgeTokens(): Promise<void> {
            // retrieve from contract
            state.contractTokensMap = await state.routerService?.getAssets()!;
            const tokenIds = [ ...state.contractTokensMap.keys() ].filter((t) => t !== "HBAR");
            const tokens = await actions.getTokens(tokenIds);
            const symbolToToken = new Map<string, MirrorNodeToken>();

            for (const token of tokens) {
                symbolToToken.set(token.symbol, token);
            }

            state.bridgeTokens = symbolToToken;
        }

        watch(
            () => state.account,
            (newValue: AccountId | null) => {
                if (newValue) {
                    state.accountString = `${newValue.shard}.${newValue.realm}.${newValue.account}`;
                }
            }
        );

        const tokens = computed(() => getters.currentUserTokens() || []);

        const isAmountValid = computed(() => {
            if (state.amount) {
                return (
                    new BigNumber(state.amount).isGreaterThan(new BigNumber(0)) && validateHbar(state.amount) && new BigNumber(state.amount).isLessThanOrEqualTo(new BigNumber(state.assetBalance))
                );
            }
            return false;
        });

        const isMetamaskConnected = computed(() => state.metamask);

        const isEthAddressValid = computed(() => {
            if (state.ethAddress) {
                return (
                    Web3.utils.isAddress(state.ethAddress)
                );
            }
            return false;
        });

        const scaleFactor = computed(() => {
            const decimals = tokens.value!.filter(
                (token) => token.tokenId.toString() === state.bridgeTokens?.get(state.asset)?.token_id
            )[ 0 ].decimals;

            return new BigNumber(
                Math.pow(10, decimals)
            );
        });

        function validateTokenBalance(amount: BigNumber): boolean {
            const adjustedAmount = amount.multipliedBy(scaleFactor.value);
            if (tokens.value != null) {
                return tokens.value.filter(
                    (token) => token.tokenId.toString() === state.bridgeTokens?.get(state.asset)?.token_id
                )[ 0 ].balance.isGreaterThan(adjustedAmount);
            }
            return false;
        }

        const amount = computed(() => {
            if (state.amount) {
                return formatHbar(new BigNumber(state.amount));
            }
            return formatHbar(new BigNumber(0));
        });

        const isSelectedAssetValid = computed(() => {
            if (state.assetSelectionError) {
                return false;
            }

            return true;
        });

        const bridgeTokens = computed(() => {
            if (state.bridgeTokens) {
                return [ ...state.bridgeTokens.keys() ];
            }
            return [];
        });

        const availableAssets = computed(() => {
            if (bridgeTokens.value.length > 0) {
                const assetsWithNameAndId = [];
                assetsWithNameAndId.push(Asset.Hbar);
                state.bridgeTokens!.forEach((token: MirrorNodeToken, symbol: string) => {
                    assetsWithNameAndId.push(`${symbol} (${token.token_id})`);
                });
                return assetsWithNameAndId;
            }
            state.assetBalance = getters.currentUserBalance()?.toString()!;
            return [ Asset.Hbar ];
        });

        const truncate = computed(() => amount.value && amount.value.length > 15 ?
            `${amount.value.slice(0, 13)}...` :
            amount.value);

        const isTokenAmountValid = computed(() => {
            if (state.amount) {
                const bigAmount = new BigNumber(state.amount);
                return (
                    !bigAmount.isNaN() &&
                    bigAmount.isGreaterThan(new BigNumber(0)) &&
                    validateTokenBalance(bigAmount)
                );
            }
            return false;
        });

        function handleHbarAmount(amount: string): boolean {
            state.amountErrorMessage = null;
            state.amount = amount;

            return isAmountValid.value;
        }

        function handleAmount(amount: string): boolean {
            return state.asset === Asset.Hbar ? handleHbarAmount(amount) : handleTokenAmount(amount);
        }

        function handleTokenAmount(amount: string): boolean {
            state.amountErrorMessage = null;
            state.amount = amount;

            if (!isTokenAmountValid.value) {
                if (state.amount === "") {
                    state.amountErrorMessage = null;
                } else if (
                    // slight reproduction of effort
                    new BigNumber(state.amount).isNaN() ||
                    new BigNumber(state.amount).isLessThanOrEqualTo(new BigNumber(0))) {
                    state.amountErrorMessage = context.root.$t("interfaceSendToken.invalidAmount").toString();
                } else {
                    state.amountErrorMessage = context.root.$t("interfaceSendToken.insufficientTokenBalance").toString();
                }
                return false;
            }

            return true;
        }

        async function handleShowModalWrapTokens(): Promise<void> {
            if (!handleAmount(state.amount!)) {
                return;
            }
            const contractServiceFee = getters.currentNetwork().bridge?.serviceFee!;
            const amountBn = new BigNumber(state.amount ? state.amount : 0);
            const serviceFee = amountBn.multipliedBy(contractServiceFee).dividedBy(100000);
            state.totalToReceive = amountBn.minus(serviceFee).toString();

            state.modalWrapTokensState.noticeText = context.root.$t("interfaceWrapHbar.deposit.notice", { amount: state.amount?.toString(), asset: state.asset }).toString();
            state.modalWrapTokensState.asset = state.asset;
            state.modalWrapTokensState.receiver = formatEthAddress();
            state.modalWrapTokensState.amount = state.amount?.toString()!;
            state.modalWrapTokensState.serviceFee = serviceFee.toString();
            state.modalWrapTokensState.totalToReceive = state.totalToReceive;
            state.modalWrapTokensState.isOpen = true;
        }

        function formatEthAddress(): string {
            return `${state.ethAddress?.substr(0, 6)}...${state.ethAddress?.substr(state.ethAddress.length - 6)}`;
        }

        // Taken from [UnitConverter]
        function boundInput(
            event: Event,
            inputValue: string,
            stateValue: string
        ): void {
            // If the computed value from the round-trip from {input} -> left -> right
            // is different than {input} then we should replace {input} so as
            // to prevent typing more

            const computedValueNum = new BigNumber(stateValue);
            const valueNum = new BigNumber(inputValue);

            if (!computedValueNum.eq(valueNum)) {
                // Computed value is different from input value; replace
                (event.target as HTMLInputElement).value = stateValue;
            } else {
                // Strip non-digit chars from input
                (event.target as HTMLInputElement).value = inputValue.replace(
                    /[^\d.]/,
                    ""
                );
            }
        }

        // Taken from [UnitConverter]
        function handleInput(value: string, event: Event): void {
            if (!/^\d*\.?\d*$/.test(value)) {
                value = state.amount || "";
            }

            state.amount = value;
            state.amountErrorMessage = "";

            boundInput(event, value, state.amount);
        }

        async function handleError(error: { status: { code: number }; name: string }): Promise<void> {
            // eslint-disable-next-line require-atomic-updates
            state.idErrorMessage = "";
            // eslint-disable-next-line require-atomic-updates
            state.amountErrorMessage = "";

            const { HederaStatusError, Status } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");

            if (error instanceof HederaStatusError) {
                const errorMessage = (await actions.handleHederaError({
                    error,
                    showAlert: false
                })).message;

                // Small duplication of effort to assign errorMessage to correct TextInput
                switch (error.status.code) {
                    case Status.InvalidAccountId.code:
                    case Status.AccountRepeatedInAccountAmounts.code:
                        state.idErrorMessage = errorMessage;
                        break;
                    case Status.InsufficientAccountBalance.code:
                        state.amountErrorMessage = errorMessage;
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
                actions.handleLedgerError({
                    error,
                    showAlert: true
                });
            } else {
                throw error;
            }
        }

        function handleSelectChange(changedTo: string): void {
            state.asset = changedTo.split(" ")[ 0 ];
            if (state.asset === Asset.Hbar) {
                state.assetSelectionError = "";
                state.assetBalance = getters.currentUserBalance()?.toString()!;
                return;
            }

            const tokenId = state.bridgeTokens?.get(state.asset)?.token_id;
            if (!tokenId) {
                state.assetBalance = "0";
                state.assetSelectionError = "EVM Token not found";
                return;
            }

            if (tokens.value.length === 0) {
                state.assetBalance = "0";
                // state.assetSelectionError = "You are not associated to any tokens.";
                return;
            }

            const tokenIds = tokens.value.map(({ tokenId }) => tokenId.toString());
            if (!tokenIds.includes(tokenId)) {
                state.assetBalance = "0";
                // state.assetSelectionError = `You need to associate to token ${changedTo}`;
                return;
            }
            const token = tokens.value.find((t) => t.tokenId.toString() === tokenId);

            state.assetBalance = token?.balance.div(10 ** token.decimals).toString()!;
            state.assetSelectionError = "";
        }

        async function handleTokenTransfer(): Promise<void> {
            const recipient: AccountId | null = state.account;
            const tokenId = TokenId.fromString(state.bridgeTokens?.get(state.asset)?.token_id!);
            const client = getters.currentUser().session.client as Client;

            const transactionId = await tokenTransfer(
                tokenId!,
                recipient!,
                new BigNumber(
                    state.amount!
                ).multipliedBy(scaleFactor.value),
                constructMemo(state.ethAddress),
                client
            );

            const receipt = await transactionId.getReceipt(client);

            if (receipt != null) {
                const { shard, realm, account } = transactionId.accountId;
                const { seconds, nanos } = transactionId.validStart;

                // build the transaction id from the data.
                state.transactionId = `${shard}.${realm}.${account}-${seconds}-${padZeros(nanos.toString())}`; // padding nanoseconds due to mirror node retrieval
                handleValidatorTransactionData(state.transactionId);
            }

            // Refresh Balance
            await actions.refreshBalancesAndRate();

            actions.alert({
                message: context.root.$t("interfaceSendToken.sentToken").toString(),
                level: "success"
            });
        }

        async function visualizeSuccessModal(receipt: TransactionReceipt): Promise<void> {
            state.hederaExplorerTx = `${getters.currentNetwork().bridge?.mirrorNodeUrl}transactions/${state.transactionId}`;
            state.evmTx = `${getters.currentNetwork().bridge?.explorerTxUrl}${receipt.transactionHash}`;

            await actions.refreshBalancesAndRate();
            state.modalWrapTokensState.isOpen = false;
            state.modalPendingTransfer.isOpen = false;
            state.modalSuccessState.isOpen = true;
            state.isBusy = false;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async function handleModalSuccessDismiss(error: any, receipt: TransactionReceipt): Promise<void> {
            if (receipt) {
                visualizeSuccessModal(receipt.transactionHash);
                return;
            }

            state.modalSuccessState.isOpen = false;
            state.isBusy = false;
            state.amount = "";
            state.memo = "";
            state.ethAddress = "";
            state.serviceFee = "";
            state.evmTx = null;
            state.showEthMessage = false;
            state.asset = Asset.Hbar;
            state.assetBalance = getters.currentUserBalance()?.toString()!;
            state.assetNameWithId = Asset.Hbar;
            state.modalWrapTokensState = {
                isOpen: false,
                isBusy: false,
                noticeText: "",
                depositDisabled: false,
                claimDisabled: true,
                depositBusy: false,
                claimBusy: false,
                depositCompleted: false,
                asset: "",
                receiver: "",
                amount: "",
                serviceFee: "",
                totalToReceive: "",
                hederaNetworkFee: "0.1"
            };
        }

        async function handleValidatorTransactionData(transactionId: string): Promise<void> {
            clearInterval(transactionInterval);
            transactionInterval = setInterval(async() => {
                const transactionData = await txData(transactionId);
                if (transactionData && transactionData.majority === true) {
                    state.transactionData = transactionData;
                    state.modalWrapTokensState.noticeText = context.root.$t("interfaceWrapHbar.claim.notice", { amount: state.totalToReceive, asset: state.asset }).toString();
                    state.modalWrapTokensState.depositBusy = false;
                    state.modalWrapTokensState.depositDisabled = true;
                    state.modalWrapTokensState.depositCompleted = true;
                    state.modalWrapTokensState.claimDisabled = false;
                    clearInterval(transactionInterval);
                }
            }, 5000);
        }

        async function getValidatorTransactionData(transactionId: string): Promise<void> {
            const transactionData = await txData(transactionId);
            if (transactionData && transactionData.majority === true) {
                state.transactionData = transactionData;
            }
        }

        async function mint(transactionId: string, transactionData: TransactionData): Promise<void> {
            if (!transactionData) {
                await getValidatorTransactionData(transactionId);
            }
            const bytesTransactionId = Web3.utils.fromAscii(transactionId);
            const signatures = [];
            for (const signature of transactionData.signatures) {
                signatures.push(`0x${signature}`);
            }

            try {
                await state.metamask?.mint(bytesTransactionId,
                    transactionData.wrappedAsset,
                    transactionData.recipient,
                    transactionData.amount,
                    signatures,
                    handleTransactionHash,
                    visualizeSuccessModal,
                    handleModalSuccessDismiss);
                // Remove transaction from local storage
                state.modalPendingTransfer.pendingTransactions = state.modalPendingTransfer.pendingTransactions.filter((t) => t.transactionId !== transactionId);
                localStorage.removeItem("transactions");
                localStorage.setItem("transactions", JSON.stringify(state.modalPendingTransfer.pendingTransactions));
            } catch (error) {
                console.log(error);
            }
        }

        function handleTransactionHash(): void {
            state.modalWrapTokensState.noticeText = context.root.$t("interfaceWrapHbar.waitForClaim").toString();
        }

        async function handleDeposit(): Promise<void> {
            state.modalWrapTokensState.noticeText = context.root.$t("interfaceWrapHbar.waitForDeposit").toString();
            state.modalWrapTokensState.depositBusy = true;
            try {
                if (state.asset === Asset.Hbar) {
                    await handleHbarTransfer();
                } else {
                    await handleTokenTransfer();
                }
            } catch (error) {
                handleError(error);
            } finally {
                // Save transaction to local storage (FIX: Probably not in finally)
                const transactions = localStorage.getItem("transactions");
                if (transactions) {
                    const pendingTransactions = JSON.parse(transactions);
                    pendingTransactions.push({
                        transactionId: state.transactionId,
                        asset: state.modalWrapTokensState.asset,
                        amount: state.modalWrapTokensState.amount,
                        receiver: state.ethAddress,
                        serviceFee: state.modalWrapTokensState.serviceFee,
                        totalToReceive: state.modalWrapTokensState.totalToReceive
                    });
                    localStorage.setItem("transactions", JSON.stringify(pendingTransactions));
                } else {
                    const pendingTransactions = [];
                    pendingTransactions.push({
                        transactionId: state.transactionId,
                        asset: state.modalWrapTokensState.asset,
                        amount: state.modalWrapTokensState.amount,
                        receiver: state.ethAddress,
                        serviceFee: state.modalWrapTokensState.serviceFee,
                        totalToReceive: state.modalWrapTokensState.totalToReceive
                    });
                    localStorage.setItem("transactions", JSON.stringify(pendingTransactions));
                }
                state.modalWrapTokensState.noticeText = context.root.$t("interfaceWrapHbar.waitForConfirmations").toString();
            }
        }

        async function handleHbarTransfer(): Promise<void> {
            const client = getters.currentUser().session.client;
            if (state.account == null) {
                throw new Error(context.root
                    .$t("common.error.nullAccountOnInterface")
                    .toString());
            }

            if (state.amount == null) {
                throw new Error(context.root
                    .$t("common.error.nullTransferAmount")
                    .toString());
            }

            const recipient: AccountId | null = state.account;
            const { CryptoTransferTransaction, Hbar } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");
            const sendAmount = new Hbar(state.amount);

            const tx = new CryptoTransferTransaction()
                .addSender(
                    getters.currentUser().session.account,
                    sendAmount
                )
                .addRecipient(recipient, sendAmount)
                .setMaxTransactionFee(Hbar.fromTinybar(estimatedFeeTinybar));

            state.memo = constructMemo(state.ethAddress);

            if (state.memo == null || state.memo === "") {
                state.memo = " "; // Hack for Nano X paging
            }

            tx.setTransactionMemo(state.memo);

            const transactionIntermediate = await tx.execute(client);
            const receipt = await transactionIntermediate.getReceipt(client);

            if (receipt != null) {
                const { shard, realm, account } = transactionIntermediate.accountId;
                const { seconds, nanos } = transactionIntermediate.validStart;

                // build the transaction id from the data.
                state.transactionId = `${shard}.${realm}.${account}-${seconds}-${padZeros(nanos.toString())}`; // padding nanoseconds due to mirror node retrieval
                handleValidatorTransactionData(state.transactionId);
            }

            // Refresh Balance
            await actions.refreshBalancesAndRate();
        }

        function handleClaim(): void {
            state.modalWrapTokensState.claimBusy = true;
            state.modalWrapTokensState.noticeText = context.root.$t("interfaceWrapHbar.claim.metamaskConfirmation").toString();
            // In the case of claim from modal: state.modalPendingTransfer.selectedTransaction
            if (state.transactionId !== "") {
                mint(state.transactionId, state.transactionData);
            } else {
                state.transactionId = state.modalPendingTransfer.selectedTransaction;
                state.totalToReceive = state.modalPendingTransfer.totalToReceive;
                state.ethAddress = state.modalPendingTransfer.receiver;
                state.asset = state.modalPendingTransfer.asset;
                state.modalPendingTransfer.claimBusy = true;
                mint(state.modalPendingTransfer.selectedTransaction, state.transactionData);
            }
        }

        async function handleConnectToMetamask(): Promise<void> {
            if (state.metamask) {
                actions.alert({
                    message: "Metamask already connected",
                    level: "success"
                });
                return;
            }
            const metamask = new MetamaskService();
            await metamask.initWeb3();
            state.metamask = metamask;
            state.modalPendingTransfer.metamask = metamask;
            if (state.transactionData && state.transactionData.majority === true) {
                state.modalPendingTransfer.claimDisabled = false;
            }
            // state.metamaskAddress = metamask.selectedAddress();
            actions.alert({
                message: "Metamask successfully connected",
                level: "success"
            });
        }

        function handleChangeSelectedPendingTransaction(transaction: PendingTransaction): void {
            state.modalPendingTransfer.claimDisabled = true;
            if (state.transactionData) {
                state.transactionData.majority = false;
            }
            state.modalPendingTransfer.amount = transaction.selectedTransaction[ 0 ].amount;
            state.modalPendingTransfer.asset = transaction.selectedTransaction[ 0 ].asset;
            state.ethAddress = transaction.selectedTransaction[ 0 ].receiver;
            state.modalPendingTransfer.receiver = formatEthAddress();
            state.modalPendingTransfer.serviceFee = transaction.selectedTransaction[ 0 ].serviceFee;
            state.modalPendingTransfer.totalToReceive = transaction.selectedTransaction[ 0 ].totalToReceive;
            state.modalPendingTransfer.noticeText = context.root.$t("interfaceWrapHbar.waitForConfirmations").toString();
            // Check for majority
            clearInterval(transactionInterval);
            transactionInterval = setInterval(async() => {
                const transactionData = await txData(state.modalPendingTransfer.selectedTransaction);
                if (transactionData && transactionData.majority === true) {
                    state.transactionData = transactionData;
                    state.modalPendingTransfer.noticeText = context.root.$t("interfaceWrapHbar.claim.notice", { amount: state.modalPendingTransfer.totalToReceive, asset: state.modalPendingTransfer.asset }).toString();
                    if (state.modalPendingTransfer.metamask) {
                        state.modalPendingTransfer.claimDisabled = false;
                    }
                    clearInterval(transactionInterval);
                }
            }, 5000);
        }

        function handleViewPendingTransfers(): void {
            handleChangeSelectedPendingTransaction({ selectedTransaction: [ state.modalPendingTransfer.pendingTransactions[ 0 ] ]});
            state.modalPendingTransfer.isOpen = true;
        }

        function handleModalWrapTokensChange(): void {
            state.isBusy = false;
            state.amount = "";
            state.memo = "";
            state.ethAddress = "";
            state.serviceFee = "";
            state.evmTx = null;
            state.showEthMessage = false;
            state.asset = Asset.Hbar;
            state.assetBalance = getters.currentUserBalance()?.toString()!;
            state.assetNameWithId = Asset.Hbar;
            state.modalWrapTokensState = {
                isOpen: false,
                isBusy: false,
                noticeText: "",
                depositDisabled: false,
                claimDisabled: true,
                depositBusy: false,
                claimBusy: false,
                depositCompleted: false,
                asset: "",
                receiver: "",
                amount: "",
                serviceFee: "",
                totalToReceive: "",
                hederaNetworkFee: "0.1"
            };
        }

        function handleModalPendingTransferChange(): void {
            state.isBusy = false;
            state.amount = "";
            state.memo = "";
            state.ethAddress = "";
            state.serviceFee = "";
            state.evmTx = null;
            state.showEthMessage = false;
            state.asset = Asset.Hbar;
            state.assetBalance = getters.currentUserBalance()?.toString()!;
            state.assetNameWithId = Asset.Hbar;
        }

        return {
            amount,
            state,
            isAmountValid,
            hbarSuffix: Unit.Hbar,
            tinybarSuffix: Unit.Tinybar,
            idInput,
            handleModalSuccessDismiss,
            handleShowModalWrapTokens,
            truncate,
            handleInput,
            handleAccount,
            isEthAddressValid,
            handleEthAddressInput,
            mdiHelpCircleOutline,
            mdiLaunch,
            availableAssets,
            handleSelectChange,
            isSelectedAssetValid,
            handleDeposit,
            handleClaim,
            handleConnectToMetamask,
            isMetamaskConnected,
            handleChangeSelectedPendingTransaction,
            handleViewPendingTransfers,
            handleModalWrapTokensChange,
            handleModalPendingTransferChange
        };
    }
});
</script>
<style lang="postcss" scoped>
.pending-transfer-bar{
    background-color:  var(--color-sheer-peach);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    padding-left: 30px;
    padding-right: 20px;
    margin-bottom: 20px;
}

.pending-transfer-text{
    color: var(--color-china-blue);
    font-size: 14px;
}

.pending-transfer-button{
    /* background: rgba(30, 147, 255, 0.1);
    border-radius: 5px;
    border: 1px solid rgba(30, 147, 255, 0.1);
    color: #1E93FF;
    font-size: 13px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    line-height: 15px;
    outline: none;
    padding: 5px;
    position: relative;
    user-select: none;
    white-space: nowrap;
    align-items: center;
    cursor: pointer; */
    padding: 0;
    border-radius: 5px;
}

.label{
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    line-height: 15px;
    display: inline-block;
    font-size: 16px;
    height: 24px;
    padding: 0 8px;
}

.connect-wallet-bar{
    text-align: right;
    height: 0px;
}

.balance-container{
    display:block;
    position: relative;
    top: 20px;
    text-align: right;
}

.label-small{
    font-family: Montserrat;
    font-style: normal;
    font-size: 12px;
    color: #828282;
    margin: 3px;
}

.balance-value{
    font-family: Montserrat;
    font-style: normal;
    font-size: 12px;
    font-weight: 700;
    margin: 3px;
}

.submit-options{
    display: inline-block;
}

.submit-options input{
    margin: 3px;
    background-color: #62C0AA;
}

.success > span:first-of-type {
    display: block;
    padding-block-end: 20px;
}

.success p{
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #828282;
}

.success strong{
    color: black;
}

.success .transactions-list p{
    color: #BDBDBD;
    margin: 0;
}
.success .transactions-list a{
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: #62C0AA;
}
.success .transactions-list{
    margin-top: 50px;
    text-align: center;
}

.error {
    color: var(--color-lightish-red);
    font-size: 14px;
    margin: 7px 0 0 15px;
}

.launch-icon{
    width: 18px;
}
</style>

<style lang="postcss">
#wrapHbar .form-main{
    grid-row-gap: 0px !important;
}

#wrapHbar .select-value-container {
    border: 1px solid #62c0aa;
    border-radius: 4px;
    box-sizing: border-box;
    width: 145px;
    margin-bottom: 13px;
}

#wrapHbar .select-value-container {
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: bold;
    line-height: 17px;
}

#wrapHbar .select-option {
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: bold;
    line-height: 17px;
    width: 145px;
}

#wrapHbar .select-menu {
    width: 145px;
}

#wrapHbar .icon {
    color: #62c0aa;
}
</style>
