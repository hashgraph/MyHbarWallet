/* eslint-disable no-console */
import { BigNumber } from "bignumber.js";
import Vue from "vue";

import { availableNetworks, NetworkName, NetworkSettings } from "../../domain/network";
import { Session, User } from "../../domain/user";
import Wallet from "../../domain/wallets/Wallet";
import { currentPrice } from "../../service/coingecko";
import { constructSession } from "../../service/hedera";
import i18n from "../../service/i18n";
import router from "../router";
import { inUnitedStates } from "../../service/location";

import { State as AccountState } from "./modules/account";
import { Alert, NewAlert, State as AlertsState } from "./modules/alerts";
import { HederaStatusErrorPayload, HederaStatusErrorTuple, LedgerErrorPayload, LedgerErrorTuple, State as ErrorsState } from "./modules/errors";
import { State as NetworkState } from "./modules/network";
import { State as UIState } from "./modules/ui";

export interface RootState {
    alerts: AlertsState;
    ui: UIState;
    account: AccountState;
    errors: ErrorsState;
    network: NetworkState;
}

export interface Index {
    state: RootState;
}

export const store = Vue.observable({
    state: {
        alerts: { queue: []} as AlertsState,
        errors: { queue: []} as ErrorsState,
        ui: {
            interfaceMenu: {
                isOpen: false,
                hasBeen: false
            },
            home: { hasBeen: false },
            inUS: true
        } as UIState,
        account: {
            user: null,
            balance: null,
            exchangeRate: null
        } as AccountState,
        network: { network: availableNetworks[ NetworkName.MAINNET ] }
    } as RootState
} as Index);

export const getters = {
    hasError(): boolean {
        return store.state.errors.queue.length > 0;
    },
    errorMessage(): string | null {
        const error =
            store.state.errors.queue.length > 0 ?
                store.state.errors.queue[ 0 ] :
                null;

        // eslint-disable-next-line no-process-env, no-undef
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
    hasBeenToInterface(): boolean {
        return store.state.ui.interfaceMenu.hasBeen;
    },
    hasBeenHome(): boolean {
        if (localStorage.getItem("home") != null) {
            store.state.ui.home.hasBeen = true;
        }
        return store.state.ui.home.hasBeen;
    },
    currentNetwork(): NetworkSettings {
        return store.state.network.network;
    },
    currentUser(): User {
        return store.state.account.user;
    },
    isLoggedIn(): boolean {
        return store.state.account.user != null;
    },
    currentUserBalance(): import("@hashgraph/sdk").Hbar | null {
        return store.state.account.balance;
    },
    exchangeRate(): BigNumber | null {
        return store.state.account.exchangeRate;
    },
    inUS(): boolean {
        return store.state.ui.inUS;
    }
};

export const mutations = {
    addAlert: (alert: Alert): number => store.state.alerts.queue.push(alert),
    removeAlert(id: number): void {
        for (let i = 0; i < store.state.alerts.queue.length; i++) {
            if (store.state.alerts.queue[ i ].id === id) {
                store.state.alerts.queue.splice(i, 1);
                break;
            }
        }
    },
    errorOccurred(e: { error: Error }): void {
        store.state.errors.queue.push(e.error);
    },
    errorViewed(): void {
        store.state.errors.queue.pop();
    },
    navigateToInterface(): void {
        router.push({ name: "interface" }, () => mutations.setHasBeenToInterface(true));
    },
    navigateToHome(): void {
        router.push({ name: "home" });
    },
    setInterfaceMenuIsOpen(open: boolean): void {
        store.state.ui.interfaceMenu.isOpen = open;
    },
    setHasBeenToInterface(visited: boolean): void {
        store.state.ui.interfaceMenu.hasBeen = visited;
    },
    setHasBeenHome(): void {
        localStorage.setItem("home", "true");
    },
    setCurrentUser(user: User): void {
        store.state.account.user = user;
    },
    setCurrentUserBalance(balance: import("@hashgraph/sdk").Hbar | null): void {
        store.state.account.balance = balance;
    },
    setExchangeRate(rate: BigNumber): void {
        store.state.account.exchangeRate = rate;
    },
    setInUS(inUS: boolean): void {
        store.state.ui.inUS = inUS;
    },
    setCurrentNetwork(settings: NetworkSettings): void {
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

        mutations.addAlert(alert);

        setTimeout((): void => {
            mutations.removeAlert(alert.id);
        }, 5000);
    },

    async handleHederaError(payload: HederaStatusErrorPayload): Promise<HederaStatusErrorTuple> {
        // eslint-disable-next-line no-process-env, no-undef
        if (process.env.NODE_ENV !== "production" && payload.error != null) {
            console.error(payload.error);
        }

        let message = "";
        const severity = "error";

        const { Status } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");

        switch (payload.error.status.code) {
            case Status.PayerAccountNotFound.code:
                message = i18n.t("common.error.payerDoesNotExist").toString();
                break;
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

        const { StatusCodes } = await import(/* webpackChunkName: "hardware" */ "@ledgerhq/hw-transport");

        if (payload.error.name != null && payload.error.name === "TransportOpenUserCancelled") {
            message = i18n.t("common.error.noDeviceSelected").toString();
            severity = "warn";
        } else {
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
        }

        if (payload.showAlert) {
            actions.alert({ message, level: severity });
        }

        // eslint-disable-next-line compat/compat
        return Promise.resolve({ message, error: payload.error });
    },

    async refreshBalance(): Promise<void> {
        if (store.state.account.user.session == null) {
            throw new Error("session null, cannot refresh balance");
        }

        const { AccountBalanceQuery } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");

        const balance = await new AccountBalanceQuery()
            .setAccountId(store.state.account.user.session.account)
            .execute(store.state.account.user.session.client);

        mutations.setCurrentUserBalance(balance);
    },

    async refreshExchangeRate(): Promise<void> {
        const curPrice = await currentPrice();
        mutations.setExchangeRate(curPrice);
    },

    async refreshBalanceAndRate(): Promise<void> {
        await this.refreshBalance();
        await this.refreshExchangeRate();
    },

    async determineInUS(): Promise<void> {
        const inUS = await inUnitedStates();
        if (inUS != null) mutations.setInUS(inUS);
    },

    async logIn(
        account: import("@hashgraph/sdk").AccountId,
        wallet: Wallet,
        network: NetworkSettings
    ): Promise<void> {
        const user = { session: null as Session | null, wallet };

        if (user.wallet != null) {
            try {
                user.session = await constructSession(account, user.wallet, network);
            } catch (error) {
                throw error;
            }
        }

        if (user.session != null && user.wallet != null) {
            mutations.setCurrentUser({ session: user.session, wallet: user.wallet });
        } else {
            throw new Error("null session or wallet on login, could not set user");
        }

        void this.refreshBalanceAndRate();
        void this.determineInUS();
    },

    logOut(): void {
        store.state.account.user = null;
        mutations.setHasBeenToInterface(false);
    }
};
