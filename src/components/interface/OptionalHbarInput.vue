<template>
  <div>
    <HbarInput
      v-model="value"
      medium-font
      class="mt-3 px-5"
    />
    <div class="mt-2 text-sm italic text-squant px-5">
      {{ $t("OptionalMaxFee.maxFee") }}
    </div>
  </div>
</template>
<script lang="ts">
import type { Hbar } from "@hashgraph/sdk";
import { defineComponent, PropType, ref, watch } from "vue";

import HbarInput from "../base/HbarInput.vue";
export default defineComponent({
  name: "OptionalHbarInput",
  components: {
    HbarInput,
  },
  props: {
    modelValue: { type: Object as PropType<Hbar | null>, required: true },
    defaultValue: { type: Object as PropType<Hbar>, required: true },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const isOpen = ref(false);
    const value = ref(props.defaultValue);
    function resetHbar() {
      value.value = props.defaultValue;
      emit("update:modelValue", value.value);
    }
    watch(isOpen, () => {
      if (!isOpen.value) {
        resetHbar();
      }
    });
    return { isOpen, value };
  },
});
</script>