import axios from "axios";

import { useStore } from "../../../../store";
import { CryptoTransfer } from "../../../../domain/CryptoTransfer";

export async function getTransfer(options: { hash: string } ): Promise<CryptoTransfer> {
    const store = useStore();

    //TODO: Replace with proper API call when API is fixed
    //https://v2.api.${store.network}.kabuto.sh/transaction/:${options.hash}
    const resp = await axios.get(`https://v2.api.${store.network}.kabuto.sh/transaction?filter[entityId]=${store.accountId}`)
        .then( ({ data }) => data)
        .catch((error: Error) => {
            throw error;
        });

    return resp.data.filter((transfer: CryptoTransfer)=> transfer.hash === options.hash)[0];
}