import { LOG_IN, LOG_OUT } from "../../store/mutations";
import { IS_LOGGED_IN } from "../../store/getters";
import { ActionContext } from "vuex";
import { RootState } from "..";
import {
    LOG_IN as LOG_IN_ACTION,
    REFRESH_BALANCE,
    REFRESH_BALANCE_AND_RATE,
    REFRESH_EXCHANGE_RATE
} from "../actions";
import BigNumber from "bignumber.js";

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
    privateKey: import("@hashgraph/sdk").Ed25519PrivateKey;
    client: import("@hashgraph/sdk").Client;
}

export interface State {
    session: Session | null;
    balance: BigNumber | null;
    exchangeRate: BigNumber | null;
}

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
        }: ActionContext<State, RootState>): Promise<void> {
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
        }: ActionContext<State, RootState>): Promise<void> {
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
                        return accumulator + ticker.converted_last.usd / length;
                    }, 0)
            );

            // Set exchange rate
            commit(SET_EXCHANGE_RATE, meanLast);
        },
        async [REFRESH_BALANCE_AND_RATE]({
            dispatch
        }: ActionContext<State, RootState>): Promise<void> {
            await dispatch(REFRESH_BALANCE);
            await dispatch(REFRESH_EXCHANGE_RATE);
        },
        async [LOG_IN_ACTION](
            { dispatch, commit }: ActionContext<State, RootState>,
            session: Session
        ): Promise<void> {
            commit(LOG_IN, session);
            await dispatch(REFRESH_BALANCE_AND_RATE);
        }
    }
};
