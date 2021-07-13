<template>
  <teleport to="#modals">
    <Modal
      :is-visible="isVisible"
      :title="title"
      @click="$emit('close')"
      @close="$emit('close')"
    >
      <TransferForm
        v-model:to="refTo"
        v-model:asset="refAsset"
        v-model:amount="refAmount"
      />

      <div class="flex flex-col items-center pb-4 mx-4">
        <Button
          color="green"
          class="w-full p-4 mt-10"
          @click="$emit('clickAdd')"
        >
          {{ buttonName }}
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
import { useVModel } from "@vueuse/core";
import { defineComponent, computed } from "vue";

import Button from "../base/Button.vue";

import Modal from "./Modal.vue";
import TransferForm from "./TransferForm.vue";

export default defineComponent({
  name: "AddEditModal",
  components: {
    Modal,
    Button,
    TransferForm,
  },
  inheritAttrs: false,
  props: {
    isVisible: { type: Boolean, required: false },
    type: { type: String, required: true },
    to: { type: String, required: true },
    asset: { type: String, required: true },
    amount: { type: String, required: true },
  },
  emits: ["close", "clickAdd", "update:to", "update:asset", "update:amount"],
  setup(props, { emit }) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const refTo = useVModel(props, "to", emit);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const refAsset = useVModel(props, "asset", emit);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const refAmount = useVModel(props, "amount", emit);

    const title = computed(() =>
      props.type == "add" ? "Add Transfer" : "Edit Transfer"
    );

    const buttonName = computed(() =>
      props.type == "add" ? "Add" : "Save"
    );

    return {
      refTo,
      refAsset,
      refAmount,
      title,
      buttonName,
    };
  },
});
</script>
