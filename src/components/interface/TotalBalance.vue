<template>
  <div class="text-base text-black-out dark:text-white mt-5 mb-5">
    {{ $t("InterfaceTotalBalance.totalvalue") }}
  </div>
  <div class="flex items-center">
    <Image
      class="h-12 mr-7 md:mr-5 md:h-16"
      :light="wallet"
      :dark="wallet"
      alt="wallet logo"
    />

    <div
      v-if="balanceInUsd"
      class="
        font-semibold
        text-5xl
        md:text-6xl
        leading-10
        text-mountain-meadow
        justify-center
        flex
      "
    >
      <span class="text-2xl self-start">$</span>{{ balanceInUsd }}
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "../../store";
import Image from "../base/Image.vue";
import wallet from "../../assets/img_wallet.svg";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "TotalBalance",
  components: {
    Image,
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
