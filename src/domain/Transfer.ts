import type { AccountId } from "@hashgraph/sdk";
import type { BigNumber } from "bignumber.js";

export interface Transfer{
    to?: AccountId | null;
    asset: string;
    amount?: BigNumber | null;
    usd?: string;
}