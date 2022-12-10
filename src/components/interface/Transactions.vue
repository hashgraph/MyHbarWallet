<template>
  <div class="relative md:flex-grow overflow-y-auto">
    <div
      v-if="!hideHeader"
      class="flex justify-between pb-5"
    >
      <div
        class="flex justify-between text-xl font-semibold leading-6 text-black-out dark:text-white"
      >
        {{ $t("Transactions.Recent") }}
      </div>
    </div>

    <div
      v-for="(transaction, i) in transactions"
      :key="i"
    >
      <TransactionVue
        :tx="transaction"
      />
    </div>

    <HashScanLink />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import { useStore } from "../../store";
import { Transaction, formatAmount, formatType, sumTransfers } from "../../domain/Transaction";

import TransactionVue from "./Transaction.vue";
import HashScanLink from "./HashScanLink.vue";

export default defineComponent({
  name: "Transactions",
  components: {
    HashScanLink,
    TransactionVue
  },
  props: {
    hideHeader: { type: Boolean, default: false },
    filter: { type: String, default: "all", required: false }
  },
  setup() {
    const store = useStore();
    const transactions = ref<Transaction[] | null | undefined>(null);

    onMounted(async () => {
        transactions.value = await getLatestTransactions();
    });

    async function getLatestTransactions(): Promise<Transaction[] | undefined> {
      return await store.client?.getAccountRecords();
    }

    return {
      transactions,
      sumTransfers,
      formatAmount,
      formatType
    };
  },
});
</script>
