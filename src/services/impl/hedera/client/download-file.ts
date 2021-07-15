import { Client, FileContentsQuery, FileId } from "@hashgraph/sdk";
import { ref } from "vue";
import * as fileType from "file-type";


export async function downloadFile(client: Client, fileId: FileId, fileName: string): Promise<void> {

    let file;
    try {
        file = await new FileContentsQuery().setFileId(fileId).execute(client);
    } catch (error) {
        throw new Error(error);
    }

    
    const type = await fileType.fromBuffer(file);
    const blob = new Blob([file]);
    const fileURL = URL.createObjectURL(blob);
    const fileLink = ref<HTMLAnchorElement | null>(null);
    fileLink.value = document.createElement("a") as HTMLAnchorElement;
    fileLink.value.href = fileURL;
    fileLink.value.download = `MHW_File__${fileId.toString()}${type ? `.${type.ext}` : ""}`;
    fileLink.value.click();
}