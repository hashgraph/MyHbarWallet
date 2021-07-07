<template>
  <teleport to="#modals">
    <Modal
      :is-visible="isVisible"
      :title="title"
      @click="$emit('close')"
      @close="$emit('close')"
    >
      <div class="p-4 mt-4">
        <div class="mb-4 text-squant">
          Enter Password
        </div>

        <PasswordInput show-eye />
      </div>

      <div class="flex flex-col items-center pb-4 mx-4">
        <Button
          color="green"
          class="w-full p-4 mt-4"
        >
          Sign
        </Button>

        <Button
          color="white"
          class="p-2 mt-4 w-36"
          @click="$emit('close')"
        >
          Cancel
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
