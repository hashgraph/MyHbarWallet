<template>
  <div
    class="fixed inset-0 z-20 overflow-y-auto transition-all duration-300"
    :class="[
      {
        'opacity-100': isVisible,
      },
      { 'opacity-0 invisible': !isVisible },
    ]"
  >
    <div
      class="flex flex-col items-center justify-center min-h-screen  bg-cerebral-grey dark:bg-ruined-smores bg-opacity-70"
      @click="$emit('close')"
    >
      <div
        class="w-full max-w-lg px-6 py-5 font-medium transition-all duration-300 bg-white border border-white rounded shadow-xl  dark:bg-ruined-smores text-carbon dark:text-silver-polish dark:border-midnight-express"
        :class="[
          {
            'transform translate-y-0 opacity-100 ': isVisible,
          },
          {
            'transform translate-y-16 opacity-0 invisible':
              !isVisible,
          },
        ]"
        @click.stop
      >
        <div class="flex justify-between">
          <div class="text-xl font-medium">
            {{ title }}
          </div>

          <div>
            <Image
              :light="closeIcon"
              :dark="closeIconDark"
              class="h-6 cursor-pointer"
              @click="$emit('close')"
            />
          </div>
        </div>

        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import closeIcon from "../../assets/icon_close.svg";
import closeIconDark from "../../assets/dark/icon_close.svg";
import Image from "../base/Image.vue";

export default defineComponent({
  name: "Modal",
  components: {
    Image,
  },
  props: {
    isVisible: { type: Boolean, required: false },
    title: { type: String, required: true },
  },
  emits: ["close"],
  setup() {
    return { closeIcon, closeIconDark };
  },
});
</script>
