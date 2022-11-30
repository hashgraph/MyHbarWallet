<template>
  <Switch
    v-model="state.addMemo"
    :label="$t('OptionalMemo.addMemo')"
    @update:model-value="onToggle"
  />
  <div
    class="overflow-y-hidden mb-4"
  >
    <TextInput
      v-model="state.memo"
      class="transition-all duration-300 w-full mt-4"
      multiline
      :max-length="100"
      char-counter
      :class="{
        'opacity-100': state.addMemo,
        '-mt-32 opacity-0 invisible': !state.addMemo,
      }"
      @update:model-value="$emit('update:modelValue', state.memo)"
    />
  </div>
  <div
    class="italic w-full text-squant mt-4 mb-4 dark:bg-dreamless-sleep p-4 dark:text-silver-polish rounded shadow-md border border-transparent dark:border-midnight-express"
  >
    {{ $t("OptionalMemo.aboutMemo") }}
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
    const state = reactive({
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
