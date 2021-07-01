<template>
  <router-link
    :to="to"
    :class="[
      'p-7 border border-cerebral-grey shadow-lg rounded m-1 flex flex-col justify-around- items-center text-center overflow-ellipsis ...',
      'dark:bg-dreamless-sleep dark:border-midnight-express dark:text-white',
      'h-64 w-72',
    ]"
  >
    <img class="w-20" :src="purpleNav" />

    <div class="font-semibold text-xl my-2">{{ title }}</div>

<<<<<<< HEAD
    <div class="text-sm text-carbon dark:text-white">
=======
    <div class="text-sm text-carbon dark:text-argent">
>>>>>>> 1071461646dafa61a6e27f9d6450406957b0577a
      {{ description }}
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RouteLocationRaw } from "vue-router";
import purpleNav from "../../assets/icon_nav_purple_tools.svg";

export default defineComponent({
  name: "ToolTile",
  props: {
    title: { type: String, required: true },
    description: {
      type: String,
      default:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget venenatis dui.",
    },
    to: {
      type: [String, Object] as PropType<RouteLocationRaw>,
      default: "tools", // required: true when we got all the links
    },
  },
  setup() {
    return {
      purpleNav,
    };
  },
});
</script>

