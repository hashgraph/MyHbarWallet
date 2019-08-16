import {
    LOG_OUT,
    LOG_IN
} from "@/store/mutations";
import { Client } from "hedera-sdk-js";
import { IS_LOGGED_IN } from "@/store/getters";

export interface Id {
    shard: number;
    realm: number;
    account: number;
}

export interface Session {
    account: Id;
    privateKey: string;
    publicKey: string;
    client: Client;   
}

export interface State {
    session: Session | null;
}

export default {
    state: {
        session: null,
    },
    getters: {
        [IS_LOGGED_IN]: (state: State): boolean => {
            return (
                state.session != null
            );
        }
    },
    mutations: {
        [LOG_IN](state: State, session: Session): void {
            state.session = session;
        },
        [LOG_OUT](state: State): void {
            state.session = null;
        }
    }
};
