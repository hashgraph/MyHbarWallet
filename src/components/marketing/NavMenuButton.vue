<template>
  <!-- Mobile menu button-->
  <button
    class="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
    aria-expanded="false"
  >
    <span class="sr-only">Open main menu</span>

    <HeroIcon
      v-if="!isOpen"
      icon="menu"
      color="mountain-meadow"
      class="w-6 h-6"
    />

    <HeroIcon
      v-if="isOpen"
      icon="close-menu"
      color="mountain-meadow"
      class="w-6 h-6"
    />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import HeroIcon from "../base/HeroIcon.vue";

export default defineComponent({
  name: "NavMenuButton",
  components: {
    HeroIcon
  },
  props: { isOpen: { type: Boolean, required: true } },
});
</script>
