<template>
  <div class="mt-5 mb-5 text-base text-black-out dark:text-white">
    {{ $t("InterfaceTotalBalance.totalvalue") }}
  </div>
  <div class="flex-col items-center text-center mb-4">
    <div class="flex mb-4">
      <Image
        class="h-12 mr-7 md:mr-5 md:h-16"
        :light="wallet"
        :dark="wallet"
        alt="wallet logo"
      />

      <div
        v-if="balanceInUsd"
        class="flex justify-center text-5xl font-semibold leading-10  md:text-6xl text-mountain-meadow"
      >
        <span class="self-start text-2xl">$</span>{{ state.balanceInUsd ?? balanceInUsd }}
      </div>
    </div>

    <RefreshButton
      class="m-auto"
      @refresh="refreshBalance"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";

import { useStore } from "../../store";
import Image from "../base/Image.vue";
import wallet from "../../assets/img_wallet.svg";

import RefreshButton from "./RefreshBalance.vue";

export default defineComponent({
  name: "TotalBalance",
  components: {
    Image,
    RefreshButton
  },
  setup() {
    const store = useStore();

    const balanceInUsd = computed(() => {
      if (store.hbarPriceUsd == null) return null;
      if (store.balance == null) return null;

      const balanceInUsd = store.balance.hbars.times(store.hbarPriceUsd);

      return balanceInUsd.toFormat(2, {
        decimalSeparator: ".",
        groupSeparator: ",",
        groupSize: 3,
      });
    });


    const state = reactive({
      balanceInUsd: balanceInUsd.value as string | null
    });

    function refreshBalance(e: { balance: string }): void {
      state.balanceInUsd = e.balance;
    }

    return {
      wallet,
      balanceInUsd,
      refreshBalance,
      state
    };
  },
});
</script>
