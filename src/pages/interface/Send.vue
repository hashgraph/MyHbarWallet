<template>
  <Headline
    title="Send"
    parent="home"
  />

  <div
    class="pb-10 mt-8 font-medium border-b text-carbon dark:text-silver-polish border-cerebral-grey dark:border-midnight-express"
  >
    <div class="lg:align-baseline lg:m-auto lg:grid lg:grid-flow-col lg:grid-cols-2 lg:gap-16 flex flex-wrap items-center">
      <div class="w-full lg:h-full">
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
          <TransferForm
            v-model:to="state.transfer.to"
            v-model:asset="state.transfer.asset"
            v-model:amount="state.transfer.amount"
            v-model:usd="state.transfer.usd"
          />
        </div>
      </div>

      <div class="lg:mt-2 lg:h-full w-full mt-4 mb-2 md:p-0">
        <p class = "mb-2"> {{ $t("InterfaceSend.options") }} </p>
        <div class="p-10 pt-4 font-medium bg-white border rounded shadow-md dark:bg-ruined-smores border-jupiter dark:border-midnight-express w-full">
          <div class="mt-4 mb-8">
            <p> {{ $t("OptionalMemo.addMemo") }} </p>
            <TextInput 
              v-model="state.memo" 
              class="mt-2 font-medium"
            />
            <p class="mt-4 dark:text-argent">
              {{ $t("OptionalMemo.aboutMemo") }}
            </p>
          </div>


          <div class="mt-4">
            <p class="mb-4"> 
              {{ $t("InterfaceHomeSend.section2.toggle2.label") }} 
            </p>
            <AssetInput
              v-model="state.maxFee"
              asset="HBAR"
            />
            <p class="mt-4 dark:text-argent">
              {{ $t("InterfaceSend.max.transaction.fee") }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- TODO: Enable Multiple Asset Transfers -->
    <!-- <Button
      color="white"
      class="p-2 mt-8 w-52"
      @click="openAddModal"
    >
      {{ $t("BaseButton.addTransfer1") }}
    </Button>-->
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
      {{ $t("BaseButton.cancel") }}
    </Button>
  </div>

  <ProgressModal 
    :is-visible="state.showIPModal" 
    :title="$t('InterfaceSend.modal.sending')"
  />

  <Modal
    :is-visible="state.showConfirmModal"
    title="Success"
    @close="closeConfirmModal"
  >
    Successfully transferred {{ amount.toString() }} to account: {{ state.transfer.to?.toString() }}.
  </Modal>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
} from "vue";
import { BigNumber } from "bignumber.js";
import { AccountId, Hbar } from "@hashgraph/sdk";
import { useRouter } from "vue-router";

import Headline from "../../components/interface/Headline.vue";
import TransferForm from "../../components/interface/TransferForm.vue";
import Button from "../../components/base/Button.vue";
import TextInput from "../../components/base/TextInput.vue";
import ProgressModal from "../../components/interface/ProgressModal.vue";
import Modal from "../../components/interface/Modal.vue";
import AssetInput from "../../components/interface/AssetInput.vue";
import { useStore } from "../../store";
// import { transfer } from "src/services/impl/hedera/client/transfer";

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
    AssetInput,
    ProgressModal,
    Modal

  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const hashgraph = ref<typeof import("@hashgraph/sdk") | null>(null);
    onMounted(async () => {
      hashgraph.value = await import("@hashgraph/sdk");
    });




    let state = reactive({
      accountId: store.accountId,
      generalErrorText: null as string | null,
      sendBusyText: null as string | null,
      indexToEdit: 0,
      showEditModal: false,
      memo: "" as string,
      maxFee: null as Hbar | null | undefined,
      showAddModal: false,
      showConfirmModal: false,
      showIPModal: false,
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

    const amount = computed(() => {
      let fromTinybar = new Hbar(state.transfer.amount / 100000000);
      return fromTinybar;
    });

    function openConfirmModal(): void {
      state.showConfirmModal = true;
    }

    function closeConfirmModal(): void {
      state.showIPModal = false;
      state.showConfirmModal = false;
      router.back();
    }

    async function onSend(): Promise<void> {

      if (store.client == null) return;

      state.showIPModal = true;
      state.sendBusyText = "Executing transaction …";
      state.generalErrorText = null;

      try {
        await store.client.transfer({
          transfers: [state.transfer],
          memo: state.memo ?? "",
          maxFee: state.maxFee ?? null,
          onBeforeConfirm() {
            state.sendBusyText = "Waiting for confirmation …";
          },
        });

        void store.requestAccountBalance();

        // go back to home
        // goal is to see the now PENDING transaction
        // so we can watch it "reach consensus"
        openConfirmModal();
      } catch (err) {
        state.generalErrorText = await store.errorMessage(err);
      } finally {
        state.sendBusyText = null;
      }
    }

    function removeTransfer(index: number) {
      state.transfers.splice(index, 1);
    }

    function onCancel() {
      router.back();
    }


    function updateMaxFee(fee: Hbar): void {
      state.maxFee = fee;
    }


    return {
      state,
      sendValid,
      onSend,
      removeTransfer,
      onCancel,
      updateMaxFee,
      openConfirmModal,
      closeConfirmModal,
      amount
    };
  },
});
</script>
