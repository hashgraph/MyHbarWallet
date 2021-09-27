<template>
  <router-link
    :to=" { name: 'transaction', params: { transactionHash: hash } }"
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
          {{ truncatedTransaction }}
        </div>
      </div>

      <div class="flex justify-between">
        <div
          class="text-xs font-medium leading-4 text-squant dark:text-argent"
        >
          {{ `${account} • ${timeAgo}` }}
        </div>
        <div
          class="flex justify-end text-xs font-medium leading-4 text-squant dark:text-argent"
        >
          {{ `${$t("RecentTransactions.fee")} ${fee}` }}
        </div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import { useScreen } from "../../hooks/screen";

import Identicon from "./Identicon.vue";

export default defineComponent({
  name: "Transaction",
  components: { Identicon },
  props: {
    title: { type: String, required: true },
    account: { type: String, required: true },
    timeAgo: { type: String, required: true },
    transaction: { type: String, required: true },
    fee: { type: String, required: true },
    hash: { type: String, required: true }
  },
  setup(props) {
    const md = useScreen("md");

    const truncatedTransaction = computed(() => {
      const firstComma = props.transaction.indexOf(",");
      if (firstComma != -1) {
        if (md.value) {
          const secondComma = props.transaction.indexOf(
            ",",
            firstComma + 1
          );
          return secondComma === -1
            ? props.transaction
            : `${props.transaction.substring(0, secondComma)}, ...`;
        } else {
          const truncated = props.transaction.substring(
            0,
            firstComma
          );
          return `${truncated}, ...`;
        }
      }

      return props.transaction;
    });

    return { truncatedTransaction };
  },
});
</script>
