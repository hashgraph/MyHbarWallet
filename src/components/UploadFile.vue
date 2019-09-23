<template>
    <div class="upload-zone">
        <div v-if="false" class="drag">Drag your file here!</div>
        <div v-if="false" class="or">Or</div>
        <Button
            class="button"
            label="Select a file from your computer"
            @click="handleBrowseClick"
        ></Button>
        <div v-if="state.filename" class="file-name-container">
            <MaterialDesignIcon class="icon" :icon="mdiFileUpload" />
            <span class="file-name">{{ state.filename }}</span>
        </div>
        <input
            v-show="false"
            id="file-upload"
            ref="file"
            type="file"
            @change="loadBuffFromFile"
        />
    </div>
</template>

<script lang="ts">
import {
    createComponent,
    computed,
    ref,
    SetupContext,
    reactive
} from "@vue/composition-api";
import Button from "../components/Button.vue";
import MaterialDesignIcon from "../components/MaterialDesignIcon.vue";
import { mdiFileUpload } from "@mdi/js";

export default createComponent({
    components: {
        Button,
        MaterialDesignIcon
    },

    setup(props, context) {
        // const highlight = false;  //for dragndrop
        const state = reactive({
            filename: ""
        });

        const file = ref<HTMLInputElement | null>(null);

        function handleBrowseClick(): void {
            if (file.value != null) {
                file.value.click(); // triggers loadTextFromFile via hidden input @click
            }
        }

        async function loadBuffFromFile(event: Event): Promise<void> {
            const target = event.target as HTMLInputElement;

            if (target.files == null) {
                // User hit cancel
                return;
            }

            const file = target.files[0];

            state.filename = file.name;

            //placeholder until it's decided how uploading works in sdk
            const fileBuff = await new Promise<ArrayBuffer>(
                (resolve, reject) => {
                    const reader = new FileReader();

                    reader.addEventListener("error", reject);
                    reader.addEventListener("loadend", (): void => {
                        resolve(reader.result as ArrayBuffer);
                    });

                    reader.readAsArrayBuffer(file);
                }
            );

            target.value = ""; // change back to initial state to gaurantee that click fires next time
        }

        const fileReady = computed(() => {
            console.log(state.filename != "");
            return state.filename != "";
        });

        return {
            loadBuffFromFile,
            handleBrowseClick,
            file,
            state,
            fileReady,
            mdiFileUpload
        };
    }
});
</script>

<style lang="postcss" scoped>
.upload-zone {
    align-items: center;
    border: 4px dashed var(--color-boysenberry-shadow);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    height: 200px;
    justify-content: center;
    width: 100%;
}

.fileform {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
}

.button {
    margin-block-end: 20px;
}

.file-name-container {
    display: flex;
}

.icon-container {
    align-items: center;
    background-color: var(--color-melbourne-cup);
    border-radius: 25%;
    display: flex;
    height: 30px;
    justify-content: center;
    margin-inline-end: 5px;
    width: 30px;
}

.icon {
    color: var(--color-melbourne-cup);
    height: 30px;
    width: 30px;
}

.file-name {
    align-self: center;
    display: inline;
}

.drag {
    color: var(--color-washed-black);
    margin-block-end: 20px;
    opacity: 0.5;
}

.or {
    color: var(--color-washed-black);
    margin-block-end: 20px;
    opacity: 0.5;
}
</style>
