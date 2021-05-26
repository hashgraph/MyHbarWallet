<template>
    <div id="unwrapHbar">
        <InterfaceForm
            :title="$t('interfaceUnwrapWHbar.title')"
            :description="$t('interfaceUnWrapHbar.description')"
        >
            <span class="connect-wallet-bar">
                <ConnectWalletButton
                    :address="state.metamask ? state.metamask.croppedSelectedAddress() : $t('interfaceWrapHbar.connectWallet')"
                    @connect="handleConnectToMetamask"
                />
            </span>
            <span class="label">{{ $t('interfaceWrapHbar.assetLabel') }}</span>
            <Select
                v-model="state.asset"
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

            <IDInput
                ref="idInput"
                class="account"
                :error="state.idErrorMessage"
                :valid="state.accountValid"
                :label="$t('common.toAccount')"
                show-validation
                @input="handleAccount"
                @valid="handleAccountValid"
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
                <!-- <Button
                    :busy="state.isBusy"
                    :disabled="!isEthAddressValid || !isAmountValid || !isSelectedAssetValid"
                    :label="$t('interfaceWrapHbar.transferButton')"
                    @click="handleShowSummary"
                /> -->
                <Button
                    :busy="state.isBusy"
                    :disabled="!isAmountValid || !isAssetValid || !state.accountValid || !isMetamaskConnected"
                    :label="$t('interfaceWrapHbar.transferButton')"
                    @click="handleShowModalUnWrapTokens"
                />
            </template>

            <ModalSuccess
                v-model="state.modalSuccessState"
                @dismiss="handleModalSuccessDismiss"
            >
                <div class="success">
                    <p>Transferred <strong>{{ state.totalToReceive }} {{ state.asset }}</strong> to <strong>{{ state.accountString }}</strong></p>
                    <div class="transactions-list">
                        <p>{{ $t("interfaceWrapHbar.transaction.list.title") }}</p>
                        <a
                            :href="state.evmExplorerTx"
                            target="_blank"
                        >{{ $t("interfaceWrapHbar.evm.transaction") }}
                            <MaterialDesignIcon
                                class="launch-icon"
                                :icon="mdiLaunch"
                            />
                        </a><br>
                        <a
                            :href="state.hederaExplorerTx"
                            target="_blank"
                        >{{ $t("interfaceWrapHbar.hedera.transaction") }}
                            <MaterialDesignIcon
                                class="launch-icon"
                                :icon="mdiLaunch"
                            />
                        </a>
                    </div>
                </div>
            </ModalSuccess>

            <ModalUnwrapTokens
                v-model="state.modalUnWrapTokensState"
                @deposit="handleDeposit"
            />
        </InterfaceForm>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, Ref, SetupContext, watch } from "@vue/composition-api";
import { TransactionReceipt } from "web3-core";
import { BigNumber } from "bignumber.js";
import { AccountId, Client } from "@hashgraph/sdk";
import { mdiLaunch, mdiHelpCircleOutline } from "@mdi/js";
import { bytesToHex } from "web3-utils";
import { Signature } from "@ethersproject/bytes";

import TextInput from "../../components/TextInput.vue";
import InterfaceForm from "../../components/InterfaceForm.vue";
import Button from "../../components/Button.vue";
import IDInput, { IdInputElement } from "../../components/IDInput.vue";
import { Unit } from "../../../service/units";
import { RouterService, WrappedAsset } from "../../../service/bridge/contracts/router/router";
import { TokenService } from "../../../service/bridge/contracts/token/token";
import { InfuraProviderService } from "../../../service/bridge/provider/infura-provider";
import { MetamaskService } from "../../../service/bridge/metamask/metamask";
import { Permit, Domain, permitData } from "../../../service/bridge/contracts/permit";
import ModalSuccess, { State as ModalSuccessState } from "../../components/ModalSuccess.vue";
import Notice from "../../components/Notice.vue";
import { actions, getters } from "../../store";
import { eventTx } from "../../../service/hedera-validator";
import Select from "../../components/Select.vue";
import ModalUnwrapTokens, { State as ModalUnwrapTokensState } from "../../components/bridge/ModalUnwrapTokens.vue";
import ConnectWalletButton from "../../components/bridge/ConnectWalletButton.vue";
import MaterialDesignIcon from "../../components/MaterialDesignIcon.vue";
import { getTokens } from "../../../service/hedera";
import { Asset } from "../../../domain/transfer";
import { LoginMethod } from "../../../domain/wallets/wallet";

let transactionInterval: number = null;

// Defined in vue.config.js.

