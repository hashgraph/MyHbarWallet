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
      .freezeWith(client)
      .setMaxTransactionFee(Hbar.fromTinybars(1));
  
    try {
      await associateTransaction.execute(client);
    } catch (err) {
      if (err instanceof StatusError) {
        if (err.status === Status.TokenAlreadyAssociatedToAccount) { }
      }

      throw err;
    }
  }