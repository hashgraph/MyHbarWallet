<template>
  <teleport to="#modals">
    <Modal
      :is-visible="isVisible"
      :title="$t('ConfirmLogout.title')"
      class="flex flex-col"
      @close="handleClose"
    >
      <div class="p-4 mt-4 mb-2 md:mb-0">
        <div class="mb-4 text-squant">
          {{ $t("ConfirmLogout.areYouSure") }}
        </div>
      </div>

      <div class="pb-4 text-center">
        <Button
          color="green"
          class="w-full mb-4 md:mb-0 md:w-3/4 p-4 md:m-4 m-auto"
          @click="handleQuit"
        >
          {{ $t('ConfirmLogout.quit') }}
        </Button>

        <Button
          color="white"
          class="p-2 md:m-4 px-12"
          @click="handleClose"
        >
          {{ $t('ConfirmLogout.cancel') }}
        </Button>
      </div>
    </Modal>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";

import { useStore } from "../../store";
import Button from "../base/Button.vue";

import Modal from "./Modal.vue";


export default defineComponent({
  name: "LogoutModal",
  components: {
    Modal,
    Button
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    
    const isVisible = computed(() => {
      return store.logoutConfirm;
    });
    
    function handleClose(): void {
      store.setConfirmLogoutOpen(false);  
    }

    function handleQuit(): void {
      store.$reset();
      router.push({ name: "access" });
    }

    return {
      isVisible,
      handleClose,
      handleQuit
    }
  }
})
</script>