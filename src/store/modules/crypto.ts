import { SET_ACCOUNT, SET_PRIVATE_KEY, SET_CLIENT } from "@/store/mutations";
import { Client } from "hedera-sdk-js";

export interface Id {
    shard: number;
    realm: number;
    account: number;
}

export interface State {
    account: Id;
    privateKey: string;
    client: Client | null;
}

export default {
    state: {
        account: {
            shard: 0,
            realm: 0,
            account: 0
        },
        privateKey: "",
        client: null
    },
    getters: {
        account: (state: State): Id => state.account,
        privateKey: (state: State): string => state.privateKey
    },
    mutations: {
        [SET_ACCOUNT](state: State, account: Id): void {
            state.account = account;
        },
        [SET_PRIVATE_KEY](state: State, privateKey: string): void {
            state.privateKey = privateKey;
        },
        [SET_CLIENT](state: State, client: Client): void {
            state.client = client;
        }
    }
};
