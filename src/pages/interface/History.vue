<template>
  <div class="relative">
    <Headline :title="$t('InterfaceHistory.header')" class="pb-20 lg:pb-8 mb-5" />

    <div class="flex flex-wrap items-start w-full mb-2">
      <div v-for="option in state.options" :key="option">
        <TransactionFilterButton 
          :filter="option" 
          :active="state.filter == option" 
          @change-filter="changeFilter">
          {{ $t(`InterfaceHistory.button.${option}`) }}
        </TransactionFilterButton>
      </div>
    </div>
  </div>

  <div class="overflow-y-auto">
    <Transactions :filter="state.filter" class="lg:mx-8" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

import Headline from "../../components/interface/Headline.vue";
import Transactions from "../../components/interface/Transactions.vue";
import TransactionFilterButton from "../../components/interface/TransactionFilterButton.vue";

export enum TransactionFilter {
  ALL = "all", 
  SENT = "sent",
  RECEIVED = "received",
  TOKENS = "tokens",
  ACCOUNTS = "accounts"
}

export const TransactionFilterOptions = Object.keys(TransactionFilter).map(
  (key) => TransactionFilter[key as keyof typeof TransactionFilter])

export default defineComponent({
  name: "History",
  components: {
    Headline,
    Transactions,
    TransactionFilterButton 
  },
  setup() {
    const state = reactive({
      filter: TransactionFilter.ALL,
      options: TransactionFilterOptions,
    });

    function changeFilter(e: { filter: TransactionFilter }) {
      state.filter = e.filter;
    }

    return {
      state,
      changeFilter
    }
  }
});
</script>
