<template>
  <div>
    <Switch
      v-model="state.addMemo"
      :label="$t('OptionalMemo.addMemo')"
      class="mb-4"
      @update:modelValue="onToggle"
    />

    <TextInput
      v-model="state.memo"
      class="h-16 transition-all duration-300 w-full"
      multiline
      :max-length="100"
      char-counter
      :class="{
        'mt-1 opacity-100': state.addMemo,
        '-mt-20 opacity-0 invisible': !state.addMemo,
      }"
      @update:modelValue="$emit('update:modelValue', state.memo)"
    />

    <div
      class="text-sm italic w-full text-squant dark:text-silver-polish mt-4"
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
