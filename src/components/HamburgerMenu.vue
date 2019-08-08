<template>
    <div class="wrapper">
        <nav :class="{ 'nav-open': openCheck }">
            <li class="link-block">
                <a href="/">
                    <div class="link">Home</div>
                    <MaterialDesignIcon
                        class="icon"
                        :icon="mdiChevronRight"
                    ></MaterialDesignIcon>
                </a>
            </li>
            <li class="link-block">
                <a href="/#about">
                    <div class="link">About</div>
                    <MaterialDesignIcon
                        class="icon"
                        :icon="mdiChevronRight"
                    ></MaterialDesignIcon>
                </a>
            </li>
            <li class="link-block">
                <a href="/#faqs">
                    <div class="link">FAQs</div>
                    <MaterialDesignIcon
                        class="icon"
                        :icon="mdiChevronRight"
                    ></MaterialDesignIcon>
                </a>
            </li>
        </nav>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import MaterialDesignIcon from "./MaterialDesignIcon.vue";
import { mdiChevronRight } from "@mdi/js";

export default Vue.extend({
    name: "HamburgerMenu",
    components: {
        MaterialDesignIcon
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
        openCheck() {
            if (this.isOpen && this.viewWidth <= 1025) return true;
            else return false;
        },
        mdiChevronRight() {
            return mdiChevronRight;
        },
        transition() {
            if (this.isOpen) return "menu-enter-active";
            else return "menu-leave-active";
        }
    },
    created() {
        window.addEventListener("resize", this.handleResize);
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener("resize", this.handleResize);
    },
    methods: {
        handleResize() {
            this.viewWidth = window.innerWidth;
        }
    }
});
</script>

<style lang="postcss" scoped>
nav {
    background-color: var(--color-white);
    height: 0;
    overflow: hidden;
    padding: 0 10px;
    transition: height 225ms ease;
    width: 100vw;
    z-index: 100;

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

.nav-open {
    height: 100vh;
    transition: height 225ms ease;

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
    list-style: none;
    padding: 25px;
    padding-inline-start: 13px;
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
