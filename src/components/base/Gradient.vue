<template>
  <div class="relative">
    <div
      class="absolute top-0 left-0 right-0 z-0 bg-gradient-to-b from-first-snow dark:from-midnight-express to-white dark:to-black h-600"
    />

    <div class="relative">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Gradient",
});
</script>
