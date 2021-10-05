import publicIp from "public-ip";

import { useStore } from "../../../../store";

declare const __SIMPLEX_AUTH__: string;
declare const __SIMPLEX_WALLET_ID__: string;

export async function simplexGetQuote(options: { denomimation: string, amount: number, paymentMethod: string[] }): Promise<void> {
    const store = useStore();
    const publicIPAddress = await publicIp.v4();

    const request = new XMLHttpRequest();
    request.open("POST", "https://sandbox.test-simplexcc.com/wallet/merchant/v2/quote");
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Access-Control-Allow-Origin", "*");
    request.setRequestHeader("ApiKey", `${__SIMPLEX_AUTH__}`);

    request.send(JSON.stringify({
        "end-user-id": store.accountId?.toString(),
        "digital_currency": "HBAR",
        "fiat_currency": options.denomimation,
        "requested_currency": options.denomimation,
        "requested_amount": options.amount,
        "wallet_id": __SIMPLEX_WALLET_ID__,
        "client_ip": publicIPAddress,
        "payment_methods": options.paymentMethod
    }));

    console.log(request);
    console.log(request.response);
    console.log(request.responseText);
}