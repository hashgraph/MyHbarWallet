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
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Prompt from "./components/base/Prompt.vue";
import Image from "./components/base/Image.vue";
import infoIcon from "./assets/icon_info.svg";

export default defineComponent({
  name: "App",
  components: {
    Prompt, 
    Image
  },
  setup() {
    return {
      infoIcon
    }
  }
})
</script>
