<template>
    <nav :class="{ 'nav-open': isOpen }">
        <div
            v-if="isInterface"
            class="card-container"
        >
            <BalanceCard class="info-balance" />
            <NetworkCard class="info-network" />
        </div>
        <router-link
            v-if="!isInterface"
            to="/"
            class="link-block"
            @click.native="toggle"
        >
            <div class="link">
                {{ $t("common.home") }}
            </div>
            <MaterialDesignIcon
                class="icon"
                :icon="mdiChevronRight"
            />
        </router-link>
        <router-link
            v-if="!isAbout && !isInterface"
            :to="{ name: 'home', hash: '#about' }"
            class="link-block"
            @click.native="toggle"
        >
            <div class="link">
                {{ $t("common.about") }}
            </div>
            <MaterialDesignIcon
                class="icon"
                :icon="mdiChevronRight"
            />
        </router-link>
        <div
            v-if="isAbout"
            class="link-block"
            @click="handleSameHash('#about')"
        >
            <div class="link">
                {{ $t("common.about") }}
            </div>
            <MaterialDesignIcon
                class="icon"
                :icon="mdiChevronRight"
            />
        </div>
        <router-link
            v-if="!isFaqs && !isInterface"
            :to="{ name: 'home', hash: '#faqs' }"
            class="link-block"
            @click.native="toggle"
        >
            <div class="link">
                {{ $t("common.faqs") }}
            </div>
            <MaterialDesignIcon
                class="icon"
                :icon="mdiChevronRight"
            />
        </router-link>
        <div
            v-if="isFaqs"
            class="link-block"
            @click="handleSameHash('#faqs')"
        >
            <div class="link">
                {{ $t("common.faqs") }}
            </div>
            <MaterialDesignIcon
                class="icon"
                :icon="mdiChevronRight"
            />
        </div>
        <a
            v-if="isInterface && !isCustomNetwork"
            class="link-block"
            :href="kabutoLink"
            target="_blank"
        >
            <div class="link">{{ $t("header.transactionHistory") }}
                <MaterialDesignIcon
                    class="external-icon"
                    :icon="mdiOpenInNew"
                />
            </div>

            <MaterialDesignIcon
                class="icon"
                :icon="mdiChevronRight"
            />
        </a>

        <div class="logout-container">
            <Button
                v-if="loggedIn"
                class="logout"
                outline
                danger
                :label="$t('common.logout')"
                @click="handleLogout"
            />
        </div>
    </nav>
</template>

<script lang="ts">
import MaterialDesignIcon from "./MaterialDesignIcon.vue";
import { mdiChevronRight, mdiOpenInNew } from "@mdi/js";
import BalanceCard from "./BalanceCard.vue";
import NetworkCard from "./NetworkCard.vue";
import Button from "../components/Button.vue";

import {
    createComponent,
    PropType,
    computed,
    SetupContext,
    reactive
} from "@vue/composition-api";
import { getters } from "../store";

interface Props {
    isOpen: boolean;
    kabutoLink: string | null;
    network: string;
}

export default createComponent({
    components: {
        MaterialDesignIcon,
        BalanceCard,
        NetworkCard,
        Button
    },
    props: {
        isOpen: (Boolean as unknown) as PropType<boolean>,
        kabutoLink: String,
        network: String
    },
    setup(props: Props, context: SetupContext) {
        const isInterface = computed(() => {
            const route = context.root.$route;

            if (route == null || route.matched.length === 0) {
                return false;
            }

            return route.matched[ 0 ].name === "interface";
        });

        const isCustomNetwork = computed(() => {
            if (isInterface.value === true && props.network != null && props.network.includes("custom")) {
                return true;
            }
            return false;
        });

        const state = reactive({
            scrolled: false,
            isLogoutOpen: false
        });

        function toggle(): void {
            context.emit("toggle", !props.isOpen);
            document.body.classList.toggle("ham-menu-is-open", !props.isOpen);
        }

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
            toggle();
            context.root.$router.push({ name: "home" });
            context.root.$router.push({ name: "home", hash: path });
        }

        const loggedIn = computed(() => getters.IS_LOGGED_IN());

        function handleLogout(): void {
            context.emit("toggle", !props.isOpen);
            context.emit("logout");
        }

        return {
            toggle,
            mdiChevronRight,
            isInterface,
            loggedIn,
            handleLogout,
            state,
            isFaqs,
            isAbout,
            handleSameHash,
            mdiOpenInNew,
            isCustomNetwork
        };
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

    @media (min-width: 1025px) {
        position: absolute;
        visibility: hidden;
    }
}

.logout-container {
    margin-inline-end: 10px;
    padding-block: 10px;

    @supports (-webkit-overflow-scrolling: touch) {
        padding-block-end: 100px;
    }
}

.logout {
    align-self: center;
    color: var(--color-infra-red);
    width: 100%;

    &:hover:not(.busy):not(:disabled),
    &:focus:not(.busy):not(:disabled) {
        color: var(--color-aggressive-salmon);
        cursor: pointer;
    }
}

.nav-open {
    box-shadow: 0 calc(100vh - 85px) 0 calc(100vh - 85px) rgba(0, 0, 0, 0.8);
    height: calc(100vh - 85px);
    overflow-y: scroll;

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

.icon {
    color: var(--color-dilly-blue);
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
    &:focus,
    &:link {
        color: var(--color-melbourne-cup);
    }
}

.link {
    color: var(--color-dilly-blue);
    flex-grow: 1;
    font-size: 16px;
    text-decoration: none;
}

.card-container {
    border-bottom: 1px solid var(--color-boysenberry-shadow);
    margin-inline-end: 10px;
}

.info-balance {
    margin-block-end: 10px;

    @media (min-width: 1025px) {
        display: none;
    }
}

.info-network {
    margin-block-end: 10px;

    @media (min-width: 1025px) {
        display: none;
    }
}

.external-icon {
    margin-inline-start: 5px;
}
</style>
