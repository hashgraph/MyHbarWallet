<template>
  <div
    class="
      dark:bg-midnight-express
      flex
      items-center
      rounded-b
      h-8
      font-medium
      text-xs
      leading-4
      text-harlocks-cape
      bg-unburdened-pink
    "
  >
    <img
      class="h-5 w-5 ml-4 mr-2.5"
      src="../../assets/icon_error.svg"
      alt="error"
    />
    There’s a problem with this account.
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BannerError",
});
</script>
