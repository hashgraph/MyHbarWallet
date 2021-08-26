import { useStore} from "../../../../store";

import type { TransactionRecord } from "@hashgraph/sdk";

export async function getAccountRecords(): Promise<TransactionRecord[]>{
    const axios = await import("axios");
    const store = useStore();
    const serverAddress = store.kabutoServerAddress;
    const accountId = store.accountId;

    const resp = await axios.get(`${serverAddress}/account/${accountId}/transaction`)
        .catch( (error)=>{
            throw new Error(error);
        });

    return resp.data.transactions as TransactionRecord[];
}