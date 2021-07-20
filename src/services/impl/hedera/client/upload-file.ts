import {
  FileCreateTransaction,
  FileAppendTransaction,
  FileId,
  Client,
  Hbar
} from "@hashgraph/sdk";

const MAX_CHUNK_LENGTH = 1024;

export function estimateFee(array: Uint8Array): Hbar {
  return new Hbar(2.6 * (estimateChunks(array) - 1) +
    (array.byteLength %
      MAX_CHUNK_LENGTH /
      1000 *
      0.55 +
      1.05));
}

export function estimateChunks(array: Uint8Array): number {
  return Math.ceil(array.byteLength / MAX_CHUNK_LENGTH);
}

export async function uploadFile(
  client: Client,
  options: {
    file: Uint8Array;
    fileMemo: string | null;
    memo: string | null;
  }): Promise<FileId | null> {
  const publicKey = client.operatorPublicKey;

  if (publicKey != null) {
    const response = await new FileCreateTransaction()
      .setKeys([publicKey])
      .setMaxTransactionFee(estimateFee(options.file))
      .execute(client);

    const id = await (await response.getReceipt(client)).fileId;

    if (id != null) {
      await (await new FileAppendTransaction()
        .setContents(options.file)
        .setFileId(id)
        .setMaxChunks(estimateChunks(options.file) * 2)
        .setMaxTransactionFee(estimateFee(options.file))
        .execute(client)
      ).getReceipt(client);

      return id;
    }
  }

  return null;
}