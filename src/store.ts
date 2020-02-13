/* eslint-disable no-console */
// printing to console is acceptable in this file -- however most should be restricted to non-production environments
import Vue from "vue";
import { State as AlertsState, Alert, NewAlert } from "./store/modules/alerts";
import { State as InterfaceMenuState } from "./store/modules/interfaceMenu";
import {
    coingeckoEndpoint,
    Session,
    State as WalletState,
    TickerJSON,
    TickersJSON
} from "./store/modules/wallet";
import { State as FeesState } from "./store/modules/fees";
import {
    HederaStatusErrorPayload,
    HederaStatusErrorTuple,
    LedgerErrorPayload,
    LedgerErrorTuple,
    State as ErrorsState
} from "./store/modules/errors";
import { State as NetworkState } from "./store/modules/network";
import BigNumber from "bignumber.js";
import i18n from "./i18n";
import { getValueOfUnit, Unit } from "./units";
import { NetworkName, availableNetworks, NetworkSettings } from "./settings";
import Wallet from "./wallets/Wallet";
import router from "./router";

export interface RootState {
    alerts: AlertsState;
    interfaceMenu: InterfaceMenuState;
    wallet: WalletState;
    fees: FeesState;
    errors: ErrorsState;
    network: NetworkState;
}

export interface Store {
    state: RootState;
}

export const store = Vue.observable({
    state: {
        alerts: { queue: []} as AlertsState,
        errors: { errors: []} as ErrorsState,
        fees: {
            estimatedFeeHbar: new BigNumber(0.200_000_000),
            maxFeeHbar: new BigNumber(1)
        } as FeesState,
        interfaceMenu: {
            isOpen: false,
            hasBeenToInterface: false
        } as InterfaceMenuState,
        wallet: {
            wallet: null,
            session: null,
            balance: null,
            exchangeRate: null
        } as WalletState,
        network: { network: availableNetworks[ NetworkName.MAINNET ] }
    } as RootState
} as Store);

export const getters = {
    HAS_ERROR(): boolean {
        return store.state.errors.errors.length > 0;
    },
    ERROR_MESSAGE(): string | null {
        const error =
            store.state.errors.errors.length > 0 ?
                store.state.errors.errors[ 0 ] :
                null;

        // eslint-disable-next-line no-process-env
        if (process.env.NODE_ENV !== "production" && error != null) {
            console.error(error);
        }

        if (error == null) return null;
        if (error instanceof Error) {
            console.warn(error);
            return error.toString() || "";
        }

        return error;
    },
    ESTIMATED_FEE_HBAR(): BigNumber {
        return store.state.fees.estimatedFeeHbar;
    },
    ESTIMATED_FEE_TINYBAR(): BigNumber {
        return store.state.fees.estimatedFeeHbar.multipliedBy(getValueOfUnit(Unit.Hbar));
    },
    MAX_FEE_TINYBAR(remainingBalanceTinybar: BigNumber): BigNumber {
        return BigNumber.min(
            store.state.fees.maxFeeHbar,
            remainingBalanceTinybar.dividedBy(getValueOfUnit(Unit.Hbar))
        ).multipliedBy(getValueOfUnit(Unit.Hbar));
    },
    IS_LOGGED_IN(): boolean {
        return store.state.wallet.session != null;
    },
    GET_NETWORK(): NetworkSettings {
        return store.state.network.network;
    },
    GET_WALLET(): Wallet | null {
        return store.state.wallet.wallet;
    },
    CURRENT_USER(): import("@hashgraph/sdk").AccountId | null {
        return store.state.wallet.session?.account ?? null;
    }
};

