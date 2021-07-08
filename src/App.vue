<template>
  <router-view />
  <Prompt>
    <div class="flex items-center justify-start">
      <Image
        class="pr-2"
        :dark="infoIcon"
        :light="infoIcon"
      />
      {{ $t('Common.Prompt') }}
    </div>
  </Prompt>
  <LogoutModal />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Prompt from "./components/base/Prompt.vue";
import Image from "./components/base/Image.vue";
import infoIcon from "./assets/icon_info.svg";
import LogoutModal from "./components/interface/LogoutModal.vue";

export default defineComponent({
  name: "App",
  components: {
    Prompt, 
    Image,
    LogoutModal
  },
  setup() {
    return {
      infoIcon,
    }
  }
})
</script>
