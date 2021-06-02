import { Wallet } from "../../../domain/wallet/abstract";
import { AccountId, Client, TokenId } from "@hashgraph/sdk";
import { HederaService, SimpleHederaClient } from "../../hedera";
import { SimpleHederaClientImpl } from "./client";

export class HederaServiceImpl implements HederaService {
  async createClient(options: {
    wallet: Wallet;
    network:
      | string
      | {
          [key: string]: string | AccountId;
        };
    keyIndex: number;
    accountId: AccountId;
  }): Promise<SimpleHederaClient | null> {
    const { Client } = await import("@hashgraph/sdk");

    let client;

    if (typeof options.network === "string") {
      // HACK: the NetworkName type is not exported
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      client = Client.forName(options.network as any);
    } else {
      client = Client.forNetwork(options.network);
    }

    const transactionSigner = await options.wallet.getTransactionSigner(
      options.keyIndex
    );

    const privateKey = await options.wallet.getPrivateKey(options.keyIndex);
    const publicKey = await options.wallet.getPublicKey(options.keyIndex);

    client.setOperatorWith(options.accountId, publicKey, transactionSigner);

    if (!(await testClientOperatorMatch(client))) {
      return null;
    }

    return new SimpleHederaClientImpl(client, privateKey);
  }
}

/** Does the operator key belong to the operator account */
async function testClientOperatorMatch(client: Client) {
  const { TransferTransaction, Hbar, Status, StatusError } = await import(
    "@hashgraph/sdk"
  );

  const tx = new TransferTransaction()
    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
    .addHbarTransfer(client.operatorAccountId!, Hbar.fromTinybars(0))
    .setMaxTransactionFee(Hbar.fromTinybars(1));

  try {
    await tx.execute(client);
  } catch (err) {
    if (err instanceof StatusError) {
      if (
        err.status === Status.InsufficientTxFee ||
        err.status === Status.InsufficientPayerBalance
      ) {
        // If the transaction fails with Insufficient Tx Fee, this means
        // that the account ID verification succeeded before this point
        // Same for Insufficient Payer Balance

        return true;
      }

      return false;
    }

    throw err;
  }

  // under *no* cirumstances should this transaction succeed
  throw new Error(
    "unexpected success of intentionally-erroneous transaction to confirm account ID"
  );
}
