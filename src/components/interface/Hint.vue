<template>
  <div
    class="flex p-3 mb-4 text-sm font-semibold rounded  bg-first-snow dark:bg-midnight-express text-bright-navy-blue"
  >
    <img
      src="../../assets/icon_hint.svg"
      class="w-4 mr-2"
    >

    {{ text }}
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
