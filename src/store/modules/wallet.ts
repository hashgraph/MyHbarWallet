import {
    SET_ACCOUNT,
    SET_PRIVATE_KEY,
    SET_CLIENT,
    SET_PUBLIC_KEY,
    LOG_OUT
} from "@/store/mutations";
import { Client } from "hedera-sdk-js";
import { IS_LOGGED_IN } from "@/store/getters";

export interface Id {
    shard: number;
    realm: number;
    account: number;
}

export interface State {
    account: Id | null;
    privateKey: string | null;
    publicKey: string | null;
    client: Client | null;
}

export default {
    state: {
        account: null,
        privateKey: null,
        publicKey: null,
        client: null
    },
    getters: {
        [IS_LOGGED_IN]: (state: State): boolean => {
            return (
                state.account != null &&
                state.publicKey != null &&
                state.client != null
            );
        }
    },
    mutations: {
        [SET_ACCOUNT](state: State, account: Id): void {
            state.account = account;
        },
        [SET_PRIVATE_KEY](state: State, privateKey: string): void {
            state.privateKey = privateKey;
        },
        [SET_PUBLIC_KEY](state: State, publicKey: string): void {
            state.publicKey = publicKey;
        },
        [SET_CLIENT](state: State, client: Client): void {
            state.client = client;
        },
        [LOG_OUT](state: State): void {
            state.account = null;
            state.publicKey = null;
            state.privateKey = null;
            state.client = null;
        }
    }
};
