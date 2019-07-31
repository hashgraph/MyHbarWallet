<template>
    <div
        v-scroll="onScroll"
        :class="{ 'is-scrolled': isScrolled }"
        class="header-container"
    >
        <header>
            <router-link to="/" class="link">
                <div class="logo">My<strong>Hedera</strong>Wallet</div>
            </router-link>
            <div class="spacer"></div>
            <div class="links">
                <a href="/" class="link">Home</a>
                <a href="/#about" class="link">About</a>
                <a href="/#faqs" class="link">FAQs</a>
            </div>
            <div v-if="isScrolled" class="button-container">
                <!-- TODO: Once the respective views exists, route to them -->
                <router-link class="btn" to=""
                    ><Button label="New Wallet"
                /></router-link>
                <router-link class="btn" to=""
                    ><Button label="Access"
                /></router-link>
            </div>
        </header>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Button from "../components/Button.vue";

export default Vue.extend({
    name: "Header",
    components: {
        Button
    },
    data() {
        return {
            isScrolled: false
        };
    },
    methods: {
        onScroll() {
            // FIXME: 150 should be in a common file somewhere
            this.isScrolled = window.scrollY > 150;
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

    &::after {
        box-shadow: 0 2px 13px rgba(0, 0, 0, 0.1);
        content: "";
        inset: 0;
        opacity: 0;
        position: absolute;
        transition: opacity 0.3s ease;
        z-index: -1;

        @media screen and (prefers-reduced-motion: reduce) {
            transition: none;
        }
    }

    &.is-scrolled::after {
        opacity: 1;
    }
}

header {
    display: flex;
    margin: 0 auto;
    max-width: 1024px;
    padding: 12px 25px;

    /* Animating padding to match MEW */
    /* stylelint-disable-next-line plugin/no-low-performance-animation-properties */
    transition: padding 0.3s ease;

    @media screen and (prefers-reduced-motion: reduce) {
        transition: none;
    }
}

.is-scrolled header {
    padding-block: 2.5px;
}

.link {
    align-items: center;
    color: var(--color-china-blue);
    display: flex;
    text-decoration: none;
    white-space: nowrap;

    &:hover,
    &:focus {
        cursor: pointer;
    }
}

.links {
    display: flex;
    font-size: 14px;
    padding: 13px 0;

    & .link {
        margin-inline-start: 26px;
        padding: 7px 14px;
    }
}

.button-container {
    align-items: center;
    display: flex;
}

.btn {
    flex-shrink: 1;
    margin-inline-start: 10px;

    &:first-child {
        margin-inline-start: 30px;
    }
}

.logo {
    font-size: 26px;

    & > strong {
        font-weight: 600;
    }
}

.spacer {
    flex-grow: 1;
}
</style>
