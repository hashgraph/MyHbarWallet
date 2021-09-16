<template>
  <teleport to="#modals">
    <Modal
      :is-visible="isVisible"
      :title="title"
      @click="$emit('close')"
      @close="$emit('close')"
    >
      <div class="p-4 mt-4 mb-2 md:mb-0">
        <div class="mb-4 text-squant">
          {{ $t("ConfirmPassword.headline") }}
        </div>

        <PasswordInput show-eye />
      </div>

      <div class="pb-4 text-center">
        <Button
          color="green"
          class="w-full mb-4 md:mb-0 md:w-3/4 p-4 md:m-4 m-auto"
        >
          {{ $t("Confirmation.Sign") }}
        </Button>

        <Button
          color="white"
          class="p-2 md:m-4 px-12"
          @click="$emit('close')"
        >
          {{ $t("Confirmation.Cancel") }}
        </Button>
      </div>
    </Modal>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Button from "../base/Button.vue";
import PasswordInput from "../base/PasswordInput.vue";

import Modal from "./Modal.vue";

export default defineComponent({
  name: "ConfirmationModal",
  components: {
    Modal,
    PasswordInput,
    Button,
  },
  props: {
    isVisible: { type: Boolean, required: false },
    title: { type: String, required: true },
  },
  emits: ["close"],
});
</script>
