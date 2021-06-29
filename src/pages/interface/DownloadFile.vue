<template>
  <Headline title="Download" parent="tools" />

  <div container class="h-screen">
    <Button
      color="green"
      class="py-3 mt-6 w-full"
      :busy="state.sendBusyText != null"
      @click="download"
    >
      {{ $t("InterfaceToolTile.download.title") }}
    </Button>

    <Modal v-if = "state.showFeeModal = true" title="Download" @close = "closeModal"> Download </Modal>
  </div>
</template>


<script lang = "ts">
import { defineComponent, reactive, nextTick} from "vue";
import Headline from "../../components/interface/Headline.vue";
import TextInput from "../../components/base/TextInput.vue";
import Button from "../../components/base/Button.vue";
import Modal from "../../components/interface/Modal.vue";

export default defineComponent({
  name: "DownloadFile",
  components: {
    Headline,
    TextInput,
    Button,
    Modal,
  },
  setup() {
    let state = reactive({
      sendBusyText: null,
      showFeeModal: true,
    });

    function download(): void {
      console.log("User clicked download button.");
      openModal();
    }


    function openModal(): void {
        console.log("Opening modal.");
        state.showFeeModal = true;
    }



    function closeModal(): void {
        state.showFeeModal = false;
    }
    return { state, download, openModal, closeModal};
  },
});
</script>