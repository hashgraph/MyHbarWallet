<template>
  <div
    :class="[
      'bg-white h-screen border-r border-jupiter flex flex-col',
      'dark:bg-ruined-smores dark:border-midnight-express dark:text-white',
    ]"
  >
    <Image
      class="ml-16 mr-5 my-5 invisible lg:visible lg:ml-5 lg:mr-6 lg:h-12"
      :light="logo"
      :dark="logoDark"
    />

    <div
      class="
        border-jupiter
        dark:border-midnight-express
        border-b border-t
        flex
        items-center
        px-8
        py-3
      "
    >
      <!-- TODO: Once we can know which network, put that here -->
      <Image
        :light="hederaLight"
        :dark="hederaDark"
        class="mr-3 w-6 h-6 my-px"
      />
      <div class="dark:text-white font-medium select-none text-squant">
          {{ selectedNetwork }}
      </div>
    </div>

    <Nav />

    <div class="flex-grow" />

    <div class="p-2 md:p-5 md:pt-0">
      <NavItem
        :icon="iconLogout"
        :text="$t('RouterLink.logout')"
        @click="logOut"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import { useStore } from "../../store";
import { useRouter } from "vue-router";
import Image from "../base/Image.vue";
import Nav from "./Nav.vue";
import NavItem from "../base/NavItem.vue";
import mhwLogo from "../../assets/myhbarwallet-logo.svg";
import mhwLogoDark from "../../assets/dark/myhbarwallet-logo.svg";
import hederaLight from "../../assets/hedera-hashgraph-logo.svg";
import hederaDark from "../../assets/dark/hedera-hashgraph-logo-dark.svg";
import iconLogout from "../../assets/icon_logout.svg";

export default defineComponent({
  name: "Drawer",
  components: { Image, NavItem, Nav },
  setup() {
    const store = useStore();
    const router = useRouter();
    const selectedNetwork = computed(() => store.network);


    function logOut() {
      store.$reset();
      router.push({ name: "marketing" });
    }

    return {
      iconLogout,
      logOut,
      logo: mhwLogo,
      logoDark: mhwLogoDark,
      hederaLight,
      hederaDark,
      selectedNetwork,
    };
  },
});
</script>
