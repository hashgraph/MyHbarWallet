import { AccountId, Client, PublicKey } from "@hashgraph/sdk";
import { BigNumber } from "bignumber.js";

export async function createAccount(client: Client, options: {
    publicKey: PublicKey;
    initialBalance: BigNumber.Instance;
}): Promise<AccountId> {
    console.log(client);
    console.log(options);
}