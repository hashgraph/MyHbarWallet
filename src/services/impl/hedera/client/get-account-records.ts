import axios from "axios";

import { useStore } from "../../../../store";
import { getMirrorBase } from "..";
import { Transaction } from "../../../../domain/Transaction";

export async function getAccountRecords(account?: string): Promise<Transaction[] | undefined>{
    const store = useStore();
    const baseUrl = getMirrorBase(store.network);

    const resp = await axios.get(`https://${baseUrl}/api/v1/transactions?account.id=${account ?? store.client?.getAccountId().toString()}`)
        .then(({ data }) => data)
        .catch((error: Error) => {
            throw error;
        });

    return resp.data;
}
