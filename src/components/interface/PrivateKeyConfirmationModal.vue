<template>
  <teleport to="#modals">
    <Modal
      :is-visible="isVisible"
      :title="title"
      @close="$emit('close')"
    >
      <div class="p-4 mt-4">
        <div class="mb-4 text-squant">
          {{ $t("InterfacePrivateKeyConfirmation.enter") }}
        </div>


        <!-- TODO: Use private key confirmation for now, replace with PIN later -->
        <div class="mt-2.5">
          <TextInput
            v-model="state.value"
            :valid="valid"
            :hide="true"
            :show-eye="true"
            medium-font
            placeholder="302e020100300…"
          />
        </div>
      </div>

      <div class="flex flex-col items-center pb-4 mx-4">
        <Button
          color="green"
          class="w-full p-4 mt-4"
          :disabled="!valid"
          @click="confirm"
        >
          {{ $t("Confirmation.Sign") }}
        </Button>

        <Button
          color="white"
          class="p-2 mt-4 w-36"
          @click="$emit('close')"
        >
          {{ $t("Confirmation.Cancel") }}
        </Button>
      </div>
    </Modal>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from "vue";
import { useI18n } from "vue-i18n";

import { useStore } from "../../store";
import Button from "../base/Button.vue";
import TextInput from "../base/TextInput.vue";

import Modal from "./Modal.vue";

export default defineComponent({
  name: "PrivateKeyConfirmationModal",
  components: {
    Modal,
    Button,
    TextInput
  },
  props: {
    isVisible: { type: Boolean, required: false },
    title: { type: String, required: true },
  },
  emits: ["close", "confirm"],
  setup(_, context) {
    console.log("from pw confirmation modal");
    const store = useStore();
    const i18n = useI18n();
    const key = store.privateKey;
    const valid = computed( () => { return key?.toString() === state.value });

    const state = reactive({
      value: "",
      errorMessage: ""
    });

    function confirm(): void {
      if(!valid.value) {
        state.errorMessage = `${i18n.t("InterfaceHomeSend.error.reject.private.key")} ${store.accountId}. ${i18n.t("InterfaceHomeSend.error.repeat.private.key")}`;
        return;
      }
      state.errorMessage = "";
      context.emit("confirm");
      context.emit("close");
    }

    return {
      state,
      valid,
      confirm,
    };
  }

});
</script>
