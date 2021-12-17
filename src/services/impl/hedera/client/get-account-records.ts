import axios from "axios";

import { useStore } from "../../../../store";
import { CryptoTransfer } from "../../../../domain/CryptoTransfer";

export async function getAccountRecords(): Promise<CryptoTransfer[] | undefined>{
    const store = useStore();
    const network = store.network === "mainnet" ? "" : ".testnet";

    const resp = await axios.get(`https://v2.api${network}.kabuto.sh/transaction?filter[entityId]=${store.accountId}`)
        .then(({ data }) => data)
        .catch((error: Error) => {
            throw error;
        });

    //Display items from newest to oldest (Kabuto started showing oldest first)
    return resp.data.reverse() as CryptoTransfer[];
}
