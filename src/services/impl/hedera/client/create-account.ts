import { AccountId, Client, PublicKey, AccountCreateTransaction, Hbar } from "@hashgraph/sdk";
import { BigNumber } from "bignumber.js";

export async function createAccount(client: Client, options: {
    publicKey: PublicKey;
    initialBalance: BigNumber;
}): Promise<AccountId | null> {
    const tx = await new AccountCreateTransaction()
        .setInitialBalance(Hbar.fromTinybars(options.initialBalance))
        .setMaxTransactionFee(new Hbar(1))
        .setKey(options.publicKey);

    const receipt = await (await tx.execute(client)).getReceipt(client);

    return receipt.accountId;
}