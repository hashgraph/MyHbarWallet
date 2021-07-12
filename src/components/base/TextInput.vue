<template>
  <div class="relative">
    <textarea
      v-if="multiline"
      :disabled="disabled"
      :value="modelValue"
      :placeholder="placeholder"
      spellcheck="false"
      v-bind="$attrs"
      :rows="2"
      :maxlength="maxLength"
      :class="[
        'leading-5 p-4 text-sm font-medium border-cerebral-grey rounded w-full resize-none',
        'dark:text-white dark:bg-ruined-smores dark:border-midnight-express',
      ]"
      @input="onInput"
    />

    <input
      v-else
      spellcheck="false"
      :type="hide && !isEyeOpen ? 'password' : 'text'"
      :disabled="disabled"
      :placeholder="placeholder"
      :value="modelValue"
      :readonly="readOnly"
      :autofocus="autoFocus"
      :autocomplete="autoComplete ? '' : 'new-password'"
      :class="[
        'pr-16 rounded w-full text-carbon px-5 py-3.5 border',
        'dark:text-white dark:placeholder-basalt-grey',
        {
          'text-sm': !mediumFont,
          'text-md font-roboto font-medium leading-tight': mediumFont,
          'border-cerebral-grey dark:border-midnight-express':
            !valid && !error,
          'border-mountain-meadow focus:border-mountain-meadow focus:ring-mountain-meadow':
            valid,
          'border-harlocks-cape focus:border-harlocks-cape focus:ring-harlocks-cape':
            error,
          'dark:bg-ruined-smores': !disabled,
          'bg-first-snow border-first-snow dark:bg-hei-se-black dark:border-hei-se-black':
            disabled,
        },
      ]"
      v-bind="$attrs"
      @input="onInput"
    >
    <div
      v-if="charCounter"
      class="absolute -top-3 right-1"
    >
      <div class="text-xs text-argent">
        {{ numberOfChars }}/{{maxLength}}
      </div>
    </div>
    <!-- FIXME: this should be flexed with the input in a container using group-focus -->
    <div
      v-if="!multiline"
      class="absolute top-4 right-4"
    >
      <div class="flex">
        <img
          v-if="isEyeOpen && showEye"
          class="w-4 mt-px cursor-pointer"
          src="../../assets/icon_eye.svg"
          @click="clickEye"
        >

        <img
          v-else-if="!isEyeOpen && showEye"
          class="w-4 mt-px cursor-pointer"
          src="../../assets/icon_eye_off.svg"
          @click="clickEye"
        >

        <img
          v-if="valid"
          class="w-4 mt-px ml-2 cursor-pointer"
          src="../../assets/icon_check_green.svg"
        >

        <img
          v-if="!valid && error"
          class="w-4 mt-px ml-2 cursor-pointer"
          src="../../assets/icon_error.svg"
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "TextInput",
  props: {
    modelValue: { type: String, required: true },
    hide: { type: Boolean, default: false },
    placeholder: { type: String, default: "" },
    valid: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    multiline: { type: Boolean, default: false },
    maxLength: { type: Number, default: null },
    charCounter: { type: Boolean, default: false },
    showEye: { type: Boolean, default: false },
    autoFocus: { type: Boolean, default: false },
    autoComplete: { type: Boolean, default: false },
    readOnly: { type: Boolean, default: false },
    mediumFont: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  emits: ["update:modelValue"],
  setup(props, context) {
    const isEyeOpen = ref(false);

    function clickEye(): void {
      isEyeOpen.value = !isEyeOpen.value;
    }

    let numberOfChars = ref<number>(0);

    watch(
      () => props.modelValue,
      () => {
        numberOfChars.value = props.modelValue?.length ?? 0;
      }
    );

    function onInput(event: Event) {
      context.emit(
        "update:modelValue",
        (event.target as HTMLInputElement).value
      );
    }

    return { clickEye, onInput, isEyeOpen, numberOfChars };
  },
});
</script>
