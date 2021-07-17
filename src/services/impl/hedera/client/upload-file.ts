import { FileAppendTransaction, FileId, Client } from "@hashgraph/sdk";

export async function uploadFile(
  client: Client,
  options: {
    file: Uint8Array;
    fileMemo: string | null;
    memo: string | null;
}): Promise<FileId> {
  const { FileCreateTransaction } = await import("@hashgraph/sdk");

  const fileId = await (await(await new FileCreateTransaction()
                                        .setKeys([client._operator?.publicKey])
                                        .setFileMemo(options.fileMemo ?? "")
                                        .setTransactionMemo(options.memo ?? "")
                                        .execute(client))
                              .getReceipt(client))
                        .fileId;


  
  await ( await new FileAppendTransaction()
                    .setFileId(fileId)
                    .setContents(options.file)
                    .execute(client))
                .getReceipt(client);

  
  return fileId;
}