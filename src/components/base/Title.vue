<template>
  <div
    class="
      mb-1
      pb-1
      md:mb-5
      md:pb-4
      text-2xl
      md:text-3xl
      font-semibold
      text-black-out
      dark:text-white
      flex
      container
    "
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Title",
});
</script>
