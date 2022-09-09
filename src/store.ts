import type { PrivateKey, AccountId, PublicKey } from "@hashgraph/sdk";
import { BigNumber } from "bignumber.js";
import { defineStore } from "pinia";

import { Wallet } from "./domain/wallet/abstract";
import { AccountBalance, MirrorAccountInfo, NetworkNodeStakingInfo, SimpleHederaClient } from "./services/hedera";
import { useContainer } from "./hooks/container";
import i18n from "./i18n";
import { PrivateKeySoftwareWallet } from "./domain/wallet/software-private-key";

declare const __TEST__: boolean;
interface State {
    network: "mainnet" | "testnet" | "previewnet";
    // the wallet that has been unlocked
    wallet: Wallet | null;
    // the specific instantiation of a client
    // from the unlocked wallet that is being used
    client: SimpleHederaClient | null;
    // the balance of the account associated with the client
    balance: AccountBalance | null;
    // the current price of HBARS in USD
    hbarPriceUsd: BigNumber.Instance | null;
    // a place to stuff extra information needed to process a transaction
    extraTxInfo: Record<string, string | number> | null;
    // is there an open prompt for the user on their hardware wallet
    prompt: boolean;
    // are you sure you want to logout? open state
    logoutConfirm: boolean;
    //contact customer support. open state
    contactSupport: boolean;
    //Hedera network status
    networkStatus: boolean;
    // Hedera Node Staking Info
    nodeStakingInfo: NetworkNodeStakingInfo[] | null;
    // Staking Info for the current account
    accountStakingInfo: MirrorAccountInfo | null;
}

// @ledgerhq/hw-transport's TransportStatusError's doesn't expose status* properties
interface TransportStatusError extends Error {
    statusCode: number;
    statusText: string;
}

