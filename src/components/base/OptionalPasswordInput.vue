<template>
  <Switch
    v-model="state.hasPassword"
    data-cy-pass-toggle
    :label="label"
    @update:modelValue="handleToggled"
  />

  <div
    :class="{
      'h-14': !confirm && !hint && state.hasPassword,
      'h-32': confirm && !hint && state.hasPassword,
      'h-40': !confirm && hint && state.hasPassword,
      'h-56 sm:h-60': confirm && hint && state.hasPassword,
    }"
  >
    <div
      class="transition-all duration-300 ease-in-out overflow-y-hidden"
      :class="{
        'opacity-100': state.hasPassword,
        'h-0 -mt-14 opacity-0 pointer-events-none invisible':
          !state.hasPassword && !confirm && !hint,
        'h-0 -mt-32 opacity-0 pointer-events-none invisible':
          !state.hasPassword && confirm && !hint,
        'h-0 -mt-40 opacity-0 pointer-events-none invisible':
          !state.hasPassword && !confirm && hint,
        'h-0 -mt-56 sm:-mt-60 opacity-0 pointer-events-none invisible':
          !state.hasPassword && confirm && hint
      }"
    >
      <PasswordInput
        ref="passwordInput"
        v-model="state.password"
        show-eye
        :placeholder="placeholder"
        :confirm="confirm"
        @valid="handleValid"
        @error="handleError"
        @update:modelValue="handlePassword"
      />

      <div
        v-if="hint"
        class="text-sm text-squant dark:text-white mt-4"
      >
        {{ $t("BaseOptionalPasswordInput.paragraph") }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

import PasswordInput, { PasswordInputInstance } from "./PasswordInput.vue";
import Switch from "./Switch.vue";

export default defineComponent({
  name: "OptionalPasswordInput",
  components: {
    PasswordInput,
    Switch,
  },
  props: {
    modelValue: { type: String, required: true },
    label: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    hint: { type: Boolean, default: true },
    confirm: { type: Boolean, default: false },
  },
  emits: ["update:modelValue", "valid", "error"],
  setup(_, context) {
    const state = reactive({
      hasPassword: false,
      password: "",
    });

    // ref to PasswordInput component public instance
    // component with ref="passwordInput" will be attached at render
    const passwordInput = ref<PasswordInputInstance | null>(null);

    function handleToggled(toggle: boolean): void {
      if (!toggle) {
        context.emit("update:modelValue", "");
      }

      // if the ref refers to the component, call its reset method when toggled
      if (passwordInput.value != null) {
        passwordInput.value.reset();
      }
    }

    // pass through valid events
    function handleValid(valid: boolean): void {
      context.emit("valid", valid);
    }

    // pass through error events
    function handleError(error: boolean): void {
      context.emit("error", error);
    }

    // pass through password changes
    function handlePassword(password?: string): void {
      context.emit("update:modelValue", password);
    }

    return {
      state,
      handleToggled,
      handleValid,
      handleError,
      handlePassword,
      passwordInput,
    };
  },
});
</script>
