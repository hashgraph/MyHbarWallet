<template>
  <router-link
    :to=" { name: 'transaction', params: { hash: transaction?.transactionHash } }"
    class="flex items-center justify-between h-20 mb-1 border-b border-jupiter dark:border-midnight-express"
  >
    <Identicon class="w-10 h-10 mr-2" />

    <div class="flex flex-col flex-grow">
      <div class="flex justify-between flex-grow">
        <div
          class="flex-shrink-0 mb-1 font-medium leading-5 text-andrea-blue"
        >
          {{ title }}
        </div>

        <div
          class="mb-1 font-medium leading-5 text-right truncate text-mountain-meadow max-h-5"
        >
          {{ body }}
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
          {{ `${$t("RecentTransactions.fee")} ${transaction?.chargedTxFee}` }}
        </div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { Transaction } from "../../domain/Transaction";
import { defineComponent, PropType, ref } from "vue";
import { RouterLink } from "vue-router";
import Identicon from "./Identicon.vue";
import { useStore } from "../../store";
import moment from "moment";
import { useIntervalFn } from "@vueuse/core";

export default defineComponent({
  name: "Transaction",
  components: { Identicon },
  props: {
    transaction: Object as PropType<Transaction>
  },
  setup(props) {
    const store = useStore();
    const title = props.transaction?.name;
    const body = props.transaction?.transactionHash;
    const accountId = store.accountId;
    const timeAgo = ref("...");

    useIntervalFn(() => {
      if (props.transaction?.consensusTimestamp)
      timeAgo.value = moment(new Date(props.transaction?.consensusTimestamp)).fromNow();
    }, 1000)

    return {
      title,
      body,
      accountId,
      timeAgo
    }
  }
});
</script>
