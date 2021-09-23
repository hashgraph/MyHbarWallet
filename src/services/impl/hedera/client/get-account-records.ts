import axios from "axios";

import { useStore } from "../../../../store";
import { CryptoTransfer } from "../../../../domain/CryptoTransfer";

export async function getAccountRecords(): Promise<CryptoTransfer[] | undefined>{
    const store = useStore();
    const accountId = store.accountId;
    const serverAddress = store.serverAddress;

    const resp = await axios.get(`${serverAddress}/transaction?filter[entityId]=${accountId}`)
        .then(({ data }) => data)
        .catch((error: Error)=>{
            throw error;
        });
    
    return resp.data as CryptoTransfer[];
}