interface State {
    amount: string | null;
    account: AccountId | null;
    accountString: string | null;
    accountValid: boolean | null;
    isBusy: boolean;
    idErrorMessage: string | null;
    amountErrorMessage: string | null;
    idValid: boolean;
    modalSuccessState: ModalSuccessState;
    modalUnWrapTokensState: ModalUnwrapTokensState;
    asset: string;
    assetSelectionError: string;
    bridgeTokens: Map<string, WrappedAsset> | null;
    providerService: InfuraProviderService | null;
    routerService: RouterService | null;
    tokenService: TokenService | null;
    contractTokens: WrappedAsset[];
    assetBalance: string;
    metamask: MetamaskService | null;
    totalToReceive: string;
    hederaExplorerTx: string;
    evmExplorerTx: string;
}

function oneHourDeadline(currentTimestamp: number): number {
    const oneHour = 60 * 60;
    return currentTimestamp + oneHour;
}

export default defineComponent({
    components: {
        ConnectWalletButton,
        TextInput,
        InterfaceForm,
        Button,
        ModalSuccess,
        ModalUnwrapTokens,
        IDInput,
        Notice,
        Select,
        MaterialDesignIcon
    },
    props: {},
    setup(_: object | null, context: SetupContext) {
        const state = reactive<State>({
            amount: "",
            account: null,
            accountString: "",
            accountValid: null,
            isBusy: false,
            idErrorMessage: "",
            amountErrorMessage: "",
            idValid: false,
            modalSuccessState: {
                isOpen: false,
                hasAction: false
            },
            modalUnWrapTokensState: {
                isOpen: false,
                isBusy: false,
                noticeText: "",
                depositDisabled: false,
                depositBusy: false,
                depositCompleted: false,
                asset: "",
                receiver: "",
                amount: "",
                serviceFee: "",
                totalToReceive: ""
            },
            asset: "",
            assetSelectionError: "",
            bridgeTokens: null,
            providerService: null,
            routerService: null,
            contractTokens: [],
            assetBalance: "0",
            metamask: null,
            totalToReceive: "",
            hederaExplorerTx: "",
            evmExplorerTx: "",
            tokenService: null
        });

        onMounted(async() => {
            state.routerService = new RouterService();
            state.tokenService = new TokenService();
            await getBridgeTokens();
        });

        const bridgeTokens = computed(() => {
            if (state.bridgeTokens) {
                return [ ...state.bridgeTokens.keys() ];
            }
            return [];
        });

        const idInput: Ref<IdInputElement | null> = ref(null);

        function handleAccount(value: string, account: AccountId | null): void {
            state.idErrorMessage = "";
            state.account = account;
        }

        async function getBridgeTokens(): Promise<void> {
            // retrieve from contract
            state.contractTokens = await state.routerService?.getWrappedAssets()!;
            const symbolToToken = new Map<string, WrappedAsset>();

            for (const token of state.contractTokens) {
                symbolToToken.set(token.symbol, token);
            }

            state.bridgeTokens = symbolToToken;
            state.asset = state.bridgeTokens.keys().next().value;
        }

        watch(
            () => state.account,
            (newValue: AccountId | null) => {
                if (newValue) {
                    state.accountString = `${newValue.shard}.${newValue.realm}.${newValue.account}`;
                }
            }
        );

        function handleAccountValid(valid: boolean): void {
            state.accountValid = valid;
        }

        const isAmountValid = computed(() => {
            if (state.amount) {
                const bigAmount = new BigNumber(state.amount);
                return (
                    !bigAmount.isNaN() &&
                    bigAmount.isGreaterThan(new BigNumber(0))
                );
            }
            return false;
        });

        const isAssetValid = computed(() => {
            if (state.asset) {
                return true;
            }

            return false;
        });

        const isMetamaskConnected = computed(() => state.metamask);

        const isSelectedAssetValid = computed(() => {
            if (state.assetSelectionError) {
                return false;
            }

            return true;
        });

        const availableAssets = computed(() => {
            if (bridgeTokens.value.length > 0) {
                return bridgeTokens.value;
            }

            return [];
        });

        async function handleAmount(amount: string): Promise<boolean> {
            state.amountErrorMessage = null;
            state.amount = amount;

            const asset = state.bridgeTokens?.get(state.asset);
            const balance = await state.tokenService?.balanceOf(
                asset.address,
                state.metamask!.selectedAddress());

            const balanceBn = new BigNumber(balance!);
            const amountBn = new BigNumber(amount).multipliedBy(10 ** asset.decimals);

            const isLessThan = amountBn.isLessThan(balanceBn);

            if (!isLessThan) {
                state.amountErrorMessage = context.root.$t("interfaceSendToken.insufficientTokenBalance").toString();
                return false;
            }

            return true;
        }

        async function isReceiverAssociated(): Promise<boolean> {
            const nativeAsset = state.bridgeTokens?.get(state.asset).nativeAsset!;
            if (nativeAsset.toLowerCase() === Asset.Hbar.toLowerCase()) {
                return true;
            }

            try {
                const client = getters.currentUser().session.client as Client;
                const tokens = await getTokens(state.account!, client as Client);

                for (const token of tokens!) {
                    if (token.tokenId.toString() === nativeAsset) {
                        return true;
                    }
                }
            } catch (error) {
                handleError(error);
            }
            state.idErrorMessage = context.root.$t("interfaceUnwrapWHbar.tokenNotAssociated", { wrappedAsset: state.asset, nativeAsset }).toString();

            return false;
        }

        async function handleShowModalUnWrapTokens(): Promise<void> {
            const isValidAmount = await handleAmount(state.amount!);
            if (!isValidAmount) {
                return;
            }

            const validAccount = await isReceiverAssociated();
            if (!validAccount) {
                return;
            }

            const contractServiceFee = getters.currentNetwork().bridge?.serviceFee!;
            const amountBn = new BigNumber(state.amount ? state.amount : 0);
            const serviceFee = amountBn.multipliedBy(contractServiceFee).dividedBy(100000);
            state.totalToReceive = amountBn.minus(serviceFee).toString();

            // state.modalUnWrapTokensState.noticeText = context.root.$t("interfaceWrapHbar.deposit.notice", { amount: state.amount?.toString(), asset: state.asset }).toString();
            state.modalUnWrapTokensState.asset = state.asset;
            state.modalUnWrapTokensState.receiver = state.accountString!;
            state.modalUnWrapTokensState.amount = state.amount?.toString()!;
            state.modalUnWrapTokensState.serviceFee = serviceFee.toString();
            state.modalUnWrapTokensState.totalToReceive = state.totalToReceive;
            state.modalUnWrapTokensState.noticeText = context.root.$t("interfaceUnWrapHbar.deposit.notice", { amount: state.amount?.toString(), asset: state.asset }).toString();
            state.modalUnWrapTokensState.depositBusy = false;
            state.modalUnWrapTokensState.depositDisabled = false;
            state.modalUnWrapTokensState.depositCompleted = false;
            state.modalUnWrapTokensState.isOpen = true;
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

            // const roundTrippedAmount = convert(
            //     state.amount,
            //     Unit.Hbar,
            //     Unit.Tinybar,
            //     false
            // );

            // state.amount = convert(
            //     roundTrippedAmount,
            //     Unit.Tinybar,
            //     Unit.Hbar,
            //     false
            // );

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

        async function handleSelectChange(changedTo: string): Promise<void> {
            state.asset = changedTo;
            if (!state.metamask) {
                state.assetSelectionError = "";
                state.assetBalance = "0";
                return;
            }

            state.assetBalance = await getBalance();
            state.assetSelectionError = "";
        }

        async function visualizeSuccessModal(): Promise<void> {
            await actions.refreshBalancesAndRate();
            state.modalUnWrapTokensState.isOpen = false;
            state.modalSuccessState.isOpen = true;
            state.isBusy = false;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async function handleModalSuccessDismiss(error: any, receipt: TransactionReceipt = null): Promise<void> {
            if (receipt) {
                visualizeSuccessModal();
                return;
            }

            state.modalSuccessState.isOpen = false;
            state.isBusy = false;
            state.amount = "";
            state.account = null;
            state.accountString = "";
            (idInput.value! as IdInputElement).clear();
            state.assetBalance = await getBalance();
            state.hederaExplorerTx = "";
            state.evmExplorerTx = "";
            state.modalUnWrapTokensState = {
                isOpen: false,
                isBusy: false,
                noticeText: "",
                depositBusy: false,
                depositCompleted: false,
                depositDisabled: false,
                asset: "",
                receiver: "",
                amount: "",
                serviceFee: "",
                totalToReceive: ""
            };
        }

        async function handleBlockConfirmations(receipt: TransactionReceipt): Promise<void> {
            const targetBlock = receipt.blockNumber + getters.currentNetwork().bridge?.blockConfirmations;
            clearInterval(transactionInterval);
            transactionInterval = setInterval(async() => {
                const latestBlock = await state.tokenService?.getLatestBlock()!;
                if (latestBlock >= targetBlock) {
                    const latestReceipt = await state.tokenService?.getTransactionReceipt(receipt.transactionHash);
                    if (!latestReceipt) {
                        state.modalUnWrapTokensState.noticeText = context.root.$t("interfaceUnWrapHbar.networkReorganised").toString();
                        return;
                    }

                    if (latestReceipt.blockNumber !== receipt.blockNumber) {
                        state.modalUnWrapTokensState.noticeText = context.root.$t("interfaceUnWrapHbar.networkReorganised").toString();
                        return;
                    }

                    clearInterval(transactionInterval);
                    handleHederaTxRetrieval(`${receipt.transactionHash}-${receipt.events.Burn.logIndex}`);
                }
            }, 5000);
        }

        async function handleHederaTxRetrieval(eventID: string): Promise<void> {
            clearInterval(transactionInterval);
            transactionInterval = setInterval(async() => {
                const txId = await eventTx(eventID);
                if (txId) {
                    state.hederaExplorerTx = `${getters.currentNetwork().bridge?.mirrorNodeUrl}transactions/${txId}`;
                    clearInterval(transactionInterval);
                    visualizeSuccessModal();
                }
            }, 5000);
        }

        async function handleDeposit(): Promise<void> {
            state.modalUnWrapTokensState.noticeText = context.root.$t("interfaceWrapHbar.claim.metamaskConfirmation").toString();
            state.modalUnWrapTokensState.depositBusy = true;
            const asset = state.bridgeTokens?.get(state.asset);

            try {
                const deadline = oneHourDeadline(await state.routerService!.getLatestBlockTimestamp());
                const amountBn = new BigNumber(state.amount!).multipliedBy(10 ** asset.decimals);
                const data = await unsignedData(asset.address, amountBn.toNumber(), deadline);
                const signature = await state.metamask!.signTypedV4Data(data);
                await burnWithPermit(asset.address, state.account!._toProto().serializeBinary(), amountBn.toString(), deadline, signature);
            } catch (error) {
                handleModalSuccessDismiss(error);
            }
        }

        async function burnWithPermit(contractAddress: string, account: Uint8Array, amount: string, deadline: number, signature: Signature): Promise<void> {
            const hexAccount = bytesToHex(account);

            try {
                await state.metamask?.burnWithPermit(
                    contractAddress,
                    hexAccount,
                    amount,
                    deadline,
                    signature.v,
                    signature.r,
                    signature.s,
                    handleTransactionHash,
                    handleReceipt,
                    handleModalSuccessDismiss
                );
            } catch (error) {
                console.log(error);
            }
        }

        async function unsignedData(contractAddress: string, amount: number, deadline: number): Promise<string> {
            const contractData = await state.tokenService?.getPermitData(contractAddress, state.metamask!.selectedAddress());
            const id = await state.metamask?.chainId();

            const message: Permit = {
                owner: state.metamask!.selectedAddress(),
                spender: contractData.controller,
                value: amount,
                nonce: contractData.nonce,
                deadline // get latest block and add 1h in seconds
            };

            const domain: Domain = {
                name: contractData.name,
                version: "1",
                chainId: id!,
                verifyingContract: contractAddress
            };

            return permitData(domain, message);
        }

        function handleTransactionHash(transactionHash: string): void {
            state.evmExplorerTx = `${getters.currentNetwork().bridge?.explorerTxUrl}${transactionHash}`;
            state.modalUnWrapTokensState.noticeText = context.root.$t("interfaceWrapHbar.waitForDeposit").toString();
        }

        function handleReceipt(receipt: TransactionReceipt): void {
            state.modalUnWrapTokensState.noticeText = context.root.$t("interfaceUnWrapHbar.waitForBlockConfirmations").toString();
            handleBlockConfirmations(receipt);
        }

        async function getBalance(): Promise<string> {
            const asset = state.bridgeTokens?.get(state.asset);
            const balance = await state.tokenService?.balanceOf(
                asset.address,
                state.metamask!.selectedAddress())!;

            return new BigNumber(balance)
                .dividedBy(10 ** asset.decimals).toString();
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
            if (state.asset) {
                state.assetBalance = await getBalance();
            }
            // state.metamaskAddress = metamask.selectedAddress();
            actions.alert({
                message: "Metamask successfully connected",
                level: "success"
            });
        }

        return {
            state,
            isAmountValid,
            hbarSuffix: Unit.Hbar,
            tinybarSuffix: Unit.Tinybar,
            idInput,
            handleModalSuccessDismiss,
            handleShowModalUnWrapTokens,
            handleInput,
            handleAccount,
            mdiHelpCircleOutline,
            mdiLaunch,
            availableAssets,
            handleSelectChange,
            isSelectedAssetValid,
            handleDeposit,
            handleConnectToMetamask,
            isMetamaskConnected,
            handleAccountValid,
            isAssetValid
        };
    }
});
</script>
<style lang="postcss" scoped>
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
#unwrapHbar .form-main{
    grid-row-gap: 0;
}

#unwrapHbar .select-value-container {
    border: 1px solid #62c0aa;
    border-radius: 4px;
    box-sizing: border-box;
    width: 145px;
    margin-bottom: 13px;
}

#unwrapHbar .select-value-container {
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: bold;
    line-height: 17px;
}

#unwrapHbar .select-option {
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: bold;
    line-height: 17px;
    width: 145px;
}

#unwrapHbar .select-menu {
    width: 145px;
}

#unwrapHbar .icon {
    color: #62c0aa;
}
</style>
