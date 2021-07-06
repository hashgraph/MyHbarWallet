<template>
  <Headline title="Send" parent="home" />

  <div
    class="mt-8 font-medium text-carbon pb-10 border-b border-cerebral-grey dark:border-midnight-express w-full"
  >
    <div class="flex flex-wrap items-center">

      <div class="w-full">
        <!-- TODO: when localizing, remove the v-if, the pluralization should be done in the localizer -->
        <div v-if="state.transfers.length <= 1" class="mb-2 dark:text-white">
          {{ $t("InterfaceHomeSend.section1.header1") }}
        </div>
        <div v-else class="mb-2 dark:text-white">

          {{ $t("InterfaceTransactionDetails.transfers") }}
        </div>


        <div
          class="p-4 font-medium bg-white border rounded shadow-md dark:bg-ruined-smores border-jupiter dark:border-midnight-express"
        >
          <TransferForm
            v-model:to="state.transfer.to"
            v-model:asset="state.transfer.asset"
            v-model:amount="state.transfer.amount"
            v-model:usd="state.transfer.usd"
          />
        </div>

        <div class="mb-2 p-4 md:p-0 mt-4">
          <div class="dark:text-white">From</div>

          <TextInput v-model="state.accountId" class="mt-2 rounded font-medium" />

          <OptionalMemo v-model="state.memo" class="mt-8" />

          <OptionalHbarInput
            v-model="state.maxFee"
            class="mt-8"
            :default-value="state.defaultMaxFee"
          />
        </div>

      </div>
      <Button
        color="white"
        class="mt-8 p-2 w-52"
        @click="openAddModal"
      >{{ $t("BaseButton.addTransfer1") }}</Button>
    </div>

    <div
      v-if="state.generalErrorText != null"
      class="bg-unburdened-pink mt-10 -mb-8 w-max mx-auto px-4 py-3 rounded"


    >
      <div class="text-sm text-harlocks-cape font-medium text-center">{{ state.generalErrorText }}</div>
    </div>

    <!-- bottom buttons section -->
    <div class="flex flex-col items-center m-auto mt-10 mb-10 w-7/12">
      <Button
        color="green"
        class="w-full py-3 mt-6"
        :disabled="!sendValid"
        :busy="state.sendBusyText != null"
        @click="onSend"
      >{{ state.sendBusyText ?? "Send" }}</Button>

      <Button
        color="white"
        class="text-sm px-9 py-2 mt-4"
        @click="onCancel"
      >{{ $t("BaseButton.cancel") }}</Button>
    </div>

  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, reactive } from "vue";
import { BigNumber } from "bignumber.js";
import { AccountId, Hbar } from "@hashgraph/sdk";
import { useRouter } from "vue-router";

import Headline from "../../components/interface/Headline.vue";
import TransferForm from "../../components/interface/TransferForm.vue";
import OptionalHbarInput from "../../components/interface/OptionalHbarInput.vue";
import OptionalMemo from "../../components/interface/OptionalMemo.vue";
import Button from "../../components/base/Button.vue";
import TextInput from "../../components/base/TextInput.vue";
import { useStore } from "../../store";

export interface Transfer {
    to?: AccountId;
    asset: string; // "HBAR" or token ID (string)
    amount?: BigNumber;
    usd?: string;
}


export default defineComponent({
  name: "Send",
  components: {
    Button,
    Headline,
    TextInput,
    TransferForm,
    OptionalHbarInput,
    OptionalMemo
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    let state = reactive({
      accountId: store.accountId,
      showAddModal: false,
      generalErrorText: null as string | null,
      sendBusyText: null as string | null,
      indexToEdit: 0,
      showEditModal: false,
      memo: "" as string | undefined,
      maxFee: null,
      defaultMaxFee: new Hbar(1),
      showConfirmModal: false,
      transfer: {
        to: undefined,
        asset: "HBAR",
        amount: undefined
      } as Transfer,
      transfers: [] as Transfer[],
    });

    const sendValid = computed(
      () => state.transfer.to != null && state.transfer.amount != null
    );

    function openAddModal(): void {
      nextTick(() => (state.showAddModal = true));
    }

    function closeAddModal(): void {
      nextTick(() => (state.showAddModal = false));
    }

    function openEditModal(): void {
      nextTick(() => (state.showEditModal = true));
    }

    function closeEditModal(): void {
      nextTick(() => (state.showEditModal = false));
    }

    async function onSend(): Promise<void> {
      if (store.client == null) return;
      const { StatusError } = await import("@hashgraph/sdk");

      state.sendBusyText = "Executing transaction …";
      state.generalErrorText = null;

      try {
        await store.client.transfer({
          transfers: [state.transfer],
          memo: null,
          maxFee: null,
          onBeforeConfirm() {
            state.sendBusyText = "Waiting for confirmation …";
          },
        });

        void store.requestAccountBalance();

        // go back to home
        // goal is to see the now PENDING transaction
        // so we can watch it "reach consensus"
        router.back();
      } catch (err) {
        if (err instanceof StatusError) {
          state.generalErrorText = `Transaction failed with status ${err.status
            } (${err.status.valueOf()})`;
        } else {
          throw err;
        }
      } finally {
        state.sendBusyText = null;
      }
    }

    function closeConfirmModal(): void {
      nextTick(() => (state.showConfirmModal = false));
    }

    function resetTransfer() {
      state.transfer.to = undefined;
      state.transfer.asset = "HBAR";
      state.transfer.amount = undefined;
    }

    function handleAdd(): void {
      if (state.transfer.to != null && state.transfer.amount != null) {
        state.transfers.push({ ...state.transfer });
        closeAddModal();
        resetTransfer();
      }
    }

    function handleEditAdd(): void {
      closeEditModal();
    }

    function editTransfer(index: number) {
      state.indexToEdit = index;
      state.showEditModal = true;
    }

    function removeTransfer(index: number) {
      state.transfers.splice(index, 1);
    }

    function onCancel() {
      router.back();
    }

    return {
      state,
      sendValid,
      handleAdd,
      handleEditAdd,
      openAddModal,
      closeAddModal,
      openEditModal,
      closeEditModal,
      onSend,
      closeConfirmModal,
      editTransfer,
      removeTransfer,
      onCancel,
    };
  },
});
</script>
