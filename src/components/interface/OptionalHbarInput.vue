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
import { defineComponent, PropType, ref, watch } from "vue";
import { useVModel } from "@vueuse/core";

import Switch from "../base/Switch.vue";
import HbarInput from "../base/HbarInput.vue";



export default defineComponent({
  name: "OptionalHbarInput",
  components: {
    Switch,
    HbarInput,
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    modelValue: { type: Object as PropType<Hbar | null> },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const isOpen = ref(false);
    const value = useVModel(props, "modelValue");

    function resetHbar() {
       emit("update:modelValue", null);
    }

    function handleUpdate(amount: Hbar): void {
      value.value = amount;
      emit("update:modelValue", amount);
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
