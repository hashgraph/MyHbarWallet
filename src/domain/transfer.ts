import { AccountId } from "@hashgraph/sdk";
import { BigNumber } from "bignumber.js";

export enum Asset {
    Hbar = "Hbar",
    Token = "Token",
}

export interface Transfer {
    from: AccountId;
    to: AccountId;
    asset: Asset | string; // TokenId toString
    amount: BigNumber;
}
