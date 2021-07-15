<template>
  <transition
    leave-active-class="duration-500 ease"
    leave-from-class="translate-x-0 opacity-100"
    leave-to-class="translate-x-full opacity-0"
    enter-active-class="duration-500 ease"
    enter-from-class="translate-x-full opacity-0"
    enter-to-class="translate-x-0 opacity-100"
  >
    <div
      v-if="offlineReady || needRefresh"
      role="alert"
      class="fixed z-50 flex items-center justify-center h-40 p-2 overflow-hidden italic border-l-4 rounded shadow bottom-10 right-10 w-200 bg-peach"
    >
      <span v-if="offlineReady">{{ $t("Common.SW.OfflineReady") }}</span>
    
      <span v-else>{{ $t("Common.SW.NewContentAvailable") }}</span>
    
      <div class="mt-2">
        <Button
          :disabled="!needRefresh"
          color="green"
          @click="handleReload"
        >
          {{ $t("Common.SW.Reload") }}
        </Button>

        <Button
          color="white"
          @click="handleClose"
        >
          {{ $t("Common.SW.Close") }}
        </Button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
// eslint-disable-next-line import/order
import { defineComponent } from "vue";

// eslint-disable-next-line import/no-unresolved
import { useRegisterSW } from "virtual:pwa-register/vue";

import Button from "./Button.vue";

export default defineComponent({
    name: "ReloadPrompt",
    components: {
        Button
    },
    setup() {
        const {
            offlineReady,
            needRefresh,
            updateServiceWorker
        } = useRegisterSW();

        async function handleClose(): Promise<void> {
            offlineReady.value = false;
            needRefresh.value = false;
        }

        return {
            offlineReady,
            needRefresh,
            handleReload: updateServiceWorker,
            handleClose
        }
    }
})
</script>