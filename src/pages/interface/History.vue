<template>
  <div class="relative">
    <Headline
      :title="$t('InterfaceHistory.header')"
      class="pb-20 lg:pb-8 mb-5"
    />

    <div
      class="flex flex-wrap items-start w-full"
    >
      <div
        v-for="option in state.options"
        :key="option"
      >
        <FilterButton
          :filter="option"
          :active="state.filter === option"
          @changeFilter="changeFilter"
        >
          {{ $t(`InterfaceHistory.button.${option}`) }}
        </FilterButton>
      </div>
    </div>
  </div>

  <div class="overflow-y-auto">
    <div
      v-for="option in state.options"
      :key="option"
    >
      <Transactions
        :filter="option"
        class="lg:mx-8"
        :class="{
          'invisible h-0': state.filter !== option
        }"  
        page-size="10"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

import Headline from "../../components/interface/Headline.vue";
import Transactions from "../../components/interface/Transactions.vue";
import FilterButton from "../../components/interface/FilterButton.vue";

export default defineComponent({
  name: "History",
  components: {
    Headline,
    Transactions,
    FilterButton
  },

  setup(){

    const state = reactive({
      filter: "all",
      options: ["all", "sent", "received", "tokens", "account"]
    });

    function changeFilter(e: { filter: string } ): void{
      state.filter = e.filter;
    }
    
    return {
      state,
      changeFilter
    }
  }
});
</script>
