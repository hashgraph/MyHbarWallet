<template>
  <Headline
    title="Send"
    parent="home"
  />

  <div
    class="pb-10 mt-8 border-b text-carbon dark:text-silver-polish border-cerebral-grey dark:border-midnight-express"
  >
    <div
      class="lg:align-baseline lg:m-auto lg:grid lg:grid-flow-col lg:grid-cols-2 lg:gap-16 flex flex-wrap items-center"
    >
      <div class="w-full lg:h-full">
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
          class="p-4 bg-first-snow border rounded shadow-md dark:bg-midnight-express border-jupiter dark:border-midnight-express min-w-[325px] min-h-[375px] md:min-h-[400px] overflow-hidden"
        >
          <TransferForm
            v-model:to="state.transfer.to"
            v-model:asset="state.transfer.asset"
            v-model:usd="state.transfer.usd"
            data-cy-transfer-form
            class="transition-all duration-300"
            :class="{
              'opacity-100 mt-0': state.transfers.length === 0 || state.editTransfer == true,
              'opacity-0 -mt-80': state.editTransfer === false && state.transfers.length > 0
            }"
            @update:amount="updateAmount"
          />

          <div
            class="transition-all duration-300 overflow-y-auto"
            :class="{
              'opacity-100 -mt-4': state.transfers.length > 0,
              'absolute h-0 opacity-0': state.transfers.length == 0 || state.editTransfer == true
            }"
          >
            <div
              v-for="(transfer, i) in state.transfers"
              :key="createKey(transfer)"
            >
              <TransferItem
                :transfer="transfer"
                :index="i"
                @edit="edit"
                @remove="remove"
                @update:value="updateValue"
              />
            </div>
          </div>
        </div>
        <Button
          v-if="state.transfers.length === 0 || !state.editTransfer"
          color="green"
          class="p-2 mt-8 w-52"
          :disabled="disableAddTransfer"
          @click="editSingleTransfer"
        >
          {{ addTransferButton }}
        </Button>

        <Button
          v-if="state.editTransfer && state.transfers.length > 0"
          color="green"
          class="p-2 mt-8 w-52"
          :disabled="!disableSave"
          @click="editSingleTransfer"
        >
          {{ $t("InterfaceHomeSend.button.save") }}
        </Button>
      </div>

      <div class="lg:mt-2 lg:h-full w-full mt-4 mb-2 md:p-0">
        <p class="mb-2">
          {{ $t("InterfaceSend.options") }}
        </p>
        <div
          class="p-8 pr-10 pl-10 z-10 relative bg-white border rounded shadow-md dark:bg-ruined-smores border-jupiter dark:border-midnight-express w-full"
        >
          <OptionalMemo v-model="state.memo" />

          <OptionalHbarInput
            v-model="state.maxFee"
            @update:model-value="updateMaxFee"
          />

          <p
            class="mt-4 p-4 italic text-squant dark:text-silver-polish dark:bg-dreamless-sleep rounded shadow-md border border-transparent dark:border-midnight-express"
          >
            {{ $t("InterfaceSend.max.transaction.fee") }}
          </p>
        </div>
      </div>
    </div>

    <div
      v-if="state.generalErrorText != null && state.generalErrorText !== ''"
      class="px-4 py-3 mx-auto mt-10 -mb-8 rounded bg-unburdened-pink w-max"
    >
      <div class="text-center text-harlocks-cape">
        {{ state.generalErrorText }}
      </div>
    </div>

    <!-- bottom buttons section -->
    <div class="flex flex-col items-center w-7/12 m-auto mt-10 mb-10">
      <Button
        color="green"
        class="w-full py-3 mt-6"
        :disabled="disableSend"
        :busy="state.sendBusyText != null"
        @click="openConfirmTransferModal"
      >
        {{ state.sendBusyText ?? "Send" }}
      </Button>

      <Button
        color="white"
        class="py-2 mt-4 text-sm px-9"
        @click="onCancel"
      >
        {{ $t("BaseButton.cancel") }}
      </Button>
    </div>

    <ProgressModal
      :is-visible="state.showIPModal"
      :title="$t('InterfaceSend.modal.sending')"
    />

    <Modal
      :is-visible="state.showAcceptModal"
      title="Success"
      @close="closeAcceptModal"
    >
      {{ success }}
    </Modal>

    <AddTransferModal
      v-if="state.showAddTransferModal"
      :title="$t('InterfaceHomeSendModal.header1')"
      :is-visible="state.showAddTransferModal"
      :edit="state.editTransfer"
      @close="closeAddTransferModal"
      @add-transfer="addTransfer"
    />

    <TransferConfirmationModal
      :is-visible="state.showConfirmTransferModal"
      :transfers="state.transfers"
      @close="closeConfirmTransferModal"
      @confirm="handleConfirm"
    />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref
} from "vue";
import { BigNumber } from "bignumber.js";
import type { Hbar } from "@hashgraph/sdk";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

