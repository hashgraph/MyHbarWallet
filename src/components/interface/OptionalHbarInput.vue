<template>
  <div>
    <Switch
      v-model="isOpen"
      :label="$t('InterfaceHomeSend.section2.toggle2.label')"
      class = "mb-4"
    />

    <HbarInput
      v-model="value"
      :disabled="!isOpen"
      @update:model-value="handleUpdate"
    />
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
    modelValue: { type: Object as PropType<Hbar | null>, required: true },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const isOpen = ref(false);
    const value = useVModel(props, "modelValue");

    function resetHbar() {
       emit("update:modelValue", null);
    }

    function handleUpdate(fee: Hbar): void {
      value.value = fee;
      emit("update:modelValue", fee);
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
