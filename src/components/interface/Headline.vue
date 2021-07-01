<template>
  <div
    class="
      pb-8
      border-b border-cerebral-grey
      text-3xl
      font-medium
      dark:text-white
      dark:border-midnight-express
<<<<<<< HEAD
      min-w-300px
=======
>>>>>>> 1071461646dafa61a6e27f9d6450406957b0577a
    "
  >
    <div v-if="parent != ''" class="flex items-center">
      <router-link :to="{ name: `${parent}` }" class="text-andrea-blue">
        {{ capitalize(parent) }}
      </router-link>

      <img src="../../assets/chevron_right.svg" class="mx-2 h-7" />

      <div v-if="title == 'Send'" class="relative mx-2 w-16">
        <img
          :src="isDark ? sendAssetDark : sendAsset"
          class="h-16 w-16 absolute -top-8 right-1"
          alt="paper airplane"
        />
      </div>

      <div>{{ title }}</div>
    </div>

    <div v-else>{{ title }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import sendAsset from "../../assets/img_send.svg";
import sendAssetDark from "../../assets/dark/img_send_dark.svg";
import { usePreferredDark } from "@vueuse/core";

export default defineComponent({
  name: "Headline",
  props: {
    title: { type: String, required: true },
    parent: { type: String, default: "" },
  },
  setup() {
    const isDark = usePreferredDark();

    function capitalize(s: string) {
      return s.charAt(0).toUpperCase() + s.slice(1);
    }

    return { capitalize, isDark, sendAsset, sendAssetDark };
  },
});
</script>
