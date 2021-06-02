<template>
  <router-link :to="to">
    {{ text }}
  </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import type { RouteLocationRaw } from "vue-router";

export default defineComponent({
  name: "MarketingNavAnchor",
  props: {
    text: { type: String, required: true },
    to: {
      type: [String, Object] as PropType<RouteLocationRaw>,
      required: true,
    },
  },
});
</script>
