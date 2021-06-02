<template>
  <label
    v-if="label != null"
    class="text-squant dark:text-silver-polish font-roboto"
  >
    {{ label }}
  </label>
  <div class="mt-2.5">
    <TextInput
      v-model="value"
      :disabled="disabled"
      :valid="valid"
      :error="error"
      :read-only="readOnly"
      :hide="secret"
      :show-eye="secret"
      medium-font
      placeholder="302e020100300…"
      v-bind="$attrs"
    />
  </div>
  <Button
    v-if="canCopy && hasClipboard()"
    color="white"
    class="px-10 py-2 mt-5 text-sm font-semibold"
    @click="handleCopy"
  >
    {{ $t("BaseButton.copy") }}
  </Button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useVModel } from "@vueuse/core";
import TextInput from "./TextInput.vue";
import Button from "./Button.vue";
import { copyText, hasClipboard } from "../../utils/clipboard";

export default defineComponent({
  name: "KeyInput",
  components: { Button, TextInput },
  props: {
    secret: { type: Boolean, default: false },
    label: { type: String, default: null },
    modelValue: { type: String, required: true },
    disabled: { type: Boolean, default: false },
    canCopy: { type: Boolean, default: false },
    readOnly: { type: Boolean, default: false },
    valid: { type: Boolean, default: null },
    error: { type: Boolean, default: null },
  },
  setup(props, { emit }) {
    const value = useVModel(props, "modelValue", emit);

    function handleCopy() {
      copyText(value.value as string);
    }

    return {
      value,
      hasClipboard,
      handleCopy,
    };
  },
});
</script>
