<template>
  <Headline
    :title="$t('InterfaceTransactionDetails.header')"
    parent="history"
  />

  <TransferDetail
    :color="ColorOption.GRAY"
    :title="$t('InterfaceTransactionDetails.transactionHash')"
    description="e9338e069ab264233e36a44376ea99f8c79d58cf822d34b97ea69f12a5b8634b9876f5c68badacaa62cb869329383dd7"
  />

  <TransferDetail
    :color="ColorOption.GRAY"
    :title="$t('InterfaceTransactionDetails.transactionID')"
    description="0.0.41098@1608257726.999787842"
  />

  <TransferDetail
    :color="ColorOption.BLUE"
    :title="$t('InterfaceTransactionDetails.operator')"
    description="0.0.41098"
  />

  <TransferDetail
    :color="ColorOption.BLUE"
    :title="$t('InterfaceTransactionDetails.node')"
    description="0.0.13"
  />

  <TransferDetail
    :color="ColorOption.GRAY"
    :title="$t('InterfaceTransactionDetails.consensus')"
    description="December 17th, 2020 at 9:15:37 PM"
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
    {{ $("InterfaceTransactionDetails.status.value.success") }}
  </TransferDetail>

  <TransferDetail
    :color="ColorOption.GRAY"
    :title="$t('InterfaceTransactionDetails.type')"
    description="Transfer Token"
  />

  <TransferDetail
    :color="ColorOption.BLUE"
    :title="$t('InterfaceTransactionDetails.message')"
    description=""
  >
    52157454
    <span class="px-1 text-carbon dark:text-argent"> in </span> 0.0.51273
  </TransferDetail>

  <TransferDetail
    :color="ColorOption.GRAY"
    :title="$t('InterfaceTransactionDetails.memo')"
    description=""
  />

  <TransferDetail
    :color="ColorOption.GRAY"
    :title="$t('InterfaceTransactionDetails.totalAmount')"
    description="0.00517 HBAR"
  />

  <TransferDetail
    :color="ColorOption.GRAY"
    :title="$t('InterfaceTransactionDetails.transactionFee')"
    description="0.00517 HBAR"
  />

  <div class="flex my-4">
    <TransactionDetail />

    <div class="flex justify-center w-1/2 mt-12">
      <img
        class="h-3 mt-3"
        src="../../assets/long_arrow.svg"
        alt="right arrow"
      >
    </div>

    <BalanceDetail class="my-6" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import checkmark from "../../assets/icon_check_green.svg";
import Headline from "../../components/interface/Headline.vue";
import TransferDetail, {
  ColorOption,
} from "../../components/history/TransferDetail.vue";
import TransactionDetail from "../../components/history/TransactionDetail.vue";
import BalanceDetail from "../../components/history/BalanceDetail.vue";

export default defineComponent({
  name: "TransferDetails",
  components: {
    Headline,
    TransferDetail,
    TransactionDetail,
    BalanceDetail,
  },
  setup() {
    return {
      checkmark,
      ColorOption,
    };
  },
});
</script>
