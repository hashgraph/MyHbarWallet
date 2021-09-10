<template>
  <div
    class="p-10 items-center justify-center dark:text-white relative cursor-pointer"
    @click="goToKabuto"
  >
    <div
      class="rounded-lg p-8 bg-cold-shoulder dark:bg-midnight-express z-40 m-auto text-center translate-y-1/2"
    >
      <img
        src="../../assets/kabuto-logo.svg"
        class="m-auto"
      >
      {{ $t("InterfaceHistory.kabuto") }}
    </div>
    <div class="-mt-40 -z-10">
      <Transaction
        title="Transfer"
        account="0.0.3"
        time-ago=""
        transaction="1000000ℏ"
        fee="1ℏ"
        class="blur-[4px] z-10"
      />
      <Transaction
        title="Transfer"
        account="0.0.3"
        time-ago=""
        transaction="1000000ℏ"
        fee="1ℏ"
        class="blur-[4px] z-10"
      />
      <Transaction
        title="Transfer"
        account="0.0.3"
        time-ago=""
        transaction="1000000ℏ"
        fee="1ℏ"
        class="blur-[4px] z-10"
      />
      <Transaction
        title="Transfer"
        account="0.0.3"
        time-ago=""
        transaction="1000000ℏ"
        fee="1ℏ"
        class="blur-[4px] z-10"
      />
      <Transaction
        title="Transfer"
        account="0.0.3"
        time-ago=""
        transaction="1000000ℏ"
        fee="1ℏ"
        class="blur-[4px] z-10"
      />
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue"

import { useStore } from "../../store";

import Transaction from "./Transaction.vue";


export default defineComponent({
    name: "KabutoLink",
    components: {
        Transaction
    },
    setup(){
        const store = useStore();
        function goToKabuto(): void {
            window.open(`https://explorer.kabuto.sh/mainnet/id/${store.accountId?.toString()}`);
        }

        return {
            goToKabuto
        }
    }
});
</script>