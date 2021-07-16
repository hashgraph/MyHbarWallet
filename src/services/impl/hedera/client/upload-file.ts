import { FileAppendTransaction, FileId, Client } from "@hashgraph/sdk";

export async function uploadFile(
  client: Client,
  options: {
    chunks: Uint8Array[];
    fileMemo: string | null;
    memo: string | null;
}): Promise<FileId> {
  const { FileCreateTransaction } = await import("@hashgraph/sdk");

  const response = await new FileCreateTransaction()
    .setContents(options.chunks[0])
    .setFileMemo(options.fileMemo ?? "")
    .setTransactionMemo(options.memo ?? "")
    .execute(client);

  const fileId = (await response.getReceipt(client)).fileId;
  
  // TODO get receipt
  // TODO the rest
  console.log(options.chunks);
  
  for (const chunk of options.chunks) {
    console.log(chunk);
    const receipt = await(await new FileAppendTransaction()
    .setFileId(fileId)
    .setContents(chunk)
    .setTransactionMemo(options.memo ?? "")
    .execute(client)).getReceipt(client);
  }


  
  return await (await response.getReceipt(client))?.fileId;
}