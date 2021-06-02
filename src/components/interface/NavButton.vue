<template>
  <button
    class="
      bg-first-snow
      dark:bg-midnight-express
      text-sm text-carbon
      dark:text-silver-polish
      font-medium
      rounded
      py-1
      px-4
      mr-1
    "
  >
    <div v-if="value == 'right'">
      <Image :light="chevronRight" :dark="chevronRightDark" class="h-4" />
    </div>

    <div v-else-if="value == 'left'">
      <Image :light="chevronLeft" :dark="chevronLeftDark" class="h-4" />
    </div>

    <div v-else>{{ value }}</div>
  </button>
</template>

<script lang="ts">
import Image from "../base/Image.vue";
import { defineComponent } from "vue";
import chevronLeft from "../../assets/chevron_left.svg";
import chevronLeftDark from "../../assets/dark/chevron_left.svg";
import chevronRight from "../../assets/chevron_right.svg";
import chevronRightDark from "../../assets/dark/chevron_right.svg";

export default defineComponent({
  name: "NavButton",
  components: { Image },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {
      chevronLeft,
      chevronLeftDark,
      chevronRight,
      chevronRightDark,
    };
  },
});
</script>
