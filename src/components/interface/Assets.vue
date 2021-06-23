<template>
  <div class="md:flex-grow">
    <div
      v-if="!hideHeader"
      class="flex justify-between mb-5"
    >
      <div
        class="text-xl font-semibold leading-6 text-black-out dark:text-white"
      >
        {{ $t('InterfaceAssets.header') }}
      </div>
      <router-link
        :to="{ name: 'assets' }"
        class="font-medium leading-5 text-bright-navy-blue"
      >
        {{ $t('RouterLink.viewall') }}
      </router-link>
    </div>

    <Asset
      v-if="hbarBalance"
      :amount="hbarBalance.toFormat(8)"
      :img="isDark ? hederaDark : hederaLight"
      :total="hbarBalanceInUsd ?? undefined"
      :value="
        hbarPrice
          ? $t('InterfaceAsset.value', {
            value: hbarPrice,
          })
          : undefined
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
import { BigNumber } from 'bignumber.js'
import { computed, defineComponent, onMounted } from 'vue'
import { usePreferredDark } from '@vueuse/core'

import hederaLight from '../../assets/hedera-hashgraph-logo.svg'
import hederaDark from '../../assets/dark/hedera-hashgraph-logo-dark.svg'
import token from '../../assets/img_token_gen.svg'
import { useStore } from '../../store'

import Asset from './Asset.vue'

export default defineComponent({
  name: 'Assets',
  components: { Asset },
  props: {
    hideHeader: { type: Boolean, default: false },
    limitTokens: { type: Number, default: null },
  },
  setup(props) {
    const store = useStore()
    const isDark = usePreferredDark()
    const hbarBalance = computed(() => store.balance?.hbars)

    onMounted(async () => {
      // for wallets that require user interaction to fetch balances
      if (!store.wallet?.hasPrivateKey()) await store.requestAccountBalance();
    })

    const tokenBalances = computed(() => {
      if (store.balance == null) return null
      return Array.from(store.balance?.tokens).slice(
        0,
        props.limitTokens ?? undefined,
      ).sort((a, b) => {
        // decimals already applied
        const aBal = new BigNumber(a[1].balance);
        const bBal = new BigNumber(b[1].balance); 
        return aBal.isGreaterThan(bBal) ? -1 : aBal.isEqualTo(bBal) ? 0 : 1;
      });
    })

    const hbarPrice = computed(() =>
      (store.hbarPriceUsd as BigNumber)?.toFormat(3, {
        prefix: '$',
        decimalSeparator: '.',
        groupSeparator: ',',
        groupSize: 3,
      }),
    )

    const hbarBalanceInUsd = computed(() => {
      if (store.hbarPriceUsd == null) return null
      if (store.balance == null) return null

      const balanceInUsd = store.balance.hbars.times(store.hbarPriceUsd)

      return balanceInUsd.toFormat(2, {
        prefix: '$',
        decimalSeparator: '.',
        groupSeparator: ',',
        groupSize: 3,
      })
    })

    return {
      hederaLight,
      hederaDark,
      token,
      isDark,
      hbarBalance,
      tokenBalances,
      hbarPrice,
      hbarBalanceInUsd,
    }
  },
})
</script>
