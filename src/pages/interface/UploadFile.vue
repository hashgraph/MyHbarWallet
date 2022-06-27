<template>
  <Headline
    :title="$t('InterfaceToolTile.upload.title')"
    parent="tools"
  />

  <div class="flex-col text-center">
    <UploadZone @fileSelect="fileSelect" />

    <InputError v-if="state.errorMessage.length > 0">
      {{ state.errorMessage }}
    </InputError>

    <Modal
      :is-visible="state.showUploadModal"
      :title="$t('InterfaceTransactionDetails.status.value.success')"
      @close="closeUploadModal"
    >
      <p>{{ $t('InterfaceUploadFile.modal.success') }}</p>

      <p>{{ $t('InterfaceTransactionDetails.file.id') }}: {{ state.fileId }}</p>
    </Modal>

    <ProgressModal 
      :is-visible="state.showProgressModal" 
      :title="$t('InterfaceTransactionDetails.loading')"
    />

    <Modal 
      :is-visible="state.showFeeModal" 
      :title="modalFeeTitle" 
      @close="closeFeeModal"
    >
      <div class="table-fixed text-left p-4">
        <tr>
          <td class="w-40">
            {{ $t('InterfaceTransactionDetails.operator') }}
          </td>
          <td>{{ accountId }}</td>
        </tr>
        <tr>
          <td>{{ $t('InterfaceUploadFile.modal.totalChunks') }}</td>
          <td>{{ state.uploadProgress.totalChunks }}</td>
        </tr>
        <tr>
          <td><strong>{{ $t('InterfaceUploadFile.modal.estimate') }}</strong></td>
          <td><strong>{{ state.estimateFee }}</strong></td>
        </tr>
      </div>

      <div>
        <Button
          color="white"
          class="p-3 m-4 w-1/3"
          @click="closeFeeModal"
        >
          {{ $t('BaseButton.dismiss') }}
        </Button>

        <Button
          color="green"
          class="p-3 m-4 w-1/3"
          @click="uploadConfirm"
        >
          {{ $t('BaseButton.continue') }}
        </Button>
      </div>
    </Modal>

    <div class="text-center">
      <Button
        color="green"
        class="p-3 m-4 w-5/12"
        :disabled="!state.uploadHashReady"
        @click="uploadHashClick"
      >
        {{ $t("InterfaceUploadFile.button.hash") }}
      </Button>

      <Button
        color="green"
        class="p-3 m-4 w-5/12"
        :disabled="!state.uploadFileReady"
        @click="uploadFileClick"
      >
        {{ $t("InterfaceUploadFile.button.file") }}
      </Button>
    </div>
  </div>
</template>

<script lang = "ts">
import type { FileId } from "@hashgraph/sdk";
import { defineComponent, reactive, computed } from "vue";
import { useI18n } from "vue-i18n";

import { useStore } from "../../store";
import UploadZone from "../../components/interface/UploadZone.vue";
import Headline from "../../components/interface/Headline.vue";
import Button from "../../components/base/Button.vue";
import Modal from "../../components/interface/Modal.vue";
import InputError from "../../components/base/InputError.vue";
import ProgressModal from "../../components/interface/ProgressModal.vue";
import { estimateFee, estimateChunks } from "../../services/impl/hedera/client/upload-file";

const MAX_FILE_LENGTH = 1048576; // The maximum file size is 1,024 kB. See https://docs.hedera.com/guides/docs/sdks/file-storage/create-a-file

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
    const i18n = useI18n();

    const state = reactive({
      fileName: null as string | null,
      fileData: null as Uint8Array | null,
      estimateFee: null as string | null,
      showFeeModal: false,
      showUploadModal: false,
      showProgressModal: false,
      uploadHashReady: false,
      uploadFileReady: false,
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

    const accountId = computed(() => store.client?.getAccountId().toString());
    const modalFeeTitle = computed(() => state.uploadHash ? `Uploading sha-384 of ${state.fileName}` : `Uploading ${state.fileName}`);

    async function openFeeModal(): Promise<void> {
      if (state.fileData == null) return;
      let payload = state.uploadHash ? new Uint8Array(48) : state.fileData;
      state.uploadProgress.totalChunks = estimateChunks(payload);
      state.estimateFee = `${await estimateFee(payload)} hbar`;
      state.showFeeModal = true;      
    }

    function closeFeeModal(): void {
      state.showFeeModal = false;
    }

    function openUploadModal(): void {
      state.showProgressModal = false;
      state.showUploadModal = true;
    }

    function closeUploadModal(): void {
      state.showUploadModal = false;
    }

    function fileSelect(e: { fileName: string, contents: Uint8Array }): void {
      state.uploadHashReady = true;
      state.uploadFileReady = false;
      if(e.contents.byteLength <= MAX_FILE_LENGTH) {
        state.fileName = e.fileName;
        state.fileData = e.contents;
        state.uploadFileReady = true;
      }
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
        file = new Uint8Array(await window.crypto.subtle.digest("SHA-384", file));
      }

      let fileId = null as FileId | null | undefined;
      try {
        state.showProgressModal = true;
        fileId = await store.client?.uploadFile({
          file,
          fileMemo: "",
          memo: ""
        });
      } catch (error) {
        state.showProgressModal = false;
        state.errorMessage = await store.errorMessage(error);
      }

      if (!fileId) {
        state.errorMessage = i18n.t("Common.Error.NoFileId").toString();
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