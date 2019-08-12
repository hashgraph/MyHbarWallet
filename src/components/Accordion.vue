<template>
    <div class="accordion" :class="{ expanded }">
        <div class="title" @click="toggle">
            <div class="title-text">
                <slot name="title"></slot>
            </div>
            <MaterialDesignIcon class="icon" :icon="mdiChevronUp" />
        </div>
        <div class="content">
            <div class="content-text">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";
import { mdiChevronUp } from "@mdi/js";
import { computed, value } from "vue-function-api";

export default Vue.extend({
    components: {
        MaterialDesignIcon
    },
    setup() {
        const expanded = value(false);
        const toggle = () => {
            expanded.value = !expanded.value;
        };
        return {
            expanded,
            mdiChevronUp,
            toggle
        };
    }
});
</script>

<style lang="postcss" scoped>
a {
    color: var(--color-melbourne-cup);
    text-decoration: none;
}

.icon {
    color: var(--color-melbourne-cup);
    transition: transform 0.3s linear;

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

.expanded .icon {
    transform: rotate(-180deg);
}

.accordion {
    border-bottom: 1px solid var(--color-jupiter);
    color: var(--color-black);
    padding: 30px 10px;
}

.title {
    align-items: center;
    cursor: pointer;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    text-align: start;
    user-select: none;
}

.title-text {
    font-size: 18px;
    font-weight: 500;
    padding-inline-end: 45px;
}

.content {
    font-size: 14px;
    font-weight: 400;
    height: auto;
    max-height: 50em;
    overflow: hidden;

    /* stylelint-disable-next-line plugin/no-low-performance-animation-properties */
    transition: max-height 0.3s linear;

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

.accordion:not(.expanded) .content {
    max-height: 0;
}

.content-text {
    padding-block-start: 20px;
}
</style>
