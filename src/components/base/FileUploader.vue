<template>
  <div>
    <input
      ref="input"
      data-cy-file-upload
      type="file"
      readonly
      hidden
      @change="onFileUpload"
    >

    <div
      class="
        shadow-md
        rounded
        mb-2.5
        text-carbon
        font-medium
        leading-5
        h-11
        px-5
        pt-3
        bg-white
        dark:bg-midnight-express
        dark:text-white
      "
    >
      {{ fileName }}
    </div>

    <button
      class="mb-8 font-semibold leading-5 focus:outline-none text-mountain-meadow"
      @click.prevent="selectFile"
    >
      {{ $t("BaseFileUploader.button") }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "FileUploader",
  props: {
    initialFileName: { type: String, default: null },
  },
  emits: ["keystore"],
  setup(props) {
    const input = ref<HTMLInputElement>();
    const fileName = ref(props.initialFileName);

    function selectFile() {
      input.value?.click();
    }

    async function onFileUpload(event: Event) {
      const target = event.target as HTMLInputElement;
      const files = target.files;

      if (files != null && files.length > 0) {
        const keystoreFile = files[0];

        fileName.value = keystoreFile.name;

        console.log("file?", fileName.value);

        // emit("keystore", keystore);
      }

      target.files = null;
    }

    return {
      input,
      fileName,
      selectFile,
      onFileUpload,
    };
  },
});
</script>
