<template>
  <input
    ref="input"
    type="radio"
    :name="name"
    class="w-3 h-3 p-0 border-transparent outline-none appearance-none checked:bg-none checked:text-mountain-meadow ring-offset-3 ring-offset-white ring-1 ring-cerebral-grey focus:ring-1 checked:ring-mountain-meadow focus:ring-mountain-meadow focus:ring-offset-3 text-cerebral-grey"
    @change="onChange"
  >
</template>

<script lang="ts">
import { ComponentPublicInstance, defineComponent, ref } from "vue";

export type RadioButton = ComponentPublicInstance & {
    focus: () => void;
};

export default defineComponent({
  name: "BaseRadioButton",
  props: {
    name: { type: String, required: true },
  },
  emits: ["radioChange"],
  setup(_props, { emit }) {
    const input = ref<HTMLInputElement | null>(null);

    function onChange() {
      emit("radioChange");
    }

    return {
      input,
      onChange,
      focus() {
        input.value?.click();
      },
    };
  },
});
</script>
