<template>
  <svg
    :class="{ 'mdi-spin': spin, 'mdi-slow-spin': slowSpin }"
    :height="size"
    :width="size"
    viewBox="0 0 24 24"
    v-on="this.$listeners"
  >
    <path :d="icon" />
  </svg>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";

export default createComponent({
    name: "MaterialDesignIcon",
    props: {
        spin: Boolean,
        slowSpin: Boolean,
        size: { type: Number, default: 24 },
        icon: { type: String, required: true }
    }
});
</script>

<style lang="postcss" scoped>
    @keyframes mdi-spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }

    .mdi-spin {
        animation: mdi-spin 2s infinite linear;

        @media screen and (prefers-reduced-motion: reduce) {
            animation: none;
        }
    }

    .mdi-slow-spin {
        animation: mdi-spin 4s infinite linear;

        @media screen and (prefers-reduced-motion: reduce) {
            animation: none;
        }
    }
</style>
