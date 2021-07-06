<template>
  <Switch
    v-model="state.hasPassword"
    data-cy-pass-toggle
    :label="label"
    class="mb-1"
    @update:modelValue="handleToggled"
  />

  <div
    v-if="hint"
    class="text-sm transition-all duration-300 ease-in-out text-squant dark:text-white"
  >
    {{ $t("BaseOptionalPasswordInput.paragraph") }}
  </div>

  <div
    :class="{
      'h-12': !confirm,
      'h-28': confirm,
    }"
  >
    <div
      class="transition-all duration-300"
      :class="{
        'h-12': state.hasPassword && !confirm,
        'h-28': state.hasPassword && confirm,
        'mt-0 opacity-100': state.hasPassword,
        '-mt-12 mb-4 opacity-0 pointer-events-none invisible':
          !state.hasPassword,
      }"
    >
      <PasswordInput
        v-if="state.hasPassword"
        ref="passwordInput"
        v-model="state.password"
        show-eye
        :placeholder="placeholder"
        :confirm="confirm"
        @valid="handleValid"
        @error="handleError"
        @update:modelValue="handlePassword"
      />
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
