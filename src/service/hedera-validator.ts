import { getters } from "../ui/store";

import { externalRequest } from "./request";

export interface TransactionData {
    recepient: string;
    routerAddress: string;
    amount: string;
    nativeAsset: string;
    wrappedAsset: string;
    signatures: string[];
    majority: boolean;
}

// returns the event's transaction id on Hedera
export async function eventTx(eventID: string): Promise<string> {
    try {
        return await externalRequest(`${getters.currentNetwork().bridge?.validator!}events/${eventID}/tx`);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(error);
    }

    return "";
}

export async function txData(transactionId: string): Promise<TransactionData> {
    try {
        return await externalRequest(`${getters.currentNetwork().bridge?.validator!}transfers/${transactionId}`);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(error);
    }

    return {};
}
