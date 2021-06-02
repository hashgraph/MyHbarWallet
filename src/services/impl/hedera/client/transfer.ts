import type { Client } from "@hashgraph/sdk";
import BigNumber from "bignumber.js";
import { SimpleTransfer } from "../../../hedera";

export async function transfer(
  client: Client,
  options: {
    transfers: SimpleTransfer[];
    memo: string | null;
    maxFee: BigNumber | null; // tinybars
    onBeforeConfirm?: () => void;
  }
): Promise<void> {
  const { TransferTransaction, Hbar } = await import("@hashgraph/sdk");

  const transaction = new TransferTransaction();

  for (const transfer of options.transfers) {
    if (transfer.asset === "HBAR") {
      const amount = Hbar.fromTinybars(transfer.amount.toNumber());

      transaction.addHbarTransfer(transfer.to, amount);

      transaction.addHbarTransfer(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        client.operatorAccountId!,
        amount.negated()
      );
    } else {
      transaction.addTokenTransfer(
        transfer.asset,
        transfer.to,
        transfer.amount.toNumber()
      );

      transaction.addTokenTransfer(
        transfer.asset,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        client.operatorAccountId!,
        transfer.amount.negated().toNumber()
      );
    }
  }

  const resp = await transaction.execute(client);

  options.onBeforeConfirm?.();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const receipt = await resp.getReceipt(client);
}
