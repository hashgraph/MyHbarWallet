<template>
  <Headline
    :title="$t('InterfaceTransactionDetails.header')"
    parent="history"
  />
  <div class="overflow-auto w-full">
    <TransferDetail
      :color="ColorOption.GRAY"
      :title="$t('InterfaceTransactionDetails.transactionHash')"
      :description="hash"
    />

    <TransferDetail
      :color="ColorOption.GRAY"
      :title="$t('InterfaceTransactionDetails.transactionID')"
      :description="state.transaction?.id ?? notAvailable"
    />

    <TransferDetail
      :color="ColorOption.BLUE"
      :title="$t('InterfaceTransactionDetails.operator')"
      :description="state.transaction?.operatorAccountId.toString() ?? notAvailable"
    />

    <TransferDetail
      :color="ColorOption.BLUE"
      :title="$t('InterfaceTransactionDetails.node')"
      :description="state.transaction?.nodeAccountId.toString() ?? notAvailable"
    />

    <TransferDetail
      :color="ColorOption.GRAY"
      :title="$t('InterfaceTransactionDetails.consensus')"
      :description="new Date(state.transaction?.consensusAt.toString()).toString() ?? notAvailable"
    />

    <TransferDetail
      :color="state.transaction?.status === 'SUCCESS'? ColorOption.GREEN : ColorOption.CHARCOAL"
      :title="$t('InterfaceTransactionDetails.status')"
    >
      <img
        v-if="state.transaction?.status === 'SUCCESS'"
        class="mr-1.5 h-3 w-3"
        :src="checkmark"
        alt="green checkmark"
      >
      {{ formatType(state.transaction?.status) ?? notAvailable }}
    </TransferDetail>

    <TransferDetail
      :color="ColorOption.GRAY"
      :title="$t('InterfaceTransactionDetails.type')"
      :description="formatType(state.transaction?.type) ?? notAvailable"
    />

    <!-- If message exists on transaction, show message in blue, otherwise display 'not available' -->
    <TransferDetail
      :color="state.transaction?.message? ColorOption.BLUE : ColorOption.GRAY"
      :title="$t('InterfaceTransactionDetails.message')"
      :description="state.transaction?.message ?? notAvailable"
    />

    <TransferDetail
      :color="ColorOption.GRAY"
      :title="$t('InterfaceTransactionDetails.memo')"
      :description="state.transaction?.memo"
    />

    <TransferDetail
      :color="ColorOption.GRAY"
      :title="$t('InterfaceTransactionDetails.totalAmount')"
      :description="sumTransfers(state.transaction?.transfers) ?? notAvailable"
    />

    <TransferDetail
      :color="ColorOption.GRAY"
      :title="$t('InterfaceTransactionDetails.transactionFee')"
      :description="formatAmount(state.transaction?.fee) ?? notAvailable"
    />

    <div class="my-4">
      <TransactionDetail :transfers="state.transaction?.transfers ?? []" />
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
      transaction: null as Transaction | Transfer | null | undefined
    });

    const notAvailable = i18n.t("InterfaceTransactionDetails.not.available");
  
    onMounted(async ()=> {
      state.transaction = await store.client?.getTransfer({hash: props.hash});
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
