import { BigNumber } from "bignumber.js";

export interface HbarPriceService {
    getHbarPriceInUsd(): Promise<BigNumber>;
}
