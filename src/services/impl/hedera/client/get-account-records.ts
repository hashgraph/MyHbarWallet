import axios from "axios";

import { useStore } from "../../../../store";

const serverAddress = (network: string) => `https://v2.api.${network}.kabuto.sh`;

export type TransactionRecord = unknown;

export async function getAccountRecords(): Promise<TransactionRecord[] | undefined>{
    const store = useStore();
    const accountId = store.accountId;
    const network = store.network;

    const resp = await axios.get(`${serverAddress(network)}/account/${accountId}/transaction`)
        .catch((error: Error)=>{
            throw error;
        });
    return resp.data.transactions;
}