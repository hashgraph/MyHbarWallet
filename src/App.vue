<template>
  <router-view />

  <HardwarePrompt />
  
  <ReloadPrompt />
  
  <LogoutModal />
  
  <CustomerSupportModal />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import HardwarePrompt from "./components/base/HardwarePrompt.vue";
import ReloadPrompt from "./components/base/ReloadPrompt.vue";
import infoIcon from "./assets/icon_info.svg";
import LogoutModal from "./components/interface/LogoutModal.vue";
import CustomerSupportModal from "./components/interface/CustomerSupportModal.vue"

export default defineComponent({
  name: "App",
  components: {
    HardwarePrompt,
    ReloadPrompt,
    LogoutModal,
    CustomerSupportModal,
  },
  setup() {
    return {
      infoIcon,
    }
  }
})
</script>
