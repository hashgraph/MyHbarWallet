<template>
  <div
    class="relative flex items-center py-5 bg-husky sm:bg-white dark:bg-midnight-express sm:dark:bg-midnight-express"
  >
    <NavMenuButton
      class="z-10 ml-5 mr-2"
      :is-open="state.menuOpen"
      @click="handleMenu"
    />

    <Image
      :light="mhwLogo"
      :dark="mhwLogoDark"
      class="z-10"
    />

    <div
      class="absolute top-0 left-0 right-0 h-screen transition-opacity duration-300 bg-black "
      :class="{
        'opacity-25': state.menuOpen,
        'opacity-0 pointer-events-none': !state.menuOpen,
      }"
      @click="handleBarrierClick"
    />

    <div
      class="absolute top-0 transition-all duration-300"
      :class="{
        'opacity-100 transform -translate-x-0': state.menuOpen,
        'opacity-0 transform -translate-x-10 invisible':
          !state.menuOpen,
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from "vue";
import { useRoute } from "vue-router";

import NavMenuButton from "../marketing/NavMenuButton.vue";
import Image from "../base/Image.vue";
import mhwLogo from "../../assets/myhbarwallet-logo.svg";
import mhwLogoDark from "../../assets/dark/myhbarwallet-logo.svg";

export default defineComponent({
  name: "MobileDrawer",
  components: {
    NavMenuButton,
    Image,
  },
  setup() {
    const route = useRoute();
    const state = reactive({
      menuOpen: false,
    });

    function handleMenu() {
      state.menuOpen = !state.menuOpen;
    }

    function handleBarrierClick() {
      state.menuOpen = false;
    }

    watch(
      () => route.fullPath,
      () => {
        state.menuOpen = false;
      }
    );

    return { state, handleMenu, handleBarrierClick, mhwLogo, mhwLogoDark };
  },
});
</script>
