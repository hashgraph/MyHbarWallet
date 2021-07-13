<template>
  <form autocomplete="off">
    <TextInput
      v-model="state.password"
      data-cy-pass-input
      :valid="state.isValid"
      :error="error || state.hasError"
      hide
      :show-eye="showEye"
      :placeholder="placeholder"
    />

    <TextInput
      v-if="confirm"
      v-model="state.confirmPassword"
      data-cy-pass-confirm
      :valid="state.isValid"
      :error="state.hasError"
      :show-eye="showEye"
      hide
      :placeholder="$t('BasePasswordInput.input2.placeholder1')"
    />
  </form>
</template>

<script lang="ts">
import { ComponentPublicInstance, defineComponent, reactive } from "vue";
import { debouncedWatch } from "@vueuse/core";

import TextInput from "./TextInput.vue";

const PASSWORD_MIN_LEN = 9;

export type PasswordInputInstance = ComponentPublicInstance & {
    reset: () => void;
};

export default defineComponent({
  name: "PasswordInput",
  components: { TextInput },
  props: {
    modelValue: { type: String, default: null },
    confirm: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    showEye: { type: Boolean, default: false },
    placeholder: { type: String, default: "Enter password" },
  },
  emits: ["update:modelValue", "error", "valid"],
  setup(props, context) {
    const state = reactive({
      password: "" as string,
      confirmPassword: "" as string,
      isValid: false,
      hasError: false,
    });

    // resets this component for user interaction
    function reset(): void {
      context.emit("update:modelValue", "");
      state.password = "";
      state.confirmPassword = "";
      emitNotError();
    }

    function emitValid(): void {
      emitNotError();
      state.isValid = true;
      context.emit("valid", true);
    }

    function emitInvalid(): void {
      state.isValid = false;
      context.emit("valid", false);
    }

    function emitError(): void {
      state.hasError = true;
      context.emit("error", true);
    }

    function emitNotError(): void {
      state.hasError = false;
      context.emit("error", false);
    }

    function passwordValid(password: string | null): boolean {
      if (password != null) {
        if (password.length >= PASSWORD_MIN_LEN) {
          return true;
        }
      }

      return false;
    }

    function _validate(password: string | null): void {
      if (passwordValid(password)) {
        emitValid();
      } else {
        emitInvalid();
        emitError(); // validation rules are only rules
      }
    }

    function _validateConfirm(
      password: string | null,
      confirmPassword: string | null
    ): void {
      if (passwordValid(password) && passwordValid(confirmPassword)) {
        if (password !== confirmPassword) {
          emitInvalid();
          emitError();
        } else {
          emitValid();
        }
      } else {
        emitInvalid();
        emitNotError();
      }
    }

    function validate(
      password: string | null,
      confirmPassword: string | null
    ): void {
      if (props.confirm) {
        _validateConfirm(password, confirmPassword);
      } else {
        _validate(password);
      }
    }

    debouncedWatch(
      [() => state.password, () => state.confirmPassword],
      ([newPass, newConfirm]) => {
        context.emit("update:modelValue", newPass);
        validate(newPass, newConfirm);
      },
      { debounce: 50 }
    );

    return {
      state,
      reset, // return to make available on instances of component
    };
  },
});
</script>
