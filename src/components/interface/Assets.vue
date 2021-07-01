<template>
<<<<<<< HEAD
  <div class="md:flex-grow overflow-x-auto">
    <div v-if="!hideHeader" class="flex justify-between mb-5">
      <div
        class="font-semibold text-xl leading-6 text-black-out dark:text-white "
=======
  <div class="md:flex-grow">
    <div v-if="!hideHeader" class="flex justify-between mb-5">
      <div
        class="font-semibold text-xl leading-6 text-black-out dark:text-white"
>>>>>>> 1071461646dafa61a6e27f9d6450406957b0577a
      >
        {{ $t("InterfaceAssets.header") }}
      </div>
      <router-link
        :to="{ name: 'assets' }"
        class="font-medium leading-5 text-bright-navy-blue"
        >{{ $t("RouterLink.viewall") }}
      </router-link>
    </div>

    <Asset
      v-if="hbarBalance"
      :amount="hbarBalance.toFormat(8)"
      :img="isDark ? hederaDark : hederaLight"
      :total="hbarBalanceInUsd"
      :value="
        hbarPrice
          ? $t('InterfaceAsset.value', {
              value: hbarPrice,
            })
          : null
      "
      name="HBAR"
    />

    <template v-if="tokenBalances">
      <Asset
        v-for="[tokenId, tokenBal] in tokenBalances"
        :key="tokenId.toString()"
        :amount="tokenBal.balance.toString()"
        :img="token"
        :name="tokenId"
      />
    </template>
  </div>
</template>

<script lang="ts">
import BigNumber from "bignumber.js";
import { computed, defineComponent } from "vue";
import hederaLight from "../../assets/hedera-hashgraph-logo.svg";
import hederaDark from "../../assets/dark/hedera-hashgraph-logo-dark.svg";
import token from "../../assets/img_token_gen.svg";
import Asset from "./Asset.vue";
import { useStore } from "../../store";
import { usePreferredDark } from "@vueuse/core";

export default defineComponent({
  name: "Assets",
  components: { Asset },
  props: {
    hideHeader: { type: Boolean, default: false },
    limitTokens: { type: Number, default: null },
  },
  setup(props) {
    const store = useStore();
    const isDark = usePreferredDark();

    const hbarBalance = computed(() => store.balance?.hbars);

    const tokenBalances = computed(() => {
      if (store.balance == null) return null;

      // FIXME: sort the token balances by balance amount
      return Array.from(store.balance?.tokens).slice(
        0,
        props.limitTokens ?? undefined
      );
    });

    const hbarPrice = computed(() =>
      (store.hbarPriceUsd as BigNumber)?.toFormat(3, {
        prefix: "$",
        decimalSeparator: ".",
        groupSeparator: ",",
        groupSize: 3,
      })
    );

    const hbarBalanceInUsd = computed(() => {
      if (store.hbarPriceUsd == null) return null;
      if (store.balance == null) return null;

      const balanceInUsd = store.balance.hbars.times(store.hbarPriceUsd);

      return balanceInUsd.toFormat(2, {
        prefix: "$",
        decimalSeparator: ".",
        groupSeparator: ",",
        groupSize: 3,
      });
    });

    return {
      hederaLight,
      hederaDark,
      token,
      isDark,
      hbarBalance,
      tokenBalances,
      hbarPrice,
      hbarBalanceInUsd,
    };
  },
});
</script>
