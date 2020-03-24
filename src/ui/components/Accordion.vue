<template>
    <div
        class="accordion"
        :class="{ expanded: state.expanded }"
    >
        <div
            class="title"
            @click="toggle"
        >
            <div class="title-text">
                <slot name="title" />
            </div>
            <MaterialDesignIcon
                class="icon"
                :icon="mdiChevronUp"
            />
        </div>
        <div class="content">
            <div class="content-text">
                <slot name="content" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/composition-api";
import { mdiChevronUp } from "@mdi/js";

import MaterialDesignIcon from "./MaterialDesignIcon.vue";

export default defineComponent({
    components: { MaterialDesignIcon },
    props: {},
    setup() {
        const state = reactive({ expanded: false });

        function toggle(): void {
            state.expanded = !state.expanded;
        }

        return {
            state,
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
    flex-shrink: 0;
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
    height: max-content;
    overflow: hidden;

    /* stylelint-disable-next-line plugin/no-low-performance-animation-properties */
    transition: 0.3s;

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

.accordion:not(.expanded) .content {
    max-height: 0;
    padding-block-start: 0;
}

.accordion.expanded .content {
    max-height: 200px;
    padding-block-start: 20px;
}

.content-text {
    background-color: var(--color-peral);
    border: 1px solid var(--color-boysenberry-shadow);
    border-radius: 5px;
    padding: 20px;
}
</style>
