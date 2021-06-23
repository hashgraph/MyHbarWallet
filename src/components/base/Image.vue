<template>
  <img :src="determineSource()">
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { usePreferredDark } from "@vueuse/core";

export default defineComponent({
  name: "Image",
  props: {
    dark: { type: String, default: null },
    light: { type: String, default: null },
  },
  setup(props) {
    const isDark = usePreferredDark();

    function determineSource(): string {
      if (isDark.value) {
        return props.dark;
      } else {
        return props.light;
      }
    }

    return {
      isDark,
      determineSource,
    };
  },
});
</script>