import { TransferTo } from "../../domain/Transaction";
import Headline from "../../components/interface/Headline.vue";
import TransferForm from "../../components/interface/TransferForm.vue";
import Button from "../../components/base/Button.vue";
import ProgressModal from "../../components/interface/ProgressModal.vue";
import Modal from "../../components/interface/Modal.vue";
import OptionalMemo from "../../components/interface/OptionalMemo.vue";
import OptionalHbarInput from "../../components/interface/OptionalHbarInput.vue";
import AddTransferModal from "../../components/interface/AddTransferModal.vue";
import TransferItem from "../../components/interface/TransferItem.vue";
import TransferConfirmationModal from "../../components/interface/TransferConfirmationModal.vue";
import { useStore } from "../../store";

export default defineComponent({
  name: "Send",
  components: {
    Button,
    Headline,
    TransferForm,
    ProgressModal,
    Modal,
    OptionalMemo,
    OptionalHbarInput,
    AddTransferModal,
    TransferItem,
    TransferConfirmationModal,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const i18n = useI18n();
    const hashgraph = ref<typeof import("@hashgraph/sdk") | null>(null);

    const state = reactive({
      accountId: store.accountId,
      generalErrorText: null as string | null,
      sendBusyText: null as string | null,
      indexToEdit: 0,
      showEditModal: false,
      memo: "" as string,
      maxFee: null as Hbar | null,
      showAddModal: false,
      showAcceptModal: false,
      showIPModal: false,
      showAddTransferModal: false,
      showConfirmPrivateKeyModal: false,
      showConfirmTransferModal: false,
      confirmed: false,
      editTransfer: true,
      transfer: {
        to: null,
        asset: "HBAR",
        amount: null
      } as TransferTo,
      transfers: [] as TransferTo[],
      decimals: 0,
      symbol: null as string | null | undefined,
      tokenType: null as string | null | undefined
    });

    onMounted(async () => {
      hashgraph.value = await import("@hashgraph/sdk");
    });

    const success = computed(() => {
      if (state.transfers.length === 1) {
        if (state.transfers[0].asset === "HBAR") {
          return `${i18n.t("Modal.Send.SuccessfullyTransferred")} ${formatAmount(state.transfers[0].amount?.toNumber() ?? 0)} ${i18n.t("Modal.Send.ToAccount")}: ${state.transfers[0].to?.toString()}`
        }
        return `${i18n.t("Modal.Send.SuccessfullyTransferred")} ${state.transfers[0].amount?.toFixed(state.decimals)} ${i18n.t("InterfaceSend.modal.of")} ${state.transfers[0].asset} ${i18n.t("Modal.Send.ToAccount")}: ${state.transfers[0].to?.toString()}`
      } else {
        return `${i18n.t("InterfaceHomeSendModal.success.multiple.transfers")}`;
      }
    });

    const addTransferButton = computed(() => {
      if (state.transfers.length == 0) return i18n.t("BaseButton.addTransfer1");
      if (state.editTransfer === true) return i18n.t("InterfaceHomeSend.button.save");
      return i18n.t("BaseButton.addAnotherTransfer");
    });

    const sendValid = computed(() =>
      state.transfer.to != null &&
      state.transfer.amount != null &&
      !isNaN(state.transfer.amount.toNumber())
      && state.transfer.amount.toNumber() !== 0
    );

    const disableSend = computed(() => {
      if (state.transfers.length === 0) return !sendValid.value;
      else return false;
    });

    const disableAddTransfer = computed(() => {
      if (!sendValid.value && state.editTransfer) return true;
      return state.transfers.length >= 10;
    });

    const disableSave = computed(() => 
      (state.editTransfer && sendValid.value) === true);

    function updateAmount(e: Event): void {
      state.transfer.amount = new BigNumber(e as unknown as number);
    }

    function updateValue(e: { index: number, value: BigNumber }) {
      state.transfers[e.index].amount = e.value;
    }

    function createKey(transfer: TransferTo): string {
      return `${transfer.to} ${transfer.asset} ${transfer.amount}`;
    }

    function formatAmount(value: number): string {
      return hashgraph.value?.Hbar.fromTinybars(value).toString() ?? '';
    }

    function edit(e: { index: number }): void {
      state.indexToEdit = e.index;
      state.transfer = state.transfers[state.indexToEdit];
      state.editTransfer = true;
    }

    function remove(e: { index: number }): void {
      state.transfers.splice(e.index, 1);
      if (state.transfers.length === 1) {
        state.transfer = state.transfers.shift() as TransferTo;
        state.transfers = [] as TransferTo[];
      }
    }

    function editSingleTransfer(): void {
      if (state.transfers.length === 0 && !sendValid.value) {
        openAddTransferModal();
        return;
      }

      if (!sendValid.value && !state.editTransfer) {
        openAddTransferModal();
        return;
      }

      if (state.transfer.to && state.transfer.asset) {
        state.transfers.splice(state.indexToEdit, 1);
        state.transfers.splice(state.indexToEdit, 0, state.transfer);
      }

      clear();
    }

    function addTransfer(e: { transfer: TransferTo, edit: boolean }) {
      const transfer = Object.assign({}, e.transfer);
      if (transfer.to && transfer.asset && validateTransfer(transfer) === true) {
        if (e.edit) {
          state.transfers.splice(state.indexToEdit, 1);
          state.transfers.splice(state.indexToEdit, 0, transfer);
        } else {
          state.transfers.push(transfer);
        }
      }
      clear();
    }

    function validateTransfer(transfer: Transfer): boolean {
      for (const i in state.transfers) {
        if (state.transfers[i].to?.toString() === transfer.to?.toString() && state.transfers[i].asset.toString() === transfer.asset.toString()) {
          state.generalErrorText = i18n.t("InterfaceHomeSend.error.already.in.list");
          return false;
        }
      }

      state.generalErrorText = "";
      clear();
      return true;
    }

    function handleConfirm(): void {
      closeConfirmTransferModal();
      onSend();
    }

    function clear(): void {
      state.transfer.to = undefined;
      state.transfer.asset = "HBAR",
        state.transfer.amount = undefined
      state.indexToEdit = 0;
      state.editTransfer = false;
    }

    function openConfirmTransferModal(): void {
      if (sendValid.value === true && state.transfers.length === 0) state.transfers.push(state.transfer);
      state.showConfirmTransferModal = true;
    }

    function closeConfirmTransferModal(): void {
      state.showConfirmTransferModal = false;
    }

    function openAddTransferModal(): void {
      state.showAddTransferModal = true;
    }

    function closeAddTransferModal(): void {
      state.showAddTransferModal = false;
    }

    function openAcceptModal(): void {
      state.showIPModal = false;
      state.showAcceptModal = true;
    }

    function closeAcceptModal(): void {
      state.showAcceptModal = false;
      router.back();
    }

    async function onSend(): Promise<void> {
      if (store.client == null) return;

      state.showIPModal = true;
      state.sendBusyText = "Executing transaction …";
      state.generalErrorText = null;

      try {
        await store.client.transfer({
          transfers: state.transfers,
          memo: state.memo ?? "",
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          maxFee: state.maxFee?.toBigNumber() ?? new hashgraph.value!.Hbar(2).toBigNumber(),
          onBeforeConfirm() {
            state.sendBusyText = "Waiting for confirmation …";
          },
        });

        void store.requestAccountBalance();

        //get token information if asset is not Hbar, and only one transfer is going out
        //Removed token info query to reduce invisible transactions, can put back if needed
        if (state.transfer.asset !== "HBAR" && state.transfers.length <= 1) {
          state.decimals = store.balance?.tokens?.get(state.transfer.asset)?.decimals ?? 0;
          state.symbol = "";
          state.tokenType = state.transfer.asset;
        }

        // go back to home
        // goal is to see the now PENDING transaction
        // so we can watch it "reach consensus"
        openAcceptModal();
      } catch (err) {
        state.showIPModal = false;
        state.generalErrorText = await store.errorMessage(err as Error);
        state.confirmed = false;
        state.transfer.amount = new BigNumber(0);
      } finally {
        state.sendBusyText = null;
        state.confirmed = false;
      }
    }

    function onCancel() {
      router.back();
    }

    function updateMaxFee(fee: Hbar): void {
      state.maxFee = fee;
    }

    return {
      state,
      success,
      addTransferButton,
      disableSend,
      disableAddTransfer,
      disableSave,
      onSend,
      onCancel,
      updateMaxFee,
      closeAcceptModal,
      closeAddTransferModal,
      openConfirmTransferModal,
      closeConfirmTransferModal,
      editSingleTransfer,
      addTransfer,
      edit,
      remove,
      createKey,
      updateValue,
      handleConfirm,
      updateAmount
    };
  },
});
</script>
