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
import { computed, defineComponent, nextTick, PropType, watch } from 'vue'
import { BigNumber } from 'bignumber.js'

import { useStore } from '../../store'

export default defineComponent({
  name: 'AssetInput',
  inheritAttrs: false,
  props: {
    asset: { type: String, required: true },
    // NOTE: value here is low denom, so tinybars not hbars
    modelValue: {
      type: Object as PropType<BigNumber.Instance | null>,
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

      emit('update:modelValue', num)
    })

    function onAmountInput(event: Event) {
      const target = event.target as HTMLInputElement
      let inputValue = target.value

      // remove any non-digit characters
      // for input sanitization and to allow for commas
      inputValue = inputValue.replace(/[^\d.]/g, '')

      // ignore successive decimal points at the end
      // this can happen as the final decimal point is a ghost char added
      // when formatted
      if (inputValue.endsWith('..'))
        inputValue = inputValue.slice(0, inputValue.length - 1)

      let inputNum: BigNumber | null | undefined = new BigNumber(inputValue)

      if (inputNum.isNaN()) {
        if (inputValue.length === 0) {
          target.value = ''
          emit('update:modelValue', null)

          return
        }

        inputNum = new BigNumber(props.modelValue ?? 0)
        inputValue = props.modelValue?.toFixed(8) ?? '0'
      }

      // trim the decimal points to the maximum supported by the asset
      inputNum = inputNum?.decimalPlaces(assetDecimals.value)

      target.value = formatNum(inputNum)

      emit(
        'update:modelValue',
        inputNum?.multipliedBy(assetScale.value) ?? null,
      )

      if (assetDecimals.value > 0) {
        nextTick(() => {
          // IFF the input value had a trailing decimal, re-add it
          if (inputValue.endsWith('.')) target.value += '.'
        })
      }
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
