<template>
    <nav :class="{ 'nav-open': isOpen }">
        <div class="link-block">
            <a href="/" @click="toggle">
                <div class="link">Home</div>
                <MaterialDesignIcon class="icon" :icon="mdiChevronRight" />
            </a>
        </div>
        <div class="link-block">
            <a href="/#about" @click="toggle">
                <div class="link">About</div>
                <MaterialDesignIcon class="icon" :icon="mdiChevronRight" />
            </a>
        </div>
        <div class="link-block">
            <a href="/#faqs" @click="toggle">
                <div class="link">FAQs</div>
                <MaterialDesignIcon class="icon" :icon="mdiChevronRight" />
            </a>
        </div>
    </nav>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import MaterialDesignIcon from "./MaterialDesignIcon.vue";
import { mdiChevronRight } from "@mdi/js";

export default Vue.extend({
    components: {
        MaterialDesignIcon
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: { type: Boolean }
    },
    data() {
        return {
            viewWidth: 0
        };
    },
    computed: {
        mdiChevronRight() {
            return mdiChevronRight;
        }
    },
    methods: {
        toggle() {
            this.isOpen = !this.isOpen;
            this.$emit("toggle", false);
        }
    }
});
</script>

<style lang="postcss" scoped>
nav {
    background-color: var(--color-white);
    box-shadow: 0 calc(100vh - 85px) 0 calc(100vh - 85px) transparent;
    height: 0;
    overflow: hidden;
    padding: 0 10px;
    transition: height 0.3s ease, box-shadow 0.2s ease;
    width: 100vw;
    z-index: 100;

    @media (prefers-reduced-motion) {
        transition: none;
    }

    @media (min-width: 1024px) {
        position: absolute;
        visibility: hidden;
    }
}

.nav-open {
    box-shadow: 0 calc(100vh - 85px) 0 calc(100vh - 85px) rgba(0, 0, 0, 0.8);
    height: 100vh;

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

.icon {
    color: #334758;
    font-size: 16px;
}

.link-block {
    align-items: center;
    border-bottom: 1px solid var(--color-boysenberry-shadow);
    cursor: pointer;
    display: flex;
    padding: 25px;
    padding-inline-start: 13px;
    user-select: none;
}

a {
    align-items: center;
    background-color: transparent;
    color: var(--color-washed-black);
    display: flex;
    flex-grow: 1;
    text-decoration: none;

    &:active,
    &:hover,
    &:link,
    &:active,
    &:focus,
    &:link {
        color: var(--color-melbourne-cup);
    }
}

.link {
    color: #334758;
    flex-grow: 1;
    font-size: 16px;
    text-decoration: none;
}
</style>
