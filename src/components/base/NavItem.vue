<template>
  <component
    :is="navItemComponent"
    :class="[
      'px-4 py-3 my-0.5 rounded flex items-center cursor-pointer outline-none focus-visible:ring-2 ring-bright-navy-blue hover:bg-lynx-white dark:hover:bg-black-out dark:text-white',
      {
        '!bg-first-snow dark:!bg-midnight-express text-bright-navy-blue':
          isActive,
      },
      { 'text-argent  ': !isActive },
    ]"
    :href="href"
    :to="to"
    tabindex="0"
    @mouseover="mouseOver"
    @mouseleave="mouseLeave"
  >
    <img
      v-if="isActive && activeIcon != null"
      class="w-7 h-6 object-contain mr-4 my-px"
      :src="activeIcon"
    />
    <img
      v-else-if="icon != null"
      class="w-7 h-6 object-contain mr-4 my-px"
      :src="icon"
    />
    <div v-else />

    <div class="flex-1 font-medium">
      {{ text }}
    </div>
  </component>
</template>

<script lang="ts">
import { useMediaQuery } from "@vueuse/core";
import { computed, defineComponent, PropType, ref } from "vue";
import { RouteLocationRaw, useLink } from "vue-router";

export default defineComponent({
  name: "NavItem",
  props: {
    icon: { type: String, default: null },
    activeIcon: { type: String, default: null },
    text: { type: String, required: true },
    href: { type: String, default: null },
    to: { type: [String, Object] as PropType<RouteLocationRaw>, default: null },
    highlightActive: { type: Boolean, default: true },
  },
  setup(props) {
    const lg = useMediaQuery("(min-width: 1024px)");
    const isMouseOver = ref(false);

    const navItemComponent =
      props.to != null ? "router-link" : props.href != null ? "a" : "div";

    const isActive = computed(() => {
      if (!props.highlightActive) {
        return false;
      }

      return props.to != null
        ? useLink({ to: props.to }).isActive.value
        : false;
    });

    function mouseOver() {
      isMouseOver.value = true;
    }

    function mouseLeave() {
      isMouseOver.value = false;
    }

    return {
      mouseOver,
      mouseLeave,
      navItemComponent,
      isActive,
      isMouseOver,
      lg,
    };
  },
});
</script>
