<template>
  <div class="mt-5 mb-5 text-base text-black-out dark:text-white">
    {{ $t("InterfaceTotalBalance.totalvalue") }}
  </div>

  <div class="flex items-center justify-center mb-4">
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
      <span class="self-start text-2xl">$</span>
      <span>{{ balanceInUsd }}</span>
    </div>

    <RefreshBalance
      class="ml-4"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import { useStore } from "../../store";
import Image from "../base/Image.vue";
import wallet from "../../assets/img_wallet.svg";

import RefreshBalance from "./RefreshBalance.vue";

export default defineComponent({
  name: "TotalBalance",
  components: {
    Image,
    RefreshBalance
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

    return {
      wallet,
      balanceInUsd,
    };
  },
});
</script>
