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

    <Hint text="Further transaction history support coming soon!" />

    <KabutoLink v-if="state.showKabuto" />
    <div
      v-for="(transaction, i) in paginated"
      :key="i"
    >
      <Transaction
        :title="formatType(transaction.type.toString())"
        :account="transaction.operatorAccountId.toString()"
        :time-ago="timeElapsed(transaction.consensusAt)"
        :fee="formatAmount(transaction.fee)"
        :transaction="sumTransfers(transaction.transfers)"
      />
    </div>

    <!-- TODO: Replace with HeroIcons, when available -->
    <div
      v-if="state.last > 1"
      class="flex dark:text-silver-polish w-full items-center m-auto mt-6"
    >
      <div class="m-auto flex text-center items-center float-left">
        <!-- If there are only two pages, no need to be able to jump to first and last pages -->
        <div
          v-if="state.last > 2"
          class="m-4 cursor-pointer"
          @click="first"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </div>

        <div
          class="m-4 cursor-pointer"
          @click="previous"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>

        <div class="m-4">
          {{ state.current + 1 }}
        </div>

        <div
          class="m-4 cursor-pointer"
          @click="next"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>

        <!-- If there are only two pages, no need to be able to jump to first and last pages -->
        <div
          v-if="state.last > 2"
          class="m-4 cursor-pointer"
          @click="last"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from "vue";
import { BigNumber } from "bignumber.js";
import { AccountId, Timestamp } from "@hashgraph/sdk";

import { Transfer } from "../../pages/interface/Send.vue";
import { useStore } from "../../store";
import { CryptoTransfer } from "../../domain/CryptoTransfer";

import Hint from "./Hint.vue";
import KabutoLink from "./KabutoLink.vue";
import Transaction from "./Transaction.vue";

//TODO: Replace with Transfer in domain from Send PR after merge, Transfer will be in domain
interface Transfer {
  to?: AccountId;
  asset: string; // "HBAR" or token ID (string)
  amount?: BigNumber;
  usd?: string;
}

export default defineComponent({
  name: "Transactions",
  components: { 
    Hint, 
    KabutoLink, 
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

    function isSender(txr: CryptoTransfer): boolean {
      return txr.id.toString().split("@")[0] === accountId.value?.toString(); 
    }
    const filtered = computed(() => {
      if (props.filter === "all") return state.latestTransactions;
      const transactions = [] as CryptoTransfer[];

      for(let i in state.latestTransactions) {
        if(props.filter === "sent" && state.latestTransactions[i].type.includes("TRANSFER") && isSender(state.latestTransactions[i])) transactions.push(state.latestTransactions[i]);
        else if (props.filter === "received" && state.latestTransactions[i].type.includes("TRANSFER") && !isSender(state.latestTransactions[i])) transactions.push(state.latestTransactions[i]);
        else if(props.filter === "tokens" && state.latestTransactions[i].type.includes("TOKEN")) transactions.push(state.latestTransactions[i]);
        else if(props.filter === "account" && state.latestTransactions[i].type.includes("ACCOUNT")) transactions.push(state.latestTransactions[i]);
      }

      return transactions;
    });

    const paginated = computed(() => {
      return filtered.value?.slice(state.current * state.pageSize, (state.current * state.pageSize) + state.pageSize) as CryptoTransfer[];
    });

    const state = reactive({
      latestTransactions: [] as CryptoTransfer[],
      paginated: [] as CryptoTransfer[],
      pageSize: Number(props.pageSize),
      current: 0,
      previous: 0,
      next: 0,
      first: 0,
      last: 0,
      showKabuto: false
    });

    onMounted(async () => {
      // TODO: Fix API call when Kabuto V2 is operational
      try {
        state.latestTransactions = await getLatestTransactions() ?? [] as CryptoTransfer[];
        const len = filtered.value.length;
        if (state.pageSize < len) {
          state.current = 0,
          state.next = 1,
          state.previous = -1;
          state.last = Math.ceil(len / state.pageSize);
        }
      } catch {
        state.showKabuto = true;
      }
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

    async function getLatestTransactions(): Promise<CryptoTransfer[] | undefined> {
      return await store.client?.getAccountRecords();
    }

    //Time elapsed since consensus
    function timeElapsed(time: Timestamp): string {
      const current: Date = new Date();
      const consensus: Date = new Date(time.toString());
      const elapsed = Math.abs(current.getTime() - consensus.getTime());

      const days = Math.floor(elapsed / (24 * 60 * 60 * 1000));
      const hours = Math.floor((elapsed % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      const minutes = Math.floor((elapsed % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((elapsed % (60 * 1000)) / 1000);

      return `${formatTime(days, "d")}${formatTime(hours, "h")}${formatTime(minutes, "m")}${formatTime(seconds, "s")}`;
    }

    //Helper function for timeElapsed
    function formatTime(time: number, unit: string): string {
      if (time > 0) return `${time}${unit} `;
      return '';
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
      let words = type.split("_");
      let formatted = "";
      for (let i in words) {
        formatted += words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase() + " ";
      }
      return formatted.trim();
    }

    function goToKabuto(): void{
      window.location.href = "https://explorer.kabuto.sh/mainnet";
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
      goToKabuto
    };
  },
});
</script>
