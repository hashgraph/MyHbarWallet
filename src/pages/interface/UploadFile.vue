<template>
  <Headline :title="$t('InterfaceToolTile.upload.title')" parent="tools" />

  <div class="flex-col text-center">
    <UploadZone @fileSelect="fileSelect" />

    <InputError v-if = "state.errorMessage.length > 0">
      {{ state.errorMessage }}
    </InputError>

    <Modal
      :is-Visible="state.showUploadModal"
      :title="$t('InterfaceTransactionDetails.status.value.success')"
      @close="closeUploadModal"
    >
      <p>{{ $t('InterfaceUploadFile.modal.success') }}</p>

      <p>{{ $t('InterfaceTransactionDetails.file.id') }}: {{ state.fileId }}</p>
    </Modal>

<<<<<<< HEAD
    <ProgressModal :isVisible = "state.showProgressModal" title = "Loading. . . ."/>
=======
>>>>>>> c29aa6d (wip: tools)
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
          @click="uploadConfirm"
        >{{ $t('BaseButton.continue') }}</Button>
      </div>
    </Modal>

    <div class="text-center">
      <Button
        color="green"
        class="p-3 m-4 w-5/12"
        :disabled="!state.uploadReady"
        @click="uploadHashClick"
      >{{ $t("InterfaceUploadFile.button.hash") }}</Button>

      <Button
        color="green"
        class="p-3 m-4 w-5/12"
        :disabled="!state.uploadReady"
        @click="uploadFileClick"
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
import InputError from "../../components/base/InputError.vue";
import ProgressModal from "../../components/interface/ProgressModal.vue";
import { FileId } from "@hashgraph/sdk";

const MAX_CHUNK_LENGTH = 2900;

export default defineComponent({
  name: "UploadFile",
  components: {
    UploadZone,
    Headline,
    Button,
    Modal,
    InputError,
    ProgressModal
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
      showProgressModal: false,
      uploadReady: false,
      uploadHash: false,
      fileId: null as string | null,
      errorMessage: "",
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

    function uploadConfirm(): void {
      if (state.fileData != null) {
        closeFeeModal();
        uploadFile(state.fileData);
      }
    }


    function uploadHashClick(): void {
      state.uploadHash = true;
      openFeeModal();
    }



    function uploadFileClick(): void {
      state.uploadHash = false;
      openFeeModal();
    }

    async function uploadFile(file: Uint8Array): Promise<void> {

      if (state.uploadHash) {
        console.log("User wants to upload a hash.");
        file = new Uint8Array(await window.crypto.subtle.digest("SHA-384", file));
      }
      



      let fileId = null as FileId | null;
      try {

        state.showProgressModal = true;
        fileId = await store.client?.uploadFile({
          file,
          fileMemo: "",
          memo: ""
        });
      } catch (error) {
        state.errorMessage = await store.errorMessage(error);
        throw new Error(error);
      }
      state.showProgressModal = false;
      if (!fileId) {

        state.errorMessage = "There is no file ID.";
      } else {
        state.fileId = fileId.toString();
        state.errorMessage = "";
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
      uploadHashClick,
      uploadConfirm,
      openFeeModal,
      closeFeeModal,
      openUploadModal,
      closeUploadModal
    }

  }

});


</script>