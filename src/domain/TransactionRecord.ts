import type { Timestamp, AccountId } from "@hashgraph/sdk";
import { BigNumber } from "bignumber.js";

export interface TransactionRecord {
    id: AccountId,
    validStartAt: Timestamp,
    hash: AccountId,
    node: AccountId,
    type: string,
    consensusAt: Timestamp,
    value: BigNumber,
    fee: BigNumber,
    memo: string,
    status: string,
    entity: AccountId,
    transfers: []
}