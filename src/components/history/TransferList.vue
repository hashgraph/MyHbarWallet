<template>
  <div class="md:flex w-full text-center items-start mt-8">
    <div class="m-auto">
      <div class="text-left text-squant dark:text-white">
        {{ $t("InterfaceTransactionDetails.sender") }}
      </div>

      <div
        class="text-left min-w-[300px] sm:w-96 m-4 p-5 border rounded-lg bg-first-snow dark:bg-ruined-smores dark:border-argent"
      >
        <div
          v-for="(transfer, i) in sentList"
          :key="buildKey(transfer.account?.toString(), i)"
          class="grid grid-flow-row grid-cols-2"
        >
          <div class="text-andrea-blue">
            {{ transfer?.account }}
          </div>
          <div class="dark:text-silver-polish">
            {{ formatAmount(Math.abs(transfer?.amount)) }}
          </div>
        </div>

        <div
          v-for="transfer, i in receivedList"
          :key="i"
          class="text-white"
        >
          <div v-if="i < receivedList.length - 1">
            <br>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center self-center mt-12 mb-10">
      <img
        class="h-3 w-12"
        :src="longArrow"
        alt="right arrow"
      >
    </div>

    <div class="m-auto">
      <div class="text-left text-squant dark:text-white">
        {{ $t("InterfaceTransactionDetails.recipients") }}
      </div>

      <div
        class="text-left min-w-[300px] sm:w-96 m-4 p-5 border rounded-lg bg-first-snow dark:bg-ruined-smores dark:border-argent"
      >
        <div
          v-for="(transfer, i) in receivedList"
          :key="buildKey(transfer.account?.toString(), i)"
          class="grid grid-flow-row grid-cols-2"
        >
          <div class="text-andrea-blue">
            {{ transfer.account?.toString() }}
          </div>
          <div class="dark:text-silver-polish">
            {{ formatAmount(transfer?.amount) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";

import { Transfer } from "../../domain/Transaction";
import longArrow from "../../assets/long_arrow.svg";

export default defineComponent({
  name: "TransferList",
  props: {
    transfers: { type: Array as PropType<Transfer[]>, required: true }
  },
  setup(props) {
    const sentList = computed(() => {
      return props.transfers.filter((transfer: Transfer) => {
        if (transfer.amount < 0) return transfer;
      });
    });

    const receivedList = computed(() => {
      return props.transfers.filter( (transfer: Transfer) => {
        if (transfer.amount > 0) return transfer;
      });
    });

    function buildKey(id: string | undefined, index: number | string): string {
      return `${id}:${index}`;
    }

    function formatAmount(value: number): string {
      return `${parseFloat((value/Math.pow(10, 8)).toFixed(8))}ℏ`;
    }
    

    return { 
      sentList, 
      receivedList, 
      buildKey,
      formatAmount,
      longArrow
      };
  },
});
</script>
