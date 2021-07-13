<template>
  <component
    :is="buttonComponent"
    v-bind="{ ...buttonProps, ...$attrs }"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center font-semibold rounded-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-colors focus:outline-none',
      {
        'cursor-default disabled:bg-basalt-grey': disabled || busy,
        'hover:bg-opacity-90': !(disabled || busy),
        'bg-mountain-meadow text-white focus-visible:ring-mountain-meadow':
          color == 'green',
        'bg-white dark:bg-ruined-smores text-mountain-meadow border border-seafoam-blue focus-visible:ring-white':
          color == 'white',
      },
    ]"
  >
    <svg
      v-if="busy"
      class="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RouteLocationRaw } from "vue-router";

export default defineComponent({
  name: "BaseButton",
  props: {
    href: { type: String, default: null },
    disabled: { type: Boolean, default: false },
    busy: { type: Boolean, default: false },
    to: {
      type: [String, Object] as PropType<RouteLocationRaw>,
      default: null,
    },
    color: {
      type: String as PropType<"green" | "white">,
      required: true,
    },
  },
  setup(props) {
    let buttonProps = {};
    let buttonComponent = "button";

    if (props.to != null) {
      buttonComponent = "router-link";
      buttonProps = { to: props.to };
    } else if (props.href != null) {
      buttonComponent = "a";
      buttonProps = { href: props.href };
    }

    return { buttonComponent, buttonProps };
  },
});
</script>
