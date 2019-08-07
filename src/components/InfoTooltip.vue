<template>
    <div class="info-tooltip">
        <button
            type="button"
            :tooltip="message"
            :class="popover"
            @click.stop="toggleClick"
            @mouseenter="enter"
            @mouseleave="leave"
        >
            <img :src="image" alt="(i)" />
        </button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import exclamation from "@/assets/exclamation.svg";
import exclamationActive from "@/assets/exclamation-active.svg";

export default Vue.extend({
    name: "InfoTooltip",
    props: {
        message: { type: String, required: true, default: "" }
    },
    data: function() {
        return {
            hover: false,
            click: false
        };
    },
    computed: {
        active() {
            return this.click || this.hover;
        },
        popover() {
            if (this.active) {
                return "popover";
            } else {
                return "";
            }
        },
        image() {
            if (this.hover) {
                // not this.active
                return exclamationActive;
            } else {
                return exclamation;
            }
        }
    },
    created: function() {
        window.addEventListener("click", this.unclick);
    },
    destroyed: function() {
        window.removeEventListener("click", this.unclick);
    },
    methods: {
        enter() {
            this.hover = true;
        },
        leave() {
            this.hover = false;
        },
        toggleClick() {
            this.click = !this.click;
        },
        unclick() {
            this.click = false;
        }
    }
});
</script>

<style lang="postcss" scoped>
button {
    border: none;
    cursor: pointer;
    outline: none;
}

[tooltip] {
    position: relative;

    @media screen and (prefers-reduced-motion: reduce) {
        &::after,
        &::before {
            opacity: 0;
            pointer-events: none;
            position: absolute;
            transition: none;
            z-index: 10;
        }
    }

    &::after,
    &::before {
        opacity: 0;
        pointer-events: none;
        position: absolute;
        transition: opacity 0.3s ease;
        z-index: 10;
    }

    &::after {
        background-color: var(--color-white);
        border: 1px solid var(--color-basalt-grey);
        border-radius: 4px;
        color: var(--color-china-blue);
        content: attr(tooltip);
        white-space: nowrap;
    }

    &:hover,
    &:focus {
        &::after,
        &::before {
            opacity: 1;
        }
    }

    @media screen and (prefers-reduced-motion: reduce) {
        &::after,
        &::before {
            opacity: 0;
            pointer-events: none;
            position: absolute;
            transition: none;
            z-index: 10;
        }
    }

    @media screen and (prefers-reduced-motion: reduce) {
        &::after,
        &::before {
            opacity: 0;
            pointer-events: none;
            position: absolute;
            transition: none;
            z-index: 10;
        }
    }
}
</style>
