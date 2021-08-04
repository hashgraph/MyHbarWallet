import type { AccountId, Client, PublicKey } from "@hashgraph/sdk";
import { BigNumber } from "bignumber.js";

export async function createAccount(client: Client, options: {
    publicKey: PublicKey;
    initialBalance: BigNumber;
}): Promise<AccountId | null> {

    const { AccountCreateTransaction, Hbar } = await import ("@hashgraph/sdk");
    const tx = await new AccountCreateTransaction()
        .setInitialBalance(Hbar.fromTinybars(options.initialBalance))
        .setMaxTransactionFee(new Hbar(1))
        .setKey(options.publicKey);

    const receipt = await (await tx.execute(client)).getReceipt(client);

    return receipt.accountId;
}