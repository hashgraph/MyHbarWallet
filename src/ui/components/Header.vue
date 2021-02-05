<template>
    <div
        v-scroll="onScroll"
        :class="{ scrolled: state.scrolled }"
        class="header-container"
    >
        <header :class="headerClasses">
            <div
                v-if="isHome"
                class="link"
                @click="handleReturnClick"
            >
                <img
                    alt=""
                    class="logo"
                    src="../assets/myhbarwallet-logo.svg"
                >
            </div>
            <div
                v-else
                class="link"
                @click="close"
            >
                <img
                    alt=""
                    class="logo"
                    src="../assets/myhbarwallet-logo.svg"
                >
            </div>
            <div class="spacer" />
            <div class="links">
                <router-link
                    v-if="!isInterface"
                    to="/"
                    class="link"
                >
                    {{
                        $t("common.home")
                    }}
                </router-link>
                <router-link
                    v-if="!isAbout && !isInterface"
                    :to="{ name: 'home', hash: '#about' }"
                    class="link"
                >
                    {{ $t("common.about") }}
                </router-link>
                <div
                    v-if="isAbout"
                    class="link"
                    @click="handleSameHash('#about')"
                >
                    {{ $t("common.about") }}
                </div>
                <router-link
                    v-if="!isFaqs && !isInterface"
                    :to="{ name: 'home', hash: '#faqs' }"
                    class="link"
                >
                    {{ $t("common.faqs") }}
                </router-link>
                <div
                    v-if="isFaqs"
                    class="link"
                    @click="handleSameHash('#faqs')"
                >
                    {{ $t("common.faqs") }}
                </div>
                <a
                    v-if="isInterface && !isCustomNetwork"
                    class="link"
                    :href="kabutoLink"
                    target="_blank"
                >
                    {{ $t("header.transactionHistory") }}
                    <MaterialDesignIcon
                        class="external-icon"
                        :icon="mdiOpenInNew"
                    />
                </a>
            </div>
            <div
                v-if="loggedIn && isInterface && !state.scrolled"
                class="logout"
                @click="handleLogout"
            >
                Logout
            </div>
            <HeaderHamburgerButton
                :is-open="state.isHamburgerOpen"
                :is-interface="isInterface"
                @toggle="toggle"
            />
            <div
                v-if="state.scrolled"
                class="button-container"
            >
                <router-link
                    class="btn"
                    :to="{ name: 'create-account' }"
                >
                    <Button
                        :label="$t('common.createAccount')"
                        compact
                        outline
                    />
                </router-link>
                <router-link
                    class="btn"
                    :to="{ name: 'access-my-account' }"
                >
                    <Button
                        :label="$t('header.access')"
                        compact
                    />
                </router-link>
            </div>
        </header>
        <HeaderHamburgerMenu
            :is-open="state.isHamburgerOpen"
            :kabuto-link="kabutoLink"
            :network="network"
            @toggle="toggle"
            @logout="state.isLogoutOpen = true"
        />
        <ModalLogOut
            v-if="isInterface"
            v-model="state.isLogoutOpen"
        />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "@vue/composition-api";
import { mdiOpenInNew } from "@mdi/js";

import { getters, mutations } from "../store";

import Button from "./Button.vue";
import HeaderHamburgerMenu from "./HeaderHamburgerMenu.vue";
import HeaderHamburgerButton from "./HeaderHamburgerButton.vue";
import ModalLogOut from "./ModalLogOut.vue";
import MaterialDesignIcon from "./MaterialDesignIcon.vue";

// Yes, it is used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handleReturnClick(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

export default defineComponent({
    name: "Header",
    components: {
        Button,
        HeaderHamburgerMenu,
        HeaderHamburgerButton,
        ModalLogOut,
        MaterialDesignIcon
    },
    setup(_, context) {
        const isInterface = computed(() => {
            // This conditional is required for unit tests to pass
            if (context.root != null) {
                if (context.root.$route != null) {
                    return context.root.$route.path.startsWith("/interface");
                }
            }
            return false;
        });

        const accId = computed(() => {
            if (isInterface.value) {
                const user = getters.currentUser();
                if (user != null) {
                    return user.session.account.toString();
                }
            }
            return null;
        });

        const network = computed(() => {
            if (isInterface.value) {
                return getters.currentNetwork()!.name.split(".")[ 1 ];
            }
            return null;
        });

        const kabutoLink = computed(() => {
            if (isInterface.value) {
                return `https://explorer.kabuto.sh/${network.value}/id/${accId.value}`;
            }
            return null;
        });

        const isCustomNetwork = computed(() => {
            if (isInterface.value && network.value != null && network.value.includes("custom")) {
                return true;
            }
            return false;
        });

        const state = reactive({
            scrolled: false,
            isHamburgerOpen: false,
            isLogoutOpen: false
        });

        function onScroll(): void {
            // eslint-disable-next-line compat/compat
            state.scrolled = window.scrollY > 150;
        }

        function toggle(): void {
            state.isHamburgerOpen = !state.isHamburgerOpen;
        }

        function close(): void {
            state.isHamburgerOpen = false;
            mutations.navigateToHome();
        }

        const isHome = computed(() => {
            // This conditional is required for unit tests to pass
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

        const loggedIn = computed(getters.isLoggedIn);

        function handleLogout(): void {
            state.isHamburgerOpen = false;
            state.isLogoutOpen = true;
        }

        const headerClasses = computed(() => {
            if (isInterface.value) {
                return "header interface";
            } return "header";
        });

        return {
            handleReturnClick,
            state,
            onScroll,
            toggle,
            close,
            isHome,
            headerClasses,
            loggedIn,
            handleLogout,
            isInterface,
            isFaqs,
            isAbout,
            handleSameHash,
            mdiOpenInNew,
            network,
            accId,
            kabutoLink,
            isCustomNetwork
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
    height: 50px;

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

.external-icon {
    margin-inline-start: 5px;
}
</style>
