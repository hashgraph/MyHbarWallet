import { BigNumber } from "bignumber.js";

import { User } from "../../../domain/user";
import { Token } from "../../../domain/token";
export interface State {
    user: User | null;
    balance: import("@hashgraph/sdk").Hbar | null;
    tokens: Token[] | null;
    exchangeRate: BigNumber | null;
    decimals: number | null;
}
