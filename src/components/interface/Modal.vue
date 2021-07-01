<template>
  <div
    class="fixed inset-0 overflow-y-auto z-20 transition-all duration-300"
    :class="[
      {
        'opacity-100': isVisible,
      },
      { 'opacity-0 invisible': !isVisible },
    ]"
  >
    <div
      class="
        flex flex-col
        min-h-screen
        items-center
        justify-center
        bg-cerebral-grey
        dark:bg-ruined-smores
        bg-opacity-70
      "
      @click="$emit('close')"
    >
      <div
        class="
          w-full
          max-w-lg
          px-6
          py-5
          shadow-xl
          rounded
          font-medium
          bg-white
          dark:bg-ruined-smores
          text-carbon
<<<<<<< HEAD
<<<<<<< HEAD
          dark:text-silver-polish
=======
          dark:text-white
>>>>>>> 54f2556a (feat: update deps to 12)
=======
          dark:text-white
>>>>>>> e7b58571 (Misc. fixes.)
          transition-all
          duration-300
          border border-white
          dark:border-midnight-express
        "
        :class="[
          {
            'transform translate-y-0 opacity-100 ': isVisible,
          },
          { 'transform translate-y-16 opacity-0 invisible': !isVisible },
        ]"
        @click.stop
      >
<<<<<<< HEAD
<<<<<<< HEAD
        <div class="flex justify-between">
=======
        <div class="flex justify-between dark:text-white">
>>>>>>> 54f2556a (feat: update deps to 12)
=======
        <div class="flex justify-between dark:text-white">
>>>>>>> e7b58571 (Misc. fixes.)
          <div class="font-medium text-xl">{{ title }}</div>

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
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 54f2556a (feat: update deps to 12)
=======
>>>>>>> e7b58571 (Misc. fixes.)
  },
});
</script>
