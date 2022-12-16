<template>
  <router-link
    v-if="(tx.transaction_id != null)"
    :to=" { name: 'transaction', params: { id: tx.transaction_id } }"
    class="flex items-center justify-between h-20 mb-1 border-b border-jupiter dark:border-midnight-express"
  >
    <Identicon class="w-10 h-10 mr-2" />

    <div class="flex flex-col flex-grow">
      <div class="flex justify-between flex-grow">
        <div
          class="flex-shrink-0 mb-1 font-medium leading-5 text-andrea-blue"
        >
          {{ tx.name }}
        </div>
      </div>

      <div class="flex justify-between">
        <div
          class="text-xs font-medium leading-4 text-squant dark:text-argent"
        >
          {{ `${accountId} • ${timeAgo}` }}
        </div>
        <div
          class="flex justify-end text-xs font-medium leading-4 text-squant dark:text-argent"
        >
          {{ `${$t("RecentTransactions.fee")} ${feeHbar}` }}
        </div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from "vue";
import { Hbar } from "@hashgraph/sdk";
import { RouterLink } from "vue-router";
import moment from "moment";
import { useIntervalFn } from "@vueuse/core";

import { useStore } from "../../store";
import { Transaction } from "../../domain/Transaction";

import Identicon from "./Identicon.vue";

export default defineComponent({
  name: "Transaction",
  components: { Identicon, RouterLink },
  props: {
    tx: { type: Object as PropType<Transaction>, required: true }
  },
  setup(props) {
    const store = useStore();
    const accountId = store.accountId;
    const timeAgo = ref("...");

    useIntervalFn(() => {
      if (props.tx.consensus_timestamp == null) return;
      timeAgo.value = moment.unix(Number.parseFloat(props.tx.consensus_timestamp)).fromNow();
    }, 1000);

    const feeHbar = computed(() => {
      return Hbar.fromTinybars(props.tx.charged_tx_fee);
    });

    return {
      accountId,
      timeAgo,
      feeHbar
    }
  }
});
</script>
