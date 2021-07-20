import { Client, FileContentsQuery, FileId } from "@hashgraph/sdk";

export async function downloadFile(client: Client, options: { fileId: FileId; }): Promise<Uint8Array> {
    return await new FileContentsQuery().setFileId(options.fileId).execute(client);
}