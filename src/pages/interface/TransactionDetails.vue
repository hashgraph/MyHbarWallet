<template>
  <Headline
    :title="$t('InterfaceTransactionDetails.header')"
    parent="history"
  />

  <div class="min-w-[600px]">
    <TransferDetail
      :color="ColorOption.GRAY"
      :title="$t('InterfaceTransactionDetails.transactionHash')"
      :description="state.hash"
    />

    <TransferDetail
      :color="ColorOption.GRAY"
      :title="$t('InterfaceTransactionDetails.transactionID')"
      :description="state.transactionId"
    />

    <TransferDetail
      :color="ColorOption.BLUE"
      :title="$t('InterfaceTransactionDetails.operator')"
      :description="state.operator"
    />

    <TransferDetail
      :color="ColorOption.BLUE"
      :title="$t('InterfaceTransactionDetails.node')"
      :description="state.node"
    />

    <TransferDetail
      :color="ColorOption.GRAY"
      :title="$t('InterfaceTransactionDetails.consensus')"
      :description="state.consensus"
    />

    <TransferDetail
      :color="ColorOption.GREEN"
      :title="$t('InterfaceTransactionDetails.status')"
    >
      <img
        class="mr-1.5 h-3 w-3"
        :src="checkmark"
        alt="green checkmark"
      >
      {{ state.status }}
    </TransferDetail>

    <TransferDetail
      :color="ColorOption.GRAY"
      :title="$t('InterfaceTransactionDetails.type')"
      :description="state.type"
    />

    <TransferDetail
      :color="ColorOption.BLUE"
      :title="$t('InterfaceTransactionDetails.message')"
      :description="state.message"
    />

    <TransferDetail
      :color="ColorOption.GRAY"
      :title="$t('InterfaceTransactionDetails.memo')"
      :description="state.memo"
    />

    <TransferDetail
      :color="ColorOption.GRAY"
      :title="$t('InterfaceTransactionDetails.totalAmount')"
      :description="state.amount"
    />

    <TransferDetail
      :color="ColorOption.GRAY"
      :title="$t('InterfaceTransactionDetails.transactionFee')"
      :description="state.fee"
    />

    <div class="w-full text-center">
      <BalanceDetail
        class="mt-4"
        :transfers="state.transfers"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, reactive } from "vue";
import type { TransactionRecord, Transfer } from "@hashgraph/sdk";
import { useI18n } from "vue-i18n";

import checkmark from "../../assets/icon_check_green.svg";
import Headline from "../../components/interface/Headline.vue";
import TransferDetail, {
  ColorOption,
} from "../../components/history/TransferDetail.vue";
import TransactionDetail from "../../components/history/TransactionDetail.vue";
import BalanceDetail from "../../components/history/BalanceDetail.vue";
import { useStore } from "../../store";


export default defineComponent({
  name: "TransferDetails",
  components: {
    Headline,
    TransferDetail,
    TransactionDetail,
    BalanceDetail,
  },
  props: {
    transactionHash: { type: String, required: false }
  },
  setup(props) {
    const store = useStore();

    const i18n = useI18n();

    const state = reactive({
      transaction: undefined,
      hash: "" as string,
      transactionId: "" as string,
      operator: "" as string,
      node: "" as string,
      consensus: "" as string,
      status: "" as string,
      type: "" as string,
      message: "" as string,
      memo: "" as string,
      amount: "" as string,
      fee: "" as string,
      transfers: [] as Transfer[]
    });

    const notAvailable = computed(()=>{
      return i18n.t("InterfaceTransactionDetails.not.available");
    });

    const transactionType = computed(()=>{
      return formatType(state.transaction?.type ?? "") ?? notAvailable.value;
    });

    onMounted(async ()=>{
      state.transaction = await getTransactionRecord(props.transactionHash ?? "");
      state.hash = state.transaction?.hash ?? notAvailable.value;
      state.transactionId = state.transaction?.id ?? notAvailable.value;
      state.operator = state.transaction?.operatorAccountId ?? notAvailable.value;
      state.node = state.transaction?.nodeAccountId ?? notAvailable.value;
      state.consensus = new Date(state.transaction?.consensusAt).toString() ?? notAvailable.value;
      state.status = state.transaction?.status ?? notAvailable.value;
      state.type = formatType(state.transaction?.type) ?? notAvailable.value;
      state.memo = state.transaction?.memo ?? ""
      state.message = state.transaction?.message ?? ""
      state.amount = sumTransfers(state.transaction?.transfers) ?? notAvailable.value;
      state.fee = formatAmount(state.transaction?.fee) ?? notAvailable.value;
      state.transfers = state.transaction?.transfers ?? [];
    });

    async function getTransactionRecord(hash: string): Promise<TransactionRecord | undefined>{
      return await store.client?.getTransactionRecord({ transactionHash: hash });
    }

    //Recycled functions from Transactions
    function formatType(type: string): string{
      let words = type.split("_");
      let formatted = "";
      for(let i in words){
        formatted += words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase() + " ";
      }
      return formatted.trim();
    }

    function sumTransfers(transfers: []): string{
      let sum = 0;
      for(let i in transfers){
        if(transfers[i].amount > 0) sum += transfers[i].amount;
      }
      return formatAmount(sum);
    }

    function formatAmount(value: number): string{
      return `${parseFloat((value/100000000).toFixed(8))}ℏ`;
    }

    return {
      checkmark,
      ColorOption,
      state
    };
  },
});
</script>