export const mutations = {
    ADD_ALERT: (alert: Alert): number => store.state.alerts.queue.push(alert),
    REMOVE_ALERT(id: number): void {
        for (let i = 0; i < store.state.alerts.queue.length; i++) {
            if (store.state.alerts.queue[ i ].id === id) {
                store.state.alerts.queue.splice(i, 1);
                break;
            }
        }
    },
    ERROR_OCCURRED(e: { error: Error }): void {
        store.state.errors.errors.push(e.error);
    },
    ERROR_VIEWED(): void {
        store.state.errors.errors.pop();
    },
    NAVIGATE_TO_INTERFACE(): void {
        router.push({ name: "interface" });
    },
    SET_INTERFACE_MENU_IS_OPEN(open: boolean): void {
        store.state.interfaceMenu.isOpen = open;
    },
    SET_HAS_BEEN_TO_INTERFACE(visited: boolean): void {
        store.state.interfaceMenu.hasBeenToInterface = visited;
    },
    async TEST_CLIENT(
        account: import("@hashgraph/sdk").AccountId,
        client: import("@hashgraph/sdk").Client
    ): Promise<import("@hashgraph/sdk").Client> {
        try {
            await (await new (await import("@hashgraph/sdk")).CryptoTransferTransaction()
                .addSender(account, 0)
                .setMaxTransactionFee(1)
                .execute(client))
                .getReceipt(client);
        } catch (error) {
            if (error instanceof (await import("@hashgraph/sdk")).HederaStatusError) {
                // Transaction passes check for account ownership, but
                // will otherwise fail. This transaction is used to verify
                // account ownership.
                if (error.status.code === (await import("@hashgraph/sdk")).Status.InsufficientTxFee.code) {
                    return client;
                }
            }
            throw error;
        }
        throw new Error(i18n.t("common.error.clientConstruction").toString());
    },
    // eslint-disable-next-line sonarjs/cognitive-complexity
    async CONSTRUCT_CLIENT(account: import("@hashgraph/sdk").AccountId): Promise<import("@hashgraph/sdk").Client> {
        const network: NetworkSettings = getters.GET_NETWORK();
        const wallet: Wallet | null = getters.GET_WALLET();

        let publicKey: import("@hashgraph/sdk").Ed25519PublicKey | null = null;
        let privateKey: import("@hashgraph/sdk").Ed25519PrivateKey | null = null;
        let signer: import("@hashgraph/sdk").TransactionSigner | null = null;

        if (wallet != null) {
            if (wallet.hasPrivateKey()) {
                privateKey = await wallet.getPrivateKey();
            }

            publicKey = await wallet.getPublicKey() as import("@hashgraph/sdk").Ed25519PublicKey;
            signer = wallet.signTransaction.bind(wallet) as import("@hashgraph/sdk").TransactionSigner;
            let client: import("@hashgraph/sdk").Client | null = null;

            if (network.name !== NetworkName.CUSTOM) {
                if (network.name === NetworkName.MAINNET) {
                    client = (await import("@hashgraph/sdk")).Client.forMainnet();
                } else if (network.name === NetworkName.TESTNET) {
                    client = (await import("@hashgraph/sdk")).Client.forTestnet();
                }
            } else {
                client = new (await import("@hashgraph/sdk")).Client({
                    network: {
                        [ network.proxy || network.address ]: {
                            shard: network.node.shard,
                            realm: network.node.realm,
                            account: network.node.node
                        }
                    }
                });
            }

            if (client != null) {
                if (wallet.hasPrivateKey()) {
                    client.setOperator(account, privateKey!);
                } else {
                    client.setOperatorWith(account, publicKey, signer);
                }

                return this.TEST_CLIENT(account, client);
            }
        }

        throw new Error(i18n.t("common.error.clientConstruction").toString());
    },
    SET_WALLET(wallet: Wallet | null): void {
        store.state.wallet.wallet = wallet;
    },
    SET_SESSION(session: Session | null): void {
        store.state.wallet.session = session;
    },
    SET_BALANCE(balance: BigNumber | null): void {
        store.state.wallet.balance = balance;
    },
    SET_EXCHANGE_RATE(rate: BigNumber): void {
        store.state.wallet.exchangeRate = rate;
    },
    CHANGE_NETWORK(settings: NetworkSettings): void {
        const name = settings.name;
        switch (name) {
            case NetworkName.MAINNET:
            case NetworkName.TESTNET:
                store.state.network.network = availableNetworks[ name ];
                break;
            case NetworkName.CUSTOM:
                if (settings != null) {
                    store.state.network.network = settings;
                }
                break;
            default:
                break;
        }
    }
};

