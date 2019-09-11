<template>
    <nav :class="{ 'nav-open': isOpen }">
        <div v-if="inInterface" class="card-container">
            <BalanceCard class="info-balance" />
            <NetworkCard class="info-network" />
        </div>
        <a href="/" class="link-block" @click="toggle">
            <div class="link">Home</div>
            <MaterialDesignIcon class="icon" :icon="mdiChevronRight" />
        </a>
        <a href="/#about" class="link-block" @click="toggle">
            <div class="link">About</div>
            <MaterialDesignIcon class="icon" :icon="mdiChevronRight" />
        </a>
        <a href="/#faqs" class="link-block" @click="toggle">
            <div class="link">FAQs</div>
            <MaterialDesignIcon class="icon" :icon="mdiChevronRight" />
        </a>
        <div class="logout-container">
            <Button
                v-if="loggedIn"
                class="logout"
                outline
                danger
                label="Logout"
                @click="handleLogout"
            />
        </div>
        <ModalLogOut v-model="state.isLogoutOpen" />
    </nav>
</template>

<script lang="ts">
import MaterialDesignIcon from "./MaterialDesignIcon.vue";
import { mdiChevronRight } from "@mdi/js";
import BalanceCard from "./BalanceCard.vue";
import NetworkCard from "./NetworkCard.vue";
import store from "../store";
import ModalLogOut from "./ModalLogOut.vue";
import Button from "../components/Button.vue";

import {
    createComponent,
    PropType,
    computed,
    SetupContext,
    reactive
} from "@vue/composition-api";

interface Props {
    isOpen: boolean;
}

export default createComponent({
    components: {
        MaterialDesignIcon,
        BalanceCard,
        NetworkCard,
        ModalLogOut,
        Button
    },
    props: {
        isOpen: (Boolean as unknown) as PropType<boolean>
    },
    setup(props: Props, context: SetupContext) {
        const state = reactive({
            scrolled: false,
            isLogoutOpen: false
        });

        const inInterface = computed(() => {
            const route = context.root.$route;

            if (route == null || route.matched.length === 0) {
                return false;
            }

            return route.matched[0].name === "interface";
        });

        function toggle(): void {
            context.emit("toggle", !props.isOpen);
        }

        const loggedIn = computed(() => store.getters.IS_LOGGED_IN);

        function handleLogout(): void {
            context.emit("toggle", !props.isOpen);
            state.isLogoutOpen = true;
        }

        return {
            toggle,
            mdiChevronRight,
            inInterface,
            loggedIn,
            handleLogout,
            state
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
    height: 100vh;

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
    &:link,
    &:active,
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
</style>
