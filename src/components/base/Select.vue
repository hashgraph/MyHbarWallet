<template>
  <div
    :tabindex="tabindex"
    class="relative flex leading-10 rounded select-none focus:outline-none focus:ring-none"
    @blur="state.open = false"
  >
    <div
      class="flex items-center px-3 bg-white rounded cursor-pointer dark:bg-ruined-smores hover:bg-lynx-white dark:hover:bg-black-out"
      :class="{
        visible: state.open,
        'py-4 w-max': !fullWidth,
        'w-full': fullWidth,
      }"
      @click="state.open = !state.open"
    >
      <Image
        v-if="options[state.indexOfSelected].iconLight != null"
        :dark="options[state.indexOfSelected].iconDark"
        :light="options[state.indexOfSelected].iconLight"
        class="w-6 h-6 mr-2.5"
      />

      <div
        class="font-medium select-none text-squant dark:text-white"
        :class="{ capitalize: capitalize }"
      >
        {{ selected }}
      </div>

      <div class="flex-1" />

      <img
        class="ml-3 w-7 h-7"
        src="../../assets/chevron_down.svg"
      >
    </div>

    <div
      :class="{
        'opacity-100 transform -translate-y-4': state.open,
        'opacity-0 transform -translate-y-10 invisible ': !state.open,
        '-left-3': !fullWidth,
        'left-0': fullWidth,
      }"
      :style="{ top: `${offset}px` }"
      class="absolute right-0 sm:p-2 m-2 transition-all duration-300 bg-white border rounded shadow-2xl dark:bg-ruined-smores border-jupiter dark:border-midnight-express"
    >
      <div
        v-for="(option, i) of options"
        :key="i"
        :class="{
          '!bg-first-snow dark:!bg-midnight-express':
            selected === option.name,
          'bg-white dark:bg-ruined-smores': selected !== option.name,
        }"
        :data-cy-option="option.name"
        class="flex items-center p-2 px-4 transition-colors bg-white rounded cursor-pointer dark:bg-ruined-smores text-squant dark:text-white hover:bg-lynx-white dark:hover:bg-black-out"
        @click="handleClickOption(i, option.name)"
      >
        <Image
          v-if="option.iconLight != null"
          :dark="option.iconDark"
          :light="option.iconLight"
          class="w-6 h-6 mr-4"
        />

        <div
          class="font-medium select-none"
          :class="{ capitalize: capitalize }"
        >
          {{ option.name }}
        </div>
        <div class="flex-1" />

        <div class="flex items-center">
          <img
            v-if="option.name === selected"
            class="flex-shrink-0 w-5 h-5"
            src="../../assets/icon_check.svg"
          >
          <div
            v-else
            class="w-5"
          />
        </div>
      </div>
    </div>

    <!-- this only shows on a actual mobile device -->
    <select
      v-if="isMobile"
      :value="selected"
      class="absolute top-0 bottom-0 left-0 right-0 w-full opacity-0"
      @change="handleChangeNativeSelect"
    >
      <option
        v-for="(option, i) of options"
        :key="i"
      >
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { useVModel } from "@vueuse/core";
import { defineComponent, PropType, reactive, onMounted } from "vue";

import { useOperatingSystem, ANDROID, IOS } from "../../hooks/platform";

import Image from "./Image.vue";

export interface Option {
    name: string;
    iconLight: string;
    iconDark: string;
}

export default defineComponent({
  name: "Select",
  components: { Image },
  props: {
    capitalize: { type: Boolean, default: false },
    modelValue: {
      type: String,
      required: true,
    },
    options: {
      type: Array as PropType<Option[]>,
      required: true,
    },
    tabindex: {
      type: Number,
      default: 0,
    },
    fullWidth: { type: Boolean, default: false },
    offset: { type: Number, default: 80 },
  },
  emits: ["update:modelValue"],
  setup(props, context) {
    let isMobile = false;

    onMounted(async () => {
      const os = await useOperatingSystem();
      isMobile = os == ANDROID || os == IOS;
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const selected = useVModel(props, "modelValue", context.emit);

    const state = reactive({
      indexOfSelected: 0,
      open: false,
    });

    function handleClickOption(i: number, value: string) {
      state.indexOfSelected = i;
      state.open = false;
      selected.value = value;
    }

    function handleChangeNativeSelect(event: Event) {
      const value = (event.target as HTMLSelectElement).value;
      const index = props.options.findIndex(
        (option) => option.name === value
      );

      handleClickOption(index, value);
    }

    return {
      isMobile,
      selected,
      state,
      handleClickOption,
      handleChangeNativeSelect,
    };
  },
});
</script>
