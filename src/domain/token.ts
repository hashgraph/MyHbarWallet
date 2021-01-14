import { BigNumber } from "bignumber.js";
import type { TokenId } from "@hashgraph/sdk";

// not exported from sdk
export interface TokenRelationship {
    tokenId: TokenId;
    symbol: string;
    balance: BigNumber;
    kycStatus: boolean | null;
    freezeStatus: boolean | null;
}

export type Token = TokenRelationship;
