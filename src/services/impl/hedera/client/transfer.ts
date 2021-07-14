import type { Client } from "@hashgraph/sdk";
import { BigNumber } from "bignumber.js";

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

<<<<<<< HEAD
  for (const transfer of options.transfers) {
    if (transfer.asset === "HBAR") {
      const amount = Hbar.fromTinybars(transfer.amount.toNumber());

      transaction.addHbarTransfer(transfer.to, amount);
=======
  transaction.setTransactionMemo(options.memo ?? "");
  transaction.setMaxTransactionFee(options.maxFee ?? new Hbar(1));

  for (const transfer of options.transfers) {
    if (transfer.asset === "HBAR") {
      const amount = Hbar.fromTinybars(transfer.amount?.toNumber());

      transaction.addHbarTransfer(transfer.to ?? "", amount);
>>>>>>> f2c10c4df5318585ac3f75f3b2d0fce33b66cc11

      transaction.addHbarTransfer(
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                client.operatorAccountId!,
                amount.negated()
      );
    } else {
      transaction.addTokenTransfer(
<<<<<<< HEAD
        transfer.asset,
        transfer.to,
        transfer.amount.toNumber()
      );

      transaction.addTokenTransfer(
        transfer.asset,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                client.operatorAccountId!,
                transfer.amount.negated().toNumber()
=======
        transfer.asset ?? "",
        transfer.to ?? "",
        transfer.amount?.toNumber()
      );

      transaction.addTokenTransfer(
        transfer.asset ?? "",
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                client.operatorAccountId!,
                transfer.amount?.negated().toNumber()
>>>>>>> f2c10c4df5318585ac3f75f3b2d0fce33b66cc11
      );
    }
  }

  const resp = await transaction.execute(client);

  options.onBeforeConfirm?.();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const receipt = await resp.getReceipt(client);
}
