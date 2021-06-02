<template>
  <div class="relative">
    <div
      class="
        bg-gradient-to-b
        from-first-snow
        dark:from-midnight-express
        to-white
        dark:to-black
        absolute
        top-0
        left-0
        right-0
        h-600
        z-0
      "
    />

    <div class="relative"><slot /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Gradient",
});
</script>
