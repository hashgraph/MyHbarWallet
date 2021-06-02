<template>
  <div class="flex flex-col">
    <div v-for="(transaction, index) in TransferList" :key="index">
      <div
        v-if="transaction.transaction < 0"
        class="text-squant pl-5 dark:text-white"
      >
        Sender
      </div>

      <div v-else class="text-squant dark:text-white pl-5">Reciever</div>
    </div>

    <div class="w-1/2 leading-5 pl-5 mb-5">
      <div
        class="
          mt-3
          rounded-lg
          bg-first-snow
          h-auto
          w-96
          p-5
          dark:bg-ruined-smores
          dark:border-argent
          border
        "
      >
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
            {{ transfer.transaction }} HBAR
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "TransactionDetail",
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

    return { TransferList, RecieverList };
  },
});
</script>
