import {
  FileCreateTransaction,
  FileAppendTransaction,
  FileId,
  Client,
  Hbar
} from "@hashgraph/sdk";

function decode(a: Uint8Array): string {
  return new TextDecoder().decode(a);
}

export async function uploadFile(
  client: Client,
  options: {
    chunks: Uint8Array[];
    fileMemo: string | null;
    memo: string | null;
  }): Promise<FileId | null> {
  const publicKey = client.operatorPublicKey;

  if (publicKey != null) {
    const response = await new FileCreateTransaction()
      .setKeys([publicKey])
      .setContents(decode(options.chunks[0]))
      .setMaxTransactionFee(new Hbar(5))
      .execute(client);

    const id = await (await response.getReceipt(client)).fileId;

    if (id != null) {
      for (const chunk of options.chunks.slice(1)) {
        await (await new FileAppendTransaction()
          .setFileId(id)
          .setContents(decode(chunk))
          .setMaxTransactionFee(new Hbar(5))
          .execute(client))
          .getReceipt(client);
      }
    }

    return id;
  }

  return null;
}