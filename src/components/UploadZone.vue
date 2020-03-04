<template>
    <div
        class="upload-zone"
        :class="{ 'file-hover': state.isFileHovering }"
        @dragenter.prevent="handleDragEnter"
        @dragleave.prevent="handleDragLeave"
        @dragover.prevent
        @drop.prevent="handleDrop"
    >
        <div class="drop-text">
            {{ $t("uploadFile.drop") }}
        </div>
        <div class="or-text">
            {{ $t("uploadFile.or") }}
        </div>
        <Button
            class="button"
            :label="$t('uploadFile.select')"
            @click="handleBrowseClick"
        />
        <div
            v-if="fileName != null && fileName !== ''"
            class="file-name-container"
        >
            <MaterialDesignIcon
                class="icon"
                :icon="mdiFileUpload"
            />
            <span class="file-name">{{ fileName }}</span>
        </div>
        <input
            v-show="false"
            id="file-upload"
            ref="fileTarget"
            type="file"
            @change="prepareFile"
        >
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, Ref } from "@vue/composition-api";
import Button from "../components/Button.vue";
import MaterialDesignIcon from "../components/MaterialDesignIcon.vue";
import { mdiFileUpload } from "@mdi/js";

async function uint8ArrayOf(file: File): Promise<Uint8Array> {
    const fileBuff = await new Promise<ArrayBuffer>((resolve, reject) => {
        const reader = new FileReader();

        reader.addEventListener("error", reject);
        reader.addEventListener("loadend", (): void => {
            resolve(reader.result as ArrayBuffer);
        });

        reader.readAsArrayBuffer(file);
    });

    return new Uint8Array(fileBuff);
}

export default defineComponent({
    components: {
        Button,
        MaterialDesignIcon
    },
    props: { fileName: String },
    setup(props, context) {
        const state = reactive({
            isFileHovering: false,
            dragCounter: 0
        });

        const fileTarget = ref<HTMLInputElement | null>(null);

        function handleBrowseClick(): void {
            if (fileTarget.value != null) {
                (fileTarget as Ref<HTMLInputElement>).value.value = "";
                fileTarget.value.click(); // triggers loadTextFromFile via hidden input @click
            }
        }

        async function handleDragEnter(): Promise<void> {
            state.dragCounter++;
            if (state.dragCounter >= 0) state.isFileHovering = true;
        }

        async function handleDragLeave(): Promise<void> {
            state.dragCounter--;
            if (state.dragCounter === 0) state.isFileHovering = false;
        }

        async function handleDrop(event: DragEvent): Promise<void> {
            state.dragCounter = 0;
            state.isFileHovering = false;

            if (!event.dataTransfer || event.dataTransfer.files.length === 0) {
                // no file was present
                return;
            }

            // only handle one file
            const file = event.dataTransfer.items[ 0 ].getAsFile();

            if (!file) {
                // file did not actually exist
                return;
            }

            const fileBytes = await uint8ArrayOf(file);

            context.emit("fileSelect", {
                fileName: file.name,
                contents: fileBytes
            });
        }

        // prepares file for upload, resets file states if file has changed, gets total Chunks for fee estimate, gets hashed file if 'Hash file' is selected, gets fee estimate
        async function prepareFile(): Promise<void> {
            if (!fileTarget.value) {
                throw new Error("fileTarget should not be null");
            }

            if (fileTarget.value.files == null) {
                // User hit cancel
                return;
            }

            const fileData = fileTarget.value.files[ 0 ];

            const fileBytes = await uint8ArrayOf(fileData);

            context.emit("fileSelect", {
                fileName: fileData.name,
                contents: fileBytes
            });
        }

        return {
            handleBrowseClick,
            handleDragEnter,
            handleDragLeave,
            handleDrop,
            prepareFile,
            fileTarget,
            state,
            mdiFileUpload
        };
    }
});
</script>

<style lang="postcss" scoped>
input {
    margin-inline-end: 10px;
}

.upload-zone {
    align-items: center;
    background-color: var(--color-boysenberry-shadow);
    border: 4px dashed var(--color-ashen-wind);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 200px;
    padding-block-end: 100px;
    width: 100%;
}

.file-hover {
    background-color: var(--color-boysenberry-shadow-transparent);
    border: 4px dashed var(--color-washed-black);
    border-radius: 5px;
    cursor: copy;
}

.button {
    margin-block-start: 8px;
}

.file-name-container {
    display: flex;
    margin-block-start: 20px;
}

.icon {
    color: var(--color-melbourne-cup);
    height: 30px;
    width: 30px;
}

.file-name {
    align-self: center;
    display: inline;
    margin-inline-start: 5px;
}

.drop-text {
    color: var(--color-washed-black);
    margin-block-start: 100px;
}

.or-text {
    color: var(--color-washed-black);
    margin-block-start: 5px;
    opacity: 0.5;
}
</style>
