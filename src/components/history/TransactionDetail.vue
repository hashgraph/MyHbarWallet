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
          v-for="(transfer, i) in transferList"
          :key="buildKey(transfer.accountId?.toString(), i)"
          class="grid grid-flow-row grid-cols-2"
        >
          <div class="text-andrea-blue">
            {{ transfer?.accountId }}
          </div>
          <div class="dark:text-silver-polish">
            {{ formatAmount(Math.abs(transfer?.amount)) }}
          </div>
        </div>
        <!-- Spacer to make right/left divs the same height -->
        <div
          v-for="transfer, i in recipientList"
          :key="i"
          class="text-white"
        >
          <div v-if="i < recipientList.length - 1">
            <br>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center self-center mt-12 mb-10">
      <img
        class="h-3 w-12"
        src="../../assets/long_arrow.svg"
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
          v-for="(transfer, i) in recipientList"
          :key="buildKey(transfer.accountId?.toString(), i)"
          class="grid grid-flow-row grid-cols-2"
        >
          <div class="text-andrea-blue">
            {{ transfer.accountId?.toString() }}
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
import BigNumber from "bignumber.js";
import { defineComponent, PropType, computed } from "vue";

import { Transfer } from "../../domain/Transaction";

export default defineComponent({
  name: "TransactionDetail",
  props: {
    transfers: { type: Array as PropType<Transfer[]>, required: true }
  },
  setup(props) {
    const transferList = computed(()=> {
      return props.transfers.filter( (transfer: Transfer) => {
        const amount = new BigNumber(transfer?.amount ?? 0)
        if(amount.isLessThan(0)) return transfer;  
      });
    });

    const recipientList = computed(()=> {
      return props.transfers.filter( (transfer: Transfer) => {
        const amount = new BigNumber(transfer?.amount ?? 0);
        if(amount.isGreaterThan(0)) return transfer;
      });
    });

    function buildKey(id: string | undefined, index: number | string): string {
      return `${id}:${index}`;
    }

    function formatAmount(value: number): string {
      return `${parseFloat((value/Math.pow(10, 8)).toFixed(8))}ℏ`;
    }
    

    return { 
      transferList, 
      recipientList, 
      buildKey,
      formatAmount
      };
  },
});
</script>