export const useStore = defineStore({
    id: "main",

    state(): State {
        return {
            wallet: null,
            client: null,
            hbarPriceUsd: null,
            balance: null,
            network: "mainnet",
            extraTxInfo: null,
            prompt: false,
            logoutConfirm: false,
            contactSupport: false,
            networkStatus: false,
            nodeStakingInfo: null,
            accountStakingInfo: null,
        };
    },

    getters: {
        publicKey(): PublicKey | null {
            return this.client?.getPublicKey() ?? null;
        },

        privateKey(): PrivateKey | null {
            return this.client?.getPrivateKey() ?? null;
        },

        accountId(): AccountId | null {
            return this.client?.getAccountId() ?? null;
        },

        getClient(): SimpleHederaClient | null {
            return this.client ?? null;
        },

        extraInfo(): Record<string, string | number> | null {
            return this.extraTxInfo;
        },

        getNetworkStatus(): boolean {
            return this.networkStatus;
        },

        getNodeStakingInfo(): NetworkNodeStakingInfo[] | null {
            return this.nodeStakingInfo;
        },

        getAccountStakingInfo(): MirrorAccountInfo | null {
            return this.accountStakingInfo;
        }
    },

    actions: {
        async login(privateKey: string, accountIdStr: string): Promise<void> {
            if (__TEST__) {
                const { PrivateKey, AccountId } = await import("@hashgraph/sdk");
                const key = PrivateKey.fromString(privateKey);
                const accountId = AccountId.fromString(accountIdStr);
                const wallet = new PrivateKeySoftwareWallet(key);
                const container = useContainer();

                const client = await container.cradle.hedera.createClient({
                    wallet,
                    keyIndex: 0,
                    accountId: accountId,
                    network: "testnet",
                });

                this.setWallet(wallet);
                this.setClient(client);
            }
        },

        async networkPing(): Promise<boolean> {
            const { AccountBalanceQuery, AccountId } = await import("@hashgraph/sdk");
            const accountId = AccountId.fromString("0.0.2");

            try {
                new AccountBalanceQuery().setNodeAccountIds([accountId]).setAccountId(accountId);
                this.networkStatus = true;
            } catch (error) {
                this.networkStatus = false;
            }

            return this.networkStatus;
        },

        setNetwork(name: "mainnet" | "testnet" | "previewnet") {
            this.network = name;
        },

        setWallet(wallet: Wallet | null) {
            this.wallet = wallet;

            if (wallet == null) {
                this.setClient(null);
            }
        },

        setClient(client: SimpleHederaClient | null) {
            this.balance = null;
            this.client = client;

            if (this.wallet?.hasPrivateKey()) {
                void this.requestAccountBalance();
            }
        },

        async requestHbarPrice() {
            this.hbarPriceUsd =
                await useContainer().cradle.hbarPrice.getHbarPriceInUsd();
        },

        async requestAccountBalance() {
            if (this.client == null) return;

            this.balance = await this.client.getAccountBalance();
        },

        setExtraInfo(info: Record<string, string | number>): void {
            this.extraTxInfo = info;
        },

        setPromptOpen(open: boolean): void {
            this.prompt = open;
        },

        setConfirmLogoutOpen(open: boolean): void {
            this.logoutConfirm = open;
        },

        setContactSupportOpen(open: boolean): void {
            this.contactSupport = open;
        },

        async fetchNetworkNodeStakingInfo() {
            const container = useContainer();
            this.nodeStakingInfo = await container.cradle.hedera.getNodeStakingInfo(this.network);
        },

        async fetchAccountStakingInfo() {
            if (this.accountId == null || this.getClient == null) {
                throw new Error('tried to get account staking info without being logged in!');
            }
            const container = useContainer();

            // HACK: local storage is being used because the Hedera mirror node is up to 15 minutes delayed in accurary
            const lastUpdate = localStorage.getItem(`${this.network}.${this.accountId.toString()}.last-updated`);
            const node = localStorage.getItem(`${this.network}.${this.accountId.toString()}.staking-to`);
            const fifteenMinutes = 15 * 60 * 1000;
            if (lastUpdate == null || node == null || new Date(lastUpdate).getUTCMilliseconds() - new Date().getUTCMilliseconds() > fifteenMinutes) {
                this.accountStakingInfo = await container.cradle.hedera.getMirrorAccountInfo(this.network, this.accountId);
                localStorage.setItem(`${this.network}.${this.accountId.toString()}.staking-to`, this.accountStakingInfo.staked_node_id?.toString() ?? '');
                localStorage.setItem(`${this.network}.${this.accountId.toString()}.last-updated`, Date.now().toString());
            } else {
                this.accountStakingInfo = { staked_node_id: node === '' ? undefined : parseInt(node), account: this.accountId.toString() };
            }
        },

        async updateStake(declineRewards: boolean, node: number | null) {
            if (this.accountId == null || this.getClient == null) {
                throw new Error('tried to update stake without being logged in!');
            }

            await this.getClient?.updateStaking({ node, declineRewards, accountId: this.accountId });

            //HACK: local storage is being used because the Hedera mirror node is up to 15 minutes delayed in accuracy
            localStorage.setItem(`${this.network}.${this.accountId.toString()}.staking-to`, node ? node.toString() : '');
            localStorage.setItem(`${this.network}.${this.accountId.toString()}.last-updated`, Date.now().toString());
        },

        async errorMessage(error: Error): Promise<string> {
            const { Status, StatusError } = await import("@hashgraph/sdk");
            const { StatusCodes, TransportStatusError } = await import("@ledgerhq/hw-transport");

            if (error instanceof StatusError) {
                switch (error.status) {
                    case Status.AccountDeleted:
                    case Status.AccountExpiredAndPendingRemoval:
                    case Status.AccountIdDoesNotExist:
                        return i18n.global.t("Common.Error.AccountDoesNotExist").toString();
                    case Status.AccountKycNotGrantedForToken:
                    case Status.AccountFrozenForToken:
                        return i18n.global.t("Common.Error.PermissionDeniedAccountToken").toString();
                    case Status.AccountRepeatedInAccountAmounts:
                        return i18n.global.t("Common.Error.CantSendToYourself").toString();
                    case Status.Busy:
                    case Status.Unknown:
                    case Status.Unauthorized:
                        return i18n.global.t("Common.Error.NetworkUnavailable").toString();
                    case Status.DuplicateTransaction:
                        return i18n.global.t("Common.Error.DuplicateTx").toString();
                    case Status.EmptyTokenTransferAccountAmounts:
                    case Status.EmptyTokenTransferBody:
                    case Status.EmptyTransactionBody:
                        return i18n.global.t("Common.Error.EmptyTransaction").toString();
                    case Status.FileContentEmpty:
                        return i18n.global.t("Common.Error.FileEmpty").toString();
                    case Status.FileDeleted:
                        return i18n.global.t("Common.Error.FileDeleted").toString();
                    case Status.MaxFileSizeExceeded:
                        return i18n.global.t("Common.Error.BigFile").toString();
                    case Status.MemoTooLong:
                        return i18n.global.t("Common.Error.MemoTooLong").toString();
                    case Status.MessageSizeTooLarge:
                        return i18n.global.t("Common.Error.BigMessage").toString();
                    case Status.Ok:
                    case Status.Success:
                        return i18n.global.t("Common.Error.Ok").toString();
                    case Status.PayerAccountNotFound:
                        return i18n.global.t("Common.Error.PayerNotReal").toString();
                    case Status.PayerAccountUnauthorized:
                        return i18n.global.t("Common.Error.PayerFrozen").toString();
                    case Status.ReceiptNotFound:
                        return i18n.global.t("Common.Error.NoReceipt").toString();
                    case Status.RecordNotFound:
                        return i18n.global.t("Common.Error.NoRecord").toString();
                    case Status.ResultSizeLimitExceeded:
                        return i18n.global.t("Common.Error.BigResults").toString();
                    case Status.TokenAlreadyAssociatedToAccount:
                        return i18n.global.t("Common.Error.TokenAlreadyAssociated").toString();
                    case Status.TokenNotAssociatedToAccount:
                        return i18n.global.t("Common.Error.TokenNotAssociated").toString();
                    case Status.TokenNotAssociatedToFeeCollector:
                        return i18n.global.t("Common.Error.TokenNoFeeCollector").toString();
                    case Status.TokenHasNoWipeKey:
                    case Status.TokenHasNoFeeScheduleKey:
                    case Status.TokenHasNoFreezeKey:
                    case Status.TokenHasNoKycKey:
                    case Status.TokenHasNoSupplyKey:
                        return i18n.global.t("Common.Error.TokenConfigBroken").toString();
                    case Status.TokenWasDeleted:
                        return i18n.global.t("Common.Error.TokenDeleted").toString();
                    case Status.TokensPerAccountLimitExceeded:
                        return i18n.global.t("Common.Error.TooManyTokens").toString();
                }
            } else if (error instanceof TransportStatusError) {
                // need to type assert because @ledgerhq/hw-transport's TransportStatusError doesn't expose statusCode property(?)
                switch ((error as TransportStatusError).statusCode) {
                    case StatusCodes.CONDITIONS_OF_USE_NOT_SATISFIED:
                        return i18n.global.t("Common.Error.LedgerDenyRequest").toString();
                    default:
                        return i18n.global.t("Common.Error.LedgerError").toString();
                }
            }

            return error.message;
        },
    },
});
