<template>
    <div class="button-wrapper" @click="menuToggle">
        <div :class="style('1')">
            <MaterialDesignIcon class="icon" :icon="icon" />
        </div>
        <div :class="style('2')">
            <MaterialDesignIcon class="icon" :icon="icon" />
        </div>
        <div :class="style('3')">
            <MaterialDesignIcon class="icon" :icon="icon" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import MaterialDesignIcon from "./MaterialDesignIcon.vue";
import { mdiMinus } from "@mdi/js";

export default Vue.extend({
    name: "HamburgerButton",
    components: {
        MaterialDesignIcon
    },
    data() {
        return {
            toggle: false
        };
    },
    computed: {
        icon() {
            return mdiMinus;
        }
    },
    methods: {
        style(ind: String) {
            return this.toggle ? `bar-${ind}-anim` : `bar-${ind}`;
        },
        menuToggle() {
            this.toggle = !this.toggle;
            this.$emit("toggle", this.toggle);
        }
    }
});
</script>

<style lang="postcss" scoped>
.button-wrapper {
    border-color: white;
    border-radius: 50%;
    max-height: 40px;
    min-width: 40px;
    overflow: hidden;
    transform: translate(-10px, 10px);

    &:active {
        background-color: rgba(0, 0, 0, 0.1);
    }
}

.bar-1 {
    transform: translate(12px) scaleY(1.2) scaleX(1.5);
    transition: transform 0.2s linear;

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

.bar-2 {
    transform: translate(12px, -19px) scaleY(1.2) scaleX(1.5);
    transition: transform 0.2s linear;

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

.bar-3 {
    transform: translate(4.5px, -38px) scaleY(1.2);
    transition: transform 0.2s linear;

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

.bar-1-anim {
    transform: rotate(45deg) translate(19px, 4px) scaleX(1.75) scaleY(1.5);
    transition: transform 0.2s linear;

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

.bar-2-anim {
    transform: rotate(-45deg) translate(27px, -14px) scaleX(1.75) scaleY(1.5);
    transition: transform 0.2s linear;

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

.bar-3-anim {
    transform: translateX(15px) translateX(-5px);
    transition: transform 0.2s linear;

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

@media screen and (min-width: 1025px) {
    .button-wrapper {
        visibility: hidden;
    }
}
</style>
