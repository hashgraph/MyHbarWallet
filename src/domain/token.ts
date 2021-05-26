import { BigNumber } from "bignumber.js";
import type { TokenId } from "@hashgraph/sdk";

export interface Token {
    tokenId: TokenId;
    balance: BigNumber;
    decimals: number;
    symbol: string;
}

export interface MirrorNodeToken {
    token_id: string;
    balance: BigNumber;
    decimals: number;
    symbol: string;
}
