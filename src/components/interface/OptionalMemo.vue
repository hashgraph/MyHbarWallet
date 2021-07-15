<template>
  <div class="md:block pt-10">
    <TextInput
      v-model="state.memo"
      class="h-16 px-5 mt-1"
      multiline
      :max-length="100"
      char-counter
      @update:modelValue="$emit('update:modelValue', state.memo)"
    />
    <div
      class="text-sm py-2 italic px-5 text-squant mt-2"
    >
      {{ $t("OptionalMemo.aboutMemo") }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";

import TextInput from "../base/TextInput.vue";
export default defineComponent({
  name: "OptionalMemo",
  components: {
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