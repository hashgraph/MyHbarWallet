import { FileAppendTransaction } from "@hashgraph/sdk";

export async function uploadFile(
  client: Client,
  options: {
    chunks: Uint8Array[];
    fileMemo: string | null;
    memo: string | null;
}): Promise<FileId> {
  const { FileCreateTransaction } = await import("@hashgraph/sdk");

  const fileId = await new FileCreateTransaction()
    .setContents(options.chunks[0])
    .setFileMemo(options.fileMemo ?? "")
    .setTransactionMemo(options.memo ?? "")
    .execute(client)
  
  // TODO get receipt
  // TODO the rest
  
  for (chunk of options.chunks.slice(1)) {
    const receipt = new FileAppendTransaction().setContents(chunk).setFileMemo(options.fileMemo ?? "").setTransactionMemo(options.memo ?? "").execute(client).getReciept().fileId // etc etc
  }

  return (await (await fileId.getReceipt(client)).fileId);
}