<template>
  <Headline title="Download" parent="tools" />

  <div container class="h-screen flex flex-col max-w-lg m-auto mt-10">
    <label class="font-medium text-squant dark:text-white mb-4"> {{ $t("InterfaceDownload.fileId") }} </label>
    <EntityIdInput
      type="file"
      v-model="state.downloadId"
      :placeholder="$t('AccessAccount.section2.input.placeholder')"
    />

    <Button
      color="green"
      class="py-3 mt-6 w-full mt-10"
      :busy="state.sendBusyText != null"
      @click="download"
    >
      {{ $t("InterfaceToolTile.download.title") }}
    </Button>

    <Modal :isVisible="state.showFeeModal" title="Download" @close="closeModal">
      {{ $t("InterfaceToolTile.download.title") }} 
    </Modal>
  </div>
</template>


<script lang = "ts">
import { defineComponent, reactive, nextTick } from "vue";
import Headline from "../../components/interface/Headline.vue";
import TextInput from "../../components/base/TextInput.vue";
import Button from "../../components/base/Button.vue";
import Modal from "../../components/interface/Modal.vue";
import EntityIdInput from "../../components/base/EntityIdInput.vue";

export default defineComponent({
  name: "DownloadFile",
  components: {
    Headline,
    TextInput,
    Button,
    Modal,
    EntityIdInput,
  },
  setup() {
    let state = reactive({
      sendBusyText: null,
      showFeeModal: false,
      downloadId: null,
      transactionType = "downloadFile"
    });

    function download(): void {
      openModal();
    }

    function openModal(): void {
      nextTick((state.showFeeModal = true));
    }

    function closeModal(): void {
      nextTick((state.showFeeModal = false));
    }
    return { state, download, openModal, closeModal };
  },
});
</script>