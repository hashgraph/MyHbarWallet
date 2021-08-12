import type { AccountId, Client, TokenId } from "@hashgraph/sdk";

export async function associateToken(
  client: Client,
  options: {
        account: AccountId;
        tokens: TokenId[];
    }
): Promise<void> {
  const { TokenAssociateTransaction, Hbar } =
        await import("@hashgraph/sdk");

  const associateTransaction = new TokenAssociateTransaction()
    .setAccountId(options.account)
    .setTokenIds(options.tokens)
    .setMaxTransactionFee(new Hbar(1));

  try {
    await (await associateTransaction.execute(client)).getReceipt(client);
  } catch (err) {
    throw err;
  }
}
