<template>
  <div class="relative">
    <Headline
      :title="$t('InterfaceHistory.header')"
      class="pb-20 lg:pb-8 mb-5"
    />

    <div
      class="
                absolute
                top-14
                lg:right-0
                lg:top-2
                w-64
                flex
                justify-around
                items-end
                text-andrea-blue
                font-medium
            "
    >
      <span
        class="py-1 px-4 rounded cursor-pointer bg-transparent transition duration-300 ease-in-out"
        :class="{
          'bg-andrea-blue text-white': state.filter == 'all'
        }"
        @click="changeFilter('all')"
      >{{
        $t("InterfaceHistory.button.all")
      }}</span>

      <span
        class="py-1 px-4 rounded cursor-pointer bg-transparent transition duration-300 ease-in-out"
        :class="{
          'bg-andrea-blue text-white': state.filter == 'sent'
        }"
        @click="changeFilter('sent')"
      >{{
        $t("InterfaceHistory.button.sent")
      }}</span>

      <span
        class="py-1 px-4 rounded cursor-pointer bg-transparent transition duration-300 ease-in-out"
        :class="{
          'bg-andrea-blue text-white': state.filter == 'received'
        }"
        @click="changeFilter('received')"
      >{{
        $t("InterfaceHistory.button.received")
      }}</span>
    </div>
  </div>

  <div class="overflow-y-auto">
    <Transactions
      filter="sent"
      class="lg:mx-8"
      :class="{
        'invisible h-0': state.filter != 'sent'
      }"  
      pageSize="10"
    />

    <Transactions
      filter="received"
      class="lg:mx-8"
      :class="{
        'invisible h-0': state.filter != 'received'
      }"
      pageSize="10"
    />

    <Transactions
      filter="all"
      class="lg:mx-8"
      :class="{
        'invisible h-0': state.filter != 'all'
      }"
      pageSize="10"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

import Headline from "../../components/interface/Headline.vue";
import Transactions from "../../components/interface/Transactions.vue";

export default defineComponent({
  name: "History",
  components: {
    Headline,
    Transactions,
  },

  setup(){

    const state = reactive({
      filter: "all"
    });

    function changeFilter(filter: string){
      state.filter = filter;
      console.log(`From History: ${state.filter}`);
    }
    
    return {
      state,
      changeFilter
    }
  }
});
</script>
