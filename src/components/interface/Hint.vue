<template>
  <div
    class="
      flex
      mb-4
      bg-first-snow
      dark:bg-midnight-express
      text-bright-navy-blue
      p-3
      rounded
      font-semibold
      text-sm
    "
  >
    <img src="../../assets/icon_hint.svg" class="w-4 mr-2" />

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
