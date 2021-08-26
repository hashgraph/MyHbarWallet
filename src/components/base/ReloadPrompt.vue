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
      class="animate-bounce rounded flex flex-col fixed z-50 items-center justify-center h-40 p-4 overflow-hidden italic rounded shadow-lg bottom-10 right-10 w-200 bg-peach dark:border dark:bg-dreamless-sleep dark:border-midnight-express dark:text-white"
    >
      <span v-if="offlineReady">{{ $t("Common.SW.OfflineReady") }}</span>
    
      <span v-else>{{ $t("Common.SW.NewContentAvailable") }}</span>
    
      <div class="mt-4 flex items-center justify-between">
        <Button
          class="px-5 py-2 mr-4"
          :disabled="!needRefresh"
          color="green"
          @click="handleReload"
        >
          {{ $t("Common.SW.Reload") }}
        </Button>

        <Button
          class="px-5 py-2"
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