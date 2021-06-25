import type { AccountId, Client, TokenId } from "@hashgraph/sdk";

export async function associateToken(client: Client, options: {
    account: AccountId,
    tokens: TokenId[]
  }): Promise<void> {
    const {
      TokenAssociateTransaction,
      Hbar,
      Status,
      StatusError
    } = await import("@hashgraph/sdk");

    const associateTransaction = new TokenAssociateTransaction()
      .setAccountId(options.account)
      .setTokenIds(options.tokens)
      .setMaxTransactionFee(Hbar.fromTinybars(1));

    // TODO try execute and get result
  }