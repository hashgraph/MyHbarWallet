import {
    LOG_IN,
    LOG_OUT,
    SET_HAS_BEEN_TO_INTERFACE
} from "../../store/mutations";
import { IS_LOGGED_IN } from "../../store/getters";
import { ActionContext } from "vuex";
import { RootState } from "..";
import {
    LOG_IN as LOG_IN_ACTION,
    LOG_OUT as LOG_OUT_ACTION,
    REFRESH_BALANCE,
    REFRESH_BALANCE_AND_RATE,
    REFRESH_EXCHANGE_RATE
} from "../actions";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { State as ModalDownloadKeystoreState } from "../../components/ModalDownloadKeystore";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { State as ModalCreateByKeystoreState } from "../../components/ModalCreateByKeystore";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { State as ModalKeystoreFilePasswordState } from "../components/ModalKeystoreFilePassword";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { State as ModalAccessByPhraseState } from "../components/ModalAccessByPhrase";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { State as ModalAccessByPrivateKeyState } from "../components/ModalAccessByPrivateKey";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { State as ModalEnterAccountIdState } from "../components/ModalEnterAccountId";
import BigNumber from "bignumber.js";
import Wallet from "../../wallets/Wallet";

const SET_BALANCE = "wallet#set_balance";
const SET_EXCHANGE_RATE = "wallet#set_exchange_rate";

const coingeckoEndpoint =
    "https://api.coingecko.com/api/v3/coins/hedera-hashgraph/tickers";

export interface LastJSON {
    btc: number;
    eth: number;
    usd: number;
}

export interface TickerJSON {
    base: string;
    target: string;
    is_stale: boolean;
    is_anomaly: boolean;
    last: number; // Whichever rate was last used
    converted_last: LastJSON;
}

export interface TickersJSON {
    tickers: TickerJSON[];
}

export interface Id {
    shard: number;
    realm: number;
    account: number;
}

export interface Session {
    account: Id;
    wallet: Wallet;
    client: import("@hashgraph/sdk").Client;
}

export interface State {
    session: Session | null;
    balance: BigNumber | null;
    exchangeRate: BigNumber | null;
}

export interface ModalIsOpen {
    isOpen: boolean;
}

type ModalByHardwareState = ModalIsOpen;
type ModalBySoftwareState = ModalIsOpen;
type ModalCreateByPhraseState = ModalIsOpen;
type ModalRequestToCreateAccountState = ModalIsOpen;

export interface AccountDTO {
    wallet: Wallet | null;
    privateKey: import("@hashgraph/sdk").Ed25519PrivateKey | null;
    publicKey: import("@hashgraph/sdk").Ed25519PublicKey | null;
    keyFile: Uint8Array | null;
}

export interface AccountCreateDTO {
    modalCreateByHardwareState: ModalByHardwareState;
    modalCreateBySoftwareState: ModalBySoftwareState;
    modalCreateByKeystoreState: ModalCreateByKeystoreState;
    modalKeystoreFilePasswordState: ModalKeystoreFilePasswordState;
    modalDownloadKeystoreState: ModalDownloadKeystoreState;
    modalCreateByPhraseState: ModalCreateByPhraseState;
    modalEnterAccountIdState: ModalEnterAccountIdState;
    modalRequestToCreateAccountState: ModalRequestToCreateAccountState;
}

export interface AccountAccessDTO {
    modalAccessByHardwareState: ModalByHardwareState;
    modalAccessBySoftwareState: ModalBySoftwareState;
    modalKeystoreFilePasswordState: ModalKeystoreFilePasswordState;
    modalAccessByPhraseState: ModalAccessByPhraseState;
    modalAccessByPrivateKeyState: ModalAccessByPrivateKeyState;
    modalEnterAccountIdState: ModalEnterAccountIdState;
    modalRequestToCreateAccountState: ModalRequestToCreateAccountState;
}

export type AccessAccountDTO = AccountDTO & AccountAccessDTO;
export type CreateAccountDTO = AccountDTO & AccountCreateDTO;

export default {
    state: {
        session: null,
        balance: null,
        exchangeRate: null
    },
    getters: {
        [IS_LOGGED_IN]: (state: State): boolean => {
            return state.session != null;
        }
    },
    mutations: {
        [LOG_IN](state: State, session: Session): void {
            state.session = session;
        },
        [LOG_OUT](state: State): void {
            state.session = null;
            state.balance = null;
        },
        [SET_BALANCE](state: State, balance: BigNumber): void {
            state.balance = balance;
        },
        [SET_EXCHANGE_RATE](state: State, rate: BigNumber): void {
            state.exchangeRate = rate;
        }
    },
    actions: {
        async [REFRESH_BALANCE]({
            commit,
            state
        }: ActionContext<State, RootState>) {
            if (state.session == null) {
                console.warn("attempt to refresh balance with a null session");
                return;
            }
            const { Client } = await (import("@hashgraph/sdk") as Promise<
                typeof import("@hashgraph/sdk")
            >);
            if (!(state.session.client instanceof Client)) {
                throw new TypeError(
                    "state.session.client not instance of Client: Programmer Error"
                );
            }

            const balance = await (state.session.client as InstanceType<
                typeof Client
            >).getAccountBalance();

            commit(SET_BALANCE, balance);
        },
        async [REFRESH_EXCHANGE_RATE]({
            commit,
            state
        }: ActionContext<State, RootState>) {
            if (state.session == null) {
                console.warn(
                    "attempt to refresh exchange rate with a null session"
                );
                return;
            }

            // Get response, clone, get text, parse to JSON
            const response: Response = await fetch(coingeckoEndpoint);
            const responseJson: TickersJSON = JSON.parse(
                await response.clone().text()
            );

            // filter reduce to average of last rate from relevant exchanges
            const meanLast = new BigNumber(
                responseJson.tickers
                    .filter((ticker: TickerJSON) => {
                        return (
                            ticker.target === "USD" &&
                            !ticker.is_stale &&
                            !ticker.is_anomaly
                        );
                    })
                    .reduce<number>((accumulator, ticker, _, { length }) => {
                        return (
                            (accumulator + ticker.converted_last.usd) / length
                        );
                    }, 0)
            );

            // Set exchange rate
            commit(SET_EXCHANGE_RATE, meanLast);
        },
        async [REFRESH_BALANCE_AND_RATE]({
            dispatch
        }: ActionContext<State, RootState>) {
            await dispatch(REFRESH_BALANCE);
            await dispatch(REFRESH_EXCHANGE_RATE);
        },
        async [LOG_IN_ACTION](
            { dispatch, commit }: ActionContext<State, RootState>,
            session: Session
        ) {
            commit(LOG_IN, session);
            await dispatch(REFRESH_BALANCE_AND_RATE);
        },
        async [LOG_OUT_ACTION]({ commit }: ActionContext<State, RootState>) {
            commit(SET_HAS_BEEN_TO_INTERFACE, false);
            commit(LOG_OUT);
        }
    }
};
