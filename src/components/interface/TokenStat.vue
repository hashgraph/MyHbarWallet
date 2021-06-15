<template>
  <div
    class="
      py-4
      border-cerebral-grey border-t
      dark:border-midnight-express
      lg:px-10
      lg:grid lg:grid-flow-col
      lg:auto-cols-fr
    "
  >
    <div class="text-sm mb-1 lg:text-base lg:mb-0">{{ title }}</div>

    <div>{{ stat }}</div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "TokenStat",
  props: {
    title: { type: String, required: true },
    stat: { type: String, required: true },
  },
});
</script>
