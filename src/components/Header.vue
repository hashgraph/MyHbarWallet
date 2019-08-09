<template>
    <div v-scroll="onScroll" :class="{ scrolled }" class="header-container">
        <header>
            <router-link to="/" class="link">
                <div class="logo">My<strong>Hedera</strong>Wallet</div>
            </router-link>
            <div class="spacer"></div>
            <div class="links">
                <router-link to="/" class="link">Home</router-link>
                <router-link :to="{ name: 'home', hash: '#about' }" class="link"
                    >About</router-link
                >
                <router-link :to="{ name: 'home', hash: '#faqs' }" class="link"
                    >FAQs</router-link
                >
            </div>
            <HeaderHamburgerButton @toggle="toggle" />
            <div v-if="scrolled" class="button-container">
                <router-link class="btn" :to="{ name: 'create-account' }">
                    <Button label="Create Account" compact outline />
                </router-link>
                <router-link class="btn" :to="{ name: 'access-my-account' }">
                    <Button label="Access" compact />
                </router-link>
            </div>
        </header>
        <HeaderHamburgerMenu
            v-model="isHamburgerOpen"
            :is-open="isHamburgerOpen"
        />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Button from "../components/Button.vue";
import HeaderHamburgerMenu from "./HeaderHamburgerMenu.vue";
import HeaderHamburgerButton from "./HeaderHamburgerButton.vue";

export default Vue.extend({
    name: "Header",
    components: {
        Button,
        HeaderHamburgerMenu,
        HeaderHamburgerButton
    },
    data() {
        return {
            scrolled: false,
            isHamburgerOpen: false
        };
    },
    methods: {
        onScroll() {
            // FIXME: 150 should be in a common file somewhere
            this.scrolled = window.scrollY > 150;
        },
        toggle() {
            this.isHamburgerOpen = !this.isHamburgerOpen;
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

    &.scrolled::after {
        opacity: 1;
    }
}

header {
    display: flex;
    margin: 0 auto;
    max-width: 1024px;
    padding: 12px 45px;

    /* Animating padding to match MEW */
    /* stylelint-disable-next-line plugin/no-low-performance-animation-properties */
    transition: padding 0.3s ease;

    @media screen and (prefers-reduced-motion: reduce) {
        transition: none;
    }
}

.scrolled header {
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

@media screen and (max-width: 1025px) {
    .links {
        max-width: 0;
        visibility: hidden;
    }

    .button-container {
        visibility: hidden;
    }
}
</style>
