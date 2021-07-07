<template>
  <div class="flex items-center flex-shrink-0">
    <Image
      :dark="dark"
      :light="light"
      :alt="alt"
      class="block w-auto h-8 lg:h-12"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Image from "../base/Image.vue";

export default defineComponent({
  name: "HeaderLogo",
  components: { Image },
  props: {
    dark: { type: String, default: null },
    light: { type: String, default: null },
    alt: { type: String, default: null },
  },
});
</script>
