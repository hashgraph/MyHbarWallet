<template>
  <div>
    <Switch
      v-model="state.addMemo"
      :label="$t('OptionalMemo.addMemo')"
      @update:modelValue="onToggle"
    />

    <TextInput
      v-model="state.memo"
      class="w-full h-16 transition-all duration-300"
      multiline
      :max-length="100"
      char-counter
      :class="{
        'mt-1 opacity-100': state.addMemo,
        'h-0 -mt-10 opacity-0 invisible': !state.addMemo,
      }"
      @update:modelValue="$emit('update:modelValue', state.memo)"
    />

    <div

      class="w-full text-sm text-squant italic transition-all duration-300"
      :class="{
        'mt-4  ': state.addMemo,
        ' mt-14 ': !state.addMemo,
      }"
    >
      {{ $t("OptionalMemo.aboutMemo") }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

import Switch from "../base/Switch.vue";
import TextInput from "../base/TextInput.vue";

export default defineComponent({
  name: "OptionalMemo",
  components: {
    Switch,
    TextInput,
  },
  props: {
    modelValue: { type: String, default: "" },
  },
  emits: ["update:modelValue"],
  setup() {
    let state = reactive({
      addMemo: false,
      memo: "",
    });

    function onToggle(open: boolean): void {
      if (!open) state.memo = "";
    }

    return { state, onToggle };
  },
});
</script>
