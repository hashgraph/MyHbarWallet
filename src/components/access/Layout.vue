<template>
  <div class="flex-1 mb-40">
    <Gradient>
      <BackLink v-if="back" :to="back" />
      <div class="px-5 pt-16 pb-32 mx-auto flex flex-col" v-bind="$attrs">
        <Title>{{ title }}</Title>
        <slot />
      </div>
    </Gradient>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RouteLocationRaw } from "vue-router";
import Gradient from "../base/Gradient.vue";
import BackLink from "../base/BackLink.vue";
import Title from "../base/Title.vue";

export default defineComponent({
  name: "Layout",
  components: {
    Gradient,
    BackLink,
    Title,
  },
  inheritAttrs: false,
  props: {
    title: { type: String, required: true },
    back: {
      type: [String, Object] as PropType<RouteLocationRaw>,
      default: null,
    },
  },
});
</script>
