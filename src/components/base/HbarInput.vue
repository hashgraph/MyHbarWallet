<template>
  <AssetInput
    v-model="dAmount"
    :asset="'HBAR'"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { BigNumber } from 'bignumber.js'
import { useVModel } from '@vueuse/core';

import AssetInput from "../interface/AssetInput.vue";



export default defineComponent({
  name: 'HbarInput',
  components: {
    AssetInput
  },
  props: {
    amount: { type: Object as PropType<BigNumber.Instance>, default: null }
  },
  emits: ["update:amount"],
  setup(props) {

    const dAmount = useVModel(props, "amount");
    return { dAmount }
  },
})
</script>
