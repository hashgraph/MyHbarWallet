<template>
  <AssetInput
    :value="modelValue"
    :asset="'HBAR'"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { BigNumber } from 'bignumber.js'

import AssetInput from "../base/AssetInput.vue";

export default defineComponent({
  name: 'HbarInput',
  components: {
    AssetInput
  },
  props: {
    modelValue: { type: Object as PropType<BigNumber.Instance>, default: null }
  },
  emits: ["update:modelValue"],
})
</script>
