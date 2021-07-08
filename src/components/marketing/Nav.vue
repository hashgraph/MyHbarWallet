<template>
  <nav
    class="z-10 hidden px-5 py-4 bg-white shadow-lg dark:bg-black lg:block"
  >
    <div
      class="container flex items-center justify-start flex-1 px-5 mx-auto  xl:max-w-screen-xl"
    >
      <HeaderLogo
        :light="mhwLogoLight"
        :dark="mhwLogoDark"
        alt="MyHbarWallet Logo"
      />

      <div class="flex-grow hidden lg:block">
        <div class="flex">
          <div class="flex">
            <div
              class="self-center h-8 ml-6 transform border-l  border-cerebral-grey"
            />

            <NetworkSelector class="mx-2 w-[300px]" />
          </div>

          <div class="self-center lg:ml-auto">
            <NavMenuList />
          </div>
        </div>
      </div>
    </div>
  </nav>

  <MobileHeader
    class="sticky top-0 z-10 bg-white shadow  dark:bg-ruined-smores lg:hidden"
  >
    <div
      :class="[
        'bg-white h-screen border-r border-jupiter flex flex-col',
        'dark:bg-ruined-smores dark:border-midnight-express',
      ]"
    >
      <Image
        class="invisible my-5 ml-16 mr-5  lg:visible lg:ml-5 lg:mr-6 lg:h-12"
        :light="mhwLogoLight"
        :dark="mhwLogoDark"
      />

      <div
        class="flex border-t border-b  h-14 border-jupiter dark:border-midnight-express"
      >
        <NetworkSelector
          full-width
          class="w-full px-3"
          :offset="75"
        />
      </div>

      <div class="p-5">
        <NavItem
          :text="$t('MarketingHeader.home')"
          to="/"
          :highlight-active="false"
        />

        <NavItem
          :text="$t('MarketingHeader.about')"
          href="/#about"
          :highlight-active="false"
        />

        <NavItem
          :text="$t('MarketingHeader.faqs')"
          href="/#faqs"
          :highlight-active="false"
        />

        <router-link
          v-t="'MarketingHeader.accessWallet'"
          to="/access"
          class="
                        block
                        text-mountain-meadow
                        font-semibold
                        rounded-full
                        hover:text-opacity-60
                        outline-none
                        focus-visible:ring-2 focus-visible:ring-mountain-meadow
                        px-4
                        py-3.5
                        transition-colors
                    "
        />

        <div class="h-5" />

        <router-link
          v-t="'MarketingHeader.createWallet'"
          to="/create"
          class="inline-block px-5 py-3 font-semibold text-white transition-colors outline-none  bg-mountain-meadow rounded-3xl hover:bg-opacity-90 focus-visible:ring-2 focus-visible:ring-mountain-meadow focus-visible:ring-offset-2"
        />
      </div>
    </div>
  </MobileHeader>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

import mhwLogoLight from "../../assets/myhbarwallet-logo.svg";
import mhwLogoDark from "../../assets/dark/myhbarwallet-logo.svg";
import NetworkSelector from "../interface/NetworkSelector.vue";
import NavMenuList from "../marketing/NavMenuList.vue";
import MobileHeader from "../base/MobileHeader.vue";
import NavItem from "../base/NavItem.vue";
import Image from "../base/Image.vue";
import HeaderLogo from "../marketing/HeaderLogo.vue";

export default defineComponent({
  name: "MarketingNav",
  components: {
    MobileHeader,
    HeaderLogo,
    NavItem,
    NavMenuList,
    Image,
    NetworkSelector,
  },
  setup() {
    const state = reactive({
      menuOpen: false,
    });

    function handleMenu(): void {
      state.menuOpen = !state.menuOpen;
    }

    return {
      state,
      handleMenu,
      mhwLogoLight,
      mhwLogoDark,
    };
  },
});
</script>
