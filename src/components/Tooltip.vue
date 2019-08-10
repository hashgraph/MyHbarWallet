<template>
    <div class="tooltip-container" :class="{ active }" @click.stop="">
        <div
            class="slot-container"
            @click="handleTogglePinned"
            @mouseenter="handleMouseOver"
            @mouseleave="handleMouseOut"
        >
            <slot></slot>
        </div>
        <div class="message">
            {{ message }}
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { computed, onBeforeDestroy, onCreated, value } from "vue-function-api";

export default Vue.extend({
    props: {
        message: { type: String, required: true },
        pinnable: { type: Boolean, required: false }
    },
    setup(props) {
        // data
        const hovered = value(false);
        const pinned = value(false);

        // computed
        const active = computed((): boolean => {
            if (!props.pinnable) {
                return hovered.value;
            } else {
                return hovered.value || pinned.value;
            }
        });

        // methods
        const handleMouseOver = () => {
            hovered.value = true;
        };
        const handleMouseOut = () => {
            hovered.value = false;
        };
        const handleTogglePinned = () => {
            pinned.value = !pinned.value;
        };
        const handleCloseOnWindowClick = () => {
            pinned.value = false;
        };

        // lifecycle
        onCreated(() => {
            window.addEventListener("click", handleCloseOnWindowClick);
        });
        onBeforeDestroy(() => {
            window.removeEventListener("click", handleCloseOnWindowClick);
        });

        return {
            handleTogglePinned,
            handleMouseOver,
            handleMouseOut,
            active
        };
    }
});
</script>

<style lang="postcss" scoped>
.tooltip-container {
    position: relative;
}

.message {
    background-color: white;
    border: 1px solid var(--color-basalt-grey);
    border-radius: 4px;
    color: var(--color-china-blue);
    cursor: default;
    font-size: 14px;
    inset-block-end: calc(100% + 12px);
    inset-inline-start: calc((100% / 2));
    line-height: 2;
    margin: 0 auto;
    max-width: 250px;
    opacity: 0;
    padding: 6px 12px;
    pointer-events: none;
    position: absolute;
    text-align: start;
    transform: translateX(-50%);
    transition: opacity 225ms ease;
    width: max-content;
    z-index: 2;

    &::before {
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid var(--color-basalt-grey);
        content: "";
        height: 10px;
        inset-block-end: -11px;
        inset-inline: 0;
        margin: 0 auto;
        position: absolute;
        width: 10px;
    }

    &::after {
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid white;
        content: "";
        height: 10px;
        inset-block-end: -10px;
        inset-inline: 0;
        margin: 0 auto;
        position: absolute;
        width: 10px;
    }

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

.tooltip-container.active .message {
    opacity: 1;
    pointer-events: all;
}
</style>
