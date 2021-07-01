<template>
  <div class="lg:flex lg:flex-row">
    <Drawer class="hidden sticky top-0 lg:flex" />
    <MobileDrawer class="sticky top-0 z-20 lg:hidden" />

<<<<<<< HEAD
    <div class="px-2 md:flex md:px-10 relative flex w-full h-full">
      <div
        class="
          h-full
          min-h-screen
=======
    <div class="px-2 md:flex-1 md:px-10 relative flex">
      <div
        class="
          h-[600px]
>>>>>>> 1071461646dafa61a6e27f9d6450406957b0577a
          absolute
          top-0
          left-0
          right-0
          bg-gradient-to-b
          from-husky
          dark:from-midnight-express
          to-white
          dark:via-ruined-smores
          dark:to-ruined-smores
        "
      />

      <main
        :class="[
          'bg-white dark:bg-ruined-smores rounded-lg mx-auto z-10 flex-1',
<<<<<<< HEAD
          'lg:mt-10 w-full',
=======
          'lg:mt-10',
>>>>>>> 1071461646dafa61a6e27f9d6450406957b0577a
        ]"
      >
        <router-view />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Drawer from "./Drawer.vue";
import MobileDrawer from "./MobileDrawer.vue";

export default defineComponent({
  name: "Layout",
  components: {
    Drawer,
    MobileDrawer,
  },
});
</script>
