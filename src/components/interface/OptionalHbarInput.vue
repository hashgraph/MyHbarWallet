<template>
  <Switch
    v-model="isOpen"
    :label="$t('InterfaceHomeSend.section2.toggle2.label')"
  />

  <div class="overflow-y-hidden">
    <div
      class="mt-4 h-16 transition-all duration-300 overflow-y-hidden"
      :class="{
        'opacity-100': isOpen,
        '-mt-16 pointer-events-none opacitity-0 invisible': !isOpen
      }"
    > 
      <HbarInput
        v-if="isOpen"
        v-model="value"
        :disabled="!isOpen"      
        @update:model-value="handleUpdate"
      />
    </div>
  </div>
</template>

<script lang="ts">
import type { Hbar } from "@hashgraph/sdk";
import { defineComponent, onMounted, PropType, ref, watch } from "vue";
import BigNumber from "bignumber.js";

import Switch from "../base/Switch.vue";
import HbarInput from "../base/HbarInput.vue";

export default defineComponent({
  name: "OptionalHbarInput",
  components: {
    Switch,
    HbarInput,
  },
  props: {
    modelValue: { type: Object as PropType<Hbar | null>, required: true },
  },
  emits: ["update:modelValue"],
  setup(_, { emit }) {
    const isOpen = ref(false);
    const value = ref<BigNumber>(new BigNumber(0));
    const sdk = ref<typeof import("@hashgraph/sdk") | null>(null);

    onMounted(async () => {
      sdk.value = await import("@hashgraph/sdk");
    });

    function resetHbar() {
      value.value = new BigNumber(0);
      emit("update:modelValue", null);
    }

    function handleUpdate(amount: BigNumber): void {
      value.value = amount;
      if (!sdk.value) emit("update:modelValue", null);
      else emit("update:modelValue", sdk.value?.Hbar.from(amount, sdk.value?.HbarUnit.Hbar));
    }

    watch(isOpen, () => {
      if (!isOpen.value) {
        resetHbar();
      }
    });

    return { isOpen, value, handleUpdate };
  },
});
</script>
