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
      v-for="transaction in transactions"
      :key="transaction.transactionHash"
    >
      <TransactionVue :tx="(transaction as Transaction)" />
    </div>

    <HashScanLink />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useIntervalFn } from "@vueuse/core";

import { useStore } from "../../store";
import { Transaction } from "../../domain/Transaction";

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
    const transactions = ref<Transaction[] | undefined>([]);

    async function getAccountRecords() {
      transactions.value = await store.client?.getAccountRecords();
    }

    onMounted(async () => {
      await getAccountRecords();
    });

    useIntervalFn(async () => {
      void getAccountRecords();
    }, 3000);

    return {
      transactions
    };
  },
});
</script>
