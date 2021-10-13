import axios from "axios";
import publicIp from "public-ip";

import { useStore } from "../../../../store";

declare const __SIMPLEX_AUTH__: string;
declare const __SIMPLEX_WALLET_ID__: string;

export async function simplexGetQuote(options: { denomimation: string, amount: number, paymentMethod: string[] }): Promise<void> {
    const store = useStore();
    const publicIPAddress = await publicIp.v4();

    const data = {
        "end-user-id": store.accountId?.toString(),
        "digital_currency": "HBAR",
        "fiat_currency": options.denomimation,
        "requested_currency": options.denomimation,
        "requested_amount": options.amount,
        "wallet_id": __SIMPLEX_WALLET_ID__,
        "client_ip": publicIPAddress,
        "payment_methods": options.paymentMethod
    };

    const config = {
        data: data,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ApiKey": `${__SIMPLEX_AUTH__}`
        }
    };

    const resp = await axios.post("https://sandbox.test-simplexcc.com/wallet/merchant/v2/quote HTTP/1.1", config)
        .then( ({data}) => data)
        .catch((e: Error) => {
            throw e;
        });
}
