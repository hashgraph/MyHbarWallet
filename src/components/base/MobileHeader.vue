<template>
  <div
<<<<<<< HEAD
    class="flex items-center py-5 bg-white dark:bg-midnight-express relative dark:text-white"
=======
    class="flex items-center py-5 bg-white dark:bg-midnight-express relative"
>>>>>>> 1071461646dafa61a6e27f9d6450406957b0577a
  >
    <NavMenuButton
      class="ml-5 mr-2 z-10"
      :is-open="state.menuOpen"
      @click="handleMenu"
    />

    <Image :light="mhwLogo" :dark="mhwLogoDark" class="z-10" />

    <div
      class="
        absolute
        top-0
        left-0
        right-0
        h-screen
        bg-black
        transition-opacity
        duration-300
      "
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
        'opacity-0 transform -translate-x-10 invisible': !state.menuOpen,
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from "vue";
import NavMenuButton from "../marketing/NavMenuButton.vue";
import Image from "../base/Image.vue";
import mhwLogo from "../../assets/myhbarwallet-logo.svg";
import mhwLogoDark from "../../assets/dark/myhbarwallet-logo.svg";
import { useRoute } from "vue-router";

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
