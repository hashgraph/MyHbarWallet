<template>
  <div class="md:block hidden">
    <Switch
      v-model="state.addMemo"
      :label="$t('OptionalMemo.addMemo')"
      @update:modelValue="onToggle"
    />
    <transition
      enter-active-class="transition duration-300"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-full opacity-100"
      leave-from-class="max-h-full opacity-100"
      leave-to-class="max-h-0 opacity-0"
      leave-active-class="transition duration-300"
      :duration="300"
      mode="out-in"
    >
      <TextInput
        v-if="state.addMemo"
        v-model="state.memo"
        class="h-16 py-3.5 px-5 mt-1"
        multiline
        :max-length="100"
        char-counter
        @update:modelValue="$emit('update:modelValue', state.memo)"
      />
    </transition>
    <div
      class="text-sm italic px-5 text-squant"
      :class="{
        ' mt-6  ': state.addMemo,
        ' mt-8 ': !state.addMemo,
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
<style lang="postcss">
</style>