let alertId = 0;

export const actions = {
    alert(payload: NewAlert): void {
        const alert = {
            id: ++alertId,
            ...payload
        };

        mutations.ADD_ALERT(alert);

        setTimeout((): void => {
            mutations.REMOVE_ALERT(alert.id);
        }, 5000);
    },

    async handleHederaError(payload: HederaStatusErrorPayload): Promise<HederaStatusErrorTuple> {
        // eslint-disable-next-line no-process-env, no-undef
        if (process.env.NODE_ENV !== "production" && payload.error != null) {
            console.error(payload.error);
        }

        let message = "";
        const severity = "error";

        const { Status } = await import("@hashgraph/sdk");

        switch (payload.error.status.code) {
            case Status.PayerAccountNotFound.code:
            case Status.InvalidAccountId.code:
                message = i18n.t("common.error.invalidAccount").toString();
                break;
            case Status.InvalidSignature.code:
                message = i18n.t("common.error.invalidSignature").toString();
                break;
            case Status.InvalidTransactionStart.code:
                message = i18n.t("common.error.invalidDateTime").toString();
                break;
            case Status.InsufficientTxFee.code:
                message = i18n
                    .t("common.error.insufficientTransactionFee")
                    .toString();
                break;
            case Status.InsufficientAccountBalance.code:
            case Status.InsufficientPayerBalance.code:
                message = i18n
                    .t("common.error.insufficientPayerBalance")
                    .toString();
                break;
            case Status.AccountRepeatedInAccountAmounts.code:
                message = i18n
                    .t("common.error.cannotSendHbarToYourself")
                    .toString();
                break;
            default:
                console.warn(payload.error.status);
                console.warn(payload.error.message);
                console.warn(payload.error);
                message =
                    `${i18n.t("common.error.unhandled")
                    }${payload.error.status}`;
        }

        if (payload.showAlert) {
            self.alert({ message, level: severity });
        }

        return { message, error: payload.error };
    },
    async handleLedgerError(payload: LedgerErrorPayload): Promise<LedgerErrorTuple> {
        // eslint-disable-next-line no-process-env, no-undef
        if (process.env.NODE_ENV !== "production" && payload.error != null) {
            console.error(payload.error);
        }

        // see: https://github.com/LedgerHQ/ledgerjs/blob/master/packages/errors/src/index.js#L196-L227
        let message = "";
        let severity = "error";

        const { StatusCodes } = await import("@ledgerhq/hw-transport");

        switch (payload.error.statusCode) {
            // Security Exceptions (not allowed)
            case StatusCodes.PIN_REMAINING_ATTEMPTS: // 0x63c0,
            case StatusCodes.SECURITY_STATUS_NOT_SATISFIED: // 0x6982,
            case StatusCodes.CONDITIONS_OF_USE_NOT_SATISFIED: // 0x6985,
            case StatusCodes.ACCESS_CONDITION_NOT_FULFILLED: // 0x9804,
                message = i18n.t("common.error.lockedDevice").toString();
                severity = "warn";
                break;

            // Attestation / Verification failures
            case StatusCodes.CONTRADICTION_SECRET_CODE_STATUS: // 0x9808,
            case StatusCodes.CONTRADICTION_INVALIDATION: // 0x9810,
            case StatusCodes.LICENSING: // 0x6f42,
                message = i18n.t("common.error.traitorDevice").toString();
                break;

            // Command Error (does not make sense to device)
            case StatusCodes.INCORRECT_LENGTH: // 0x6700,
            case StatusCodes.COMMAND_INCOMPATIBLE_FILE_STRUCTURE: // 0x6981,
            case StatusCodes.INCORRECT_DATA: // 0x6a80,
            case StatusCodes.REFERENCED_DATA_NOT_FOUND: // 0x6a88,
            case StatusCodes.INCORRECT_P1_P2: // 0x6b00,
            case StatusCodes.INS_NOT_SUPPORTED: // 0x6d00,
            case StatusCodes.CLA_NOT_SUPPORTED: // 0x6e00,
            case StatusCodes.NO_EF_SELECTED: // 0x9400,
            case StatusCodes.INVALID_OFFSET: // 0x9402,
            case StatusCodes.INVALID_KCV: // 0x9485,
                message = i18n.t("common.error.wrongApp").toString();
                severity = "warn";
                break;

            // Device Failure (irrecoverable device errors)
            case StatusCodes.NOT_ENOUGH_MEMORY_SPACE: // 0x6a84,
            case StatusCodes.FILE_ALREADY_EXISTS: // 0x6a89,
            case StatusCodes.TECHNICAL_PROBLEM: // 0x6f00,
            case StatusCodes.MEMORY_PROBLEM: // 0x9240,
            case StatusCodes.FILE_NOT_FOUND: // 0x9404,
            case StatusCodes.INCONSISTENT_FILE: // 0x9408,
            case StatusCodes.ALGORITHM_NOT_SUPPORTED: // 0x9484,
            case StatusCodes.CODE_NOT_INITIALIZED: // 0x9802,
            case StatusCodes.CODE_BLOCKED: // 0x9840,
            case StatusCodes.MAX_VALUE_REACHED: // 0x9850,
            case StatusCodes.GP_AUTH_FAILED: // 0x6300,
            case StatusCodes.HALTED: // 0x6faa
                message = i18n.t("common.error.generalDeviceError").toString();
                severity = "error";
                break;

            default:
                console.warn(payload.error.statusCode);
                console.warn(payload.error);
                message = i18n.t("common.error.generalDeviceError").toString();
                severity = "warn";
                break;
        }

        if (payload.showAlert) {
            self.alert({ message, level: severity });
        }

        return Promise.resolve({ message, error: payload.error });
    },

    async refreshBalance(): Promise<void> {
        if (store.state.wallet.session == null) {
            console.warn("attempt to refresh balance with a null session");
            return;
        }
        const { Client, AccountBalanceQuery } = await import("@hashgraph/sdk");

        if (!(store.state.wallet.session.client instanceof Client)) {
            throw new TypeError("state.session.client not instance of Client: Programmer Error");
        }

        const balance = await new AccountBalanceQuery()
            .setAccountId(store.state.wallet.session.account)
            .execute(store.state.wallet.session.client);

        mutations.SET_BALANCE(balance.asTinybar());
    },

    async refreshExchangeRate(): Promise<void> {
        if (store.state.wallet.session == null) {
            console.warn("attempt to refresh exchange rate with a null session");
            return;
        }

        // Get response, clone, get text, parse to JSON
        const response: Response = await fetch(coingeckoEndpoint);
        const responseJson: TickersJSON = JSON.parse(await response.clone().text());

        // filter reduce to average of last rate from relevant exchanges
        const meanLast = new BigNumber(responseJson.tickers
            .filter((ticker: TickerJSON) => ticker.target === "USD" &&
                        !ticker.is_stale &&
                        !ticker.is_anomaly)
            .reduce<number>((accumulator, ticker, _, { length }) => (accumulator + ticker.converted_last.usd) / length, 0));

        // Set exchange rate
        mutations.SET_EXCHANGE_RATE(meanLast);
    },
    async refreshBalanceAndRate(): Promise<void> {
        await this.refreshBalance();
        await this.refreshExchangeRate();
    },
    async logIn(account: import("@hashgraph/sdk").AccountId): Promise<void> {
        const wallet: Wallet | null = getters.GET_WALLET();
        const client: import("@hashgraph/sdk").Client | null = await mutations.CONSTRUCT_CLIENT(account);
        if (wallet != null && client != null) {
            const session: Session = {
                account,
                wallet,
                client
            };
            mutations.SET_SESSION(session);
            await this.refreshBalanceAndRate();
        }
    },
    logOut(): void {
        mutations.SET_SESSION(null);
        mutations.SET_WALLET(null);
        mutations.SET_BALANCE(null);
        mutations.SET_HAS_BEEN_TO_INTERFACE(false);
    }
};
