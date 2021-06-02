<template>
  <div
    class="
      dark:bg-midnight-express
      dark:text-andrea-blue
      flex
      items-center
      h-8
      rounded-b
      font-medium
      text-xs
      leading-4
      text-magnus-blue
      bg-first-snow
    "
  >
    <img
      class="h-5 w-5 ml-4 mr-2.5"
      src="../../assets/icon_frozen.svg"
      alt="error"
    />
    Your asset is frozen.
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BannerFrozenAsset",
});
</script>
