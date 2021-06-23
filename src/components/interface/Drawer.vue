<template>
  <div
    :class="[
      'bg-white h-screen border-r border-jupiter flex flex-col',
      'dark:bg-ruined-smores dark:border-midnight-express dark:text-white',
    ]"
  >
    <Image
      class="invisible my-5 ml-16 mr-5 lg:visible lg:ml-5 lg:mr-6 lg:h-12"
      :light="logo"
      :dark="logoDark"
    />

    <div
      class="flex items-center px-8 py-3 border-t border-b border-jupiter dark:border-midnight-express"
    >
      <!-- TODO: Once we can know which network, put that here -->
      <Image
        :light="hederaLight"
        :dark="hederaDark"
        class="w-6 h-6 my-px mr-3"
      />
      <div class="font-medium select-none dark:text-white text-squant">
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
import { capitalize, computed, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../../store";
import Image from "../base/Image.vue";
import NavItem from "../base/NavItem.vue";
import mhwLogo from "../../assets/myhbarwallet-logo.svg";
import mhwLogoDark from "../../assets/dark/myhbarwallet-logo.svg";
import hederaLight from "../../assets/hedera-hashgraph-logo.svg";
import hederaDark from "../../assets/dark/hedera-hashgraph-logo-dark.svg";
import iconLogout from "../../assets/icon_logout.svg";

import Nav from "./Nav.vue";

export default defineComponent({
  name: "Drawer",
  components: { Image, NavItem, Nav },
  setup() {
    const store = useStore();
    const router = useRouter();
    const selectedNetwork = computed(() => capitalize(store.network));

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
