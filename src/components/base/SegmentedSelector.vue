<template>
  <div class="flex space-x-2">
    <div
      v-for="option in options"
      :key="option"
      :data-cy-segment-option="option"
      :class="[
        'rounded-2xl text-sm font-semibold w-10 py-1 text-center select-none cursor-pointer',
        {
          'bg-mountain-meadow text-white': option === modelValue,
          'bg-white text-squant': option != modelValue,
        },
      ]"
      @click="() => handleClick(option)"
    >
      {{ option }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "SegmentedSelector",
  props: {
    modelValue: { type: Number, required: true },
    options: { type: Array as PropType<number[]>, required: true },
  },
  emits: ["update:modelValue"],
  setup(_props, { emit }) {
    function handleClick(option: number) {
      emit("update:modelValue", option);
    }

    return {
      handleClick,
    };
  },
});
</script>
