import axios from "axios";

import { useStore } from "../../../../store";
import { CryptoTransfer } from "../../../../domain/CryptoTransfer";
import { getMirrorBase } from "..";

export async function getAccountRecords(account?: string): Promise<CryptoTransfer[] | undefined>{
    const store = useStore();
    const urlBase = getMirrorBase(store.network);

    const resp = await axios.get(`${urlBase}/transactions?account.id=${account ?? store.client?.getAccountId().toString()}`)
        .then(({ data }) => data)
        .catch((error: Error) => {
            throw error;
        });

    return resp.data as CryptoTransfer[];
}
