import axios from "axios";

import { useStore } from "../../../../store";

export async function getAccountRecords(): Promise<[]>{
    const store = useStore();
    const serverAddress = store.kabutoServerAddress;
    const accountId = store.accountId;

    const resp = await axios.get(`${serverAddress}/transaction?entity=${accountId}`)
        .catch( (error)=>{
            throw new Error(error);
        });
    return resp.data.transactions;
}