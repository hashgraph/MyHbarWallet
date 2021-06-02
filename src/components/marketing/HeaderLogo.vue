<template>
  <div class="flex-shrink-0 flex items-center">
    <Image
      :dark="dark"
      :light="light"
      :alt="alt"
      class="block h-8 lg:h-12 w-auto"
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
