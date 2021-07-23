<template>
  <div
    class="flex p-3 mb-4 text-sm font-semibold rounded bg-first-snow dark:bg-midnight-express text-bright-navy-blue "
  >
    <img
      src="../../assets/icon_hint.svg"
      class="mb-auto mt-auto w-8 h-8"
    >

    <p class="ml-4 m-auto">
      {{ text }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Hint",
  props: {
    text: { type: String, required: true },
  },
});
</script>
