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
          <TransferForm
            v-model:to="state.transfer.to"
            v-model:asset="state.transfer.asset"
            v-model:amount="state.transfer.amount"
            v-model:usd="state.transfer.usd"
          />
        </div>
      </div>

      <div class="w-full p-4 mt-4 mb-2 md:p-0">
        <div class="dark:text-silver-polish">
          From
        </div>

        <TextInput
          :model-value="state.accountId?.toString() ?? ''"
          read-only
          class="mt-2 font-medium rounded"
        />

        <OptionalMemo
          v-model="state.memo"
          class="mt-8"
        />

        <OptionalHbarInput
          v-model="state.maxFee"
          class="mt-8"
          @update:model-value="updateMaxFee"
        />

        <div class="mt-2 text-sm italic text-squant">
          {{ $t("InterfaceHomeSend.section2.toggle2.label") }}
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
    </Button> -->
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
import {
    computed,
    defineComponent, 
    onMounted, 
    reactive, 
    ref 
} from "vue";
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
    const hashgraph = ref<typeof import("@hashgraph/sdk") | null>(null);
    // const defaultMaxFee = computed( ()=> {
    //   return new Hbar(1);
    // });

    onMounted(async () => {
        hashgraph.value = await import("@hashgraph/sdk");
    });
    
    let state = reactive({
      accountId: store.accountId,
      showAddModal: false,
      generalErrorText: null as string | null,
      sendBusyText: null as string | null,
      indexToEdit: 0,
      showEditModal: false,
      memo: "" as string | undefined,
      maxFee: null as Hbar | null,
      // defaultMaxFee: new Hbar(1).toBigNumber(),
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

    async function onSend(): Promise<void> {
       if (store.client == null) return;
      
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
        router.back();
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


    function updateMaxFee(fee: Hbar): void{
      state.maxFee = fee;
      console.log(state.maxFee?.toString());
    }


    return {
      state,
      sendValid,
      onSend,
      removeTransfer,
      onCancel,
      updateMaxFee,
    };
  },
});
</script>
