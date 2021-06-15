<template>
  <div class="lg:flex lg:flex-row">
    <Drawer class="hidden sticky top-0 lg:flex" />
    <MobileDrawer class="sticky top-0 z-20 lg:hidden" />

    <div class="px-2 md:flex-1 md:px-10 relative flex">
      <div
        class="
          h-[600px]
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
          'lg:mt-10',
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
