import type { TransactionRecord } from "@hashgraph/sdk";

import { useStore } from "../../../../store";

export async function getTransactionRecord(options: { transactionHash: string }): Promise<TransactionRecord> {
    const axios = await import("axios");
    const store = useStore();
    const serverAddress = store.kabutoServerAddress;
    
    const resp = await axios.get(`${serverAddress}/transaction/${options.transactionHash}`)
        .catch( (error)=>{
            throw new Error(error);
        });
    
    return resp.data as TransactionRecord;
}