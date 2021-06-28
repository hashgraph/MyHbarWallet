<template>
  <!-- Mobile menu button-->
  <button
    class="
      p-2
      rounded-md
      focus:outline-none
      focus:ring-2 focus:ring-inset focus:ring-white
      dark:text-white
    "
    aria-expanded="false"
  >
    <span class="sr-only">Open main menu</span>

    <!-- TODO: HeroIcon -->
    <!-- Icon when menu is closed. -->
    <svg
      v-if="!isOpen"
      class="h-6 w-6 stroke-current text-dark-shamrock"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>

    <!-- TODO: HeroIcon -->
    <!-- Icon when menu is open. -->
    <svg
      v-else
      class="h-6 w-6 stroke-current text-dark-shamrock"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavMenuButton",
  props: { isOpen: { type: Boolean, required: true } },
});
</script>
