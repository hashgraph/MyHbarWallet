<template>
  <Headline :title="$t('InterfaceToolTile.upload.title')" parent="tools" />

  <div class="flex-col text-center">
    <UploadZone @fileSelect="fileSelect" />

    <Modal
      :isVisible="state.showUploadModal"
      :title="$t('InterfaceTransactionDetails.status.value.success')"
      @close="closeUploadModal"
    >
      <p>{{ $t('InterfaceUploadFile.modal.success') }}</p>

      <p>{{ $t('InterfaceTransactionDetails.file.id') }}: {{ state.fileId }}</p>
    </Modal>

    <Modal :isVisible="state.showFeeModal" :title="modalFeeTitle" @close="closeFeeModal">
      <div class="table-fixed text-left p-4">
        <tr>
          <td class="w-full">{{ $t('InterfaceTransactionDetails.operator') }}</td>
          <td>{{ accountId }}</td>
        </tr>

        <tr>
          <td>{{ $t('InterfaceUploadFile.modal.estimate') }}</td>

          <td>{{ state.estimatedFee }}</td>
        </tr>
      </div>

      <div>
        <Button
          color="white"
          class="p-3 m-4 w-1/3"
          @click="closeFeeModal"
        >{{ $t('BaseButton.dismiss') }}</Button>

        <Button
          color="green"
          class="p-3 m-4 w-1/3"
          @click="uploadFileClick"
        >{{ $t('BaseButton.continue') }}</Button>
      </div>
    </Modal>

    <div class="text-center">
      <Button
        color="green"
        class="p-3 m-4 w-5/12"
        :disabled="!state.uploadReady"
      >{{ $t("InterfaceUploadFile.button.hash") }}</Button>

      <Button
        color="green"
        class="p-3 m-4 w-5/12"
        :disabled="!state.uploadReady"
        @click="openFeeModal"
      >{{ $t("InterfaceUploadFile.button.file") }}</Button>
    </div>
  </div>
</template>


<script lang = "ts">

import { defineComponent, reactive, computed } from "vue";

import { useStore } from "../../store";

import UploadZone from "../../components/interface/UploadZone.vue";
import Headline from "../../components/interface/Headline.vue";
import Button from "../../components/base/Button.vue";
import Modal from "../../components/interface/Modal.vue";

const MAX_CHUNK_LENGTH = 2900;

export default defineComponent({
  name: "UploadFile",
  components: {
    UploadZone,
    Headline,
    Button,
    Modal
  },
  setup() {
    const store = useStore();
    const accountId = computed(() => store.client?.getAccountId().toString());
    const modalFeeTitle = computed(() => `Uploading ${state.fileName}`);
    const state = reactive({
      fileName: null as string | null,
      fileData: null as Uint8Array | null,
      estimateFee: 0,
      showFeeModal: false,
      showUploadModal: false,
      uploadReady: false,
      fileId: null,
      uploadProgress: {
        isOpen: false,
        inProgress: false,
        currentChunk: 0,
        totalChunks: 0
      }
    });

    //Recycled from V1
    async function estimateFee(): Promise<void> {

      const { Hbar } = await import("@hashgraph/sdk");
      state.estimatedFee =
        `${(new Hbar(2.6 * (state.uploadProgress.totalChunks - 1) +
          ((state.fileData as Uint8Array).byteLength %
            MAX_CHUNK_LENGTH /
            1000 *
            0.55 +
            1.05))).toBigNumber().toFixed(2)} ℏ`;
    }


    function openFeeModal(): void {
      state.uploadProgress.totalChunks = Math.ceil(state.fileData?.byteLength / MAX_CHUNK_LENGTH);
      estimateFee();
      state.showFeeModal = true;
    }


    function closeFeeModal(): void {
      state.showFeeModal = false;
    }


    function openUploadModal(): void {
      state.showUploadModal = true;
    }


    function closeUploadModal(): void {
      state.showUploadModal = false;
    }

    function fileSelect(e: { fileName: string, contents: Uint8Array }): void {
      state.fileName = e.fileName;
      state.fileData = e.contents;
      state.uploadReady = true;
    }

    function uploadFileClick(): void {
      if (state.fileData != null) {
        closeFeeModal();
        uploadFile(state.fileData);
      }
    }

    async function uploadFile(file: Uint8Array): Promise<void> {


      let chunks: Uint8Array[] = [];

      for (let i = 0; i < state.uploadProgress.totalChunks; i++) {
        let start = i * MAX_CHUNK_LENGTH;
        chunks.push(file.slice(start, start + MAX_CHUNK_LENGTH));
      }

      let fileId;
      try {
        state.uploadProgress.currentChunk = 0;
        fileId = await store.client?.uploadFile({
          chunks,
          fileMemo: "",
          memo: ""
        });
      } catch (error) {
        throw new Error(error);
      }
      if (!fileId) {
        throw new Error("File Id is null.");
      } else {
        state.fileId = fileId.toString();
        openUploadModal();
      }
    }

    return {
      state,
      modalFeeTitle,
      accountId,
      fileSelect,
      uploadFile,
      uploadFileClick,
      openFeeModal,
      closeFeeModal,
      openUploadModal,
      closeUploadModal
    }

  }

});


</script>