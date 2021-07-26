<template>
  <div
    class="flex items-center h-8 text-xs font-medium leading-4 rounded-b  dark:bg-midnight-express text-harlocks-cape bg-unburdened-pink"
  >
    <img
      class="h-5 w-5 ml-4 mr-2.5"
      src="../../assets/icon_error.svg"
      alt="error"
    >
    {{ $t("Account.Error") }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BannerError",
});
</script>
