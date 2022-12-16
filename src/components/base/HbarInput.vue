<template>
  <AssetInput
    :value="amount"
    :asset="'HBAR'"
    @update:model-value="handleUpdate"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { Hbar, HbarUnit } from "@hashgraph/sdk";
import { BigNumber } from 'bignumber.js'

import AssetInput from "../base/AssetInput.vue";

export default defineComponent({
  name: 'HbarInput',
  components: {
    AssetInput
  },
  props: {
    modelValue: { type: Object as PropType<Hbar | null>, required: true, default: null }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const amount = computed(() => props.modelValue?.toBigNumber());

    function handleUpdate(value: BigNumber): void {
      emit("update:modelValue", Hbar.from(value, HbarUnit.Hbar));
    }

    return {
      amount,
      handleUpdate
    }
  }
})
</script>
