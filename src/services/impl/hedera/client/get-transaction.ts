import axios from "axios";

import { useStore } from "../../../../store";
import { Transaction } from "../../../../domain/Transaction";
import { getMirrorBase } from "..";

export async function getTransactionById(options: { id: string } ): Promise<Transaction> {
    const store = useStore();
    const baseUrl = getMirrorBase(store.network);

    const resp = await axios.get(`https://${baseUrl}/api/v1/transactions/${options.id}`)
        .then(({ data }) => data)
        .catch((error: Error) => {
            throw error;
        });

    return resp.transactions[0];
}
