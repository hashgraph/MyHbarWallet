<template>
  <div class="grid grid-cols-2 mb-2 sm:grid-cols-3 gap-x-5 gap-y-1">
    <div
      v-for="index in wordCount"
      :key="index"
      class="
                text-sm
                mt-1
                pl-1.5
                pb-0.5
                sm:w-32
                flex
                border-basalt-grey
                items-center
            "
      :class="{
        'border-b': focused !== index,
        'border-han-blue-700 bg-han-blue-700 bg-opacity-5 border-b-2 -mb-px':
          !readOnly && focused === index,
        'border-cerebral-grey dark:border-midnight-express':
          (focused !== index) && isBlank(index), 
        'border-han-blue-700':
          warningAtIndex(index - 1) && focused !== index,
        'border-basalt-grey dark:border-silver-polish':
          readOnly
      }"
    >
      <label
        :for="`mnemonic:${index}`"
        class="dark:text-white"
      >
        {{ index.toString().padStart(2, "\u{00A0}") }}.
      </label>

      <input
        :id="`mnemonic:${index}`"
        :ref="inputRefs[index - 1]"
        :class="{
          'inline-flex text-black-out text-sm w-full h-full flex-1 border-none bg-transparent outline-none focus:ring-0 px-2': true,
          'dark:text-white dark:placeholder-white': true,
          'cursor-default': readOnly,
        }"
        :name="`mnemonic:${index}`"
        autocomplete="off"
        autofocus
        spellcheck="false"
        type="text"
        :value="modelValue[index - 1] ?? ''"
        :disabled="readOnly"
        @input="handleInput(index, $event)"
        @focus="handleFocus(index, $event)"
        @blur="handleBlur(index)"
      >
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  Ref,
  PropType,
  SetupContext,
  ComponentPublicInstance,
} from "vue";

export type MnemonicInputComponent = ComponentPublicInstance & {
    handleFocus: (index: number, event: Event | null) => void;
};

export default defineComponent({
  name: "MnemonicInput",
  props: {
    modelValue: { type: Array as PropType<string[]>, required: true },
    warningIndices: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
    readOnly: { type: Boolean, default: false },
    wordCount: { type: Number, required: true },
  },
  emits: ["update:modelValue"],
  setup(props, context: SetupContext) {
    const focused = ref<number | null>(null);

    //Create array of refs for the input to determine if input is blank in isBlank()
    const inputRefs: Ref<Ref<string>[]> = ref([] as Ref<string>[])
    for(let i = 0; i < props.wordCount; i++){
      inputRefs.value.push(ref(`mnemonic:${i + 1}`))
    }

    function warningAtIndex(index: number): boolean {
      return props.warningIndices.find((i) => i === index) != undefined;
    }

    function handleFocus(index: number, event: Event | null) {
      focused.value = index;

      // select all text if this is a readOnly view
      if (props.readOnly) {
        if (event) {
          (event.target as HTMLInputElement).select();
        }
      }
    }

    function handleBlur(index: number) {
      focused.value = index;
    }

    function handleInput(index: number, event: Event) {
      const newValue = props.modelValue.slice();

      // If the user pastes a space-separated phrase, we will auto-fill into
      // the subsequent boxes for convenience.
      const splitString = (event.target as HTMLInputElement).value
        .trim()
        .split(" ");
      splitString.forEach((item, i) => {
        newValue[index - 1 + i] = item;
      });
      context.emit("update:modelValue", newValue);
    }

    function isBlank(index: number): boolean {
      if(inputRefs?.value[index - 1]?.value) return false;
      return true;
    }

    return {
      focused,
      handleFocus,
      handleBlur,
      handleInput,
      warningAtIndex,
      isBlank,
      inputRefs
    };
  },
});
</script>
