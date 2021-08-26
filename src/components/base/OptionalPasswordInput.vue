<template>
  <Switch
    v-model="state.hasPassword"
    data-cy-pass-toggle
    class="mb-4"
    :label="label"
    @update:modelValue="handleToggled"
  />

  <div
    class="overflow-y-hidden ease-in-out"
    :class="{
      'h-20': !confirm && !hint && state.hasPassword,
      'h-52': confirm && !hint && state.hasPassword,
      'h-40': !confirm && hint && state.hasPassword,
      'h-72': confirm && hint && state.hasPassword,
    }"
  >
    <div
      class="transition-all duration-300 relative"
      :class="{
        'opacity-100': state.hasPassword,
        '-mt-20 invisible opacity-0':
          !state.hasPassword && !confirm && !hint,
        '-mt-52 invisible opacity-0':
          !state.hasPassword && confirm && !hint,
        '-mt-40 invisible opacity-0':
          !state.hasPassword && !confirm && hint,
        '-mt-72 invisible opacity-0':
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
