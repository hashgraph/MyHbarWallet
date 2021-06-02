<template>
  <div class="md:flex-grow relative">
    <div v-if="!hideHeader" class="flex justify-between pb-5">
      <div
        class="
          flex
          justify-between
          font-semibold
          text-xl
          leading-6
          text-black-out
          dark:text-white
        "
      >
        Recent Transactions
      </div>

      <!-- <router-link
        :to="{ name: 'history' }"
        class="font-medium leading-5 text-bright-navy-blue"
        >View All</router-link
      > -->
    </div>

    <div class="filter blur-sm">
      <Transaction
        title="Transfer"
        account="0.0.5678"
        time-ago="14 secs ago"
        transaction="+0.01 HBAR"
        fee="-0.0025"
      />

      <Transaction
        title="Transfer"
        account="0.0.96352"
        time-ago="14 secs ago"
        transaction="-0.01 HBAR "
        fee="-0.0025"
      />

      <Transaction
        title="Transfer"
        account="0.0.3462"
        time-ago="14 secs ago"
        transaction="+0.01 HBAR"
        fee="-0.0025"
      />

      <Transaction
        title="Transfer"
        account="0.0.96352"
        time-ago="14 secs ago"
        transaction="-0.01 HBAR "
        fee="-0.0025"
      />

      <Transaction
        title="Transfer"
        account="0.0.96352"
        time-ago="14 secs ago"
        transaction="-0.01 HBAR"
        fee="-0.0025"
      />

      <Transaction
        title="Transfer"
        account="0.0.3462"
        time-ago="14 secs ago"
        transaction="+0.01 HBAR"
        fee="-0.0025"
      />
    </div>

    <div
      class="
        absolute
        top-0
        left-0
        h-full
        w-full
        flex flex-col
        items-center
        justify-center
      "
    >
      <div class="text-xl font-bold dark:text-white">Coming Soon</div>
      <!-- TODO: once we have knowledge of the user's account ID and network put that in the url -->
      <div class="dark:text-white">View your recent transactions on</div>
      <a target="_blank" :href="kabutoLink" class="font-bold text-kabuto mt-2"
        ><img src="../../assets/logo_kabuto.svg"
      /></a>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Transaction from "./Transaction.vue";
import { useStore } from "../../store";

export default defineComponent({
  name: "Transactions",
  components: { Transaction },
  props: {
    hideHeader: { type: Boolean, default: false },
  },
  setup() {
    const store = useStore();
    const accountId = computed(() => store.accountId);
    const kabutoLink = computed(() => {
      switch (store.network) {
        case "mainnet":
          return `https://explorer.kabuto.sh/mainnet/id/${accountId.value}`;

        case "testnet":
          return `https://explorer.kabuto.sh/testnet/id/${accountId.value}`;

        default:
          return "";
      }
    });

    return {
      accountId,
      kabutoLink,
    };
  },
});
</script>
