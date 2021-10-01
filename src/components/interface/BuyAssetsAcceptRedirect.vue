<template>
  <Modal
    :title="$t('InterfaceHome.redirect.modal.title')"
    :is-visible="isVisible"
    class="text-center justify-center"
    @close="$emit('close')"
  >
    <div class="text-left m-4">
      {{ $t("InterfaceHome.redirect.modal.message") }}
    </div>
    <Button
      color="green"
      class="w-3/4 px-12 p-2 m-8 md:mb-0"
      @click="$emit('continue')"
    >
      {{ $t("BaseButton.continue") }}
    </Button>

    <Button
      color="white"
      class="p-2 px-12 md:m-4"
      @click="$emit('close')"
    >
      {{ $t("BaseButton.cancel") }}
    </Button>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Button from "../base/Button.vue";

import Modal from "./Modal.vue";

export default defineComponent({
    name: "BuyAssetsAcceptRedirect",
    components: {
        Modal,
        Button
    },
    props: {
        isVisible: { type: Boolean, required: true }
    },
    emits: [
        "close", "continue"
    ],

    setup(){
        console.log("from redirect modal");
    }
});
</script>