<template>
    <div class="circle-page">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({ name: "CirclePage" });
</script>

<style lang="postcss" scoped>
.circle-page {
    background-color: var(--color-boysenberry-shadow);
    background-image: url(../assets/right.png), url(../assets/left.png);
    background-position: 100% 0, left 80px;
    background-repeat: no-repeat, no-repeat;
    font-size: 14px;
}
</style>
