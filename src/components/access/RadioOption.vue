<template>
  <label class="flex items-center">
    <div class="w-10 mr-4">
      <RadioButton ref="radio" :name="name" @radio-change="onRadioChange" />
    </div>

    <slot />
  </label>
</template>

<script lang="ts">
import { ComponentPublicInstance, defineComponent, ref } from "vue";
import RadioButtonVue, { RadioButton } from "../base/RadioButton.vue";

export type RadioOption = ComponentPublicInstance & {
  focus: () => void;
};

export default defineComponent({
  name: "RadioOptionAccount",
  components: {
    RadioButton: RadioButtonVue,
  },
  props: {
    name: { type: String, required: true },
  },
  emits: ["update:radioOption"],
  setup(_props, { emit }) {
    const radio = ref<RadioButton | null>(null);

    function onRadioChange() {
      emit("update:radioOption");
    }

    return {
      radio,
      onRadioChange,
      focus() {
        radio.value?.focus();
      },
    };
  },
});
</script>
