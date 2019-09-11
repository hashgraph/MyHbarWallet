<template>
    <div
        v-scroll="onScroll"
        :class="{ scrolled: state.scrolled }"
        class="header-container"
    >
        <header :class="headerClasses">
            <div v-if="isHome" class="link" @click="handleReturnClick">
                <div class="logo">My<strong>Hbar</strong>Wallet</div>
            </div>
            <router-link v-else to="/" class="link">
                <div class="logo">My<strong>Hbar</strong>Wallet</div>
            </router-link>
            <div class="spacer"></div>
            <div class="links">
                <router-link to="/" class="link">Home</router-link>
                <router-link
                    v-if="!isAbout"
                    :to="{ name: 'home', hash: '#about' }"
                    class="link"
                    >About</router-link
                >
                <div v-else class="link" @click="handleSameHash('#about')">
                    About
                </div>
                <router-link
                    v-if="!isFaqs"
                    :to="{ name: 'home', hash: '#faqs' }"
                    class="link"
                >
                    FAQs
                </router-link>
                <div v-else class="link" @click="handleSameHash('#faqs')">
                    FAQs
                </div>
            </div>
            <div
                v-if="loggedIn && isInterface"
                class="logout"
                @click="handleLogout"
            >
                Logout
            </div>
            <HeaderHamburgerButton
                :is-open="state.isHamburgerOpen"
                @toggle="toggle"
            />
            <div v-if="state.scrolled" class="button-container">
                <router-link class="btn" :to="{ name: 'create-account' }">
                    <Button label="Create Account" compact outline />
                </router-link>
                <router-link class="btn" :to="{ name: 'access-my-account' }">
                    <Button label="Access" compact />
                </router-link>
            </div>
        </header>
        <HeaderHamburgerMenu
            :is-open="state.isHamburgerOpen"
            @toggle="toggle"
        />
        <ModalLogOut v-model="state.isLogoutOpen" />
    </div>
</template>

<script lang="ts">
import Button from "../components/Button.vue";
import {
    createComponent,
    computed,
    reactive,
    SetupContext
} from "@vue/composition-api";
import HeaderHamburgerMenu from "./HeaderHamburgerMenu.vue";
import HeaderHamburgerButton from "./HeaderHamburgerButton.vue";
import store from "../store";
import ModalLogOut from "./ModalLogOut.vue";

export default createComponent({
    components: {
        Button,
        HeaderHamburgerMenu,
        HeaderHamburgerButton,
        ModalLogOut
    },
    // Even though props is not used, we must have `context`
    // as the second argument otherwise it will take the place of
    // props implicitly and NOT complain you're casting it to `SetupContext`
    setup(props: object, context: SetupContext) {
        const state = reactive({
            scrolled: false,
            isHamburgerOpen: false,
            isLogoutOpen: false
        });

        function onScroll(): void {
            state.scrolled = window.scrollY > 150;
        }

        function handleReturnClick(): void {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }

        function toggle(): void {
            state.isHamburgerOpen = !state.isHamburgerOpen;
        }

        const isHome = computed(() => {
            // This conditional is required for unit tests to passs
            if (context.root != null && context.root.$route != null) {
                return context.root.$route.name === "home";
            }

            return false;
        });

        const isFaqs = computed(() => {
            if (context.root != null && context.root.$route != null) {
                return context.root.$route.hash === "#faqs";
            }
            return false;
        });

        const isAbout = computed(() => {
            if (context.root != null && context.root.$route != null) {
                return context.root.$route.hash === "#about";
            }
            return false;
        });

        // vue-router doesn't allow same path routing (from #faqs to #faqs)
        // this is a workaround
        function handleSameHash(path: string): void {
            context.root.$router.push({ name: "home" });
            context.root.$router.push({ name: "home", hash: path });
        }

        const isInterface = computed(() => {
            // This conditional is required for unit tests to passs
            if (context.root != null) {
                if (context.root.$route != null) {
                    return context.root.$route.path.startsWith("/interface");
                }
            }

            return false;
        });

        const loggedIn = computed(() => store.getters.IS_LOGGED_IN);

        function handleLogout(): void {
            state.isHamburgerOpen = false;
            state.isLogoutOpen = true;
        }

        const headerClasses = computed(() => {
            if (isInterface.value) {
                return "header interface";
            } else return "header";
        });

        return {
            state,
            onScroll,
            toggle,
            isHome,
            headerClasses,
            handleReturnClick,
            loggedIn,
            handleLogout,
            isInterface,
            isFaqs,
            isAbout,
            handleSameHash
        };
    }
});
</script>

<style lang="postcss" scoped>
.header-container {
    background-color: var(--color-white);
    inset-inline: 0;
    position: fixed;
    z-index: 2;

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

.logout {
    align-self: center;
    color: var(--color-infra-red);
    margin-inline-start: 26px;

    &:hover,
    &:focus {
        cursor: pointer;
    }

    @media screen and (max-width: 1024px) {
        visibility: hidden;
    }
}

.header {
    display: flex;
    margin: 0 auto;
    padding: 12px 45px;

    /* Animating padding to match MEW */
    /* stylelint-disable-next-line plugin/no-low-performance-animation-properties */
    transition: padding 0.3s ease;

    &:not(.interface) {
        max-width: 1024px;
    }

    @media screen and (prefers-reduced-motion: reduce) {
        transition: none;
    }

    @media screen and (max-width: 1024px) {
        padding: 12px 20px;
    }
}

.scrolled header {
    padding-block: 2.5px;
}

.spacer {
    flex-grow: 1;
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

@media screen and (max-width: 1024px) {
    .links {
        max-width: 0;
        visibility: hidden;
    }

    .button-container {
        visibility: hidden;
    }
}
</style>
