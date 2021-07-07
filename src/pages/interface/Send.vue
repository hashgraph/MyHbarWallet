<template>
  <Headline
    title="Send"
    parent="home"
  />

  <div
    class="pb-10 mt-8 font-medium border-b text-carbon border-cerebral-grey dark:border-midnight-express"
  >
    <div class="flex flex-wrap items-center p-8">
      <div class="w-full">
        <!-- TODO: when localizing, remove the v-if, the pluralization should be done in the localizer -->
        <div
          v-if="state.transfers.length <= 1"
          class="mb-2 dark:text-silver-polish"
        >
          {{ $t("InterfaceHomeSend.section1.header1") }}
        </div>
        <div
          v-else
          class="mb-2 dark:text-silver-polish"
        >
          {{ $t("InterfaceTransactionDetails.transfers") }}
        </div>

        <div
          class="p-4 font-medium bg-white border rounded shadow-md dark:bg-ruined-smores border-jupiter dark:border-midnight-express"
        >
          <!-- TODO: Fix -->
          <!-- <TransferForm
            v-model:to="state.transfer.to"
            v-model:asset="state.transfer.asset"
            v-model:amount="state.transfer.amount"
            v-model:usd="state.transfer.usd"
          /> -->
        </div>
      </div>

      <div class="w-full p-4 mt-4 mb-2 md:p-0">
        <div class="dark:text-silver-polish">
          From
        </div>

        <TextInput
          v-model="state.accountId"
          class="mt-2 font-medium rounded"
        />

        <!-- TODO: Fix -->
        <!-- <OptionalMemo
          v-model="state.memo"
          class="mt-8"
        /> -->

        <!-- TODO: Fix -->
        <!-- <OptionalHbarInput
          v-model="state.maxFee"
          class="mt-8"
          :default-value="state.defaultMaxFee"
        /> -->
      </div>
    </div>

    <Button
      color="white"
      class="p-2 mt-8 w-52"
      @click="openAddModal"
    >
      {{ $t("BaseButton.addTransfer1") }}
    </Button>
  </div>

  <div
    v-if="state.generalErrorText != null"
    class="px-4 py-3 mx-auto mt-10 -mb-8 rounded bg-unburdened-pink w-max"
  >
    <div class="text-sm font-medium text-center text-harlocks-cape">
      {{ state.generalErrorText }}
    </div>
  </div>

  <!-- bottom buttons section -->
  <div class="flex flex-col items-center w-7/12 m-auto mt-10 mb-10">
    <Button
      color="green"
      class="w-full py-3 mt-6"
      :disabled="!sendValid"
      :busy="state.sendBusyText != null"
      @click="onSend"
    >
      {{ state.sendBusyText ?? "Send" }}
    </Button>

    <Button
      color="white"
      class="py-2 mt-4 text-sm px-9"
      @click="onCancel"
    >
      Cancel
    </Button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, reactive } from "vue";
import {BigNumber} from "bignumber.js";
import type { AccountId } from "@hashgraph/sdk";
import { useRouter } from "vue-router";

import Headline from "../../components/interface/Headline.vue";
// import TransferForm from "../../components/interface/TransferForm.vue";
// import OptionalHbarInput from "../../components/interface/OptionalHbarInput.vue";
// import OptionalMemo from "../../components/interface/OptionalMemo.vue";
import Button from "../../components/base/Button.vue";
import TextInput from "../../components/base/TextInput.vue";
import { useStore } from "../../store";

export interface Transfer {
    to: AccountId | null;
    asset: string | null; // "HBAR" or token ID (string)
    amount: BigNumber | null;
}

export default defineComponent({
  name: "Send",
  components: {
    Button,
    Headline,
    TextInput,
  },
  setup() {
    let state = reactive({
      accountId: "0.0.214102",
      showAddModal: false,
      generalErrorText: null as string | null,
      sendBusyText: null as string | null,
      indexToEdit: 0,
      showEditModal: false,
      memo: "" as string | null,
      maxFee: null,
      defaultMaxFee: null,
      showConfirmModal: false,
      transfer: {
        to: null,
        asset: "HBAR",
        amount: null,
        usd: "USD",
      } as Transfer,
      transfers: [] as Transfer[],
    });

    const sendValid = computed(
      () => state.transfer.to != null && state.transfer.amount != null
    );

    const router = useRouter();
    const store = useStore();

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
      const { StatusError } = await import("@hashgraph/sdk");

      // shouldn't be possible if we got here, but just be safe
      if (store.client == null) return;
      if (state.transfer.to == null || state.transfer.amount == null)
        return;

      state.sendBusyText = "Executing transaction …";
      state.generalErrorText = null;

      // TODO: Fix
      try {
        // await store.client.transfer({
        //   transfers: [state.transfer],
        //   memo: null,
        //   maxFee: null,
        //   onBeforeConfirm() {
        //     state.sendBusyText = "Waiting for confirmation …";
        //   },
        // });

        void store.requestAccountBalance();

        // go back to home
        // goal is to see the now PENDING transaction
        // so we can watch it "reach consensus"
        router.back();
      } catch (err) {
        if (err instanceof StatusError) {
          state.generalErrorText = `Transaction failed with status ${
            err.status
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
      state.transfer.to = null;
      state.transfer.asset = "HBAR";
      state.transfer.amount = null;
    }

    function handleAdd(): void {
      // conditional in place of proper form validation :)
      // TODO: FIX
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (state.transfer.to != "" && state.transfer.amount != "") {
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
