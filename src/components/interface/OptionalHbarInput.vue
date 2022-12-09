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
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Hbar } from "@hashgraph/sdk";
import { defineComponent, PropType, Ref, ref, watch } from "vue";

import Switch from "../base/Switch.vue";
import HbarInput from "../base/HbarInput.vue";
import { useVModel } from "@vueuse/core";

export default defineComponent({
  name: "OptionalHbarInput",
  components: {
    Switch,
    HbarInput,
  },
  props: {
    modelValue: { type: Object as PropType<Hbar | null>, required: true, default: null },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const isOpen = ref(false);
    const value = useVModel(props, "modelValue", emit);

    function resetHbar() {
      emit("update:modelValue", null);
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
