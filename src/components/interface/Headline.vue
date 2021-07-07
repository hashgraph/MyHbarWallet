<template>
  <div
    class="pb-8 text-3xl font-medium border-b  border-cerebral-grey dark:text-white dark:border-midnight-express"
  >
    <div
      v-if="parent != ''"
      class="flex items-center"
    >
      <router-link
        :to="{ name: `${parent}` }"
        class="text-andrea-blue"
      >
        {{ capitalize(parent) }}
      </router-link>

      <img
        src="../../assets/chevron_right.svg"
        class="mx-2 h-7"
      >

      <div
        v-if="title == 'Send'"
        class="relative w-16 mx-2"
      >
        <img
          :src="isDark ? sendAssetDark : sendAsset"
          class="absolute w-16 h-16 -top-8 right-1"
          alt="paper airplane"
        >
      </div>

      <div>{{ title }}</div>
    </div>

    <div v-else>
      {{ title }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { usePreferredDark } from "@vueuse/core";

import sendAsset from "../../assets/img_send.svg";
import sendAssetDark from "../../assets/dark/img_send_dark.svg";

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
