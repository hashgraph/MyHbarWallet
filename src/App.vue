<template>
  <router-view />

  <HardwarePrompt />
  
  <ReloadPrompt />
  
  <LogoutModal />
  
  <CustomerSupportModal />

  <NetworkStatusBanner />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

import HardwarePrompt from "./components/base/HardwarePrompt.vue";
import ReloadPrompt from "./components/base/ReloadPrompt.vue";
import infoIcon from "./assets/icon_info.svg";
import LogoutModal from "./components/interface/LogoutModal.vue";
import CustomerSupportModal from "./components/interface/CustomerSupportModal.vue";
import NetworkStatusBanner from "./components/interface/NetworkStatusBanner.vue";
import { useStore } from "./store";

declare const __TEST__: boolean;

export default defineComponent({
  name: "App",
  components: {
    HardwarePrompt,
    ReloadPrompt,
    LogoutModal,
    CustomerSupportModal,
    NetworkStatusBanner
  },
  setup() {
    if (__TEST__) {
      const store = useStore();
      const router = useRouter();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.$store = store;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.$router = router;
    }

    return {
      infoIcon,
    }
  }
})
</script>
