import { BigNumber } from "bignumber.js";

import JSONBN from '../../utils/json-bignumber.js';
import { HbarPriceService } from "../hbar-price";

interface CoingeckoSimplePriceResponse {
    "hedera-hashgraph": {
        usd: BigNumber;
    };
}

export class CoingeckoHbarPriceServiceImpl implements HbarPriceService {
  async getHbarPriceInUsd(): Promise<BigNumber> {
    const resp = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?" +
                new URLSearchParams({
                  ids: "hedera-hashgraph",
                  vs_currencies: "usd",
                })
    );

    const text = await resp.text();
    // eslint-disable-next-line import/no-named-as-default-member
    const data: CoingeckoSimplePriceResponse = JSONBN.parse(text);

    return data["hedera-hashgraph"].usd;
  }
}
