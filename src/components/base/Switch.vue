<template>
  <div class="flex items-center cursor-default rounded-xl">
    <div
      data-cy-switch
      class="flex items-center h-6 p-1 cursor-pointer w-11 rounded-xl"
      :class="{
        'bg-mountain-meadow dark:bg-andrea-blue': modelValue,
        'bg-cerebral-grey dark:bg-midnight-express': !modelValue,
      }"
      @click="$emit('update:modelValue', !modelValue)"
    >
      <div
        class="
          w-5
          h-5
          duration-300
          ease-in-out
          transform
          bg-white
          rounded-full
          shadow-md
        "
        :class="{ 'translate-x-4': modelValue }"
      ></div>
    </div>
    <span
      class="text-sm font-medium text-carbon dark:text-white ml-2.5"
      @click="$emit('update:modelValue', !modelValue)"
      >{{ label }}</span
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Switch",
  props: {
    modelValue: { type: Boolean, required: true },
    label: { type: String, required: true },
  },
  emits: ["update:modelValue"],
});
</script>
