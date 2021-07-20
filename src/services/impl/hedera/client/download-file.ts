import { Client, FileContentsQuery, FileId } from "@hashgraph/sdk";
import { ref } from "vue";
import * as fileType from "file-type";


export async function downloadFile(client: Client, options: { fileId: FileId; }): Promise<void> {
    let file;
    try {
        file = await new FileContentsQuery().setFileId(options).execute(client);
    } catch (error) {
        throw new Error(error);
    }
    const type = await fileType.fromBuffer(file);
    const blob = new Blob([file]);
    const fileURL = URL.createObjectURL(blob);
    const fileLink = ref<HTMLAnchorElement | null>(null);
    fileLink.value = document.createElement("a") as HTMLAnchorElement;
    fileLink.value.href = fileURL;
    fileLink.value.download = `MHW_File__${options.toString()}${type ? `.${type.ext}` : ".txt"}`;
    fileLink.value.click();
}