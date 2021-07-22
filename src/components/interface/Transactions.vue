<template>
  <div class="relative md:flex-grow">
    <div
      v-if="!hideHeader"
      class="flex justify-between pb-5"
    >
      <div
        class="flex justify-between text-xl font-semibold leading-6  text-black-out dark:text-white"
      >
        {{ $t("Transactions.Recent") }}
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
      class="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full "
    >
      <div class="text-xl font-bold dark:text-white">
        {{ $t("Transactions.ComingSoon") }}
      </div>
      <!-- TODO: once we have knowledge of the user's account ID and network put that in the url -->
      <div class="dark:text-white">
        {{ $t("Transactions.ViewRecent") }}
      </div>
      <a
        target="_blank"
        :href="kabutoLink"
        class="mt-2 font-bold text-kabuto"
      ><img
        src="../../assets/logo_kabuto.svg"
      ></a>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "../../store";
import Transaction from "./Transaction.vue";
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
