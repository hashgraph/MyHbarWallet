<template>
    <div
        v-scroll="onScroll"
        :class="{ scrolled: isScrolled }"
        class="header-container"
    >
        <header>
            <router-link to="/" class="link">
                <div class="logo">MHW</div>
            </router-link>
            <div class="spacer"></div>
            <div class="header-links">
                <router-link to="" class="link">Home</router-link>
                <router-link to="" class="link">About</router-link>
                <router-link to="" class="link">FAQs</router-link>
            </div>
        </header>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import "@/directives";

export default Vue.extend({
    name: "Header",
    data() {
        return {
            isScrolled: false
        };
    },
    methods: {
        onScroll() {
            if (window.scrollY > 100) {
                this.isScrolled = true;
            } else if (window.scrollY < 80) {
                this.isScrolled = false;
            }
        }
    }
});
</script>

<style lang="postcss" scoped>
.header-container {
    background-color: white;
    inset-inline: 0;
    position: fixed;
    z-index: 1;

    @media screen and (prefers-reduced-motion: reduce) {
        transition: none;
    }
}

.header-container::after {
    box-shadow: 0 2px 13px rgba(0, 0, 0, 0.1);
    content: "";
    inset: 0;
    opacity: 0;
    position: absolute;
    transition: opacity 0.3s ease;
    z-index: -1;
}

.header-container.scrolled::after {
    opacity: 1;
}

header {
    display: flex;
    margin: 0 auto;
    max-width: 1024px;
    padding: 12px 25px;
    transition: padding-block 0.3s ease;

    @media screen and (prefers-reduced-motion: reduce) {
        transition: none;
    }
}

.scrolled header {
    padding-block: 3px;
}

.link {
    color: var(--color-china-blue);
    text-decoration: none;

    &:hover,
    &:focus {
        cursor: pointer;
    }
}

.header-links {
    display: flex;
    font-size: 14px;

    & .link {
        margin-inline-start: 26px;
        padding: 7px 14px;
    }
}

.logo {
    font-size: 30px;
    font-weight: bold;
}

.spacer {
    flex-grow: 1;
}
</style>
