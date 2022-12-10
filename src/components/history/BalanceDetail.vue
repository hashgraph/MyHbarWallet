<template>
  <div class="m-4 mt-12 dark:text-white">
    {{ $t("InterfaceTransactionDetails.balance") }}
  </div>

  <div class="text-center pl-8 pr-8">
    <div
      class="min-w-[350px] m-auto h-auto p-5 mt-3 border rounded-lg bg-first-snow dark:bg-ruined-smores dark:border-argent"
    >
      <div
        v-for="(transfer) in transfers"
        :key="transfer.accountId.toString()"
        class="m-auto text-left grid grid-flow-row grid-cols-2"
      >
        <div class="text-andrea-blue">
          {{ transfer.accountId }}
        </div>
        <div class="dark:text-silver-polish">
          {{ formatAmount(transfer.balance) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { Transfer } from "../../domain/Transaction";
export default defineComponent({
  name: "BalanceDetail",
  props: { 
    transfers: { type: Array as PropType<Transfer[]>, required: true } 
  },
  setup() {
    function formatAmount(value: number): string {
      return `${parseFloat((value/Math.pow(10, 8)).toFixed(8))}ℏ`;
    }

    return {
      formatAmount
    }
  }
});
</script>
