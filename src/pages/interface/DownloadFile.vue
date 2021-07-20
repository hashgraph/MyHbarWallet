<template>
  <Headline
    title="Download"
    parent="tools"
  />

  <div
    container
    class="h-screen flex flex-col max-w-lg m-auto mt-10"
  >
    <label class="font-medium text-squant dark:text-white mb-4">
      {{ $t("InterfaceTransactionDetails.file.id") }}
    </label>

    <EntityIdInput
      v-model="state.downloadId"
      type="file"
      :placeholder="$t('AccessAccount.section2.input.placeholder')"
    />

    <InputError v-if="state.errorMessage.length > 0">
      {{ state.errorMessage }}
    </InputError>

    <Button
      color="green"
      class="py-3 mt-6 w-full"
      :busy="state.sendBusyText != null"
      :disabled = "disableDownload"
      @click="openModal"
    >
      {{ $t("InterfaceToolTile.download.title") }}
    </Button>

    <Modal
      :is-visible="state.showFeeModal"
      :title="modalTitle"
      @close="closeModal"
    >
      <div class="table-auto mt-8 p-4">
        <tr>
          <td class="w-full">
            {{ $t("InterfaceTransactionDetails.operator") }}
          </td>

          <td class>
            {{ accountId.toString() }}
          </td>
        </tr>

        <tr>
          <td class>
            {{ $t("InterfaceTransactionDetails.estimate") }}
          </td>

          <td class>
            {{ state.maxFee }}
          </td>
        </tr>
      </div>

      <div class="mt-4 w-full text-center">
        <Button
          color="white"
          class="p-3 w-5/12 m-2"
          @click="closeModal"
        >
          {{ $t("BaseButton.dismiss") }}
        </Button>

        <Button
          color="green"
          class="p-3 w-5/12 m-2"
          @click="download"
        >
          {{ $t("BaseButton.continue") }}
        </Button>
      </div>
    </Modal>
  </div>
</template>


<script lang = "ts">
import { defineComponent, reactive, nextTick, computed } from "vue";
import type { FileId } from "@hashgraph/sdk";

import Headline from "../../components/interface/Headline.vue";
import Button from "../../components/base/Button.vue";
import Modal from "../../components/interface/Modal.vue";
import EntityIdInput from "../../components/base/EntityIdInput.vue";
import InputError from "../../components/base/InputError.vue";
import { useStore } from "../../store";

export default defineComponent({
  name: "DownloadFile",
  components: {
    Headline,
    Button,
    Modal,
    EntityIdInput,
    InputError,
  },
  setup() {
    const store = useStore();
    const modalTitle = computed(() => `Downloading ${state.downloadId}`);
    const accountId = computed(() => store.accountId);
    const disableDownload = computed ( ()=> {
      if(state.downloadId){
        return false;
      } else return true;
    });

    const state = reactive({
      sendBusyText: null,
      showFeeModal: false,
      downloadId: null as FileId | null,
      errorMessage: "",
      transactionType: "downloadFile",
      maxFee: "2ℏ",
    });

    async function download(): Promise<void> {
      try {
        state.errorMessage = "";

        if (state.downloadId != null) {
          await store.client?.downloadFile(state.downloadId);
        }
      } catch (error) {
        closeModal();
        state.errorMessage = await store.errorMessage(error);
      }
      closeModal();
    }

    function openModal(): void {
      nextTick(() => (state.showFeeModal = true));
    }

    function closeModal(): void {
      nextTick(() => (state.showFeeModal = false));
    }

    return {
      state,
      download,
      openModal,
      closeModal,
      modalTitle,
      accountId,
      disableDownload
    };
  },
});
</script>