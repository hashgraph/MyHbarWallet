<template>
    <div class="tooltip-container" :class="{ active }" @click.stop="">
        <button
            class="tooltip"
            @mouseover="handleMouseOver"
            @mouseout="handleMouseOut"
            @click="handleTogglePinned"
        >
            <MaterialDesignIcon class="icon" :icon="icon" />
        </button>
        <div class="message">
            {{ message }}
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import exclamation from "@/assets/exclamation.svg";
import exclamationActive from "@/assets/exclamation-active.svg";
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";
import { mdiAlertCircle } from "@mdi/js";

export default Vue.extend({
    components: {
        MaterialDesignIcon
    },
    props: {
        message: { type: String, required: true }
    },
    data() {
        return {
            hovered: false,
            pinned: false
        };
    },
    computed: {
        icon() {
            return mdiAlertCircle;
        },
        active() {
            return this.hovered || this.pinned;
        }
    },
    created() {
        window.addEventListener("click", this.handleCloseOnWindowClick);
    },
    beforeDestroy() {
        window.removeEventListener("click", this.handleCloseOnWindowClick);
    },
    methods: {
        handleMouseOver() {
            this.hovered = true;
        },
        handleMouseOut() {
            this.hovered = false;
        },
        handleTogglePinned() {
            this.pinned = !this.pinned;
        },
        handleCloseOnWindowClick() {
            this.pinned = false;
        }
    }
});
</script>

<style lang="postcss" scoped>
.tooltip-container {
    margin: 0 auto;
    position: relative;
    width: 24px;
}

.tooltip {
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0;
    width: inherit;
}

.icon {
    color: var(--color-basalt-grey);

    &:hover,
    &:focus {
        color: var(--color-melbourne-cup);
    }
}

.message {
    background-color: white;
    border: 1px solid var(--color-basalt-grey);
    border-radius: 4px;
    color: var(--color-china-blue);
    font-size: 14px;
    inset-block-end: 34px;
    inset-inline-start: calc(-350px / 2 + 24px / 2);
    line-height: 2;
    margin: 0 auto;
    opacity: 0;
    padding: 12px;
    pointer-events: none;
    position: absolute;
    text-align: start;
    transition: opacity 225ms ease;
    width: 350px;

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
