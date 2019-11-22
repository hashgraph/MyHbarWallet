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
    HederaErrorPayload,
    HederaErrorTuple,
    LedgerErrorPayload,
    LedgerErrorTuple,
    State as ErrorsState
} from "./store/modules/errors";
import BigNumber from "bignumber.js";
import i18n from "./i18n";
import { StatusCodes } from "@ledgerhq/hw-transport";
import { getValueOfUnit, Unit } from "./units";

export interface RootState {
    alerts: AlertsState;
    interfaceMenu: InterfaceMenuState;
    wallet: WalletState;
    fees: FeesState;
    errors: ErrorsState;
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
            session: null,
            balance: null,
            exchangeRate: null
        } as WalletState
    } as RootState
} as Store);

export const getters = {
    hasError(): boolean {
        return store.state.errors.errors.length > 0;
    },
    errorMessage(): string | null {
        const error =
            store.state.errors.errors.length > 0 ?
                store.state.errors.errors[ 0 ] :
                null;

        if (process.env.NODE_ENV !== "production") console.error(error);

        if (error === null) return null;

        if (error instanceof Error) {
            console.warn(error);

            return error.toString();
        }

        return error;
    },
    estimatedFeeHBar(): BigNumber {
        return store.state.fees.estimatedFeeHbar;
    },
    estimatedFeeTinyBar(): BigNumber {
        return store.state.fees.estimatedFeeHbar.multipliedBy(getValueOfUnit(Unit.Hbar));
    },
    maxFeeTinyBar(remainingBalanceTinybar: BigNumber): BigNumber {
        return BigNumber.min(
            store.state.fees.maxFeeHbar,
            remainingBalanceTinybar.dividedBy(getValueOfUnit(Unit.Hbar))
        ).multipliedBy(getValueOfUnit(Unit.Hbar));
    },
    isLoggedIn(): boolean {
        return store.state.wallet.session != null;
    }
};

export const mutations = {
    addAlert: (alert: Alert): number => store.state.alerts.queue.push(alert),
    removeAlert(id: number): void {
        for (let i = 0; i < store.state.alerts.queue.length; i += 1) {
            if (store.state.alerts.queue[ i ].id === id) {
                store.state.alerts.queue.splice(i, 1);
                break;
            }
        }
    },
    errorOccurred(e: { error: Error | string }): void {
        store.state.errors.errors.push(e.error);
    },
    errorViewed(): void {
        store.state.errors.errors.pop();
    },
    setInterfaceMenuIsOpen(isOpen: boolean): void {
        store.state.interfaceMenu.isOpen = isOpen;
    },
    setHasBeenToInterface(visited: boolean): void {
        store.state.interfaceMenu.hasBeenToInterface = visited;
    },
    logIn(session: Session): void {
        store.state.wallet.session = session;
    },
    logOut(): void {
        store.state.wallet.session = null;
        store.state.wallet.balance = null;
    },
    setBalance(balance: BigNumber): void {
        store.state.wallet.balance = balance;
    },
    setExchangeRate(rate: BigNumber): void {
        store.state.wallet.exchangeRate = rate;
    }
};

let alertId = 0;

export const actions = {
    alert(payload: NewAlert): void {
        alertId += 1;

        const alert = {
            id: alertId,
            ...payload
        };

        mutations.addAlert(alert);

        setTimeout((): void => {
            mutations.removeAlert(alert.id);
        }, 5000);
    },

    async handleHederaError(payload: HederaErrorPayload): Promise<HederaErrorTuple> {
        if (process.env.NODE_ENV !== "production") console.error(payload.error);

        let message = "";
        const severity = "error";

        // todo [2020-01-01]: remove or revise this lint from the launchbadge eslint config
        // eslint-disable-next-line @typescript-eslint/no-extra-parens
        const { ResponseCodeEnum } = await (import("@hashgraph/sdk") as Promise<typeof import("@hashgraph/sdk")>);

        switch (payload.error.code) {
            case ResponseCodeEnum.PAYER_ACCOUNT_NOT_FOUND:
            case ResponseCodeEnum.INVALID_ACCOUNT_ID:
                message = i18n.t("common.error.invalidAccount").toString();
                break;
            case ResponseCodeEnum.INVALID_SIGNATURE:
                message = i18n.t("common.error.invalidSignature").toString();
                break;
            case ResponseCodeEnum.INVALID_TRANSACTION_START:
                message = i18n.t("common.error.invalidDateTime").toString();
                break;
            case ResponseCodeEnum.INSUFFICIENT_TX_FEE:
                message = i18n
                    .t("common.error.insufficientTransactionFee")
                    .toString();
                break;
            case ResponseCodeEnum.INSUFFICIENT_ACCOUNT_BALANCE:
            case ResponseCodeEnum.INSUFFICIENT_PAYER_BALANCE:
                message = i18n
                    .t("common.error.insufficientPayerBalance")
                    .toString();
                break;
            case ResponseCodeEnum.ACCOUNT_REPEATED_IN_ACCOUNT_AMOUNTS:
                message = i18n
                    .t("common.error.cannotSendHbarToYourself")
                    .toString();
                break;
            default:
                console.warn(payload.error.code);
                console.warn(payload.error.message);
                console.warn(payload.error);
                message =
                    `${i18n.t("common.error.unhandled")
                    }${payload.error.codeName}`;
        }

        if (payload.showAlert) {
            this.alert({ message, level: severity });
        }

        return { message, error: payload.error };
    },
    // eslint-disable-next-line @typescript-eslint/require-await
    async handleLedgerError(payload: LedgerErrorPayload): Promise<LedgerErrorTuple> {
        if (process.env.NODE_ENV !== "production") console.error(payload.error);
        // see: https://github.com/LedgerHQ/ledgerjs/blob/master/packages/errors/src/index.js#L196-L227
        let message = "";
        let severity = "error";

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
            this.alert({ message, level: severity });
        }

        return { message, error: payload.error };
    },

    async refreshBalance(): Promise<void> {
        if (store.state.wallet.session == null) {
            console.warn("attempt to refresh balance with a null session");
            return;
        }

        // todo [2020-01-01]: remove or revise this lint from the launchbadge eslint config
        // eslint-disable-next-line @typescript-eslint/no-extra-parens
        const { Client } = await (import("@hashgraph/sdk") as Promise<typeof import("@hashgraph/sdk")>);

        if (!(store.state.wallet.session.client instanceof Client)) {
            throw new TypeError("state.session.client not instance of Client: Programmer Error");
        }

        const balance = await store.state.wallet.session
            .client.getAccountBalance();

        mutations.setBalance(balance);
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
            // todo [2020-01-01]: there is no way to properly divide up this line in a way that eslint is happy, consider revising the rule
            // eslint-disable-next-line max-len
            .reduce<number>((accumulator, ticker, _, { length }) => (accumulator + ticker.converted_last.usd) / length, 0));

        // Set exchange rate
        mutations.setExchangeRate(meanLast);
    },
    async refreshBalanceAndRate(): Promise<void> {
        await this.refreshBalance();
        await this.refreshExchangeRate();
    },
    async logIn(session: Session): Promise<void> {
        mutations.logIn(session);
        await this.refreshBalanceAndRate();
    },
    logOut() {
        mutations.setHasBeenToInterface(false);
        mutations.logOut();
    }
};
