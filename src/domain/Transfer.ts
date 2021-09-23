import type { AccountId } from "@hashgraph/sdk";
import type { BigNumber } from "bignumber.js";

export interface Transfer{
    to?: AccountId | undefined;
    asset: string;
    amount?: BigNumber | undefined;
    usd?: string;
}