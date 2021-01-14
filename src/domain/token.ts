import { BigNumber } from "bignumber.js";
import type { TokenId } from "@hashgraph/sdk";

export interface Token {
    tokenId: TokenId;
    balance: BigNumber;
    decimals: number;
}
