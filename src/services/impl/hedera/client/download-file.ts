import type { Client, FileId } from "@hashgraph/sdk";

export async function downloadFile(client: Client, options: { fileId: FileId; }): Promise<Uint8Array> {
    const { FileContentsQuery } = await import ("@hashgraph/sdk");
    return await new FileContentsQuery().setFileId(options.fileId).execute(client);
}