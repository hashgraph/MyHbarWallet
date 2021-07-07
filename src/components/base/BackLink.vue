<template>
  <div class="container absolute left-0 right-0 pt-6 mx-auto max-w-7xl">
    <router-link
      class="flex justify-center px-2 py-1 ml-3 -my-1 font-medium rounded-full outline-none text-mountain-meadow md:ml-8 lg:ml-12 w-max hover:opacity-60 focus-visible:ring-mountain-meadow focus-visible:ring-2"
      :to="to"
    >
      <img
        width="16"
        :src="arrowLeft"
        alt="green arrow"
      >

      <div class="ml-2">
        {{ $t("BackLink") }}
      </div>
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
