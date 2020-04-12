import { BigNumber } from "bignumber.js";

import { externalRequest } from "./request";

export const coingeckoEndpoint =
    "https://api.coingecko.com/api/v3/coins/hedera-hashgraph?market_data=true";

export interface MarketDataJSON {
    market_data: {
        current_price: {
            usd: number;
        };
        market_cap: {
            usd: number;
        };
    };
}

function price(json: MarketDataJSON): number {
    return json.market_data.current_price.usd;
}

export async function currentPrice(): Promise<BigNumber> {
    // try {
    //     return new BigNumber(price(await externalRequest(coingeckoEndpoint)));
    // } catch (error) {
    //     console.warn(error);
    // using static price because CoinGecko is down right now
    return new BigNumber("0.032804");
    // }
}
