
//See https://docs.kabuto.sh/reference#transaction

import type { AccountId, Timestamp } from "@hashgraph/sdk";
import BigNumber from "bignumber.js";

//TODO: Replace with Transfer in domain from Send PR after merge, Transfer will be in domain
interface Transfer {
    to?: AccountId;
    asset: string; // "HBAR" or token ID (string)
    amount?: BigNumber;
    usd?: string;
}

export interface CryptoTransfer {
    id: string,
    validStartAt: Timestamp,
    hash: string,
    operatorAccountId: AccountId,
    nodeAccountId: AccountId,
    type: string,
    typeCode: number,
    consensusAt: Timestamp,
    value: number,
    fee: number,
    maxFee: number,
    memo: string,
    status: string,
    statusCode: number,
    entity: AccountId,
    transfers: Transfer[],
    validDuration: number,
}