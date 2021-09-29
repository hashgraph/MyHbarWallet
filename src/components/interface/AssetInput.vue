<template>
  <div
    class="relative flex items-center border rounded text-black-out focus-within:border-han-blue-700 focus-within:ring-1 focus-within:ring-han-blue-700 border-cerebral-grey dark:border-midnight-express dark:hover:midnight-express"
  >
    <div
      v-if="asset === 'HBAR'"
      class="absolute left-0 pl-4 text-right pointer-events-none dark:text-silver-polish"
    >
      ℏ
    </div>

    <div v-if="asset === 'usd'">
      $
    </div>

    <input
      v-bind="$attrs"
      :value="formattedValue ?? undefined"
      class="py-3 w-full bg-transparent bg-white border-none focus:ring-0 placeholder-squant dark:text-silver-polish dark:bg-ruined-smores"
      :class="{ 'pr-5 pl-8': asset === 'HBAR', 'px-5': asset !== 'HBAR' }"
      type="tel"
      @input="onAmountInput"
    >
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue'
import { BigNumber } from 'bignumber.js'

import { useStore } from '../../store'

export default defineComponent({
  name: 'AssetInput',
  inheritAttrs: false,
  props: {
    asset: { type: String, required: true },
    // NOTE: value here is low denom, so tinybars not hbars
    modelValue: {
      type: String,
      default: null,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const store = useStore()

    const assetDecimals = computed(() =>
      props.asset === 'HBAR'
        ? 8
        : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          store.balance!.tokens!.get(props.asset)!.decimals,
    )

    const assetScale = computed(() =>
      new BigNumber(10).pow(assetDecimals.value),
    )

    watch(assetDecimals, (decimals, prevDecimals) => {
      if (props.modelValue == null) return

      let num = new BigNumber(props.modelValue.toString())

      num = num.div(new BigNumber(10).pow(prevDecimals))
      num = num.times(new BigNumber(10).pow(decimals))
      num = num.decimalPlaces(decimals)

      emit('update:modelValue', num.toNumber().toString())
    })

    function onAmountInput(event: Event) {
      const target = event.target as HTMLInputElement
      target.value = target.value.replace(/[^\d.]/g, '');
      let inputValue = target.value;

      if(inputValue !== null && inputValue.split(".").length > 2) {
        inputValue = inputValue.slice(0, -1);
      } else if(inputValue !== "" && inputValue.split(".")[1]?.length > assetDecimals.value) {
        inputValue = inputValue.slice(0, -1);
      }
      target.value = inputValue.replace(/^0+/,'');
      emit('update:modelValue', target.value);
    }

    const formattedValue = computed(() => {
      if (props.modelValue == null) return null

      let num = new BigNumber(props.modelValue.toString())

      num = num.div(assetScale.value)

      return formatNum(num)
    })

    return {
      formattedValue,
      onAmountInput,
    }
  },
})

function formatNum(num: BigNumber | null | undefined): string {
  // TODO: support locales here
  return (
    num?.toFormat({
      decimalSeparator: '.',
      groupSeparator: ',',
      groupSize: 3,
    }) ?? ''
  )
}
</script>
