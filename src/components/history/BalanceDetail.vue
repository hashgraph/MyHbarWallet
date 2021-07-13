<template>
  <div class="w-1/2 pl-5 mb-5 leading-5">
    <div
      class="h-auto p-5 mt-3 border rounded-lg  bg-first-snow w-96 dark:bg-ruined-smores dark:border-argent"
    >
      <div class="flex mb-2">
        <div
          v-for="(transfer, index) in TransferList"
          :key="index"
          class="text-andrea-blue"
        >
          {{ transfer.account }}
        </div>

        <div
          v-for="(transfer, index) in TransferList"
          :key="index"
          class="ml-auto dark:text-argent"
        >
          {{ transfer.balance }}
          HBAR
        </div>
      </div>

      <div class="flex">
        <div
          v-for="(transfer, index) in TransferList"
          :key="index"
          class="text-andrea-blue"
        >
          {{ transfer.account }}
        </div>

        <div
          v-for="(transfer, index) in TransferList"
          :key="index"
          class="ml-auto dark:text-argent"
        >
          {{}}
          {{ transfer.balance - transfer.transaction }}
          HBAR
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "BalanceDetail",
  setup() {
    const TransferList = ref([
      {
        account: "0.0.22098",
        transaction: -0.00453,
        balance: 0.00434,
      },
    ]);
    const RecieverList = ref([
      {
        account: "0.0.22098",
        transaction: 0.00367,
        balance: Number,
      },
    ]);
    console.log(TransferList.value);
    console.log(RecieverList.value);
    return { TransferList, RecieverList };
  },
});
</script>
