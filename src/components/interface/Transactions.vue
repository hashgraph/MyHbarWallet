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
      v-for="(transaction, i) in paginated"
      :key="i"
    >
      <Transaction
        :tx="transaction"
      />
    </div>

    <HashScanLink />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from "vue";
import { BigNumber } from "bignumber.js";

import { useStore } from "../../store";

import Hint from "./Hint.vue";
import Transaction from "./Transaction.vue";
import HashScanLink from "./HashScanLink.vue";
import { Transfer } from "src/domain/Transfer";

export default defineComponent({
  name: "Transactions",
  components: {
    Hint,
    HashScanLink,
    Transaction
  },
  props: {
    hideHeader: { type: Boolean, default: false },
    pageSize: { type: String, default: "25", required: false },
    filter: { type: String, default: "all", required: false }
  },
  setup(props) {
    const store = useStore();
    const accountId = computed(() => store.accountId);

    onMounted(async () => {
        state.latestTransactions = await getLatestTransactions();
    });

    function previous(): void {
      if (state.current == 0) return;
      else if (state.previous == 0) {
        state.current -= 1;
        state.previous = -1;
        state.next -= 1;
      } else {
        state.current -= 1;
        state.previous -= 1;
        state.next -= 1;
      }
    }

    function next(): void {
      if (state.current == state.last - 1) return;
      else if (state.next == state.last) {
        state.current += 1;
        state.previous += 1;
        state.next = state.last;
      } else {
        state.current += 1;
        state.previous += 1;
        state.next += 1;
      }
    }

    function first(): void {
      state.current = 0;
      state.previous = -1;
      state.next = 1;
    }

    function last(): void {
      state.current = state.last - 1;
      state.previous = state.current - 1;
      state.next = state.last;
    }

    async function getLatestTransactions(): Promise<Transfer[] | undefined> {
      return await store.client?.getAccountRecords();
    }

    function sumTransfers(transfers: Transfer[]): string {
      let sum = new BigNumber(0);

      for (const transfer of transfers) {
        const amount = new BigNumber(transfer.amount ?? 0);
        if(amount.isGreaterThan(0)) sum = sum.plus(amount);
      }
      
      return formatAmount(sum.toNumber());
    }

    //Format value to print in Hbar
    function formatAmount(value: number): string {
      return `${parseFloat((value / Math.pow(10, 8)).toFixed(8))}ℏ`;
    }

    function formatType(type: string): string {
      const words = type.split("_");
      let formatted = "";

      for (const i in words) {
        formatted += words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase() + " ";
      }

      return formatted.trim();
    }

    return {
      state,
      paginated,
      timeElapsed,
      sumTransfers,
      formatAmount,
      formatType,
      previous,
      next,
      first,
      last,
    };
  },
});
</script>
