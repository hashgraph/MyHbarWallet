<template>
  <teleport to="#modals">
    <Modal
      :is-visible="isVisible"
      :title="$t('ConfirmLogout.title')"
      class="flex flex-col"
      @close="handleClose"
    >
      <div class="p-4 mt-4">
        <div class="mb-4 text-squant">
          {{ $t("ConfirmLogout.areYouSure") }}
        </div>
      </div>

      <div class="flex items-center pb-4 mx-4">
        <Button
          color="green"
          class="w-full p-4 mt-4"
          @click="handleQuit"
        >
          {{ $t('ConfirmLogout.quit') }}
        </Button>

        <Button
          color="white"
          class="p-2 mt-4 w-36"
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