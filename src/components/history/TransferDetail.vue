<template>
  <div
    class="flex items-center h-16 border-b border-cerebral-grey dark:border-midnight-express"
  >
    <div class="w-1/4 pl-5 pr-2 leading-5 text-squant dark:text-white">
      {{ title }}
    </div>
    <div
      class="flex items-center w-3/4 pr-20 leading-5 break-all"
      :class="[
        {
          'text-squant dark:text-argent': color === ColorOption.GRAY,
        },
        {
          'text-carbon': color === ColorOption.CHARCOAL,
        },
        {
          'text-andrea-blue': color === ColorOption.BLUE,
        },
        {
          'text-mountain-meadow': color === ColorOption.GREEN,
        },
      ]"
    >
      {{ description }}

      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export enum ColorOption {
    GREEN = "green",
    CHARCOAL = "charcoal",
    BLUE = "blue",
    GRAY = "gray",
}

export default defineComponent({
  name: "TransferDetail",
  props: {
    color: {
      type: String as PropType<ColorOption>,
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, default: "" },
  },
  setup() {
    return { ColorOption };
  },
});
</script>
