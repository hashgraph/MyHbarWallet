<template>
    <div
        id="upload-background"
        class="dark:text-white dark:bg-midnight-express bg-husky w-5/6 m-auto mt-10 rounded-md border-8 p-16 border-dashed dark:border-squant border-seafoam-blue justify-items-center text-center"
    >
        <div
            @dragenter.prevent="dragEnter"
            @dragleave.prevent="dragLeave"
            @dragover.prevent
            @drop.prevent="drop"
        >
            <p class="text-2xl">{{ $t("InterfaceUploadFile.drop") }}</p>
            <p class="m-4">{{ $t("InterfaceUploadFile.or") }}</p>
            <Button color="green" class="p-4 m-4">{{ $t("InterfaceUploadFile.button") }}</Button>


            <p v-if = "fileName != null && fileName !== ''"> {{ fileName }} </p>

            <input
                v-show="false"
                id="file-upload"
                ref="fileTarget"
                type="file"
                @change="prepareFile"
            />
        </div>
    </div>
</template>


<script lang = "ts">
import { defineComponent, reactive, ref, Ref } from "vue";
import Button from "./Button.vue";

export default defineComponent({
    name: "UploadZone",
    props: {
        fileName: String
    },  
    components: {
        Button
    },

    setup(_, context) {

        const fileTarget = ref<HTMLInputElement | null>(null);


        let state = reactive({
            hovering: null,
        });


        async function dragEnter(): Promise<void> {
            console.log("From dragEnter");
            state.hovering = true;
        }


        async function dragLeave(): Promise<void> {
            console.log("From dragLeave");
            state.hovering = false;
        }

        async function drop(e: DragEvent): Promise<void> {
            state.hovering = false;
            console.log("From drop.");
            if (!e.dataTransfer || e.dataTransfer.files.length === 0) {
                console.log("No file present.");
                return;
            }

            let file = e.dataTransfer.items[0].getAsFile();

            if (!file) {
                console.log("File does not exist.");
                return;
            }


            let fileBytes = await uint8ArrayOf(file);
            context.emit("fileSelect", {
                fileName: file.name,
                contents: fileBytes
            });

        }



        async function prepareFile(): Promise<void> {

            if (!fileTarget.value) {
                throw new Error("File target should not be null.");
                return;
            }

            if (fileTarget.value.files == null) {
                console.log("User hit cancel.");
                return;
            }


            let data = fileTarget.value.files[0];
            let fileBytes = await uint8ArrayOf(data);

            context.emit("fileSelect", {
                fileName: data.name,
                contents: fileBytes
            });
        }


        function browse(): void {

            console.log("From browse.");
            if (fileTarget.value) {
                (fileTarget as Ref<HTMLInputElement>).value.value = "";
                fileTarget.value.click();

            }
        }



        async function uint8ArrayOf(file: File): 
        Promise<Uint8Array> {
            console.log("From uint8ArrayOf.");
            let buffer = await new Promise<ArrayBuffer>((res, rej) => {
                let reader = new FileReader();
                reader.addEventListener("error", rej);
                reader.addEventListener("loadend", (): void => {
                    res(reader.result as ArrayBuffer);
                });

                reader.readAsArrayBuffer(file);
            });
            return new Uint8Array(buffer);
        }


        return { state, dragEnter, dragLeave, drop, prepareFile, browse, uint8ArrayOf };
    }
});
</script>