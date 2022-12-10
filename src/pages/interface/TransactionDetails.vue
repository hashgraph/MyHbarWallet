<template>
  <Headline :title="$t('InterfaceTransactionDetails.header')" parent="history" />
  <div class="overflow-auto w-full">
    <TransferDetail 
      :color="ColorOption.GRAY" 
      :title="$t('InterfaceTransactionDetails.transactionHash')"
      :description="hash" />

    <TransferDetail 
      :color="ColorOption.BLUE" 
      :title="$t('InterfaceTransactionDetails.operator')"
      :description="state.accountId?.toString() ?? notAvailable" />

    <TransferDetail 
      :color="ColorOption.BLUE" 
      :title="$t('InterfaceTransactionDetails.node')"
      :description="state.transaction?.node ?? notAvailable" />

    <TransferDetail 
      :color="ColorOption.GRAY" 
      :title="$t('InterfaceTransactionDetails.consensus')"
      :description="new Date(state.transaction?.consensusTimestamp!).toString() ?? notAvailable" />

    <TransferDetail 
      :color="state.transaction?.result === 'SUCCESS' ? ColorOption.GREEN : ColorOption.CHARCOAL"
      :title="$t('InterfaceTransactionDetails.status')">
      <img v-if="state.transaction?.result === 'SUCCESS'" class="mr-1.5 h-3 w-3" :src="checkmark" alt="green checkmark">
      {{ formatType(state.transaction?.result!) ?? notAvailable }}
    </TransferDetail>

    <TransferDetail 
      :color="ColorOption.GRAY" 
      :title="$t('InterfaceTransactionDetails.type')"
      :description="formatType(state.transaction?.name!) ?? notAvailable" />

    <TransferDetail 
      :color="ColorOption.GRAY" 
      :title="$t('InterfaceTransactionDetails.memo')"
      :description="state.transaction?.memoBase64" />

    <TransferDetail 
      :color="ColorOption.GRAY" 
      :title="$t('InterfaceTransactionDetails.totalAmount')"
      :description="sumTransfers(state.transaction?.transfers!) ?? notAvailable" />

    <TransferDetail 
      :color="ColorOption.GRAY" 
      :title="$t('InterfaceTransactionDetails.transactionFee')"
      :description="formatAmount(state.transaction?.chargedTxFee!) ?? notAvailable" />

    <div class="my-4">
      <TransactionDetail 
        :transfers="state.transaction?.transfers ?? []" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";

import { useStore } from "../../store";
import { Transfer, Transaction, formatAmount, formatType, sumTransfers } from "../../domain/Transaction";
import checkmark from "../../assets/icon_check_green.svg";
import Headline from "../../components/interface/Headline.vue";
import TransferDetail, {
  ColorOption,
} from "../../components/history/TransferDetail.vue";
import TransactionDetail from "../../components/history/TransactionDetail.vue";
import type { AccountId } from "@hashgraph/sdk";

export default defineComponent({
  name: "TransferDetails",
  components: {
    Headline,
    TransferDetail,
    TransactionDetail,
  },
  props: {
    hash: { type: String, required: true }
  },
  setup(props) {
    const store = useStore();
    const i18n = useI18n();

    const state = reactive({
      accountId: null as AccountId | null | undefined,
      transaction: null as Transaction | null | undefined
    });

    const notAvailable = i18n.t("InterfaceTransactionDetails.not.available");

    onMounted(async () => {
      state.accountId = store.accountId;
      state.transaction = await store.client?.getTransfer({ hash: props.hash });
    });

    return {
      checkmark,
      ColorOption,
      state,
      notAvailable,
      formatType,
      formatAmount,
      sumTransfers,
    };
  },
});
</script>
