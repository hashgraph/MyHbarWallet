<template>
  <transition
    leave-active-class="duration-500 ease"
    leave-from-class="translate-x-0 opacity-100"
    leave-to-class="translate-x-full opacity-0"
    enter-active-class="duration-500 ease"
    enter-from-class="translate-x-full opacity-0"
    enter-to-class="translate-x-0 opacity-100"
  >
    <div
      v-if="isOpen"
      :key="`prompt-open-${isOpen}`"
      class="fixed z-40 flex items-center justify-center h-20 p-2 overflow-hidden italic border-l-4 rounded shadow bottom-10 right-10 w-80 bg-peach"
    >
      <slot />
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import { useStore } from "../../store";

export default defineComponent({
  name: "Prompt",
  setup() {
    const store = useStore();
    const isOpen = computed(() => store.prompt);

    return {
      isOpen
    }
  }
})
</script>