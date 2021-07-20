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
    file: Uint8Array;
    fileMemo: string | null;
    memo: string | null;
  }): Promise<FileId | null> {
  const publicKey = client.operatorPublicKey;

  if (publicKey != null) {
    const response = await new FileCreateTransaction()
      .setKeys([publicKey])
      .setContents(decode(options.file))
      .setMaxTransactionFee(new Hbar(5))
      .execute(client);
    return await (await response.getReceipt(client)).fileId;
  }
  return null;
}