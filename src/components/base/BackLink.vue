<template>
  <div class="container absolute left-0 right-0 mx-auto max-w-7xl pt-6">
    <router-link
      class="
        text-mountain-meadow
        font-medium
        ml-3
        md:ml-8
        lg:ml-12
        px-2
        py-1
        rounded-full
        -my-1
        w-max
        flex
        justify-center
        hover:opacity-60
        outline-none
        focus-visible:ring-mountain-meadow focus-visible:ring-2
      "
      :to="to"
    >
      <img width="16" :src="arrowLeft" alt="green arrow" />

      <div class="ml-2">{{ $t("BackLink") }}</div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RouteLocationRaw } from "vue-router";
import arrowLeft from "../../assets/icon_arrow_left.svg";

export default defineComponent({
  name: "BackLink",
  props: {
    to: {
      type: [String, Object] as PropType<RouteLocationRaw>,
      required: true,
    },
  },
  setup() {
    return {
      arrowLeft,
    };
  },
});
</script>
