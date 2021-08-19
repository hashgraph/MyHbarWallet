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

      <!-- <router-link
        :to="{ name: 'history' }"
        class="font-medium leading-5 text-bright-navy-blue"
        >View All</router-link
      > -->
    </div>

    <Hint text="Further transaction history support coming soon!" />

    <div
      v-for="transaction in paginated"
      :key="transaction.id"
    >
      <Transaction
        :title="formatType(transaction.type.toString())"
        :account="transaction.operatorAccountId.toString()"
        :time-ago="timeElapsed(transaction.consensusAt)"
        :transaction="sumTransfers(transaction.transfers)"
        :fee="formatAmount(transaction.fee)"
      />
    </div>

    <InputError
      v-if="state.error != ''"
    >
      {{
        state.error
      }}
    </InputError>
  
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

import { useStore } from "../../store";
import InputError from "../base/InputError.vue";


import Transaction from "./Transaction.vue";
import Hint from "./Hint.vue";

export default defineComponent({
  name: "Transactions",
  components: { Transaction, Hint, InputError },
  props: {
    hideHeader: { type: Boolean, default: false },
    pageSize: { type: String, default: "25", required: false },
    filter: { type: String, default: "all", required: false }
  },
  setup(props) {
    const store = useStore();
    const accountId = computed(() => store.accountId);

    const paginated = computed(()=> {
      return filtered.value?.slice(state.current * state.pageSize, (state.current * state.pageSize) + state.pageSize);
    });

    const filtered = computed(()=>{
      if(props.filter == "all") return state.latestTransactions;
      let filtered = [];
      for(let i in state.latestTransactions){
        if(props.filter == "sent" || props.filter == "received"){
          if(state.latestTransactions[i].type === "TRANSFER"){
            if(props.filter == "sent" && state.latestTransactions[i].id.split("@")[0] === accountId.value?.toString()) filtered.push(state.latestTransactions[i]);
            if(props.filter == "received" && state.latestTransactions[i].id.split("@")[0] !== accountId.value?.toString()) filtered.push(state.latestTransactions[i]);
          }
        } else if (props.filter == "tokens"){
          if(state.latestTransactions[i].type.includes("TOKEN")) filtered.push(state.latestTransactions[i]);
        } else if (props.filter == "account"){
          if(state.latestTransactions[i].type.includes("ACCOUNT")) filtered.push(state.latestTransactions[i]);
        }
      }
      return filtered;
    });

    const state = reactive({
      latestTransactions: [],
      paginated: [],
      pageSize: Number(props.pageSize),
      current: 0,
      previous: 0,
      next: 0,
      first: 0,
      last: 0,
      error: ""
    });

    onMounted(async ()=>{
      try{
        state.latestTransactions = await getLatestTransactions();
          if(state.pageSize < filtered.value?.length){
            state.current = 0,
            state.next = 1,
            state.previous = -1;
            state.last = Math.ceil(filtered.value?.length/ state.pageSize);
          }
      } catch(error){
        state.error = await store.errorMessage(error);
      }
    });

    function previous(): void{
      if(state.current == 0) return;
      else if(state.previous == 0){
        state.current -= 1;
        state.previous = -1;
        state.next -= 1;
      } else {
        state.current -= 1;
        state.previous -=1;
        state.next -= 1;
      }
    }

    function next(): void{
      if(state.current == state.last - 1) return;
      else if(state.next == state.last){
        state.current += 1;
        state.previous += 1;
        state.next = state.last;
      } else {
        state.current += 1;
        state.previous += 1;
        state.next += 1;
      }
    }

    function first(): void{
      state.current = 0;
      state.previous = -1;
      state.next = 1;
    }

    function last(): void{
      state.current = state.last - 1;
      state.previous = state.current - 1;
      state.next = state.last;
    }

    async function getLatestTransactions(): Promise<[] | undefined>{
      return await store.client?.getAccountRecords();
    }

    //Time elapsed since consensus
    function timeElapsed(date: string): string{
      const current: Date = new Date(Date.now());
      const consensus: Date = new Date(date);
      const elapsed = Math.abs(current-consensus);

      const days = Math.floor(elapsed / (24 * 60 * 60 * 1000));
      const hours = Math.floor((elapsed % (24 * 60 * 60 * 1000))/(60 * 60 * 1000));
      const minutes = Math.floor((elapsed % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor( (elapsed % (60 * 1000))/1000);      

      return `${formatTime(days, "d")}${formatTime(hours, "h")}${formatTime(minutes, "m")}${formatTime(seconds, "s")}`;
    }

    //Helper function for timeElapsed
    function formatTime(time: number, unit: string): string{
      if(time > 0) return `${time}${unit} `;
      return '';
    }
  
    function sumTransfers(transfers: []): string{
      let sum = 0;
      for(let i in transfers){
        if(transfers[i].amount > 0) sum += transfers[i].amount;
      }
      return formatAmount(sum);
    }

    //Format value to print in Hbar
    function formatAmount(value: number): string{
      return `${parseFloat((value/100000000).toFixed(8))}ℏ`;
    }

    function formatType(type: string): string{
      let words = type.split("_");
      let formatted = "";
      for(let i in words){
        formatted += words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase() + " ";
      }
      return formatted.trim();
    }

    return {
      state,
      timeElapsed,
      sumTransfers,
      formatAmount,
      formatType,
      previous,
      next,
      paginated,
      first,
      last
    };
  },
});
</script>
