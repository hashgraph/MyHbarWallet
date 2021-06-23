<template>
  <div
    class="container flex pb-1 mb-1 text-2xl font-semibold  md:mb-5 md:pb-4 md:text-3xl text-black-out dark:text-white"
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
