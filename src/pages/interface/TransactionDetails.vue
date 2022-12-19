<template>
  <Headline
    :title="$t('InterfaceTransactionDetails.header')"
    parent="history"
  />
  <div
    v-if="state.transaction != null"
    class="overflow-auto w-full"
  >
    <TransactionDetail 
      :color="ColorOption.GRAY" 
      :title="$t('InterfaceTransactionDetails.transactionHash')"
      :description="state.transaction?.transaction_hash"
    />

    <TransactionDetail 
      :color="ColorOption.BLUE" 
      :title="$t('InterfaceTransactionDetails.operator')"
      :description="state.accountId?.toString() ?? notAvailable"
    />

    <TransactionDetail 
      :color="ColorOption.BLUE" 
      :title="$t('InterfaceTransactionDetails.node')"
      :description="state.transaction?.node ?? notAvailable"
    />

    <TransactionDetail 
      :color="ColorOption.GRAY" 
      :title="$t('InterfaceTransactionDetails.consensus')"
      :description="consensusTimestamp ?? notAvailable"
    />

    <TransactionDetail 
      :color="state.transaction?.result === 'SUCCESS' ? ColorOption.GREEN : ColorOption.CHARCOAL"
      :title="$t('InterfaceTransactionDetails.status')"
    >
      <img
        v-if="state.transaction?.result === 'SUCCESS'"
        class="mr-1.5 h-3 w-3"
        :src="checkmark"
        alt="green checkmark"
      >
      {{ state.transaction?.result ?? notAvailable }}
    </TransactionDetail>

    <TransactionDetail 
      :color="ColorOption.GRAY" 
      :title="$t('InterfaceTransactionDetails.type')"
      :description="state.transaction?.name ?? notAvailable"
    />

    <TransactionDetail 
      :color="ColorOption.GRAY" 
      :title="$t('InterfaceTransactionDetails.memo')"
      :description="state.transaction?.memo_base64"
    />

    <TransactionDetail 
      :color="ColorOption.GRAY" 
      :title="$t('InterfaceTransactionDetails.totalAmount')"
      :description="sumTransfers ?? notAvailable"
    />

    <TransactionDetail 
      :color="ColorOption.GRAY" 
      :title="$t('InterfaceTransactionDetails.transactionFee')"
      :description="chargedFee ?? notAvailable"
    />

    <div class="my-4">
      <TransferList 
        :transfers="state.transaction?.transfers ?? []"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import moment from "moment";
import { Hbar } from "@hashgraph/sdk";
import { useIntervalFn } from "@vueuse/core";
import { transfer } from "src/services/impl/hedera/client/transfer";

import { useStore } from "../../store";
import { Transaction } from "../../domain/Transaction";
import checkmark from "../../assets/icon_check_green.svg";
import Headline from "../../components/interface/Headline.vue";
import TransactionDetail, {
  ColorOption,
} from "../../components/history/TransactionDetail.vue";
import TransferList from "../../components/history/TransferList.vue";

export default defineComponent({
  name: "TransactionDetails",
  components: {
    Headline,
    TransferList,
    TransactionDetail,
  },
  props: {
    id: { type: String, required: false, default: "" }
  },
  setup(props) {
    const store = useStore();
    const i18n = useI18n();

    const state = reactive({
      accountId: store.accountId,
      transaction: null as Transaction | null | undefined
    });

    const notAvailable = i18n.t("InterfaceTransactionDetails.not.available");

    onMounted(async () => {
      state.transaction = await store.client?.getTransactionById({ id: props.id });
    });

    useIntervalFn(async () => {
      state.transaction = await store.client?.getTransactionById({ id: props.id });
    }, 10_000);

    const consensusTimestamp = computed(() => {
      if (state.transaction?.consensus_timestamp != null)
      return moment.unix(Number.parseFloat(state.transaction?.consensus_timestamp)).toString();
      else return null;
    });

    const chargedFee = computed(() => {
      if (state.transaction?.charged_tx_fee != null)
      return Hbar.fromTinybars(state.transaction?.charged_tx_fee).toString();
      else return null;
    });

    const sumTransfers = computed(() => {
      if (state.transaction?.transfers != null) {
        let sum = 0;

        for (const transfer of state.transaction.transfers) {
          if (transfer.amount > 0) sum += transfer.amount;
        }
        
        return Hbar.fromTinybars(sum).toString();
      }

      return null;
    })

    return {
      checkmark,
      ColorOption,
      state,
      notAvailable,
      consensusTimestamp,
      chargedFee,
      sumTransfers
    };
  },
});
</script>
