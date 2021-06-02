import BigNumber from "bignumber.js";
import JSONBigNumber from "../../utils/json-bignumber.js";

interface CoingeckoSimplePriceResponse {
  "hedera-hashgraph": {
    usd: BigNumber;
  };
}

export class CoingeckoHbarPriceServiceImpl {
  async getHbarPriceInUsd(): Promise<BigNumber> {
    const resp = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?" +
        new URLSearchParams({
          ids: "hedera-hashgraph",
          vs_currencies: "usd",
        })
    );

    const text = await resp.text();
    const data: CoingeckoSimplePriceResponse = JSONBigNumber.parse(text);

    return data["hedera-hashgraph"].usd;
  }
}
