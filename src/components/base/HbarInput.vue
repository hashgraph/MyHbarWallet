<template>
  <AssetInput
    v-model="tinybar"
    :asset="'HBAR'"
    @update:model-value="handleUpdate"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { Hbar } from "@hashgraph/sdk";
import { BigNumber } from 'bignumber.js'

import AssetInput from "../base/AssetInput.vue";

export default defineComponent({
  name: 'HbarInput',
  components: {
    AssetInput
  },
  props: {
    modelValue: { type: Object as PropType<Hbar>, required: true }
  },
  emits: ["update:modelValue"],
  setup(_, { emit }) {
    const tinybar = ref(new BigNumber(0));

    function handleUpdate(value: BigNumber): void {
      emit("update:modelValue", Hbar.fromTinybars(value));
    }

    return {
      tinybar,
      handleUpdate
    }
  }
})
</script>
