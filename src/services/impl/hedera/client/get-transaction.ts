import axios from "axios";

import { useStore } from "../../../../store";
import { CryptoTransfer } from "../../../../domain/CryptoTransfer";

export async function getTransfer(options: { hash: string } ): Promise<CryptoTransfer> {
    const store = useStore();
    const network = store.network === "mainnet" ? "" : ".testnet";

    const resp = await axios.get(`https://v2.api${network}.kabuto.sh/transaction?filter[entityId]=${store.accountId}`)
        .then(({ data }) => data)
        .catch((error: Error) => {
            throw error;
        });

    return resp.data.filter((transfer: CryptoTransfer)=> transfer.hash === options.hash)[0];
}
