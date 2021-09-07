import axios from "axios";

import { useStore } from "../../../../store";
import { TransactionRecord } from "../../../../domain/TransactionRecord";

// export type TransactionRecord = unknown;

export async function getAccountRecords(): Promise<TransactionRecord[] | undefined>{
    const store = useStore();
    const accountId = store.accountId;
    const serverAddress = store.kabutoServerAddress;

    const resp = await axios.get(`${serverAddress}/transaction?q={"operator":${accountId}}`)
        .catch((error: Error)=>{
            throw error;
        });

    console.log(resp);
    return resp.data.transactions;
}