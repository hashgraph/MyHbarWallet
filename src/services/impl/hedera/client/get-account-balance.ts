import type { Client } from "@hashgraph/sdk";
import BigNumber from "bignumber.js";
import { AccountBalance, TokenBalance } from "../../../hedera";

export async function getAccountBalance(
  client: Client
): Promise<AccountBalance> {
  const { HbarUnit, AccountBalanceQuery } = await import("@hashgraph/sdk");

  const resp = await new AccountBalanceQuery({
    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
    accountId: client.operatorAccountId!,
  }).execute(client);

  const hbars = resp.hbars.to(HbarUnit.Hbar);
  const tokens = new Map<string, TokenBalance>();

  if (resp.tokens != null) {
    for (const tokenId of resp.tokens.keys()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const balance = resp.tokens.get(tokenId)!;

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const decimals = resp.tokenDecimals?.get(tokenId) ?? 0;

      let balanceN = new BigNumber(balance.toString());
      balanceN = balanceN.div(new BigNumber(10).pow(decimals));

      tokens.set(tokenId.toString(), {
        balance: balanceN,
        decimals,
      });
    }
  }

  return { hbars, tokens };
}
