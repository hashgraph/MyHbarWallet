<template>
  <TextInput
    v-model="state.hbarString"
    :placeholder="placeholder"
    :disabled="disabled"
    v-bind="$attrs"
    @update:modelValue="onInput"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, watch, nextTick } from 'vue'
import type { Hbar } from '@hashgraph/sdk'
import { BigNumber } from 'bignumber.js'

import TextInput from './TextInput.vue'

export default defineComponent({
  name: 'HbarInput',
  components: {
    TextInput,
  },
  props: {
    modelValue: { type: Object as PropType<Hbar | null>, required: true },
    disabled: { type: Boolean, default: false },
    placeholder: { type: String, default: '' },
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    const state = reactive({
      hbarString: '',
    })

    async function onInput(input: string) {
      const { HbarUnit, Hbar } = await import('@hashgraph/sdk')

      input = input.trim()

      if (input.length === 0) {
        nextTick(() => {
          state.hbarString = input
        })

        context.emit('update:modelValue', null)
        return
      }

      try {
        const bigNumberAmount = new BigNumber(input)
        if (bigNumberAmount.isNaN() || bigNumberAmount.isNegative()) {
          nextTick(() => {
            state.hbarString =
              props.modelValue?.to(HbarUnit.Hbar)?.toString() ?? ''
          })
        } else {
          const hbarAmount = new Hbar(bigNumberAmount)

          nextTick(() => {
            state.hbarString = input
          })
          context.emit('update:modelValue', hbarAmount)
        }
      } catch (error) {
        nextTick(() => {
          state.hbarString =
            props.modelValue?.to(HbarUnit.Hbar)?.toString() ?? ''
        })
      }
    }

    watch(
      () => props.modelValue,
      async (newValue) => {
        // FIXME: use toBigNumber()

        const { HbarUnit } = await import('@hashgraph/sdk')

        state.hbarString = newValue?.to(HbarUnit.Hbar)?.toString() ?? ''
      },
      { immediate: true },
    )

    return { state, onInput }
  },
})
</script>
