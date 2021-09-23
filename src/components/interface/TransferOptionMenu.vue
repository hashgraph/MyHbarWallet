<template>
  <div
    class="absolute -z-10 top-0 left-0 w-full h-full min-h-screen"
    :class="{
      'invisible': !open 
    }"
    @click="$emit('close')"
  />
  <div
    class="absolute z-40 -ml-48 bg-white dark:border dark:border-midnight-express dark:bg-ruined-smores rounded shadow-md p-3 pr-6 transition-all duration-300 z-30"
    :class="{
      'opacity-100 mt-16': open,
      'opacity-0 invisible -mt-36': !open
    }"
  >
    <div
      class="hover:bg-first-snow dark:hover:bg-black-out flex items-start items-center space-x-4 m-2 p-3 rounded w-full"
      @click="$emit('edit')"
    >
      <img
        src="../../assets/icon_edit.svg"
        class="mr-3"
      >
      <div>
        {{ $t("ActionsButton.edit") }}
      </div>
    </div>
    <div
      class="hover:bg-first-snow dark:hover:bg-black-out flex items-start items-center space-x-4 m-2 p-3 rounded w-full"
      @click="$emit('remove')"
    >
      <img
        src="../../assets/icon_remove.svg"
        class="mr-4"
      >
      <div>
        {{ $t("ActionsButton.remove") }} 
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "TransferOptionMenu",
    props: {
        open: { type: Boolean, required: true },
        index: { type: Number, default: 0, required: false }
    },
    emits:[
        "edit",
        "remove",
        "close"
    ],
});
</script>