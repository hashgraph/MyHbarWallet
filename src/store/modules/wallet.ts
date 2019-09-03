import { LOG_OUT, LOG_IN } from "../../store/mutations";
import { Client, Ed25519PrivateKey } from "@hashgraph/sdk";
import { IS_LOGGED_IN } from "../../store/getters";
import { ActionContext } from "vuex";
import { RootState } from "..";
import { REFRESH_BALANCE, LOG_IN as LOG_IN_ACTION } from "../actions";
import BigNumber from "bignumber.js";

const SET_BALANCE = "wallet#set_balance";

export interface Id {
    shard: number;
    realm: number;
    account: number;
}

export interface Session {
    account: Id;
    privateKey: Ed25519PrivateKey;
    client: Client;
}

export interface State {
    session: Session | null;
    balance: BigNumber | null;
}

export default {
    state: {
        session: null,
        balance: null
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

            const balance = await state.session.client.getAccountBalance();

            commit(SET_BALANCE, balance);
        },
        async [LOG_IN_ACTION](
            { dispatch, commit }: ActionContext<State, RootState>,
            session: Session
        ): Promise<void> {
            commit(LOG_IN, session);
            await dispatch(REFRESH_BALANCE);
        }
    }
};
