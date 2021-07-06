<template>
  <Headline title="Download" parent="tools" />

<<<<<<< HEAD
  <div
    container
    class="h-screen flex flex-col max-w-lg m-auto mt-10 justify-items-center"
  >
    <label class="font-medium text-squant dark:text-white mb-4">
      {{ $t("InterfaceDownload.fileId") }}
    </label>
=======
  <div container class="h-screen flex flex-col max-w-lg m-auto mt-10">
    <label class="font-medium text-squant dark:text-white mb-4"> {{ $t("InterfaceDownload.fileId") }} </label>
>>>>>>> 54f2556a (feat: update deps to 12)
    <EntityIdInput
      type="file"
      v-model="state.downloadId"
      :placeholder="$t('AccessAccount.section2.input.placeholder')"
    />

    <Button
      color="green"
      class="py-3 mt-6 w-full mt-10"
      :busy="state.sendBusyText != null"
<<<<<<< HEAD
      @click="openFeeModal"
=======
      @click="download"
>>>>>>> 54f2556a (feat: update deps to 12)
    >
      {{ $t("InterfaceToolTile.download.title") }}
    </Button>

<<<<<<< HEAD
    <Modal
      :isVisible="state.showFeeModal"
      :title="downloadModalTitle"
      @close="closeFeeModal"
    >
      <table class="table-auto">
        <tr>
          <td class="pr-16">
            {{ $t("InterfaceTransactionDetails.operator") }}:
          </td>
          <td>{{ operator }}</td>
        </tr>
        <tr>
          <td>{{ $t("InterfaceTransactionDetails.estimatedFee") }}:</td>
        </tr>
      </table>

      <div class="w-full items-center">
        <Button color="white" class="w-2/5 m-3" @click="closeFeeModal">
          {{ $t("BaseButton.dismiss") }}
        </Button>
        <Button color="green" class="w-2/5 m-3" @click="openDownloadModal">
          {{ $t("BaseButton.continue") }}
        </Button>
      </div>
    </Modal>

    <Modal
      :isVisible="state.showDownloadModal"
      :title="$t('InterfaceTransactionDetails.status.value.success')"
      @close="closeDownloadModal"
    >
=======
    <Modal :isVisible="state.showFeeModal" title="Download" @close="closeModal">
      {{ $t("InterfaceToolTile.download.title") }} 
>>>>>>> 54f2556a (feat: update deps to 12)
    </Modal>
  </div>
</template>


<script lang = "ts">
<<<<<<< HEAD
import { defineComponent, reactive, nextTick, computed, ref } from "vue";
=======
import { defineComponent, reactive, nextTick } from "vue";
>>>>>>> 54f2556a (feat: update deps to 12)
import Headline from "../../components/interface/Headline.vue";
import TextInput from "../../components/base/TextInput.vue";
import Button from "../../components/base/Button.vue";
import Modal from "../../components/interface/Modal.vue";
import EntityIdInput from "../../components/base/EntityIdInput.vue";
<<<<<<< HEAD
import { FileContentsQuery, Hbar } from "@hashgraph/sdk";
import { useStore } from "../../store";
=======
>>>>>>> 54f2556a (feat: update deps to 12)

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
<<<<<<< HEAD
    const store = useStore();
    const operator = computed(() => store.accountId?.toString());
    const downloadModalTitle = computed(
      () => `Downloading file: ${state.downloadId}`
    );
    



    let state = reactive({
      sendBusyText: null,
      showFeeModal: false,
      showDownloadModal: false,
      downloadId: null,
      transactionType: "downloadFile",
      fee: null,
    });

    let file = ref<Uint8Array | null>(null);
    let fileLink = ref<HTMLAnchorElement | null>(null);

    async function download(): Promise<void> {
      const client = store.getClient;

      if (client != null) {
        console.log(client);
        console.log(client._network);
        file.value = await new FileContentsQuery()
                      .setFileId(state.downloadId)
                      .execute(client);

        console.log(file.value);

      } else {
        console.log("Need to be logged in to download a file.");
      }
    }

    function openFeeModal(): void {
      nextTick((state.showFeeModal = true));
    }

    function closeFeeModal(): void {
      nextTick((state.showFeeModal = false));
    }

    function openDownloadModal(): void {
      closeFeeModal();
      nextTick(() => (state.showDownloadModal = true));
      download();
    }

    function closeDownloadModal(): void {
      nextTick(() => (state.showDownloadModal = false));
    }




    return {
      state,
      download,
      openFeeModal,
      closeFeeModal,
      openDownloadModal,
      closeDownloadModal,
      operator,
      downloadModalTitle,
    };
=======
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
>>>>>>> 54f2556a (feat: update deps to 12)
  },
});
</script>