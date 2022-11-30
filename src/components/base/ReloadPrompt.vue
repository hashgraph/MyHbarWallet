<template>
  <transition
    enter-from-class="translate-x-full opacity-0"
    enter-active-class="duration-500 ease-out"
    enter-to-class="translate-x-0 opacity-100"
    leave-from-class="translate-x-0 opacity-100"
    leave-active-class="duration-300 ease-in"
    leave-to-class="translate-x-full opacity-0"
  >
    <div
      v-if="offlineReady || needRefresh"
      role="alert"
      class="pt-8 animate-pulse flex flex-col fixed z-50 items-center justify-center h-40 p-4 overflow-hidden italic rounded shadow-lg bottom-10 right-10 w-200 bg-snow-ballet dark:border dark:bg-dreamless-sleep dark:border-midnight-express dark:text-white"
    >
      <span
        v-if="offlineReady"
        class="mr-4 ml-4"
      >{{ $t("Common.SW.OfflineReady") }}</span>

      <span
        v-else
        class="mr-4 ml-4"
      >{{ $t("Common.SW.NewContentAvailable") }}</span>

      <div class="mt-6 space-x-4 justify-between text-center w-full">
        <Button
          class="py-2 w-2/5 m-auto mb-4"
          :disabled="!needRefresh"
          color="green"
          @click="handleReload"
        >
          {{ $t("Common.SW.Reload") }}
        </Button>

        <Button
          class="py-2 w-2/5 m-auto mb-4"
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
