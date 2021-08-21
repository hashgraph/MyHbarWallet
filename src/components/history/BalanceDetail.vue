<template>
  <div class="cursor-default flex w-full items-start pl-5 mb-5 leading-5 dark:text-white">
    <!-- Sender list -->
    <div
      class="w-1/2 h-full p-4 m-3 border rounded-lg bg-first-snow dark:bg-dreamless-sleep dark:border-midnight-express"
    >
      <div class="flex items-start mb-2 dark:text-white">
        <div class="w-1/2 text-left">
          {{ $t("InterfaceBalanceDetail.from") }}
        </div>
        <div class="w-1/2 text-right">
          {{ $t("InterfaceBalanceDetail.sent") }} 
        </div>
      </div>

      <div
        v-for="transfer in transferList"
        :key="transfer.accountId"
        class="flex items-start w-full"
      >
        <div class="w-1/2 text-left text-andrea-blue">
          {{ transfer.accountId }}
        </div>
        <div class="w-1/2 text-right dark:text-silver-polish">
          {{ formatAmount(Math.abs(transfer.amount)) }}
        </div>
      </div>
    </div>

    <!-- Receiver list -->
    <div
      class="w-1/2 h-full p-4 m-3 border rounded-lg bg-first-snow dark:bg-dreamless-sleep dark:border-midnight-express"
    >
      <div class="flex items-start mb-2 dark:text-white">
        <div class="w-1/2 text-left">
          {{ $t("InterfaceBalanceDetail.to") }}
        </div>
        <div class="w-1/2 text-right">
          {{ $t("InterfaceBalanceDetail.received") }} 
        </div>
      </div>
      <div
        v-for="transfer in receiverList"
        :key="transfer.accountId"
        class="flex items-start w-full"
      >
        <div class="w-1/2 text-left text-andrea-blue">
          {{ transfer.accountId }}
        </div>
        <div class="w-1/2 text-right dark:text-silver-polish">
          {{ formatAmount(transfer.amount) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import type { Transfer } from "@hashgraph/sdk";

import { useStore } from "../../store";

export default defineComponent({
  name: "BalanceDetail",
  props: {
    transfers: { type: [] as Transfer[], required: true },
  },
  setup(props) {

    const store = useStore();

    const transferList = computed(() => {
      let transfers = [];
      for (let i in props.transfers) {
        if (props.transfers[i].accountId === store.accountId?.toString()) transfers.push(props.transfers[i])
      }
      return transfers;
    });

    const receiverList = computed(() => {
      let transfers = [];
      for (let i in props.transfers) {
        if (props.transfers[i].accountId !== store.accountId?.toString()) transfers.push(props.transfers[i])
      }
      return transfers;
    });

    function formatAmount(value: number): string {
      return `${parseFloat((value / 100000000).toFixed(8))}ℏ`;
    }

    return { transferList, receiverList, formatAmount };
  },
});
</script>
