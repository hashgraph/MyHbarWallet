<template>
  <div
    id="background"
    class="bg-pale-grey dark:bg-midnight-express text-center dark:text-silver-polish m-8 p-8 rounded border-dashed border-4 border-mountain-meadow dark:border-dark-shamrock"
  >
    <div
      id="container"
      class="w-full"
      @dragenter.prevent="dragEnter"
      @dragleave.prevent="dragLeave"
      @dragover.prevent
      @drop.prevent="drop"
    >
      <p class="m-4">
        {{ $t('InterfaceUploadFile.drop') }}
      </p>

      <p>{{ $t('InterfaceUploadFile.or') }}</p>

      <Button
        color="green"
        class="p-3 w-3/4 sm:w-1/2 m-4"
        @click="browse"
      >
        {{ $t('InterfaceUploadFile.select') }}
      </Button>
      
      <input
        v-show="false"
        ref="fileTarget"
        type="file"
        @change="prepareFile"
      >

      <p> {{ state.fileName }} </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

import Button from "../base/Button.vue";

export default defineComponent({
    name: "UploadZone",
    components: {
        Button
    },
    props: {
        fileName: { type: String, default: "" }
    },
    emits: [
        "fileSelect"
    ],
    setup(_, context) {
        const fileTarget = ref<HTMLInputElement | null>(null);

        const state = reactive({
            isHovering: false,
            fileName: null as string | null
        });

        async function dragEnter(): Promise<void> {
            state.isHovering = true;
        }

        async function dragLeave(): Promise<void> {
            state.isHovering = false;
        }

        async function drop(e: DragEvent): Promise<void> {
            console.log("from drop");
            state.isHovering = false;
            if (!e.dataTransfer || e.dataTransfer.files.length === 0) {
                throw new Error("No data was transfered.");
            }

            let file = e.dataTransfer.items[0].getAsFile();
            if (!file) {
                throw new Error("File does not exist.");
            }

            let fileData = await uint8ArrayOf(file);
            state.fileName = file.name;
            context.emit("fileSelect", {
                fileName: file.name,
                contents: fileData
            });
        }

        async function browse(): Promise<void> {
            fileTarget.value?.click();
        }

        async function prepareFile(): Promise<void> {
            if (!fileTarget.value) {
                throw new Error("File target should not be null.");
            }

            if (fileTarget.value.files == null) {
                return;
            }

            let file = fileTarget.value.files[0];
            let fileData = await uint8ArrayOf(file);
            state.fileName = file.name;
            context.emit("fileSelect", {
                fileName: file.name,
                contents: fileData
            });
        }

        async function uint8ArrayOf(file: File): Promise<Uint8Array> {
            let buffer = await new Promise<ArrayBuffer>((resolve, reject) => {
                let reader = new FileReader();
                reader.addEventListener("error", reject);
                reader.addEventListener("loadend", (): void => {
                    resolve(reader.result as ArrayBuffer);
                });
                reader.readAsArrayBuffer(file);
            });
            return new Uint8Array(buffer);
        }

        return {
            state,
            fileTarget,
            dragEnter,
            dragLeave,
            drop,
            prepareFile,
            browse
        }
    }
});
</script>