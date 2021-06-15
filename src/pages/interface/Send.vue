<template>
  <Headline title="Send" parent="home" />

  <div
    class="
      mt-8
      font-medium
      text-carbon
      pb-10
      border-b border-cerebral-grey
      dark:border-midnight-express
    "
  >
    <div class="flex flex-wrap">
      <div class="">
        <!-- TODO: when localizing, remove the v-if, the pluralization should be done in the localizer -->
        <div
          v-if="state.transfers.length <= 1"
          class="mb-2 dark:text-silver-polish"
        >
          Transfer
        </div>
        <div v-else class="mb-2 dark:text-silver-polish">Transfers</div>

        <div
          class="
            p-4
            shadow-md
            rounded
            font-medium
            bg-white
            dark:bg-ruined-smores
            border border-jupiter
            dark:border-midnight-express
          "
        >
          <TransferForm
            v-model:to="state.transfer.to"
            v-model:asset="state.transfer.asset"
            v-model:amount="state.transfer.amount"
          />
        </div>
      </div>

      <!--      <div class="mb-2 p-4 md:p-0">-->
      <!--        &lt;!&ndash;        <div class="dark:text-silver-polish">From</div>&ndash;&gt;-->

      <!--        &lt;!&ndash;        <TextInput&ndash;&gt;-->
      <!--        &lt;!&ndash;          v-model="state.accountId"&ndash;&gt;-->
      <!--        &lt;!&ndash;          disabled&ndash;&gt;-->
      <!--        &lt;!&ndash;          class="mt-2 rounded font-medium"&ndash;&gt;-->
      <!--        &lt;!&ndash;        />&ndash;&gt;-->

      <!--        &lt;!&ndash;        <OptionalMemo v-model="state.memo" class="mt-6" />&ndash;&gt;-->

      <!--        &lt;!&ndash;        <OptionalHbarInput&ndash;&gt;-->
      <!--        &lt;!&ndash;          v-model="state.maxFee"&ndash;&gt;-->
      <!--        &lt;!&ndash;          class="mt-8"&ndash;&gt;-->
      <!--        &lt;!&ndash;          :default-value="state.defaultMaxFee"&ndash;&gt;-->
      <!--        &lt;!&ndash;        />&ndash;&gt;-->
      <!--      </div>-->
    </div>

    <!--    <Button color="white" class="mt-8 p-2 w-52" @click="openAddModal">-->
    <!--      Add Transfer-->
    <!--    </Button>-->
  </div>

  <div
    v-if="state.generalErrorText != null"
    class="
      bg-unburdened-pink
      mt-10
      -mb-8
      max-w-[600px]
      w-max
      mx-auto
      px-4
      py-3
      rounded
    "
  >
    <div class="text-sm text-harlocks-cape font-medium text-center">
      {{ state.generalErrorText }}
    </div>
  </div>

  <!-- bottom buttons section -->
  <div class="flex flex-col items-center w-[420px] m-auto mt-10 mb-10">
    <Button
      color="green"
      class="w-full py-3 mt-6"
      :disabled="!sendValid"
      :busy="state.sendBusyText != null"
      @click="onSend"
    >
      {{ state.sendBusyText ?? "Send" }}
    </Button>

    <Button color="white" class="text-sm px-9 py-2 mt-4" @click="onCancel">
      Cancel
    </Button>
  </div>

  <!--  &lt;!&ndash; Add Transfer Modal &ndash;&gt;-->
  <!--  <AddEditModal-->
  <!--    v-model:to="state.transfer.to"-->
  <!--    v-model:asset="state.transfer.asset"-->
  <!--    v-model:amount="state.transfer.amount"-->
  <!--    :is-visible="state.showAddModal"-->
  <!--    type="add"-->
  <!--    @close="closeAddModal"-->
  <!--    @clickAdd="handleAdd"-->
  <!--  />-->

  <!--  &lt;!&ndash; Edit Transfer Modal &ndash;&gt;-->
  <!--  <AddEditModal-->
  <!--    v-if="state.transfers.length > 0"-->
  <!--    v-model:to="state.transfers[state.indexToEdit].to"-->
  <!--    v-model:asset="state.transfers[state.indexToEdit].asset"-->
  <!--    v-model:amount="state.transfers[state.indexToEdit].amount"-->
  <!--    :is-visible="state.showEditModal"-->
  <!--    type="edit"-->
  <!--    @close="closeEditModal"-->
  <!--    @clickAdd="handleEditAdd"-->
  <!--  />-->
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, reactive } from "vue";
import Headline from "../../components/interface/Headline.vue";
import TransferForm from "../../components/interface/TransferForm.vue";
import Button from "../../components/base/Button.vue";
import BigNumber from "bignumber.js";
import type { AccountId } from "@hashgraph/sdk";
import { useRouter } from "vue-router";
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
    TransferForm,
    Headline,
  },
  setup() {
    let state = reactive({
      accountId: "0.0.214102",
      showAddModal: false,
      generalErrorText: null as string | null,
      sendBusyText: null,
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

    async function onSend(): void {
      const { StatusError } = await import("@hashgraph/sdk");

      // shouldn't be possible if we got here, but just be safe
      if (store.client == null) return;
      if (state.transfer.to == null || state.transfer.amount == null) return;

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
