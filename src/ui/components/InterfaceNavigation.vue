import {LoginMethod} from "../wallets/Wallet";
<template>
    <div>
        <div
            :class="classObject"
            class="side-nav-top"
        >
            <img
                alt=""
                class="logo"
                src="../assets/myhbarwallet-logo.svg"
            >
            <MaterialDesignIcon
                class="close"
                :icon="mdiClose"
                @click="handleClick"
            />
        </div>
        <nav :class="classObject">
            <InterfaceNavigationSection
                :icon="mdiCoinOutline"
                :title="$t('interfaceNavigation.crypto')"
                :routes="cryptoRoutes"
            />

            <InterfaceNavigationSection
                v-if="notLedger"
                :icon="mdiFileDocumentBoxMultipleOutline"
                :title="$t('interfaceNavigation.files')"
                :routes="filesRoutes"
            />

            <InterfaceNavigationSection
                v-if="false"
                :icon="contractImage"
                :title="$t('interfaceNavigation.contract')"
                :routes="contractRoutes"
            />

            <InterfaceNavigationSection
                v-if="false"
                :icon="messageImage"
                :title="$t('common.message')"
                :routes="messageRoutes"
            />
        </nav>
        <div
            :class="classObject"
            class="side-nav-background"
            @click="handleClick"
        />
    </div>
</template>

<script lang="ts">
import { mdiClose, mdiCoinOutline, mdiFileDocumentBoxMultipleOutline } from "@mdi/js";
import { computed, defineComponent } from "@vue/composition-api";

import { LoginMethod } from "../../domain/wallets/Wallet";
import { mutations, store, getters } from "../store";

import MaterialDesignIcon from "./MaterialDesignIcon.vue";
import InterfaceNavigationSection from "./InterfaceNavigationSection.vue";

// Yes, it is used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handleClick(): void {
    mutations.setInterfaceMenuIsOpen(false);
}

export default defineComponent({
    components: {
        InterfaceNavigationSection,
        MaterialDesignIcon
    },
    props: {},
    setup() {
        const cryptoRoutes = [
            { name: "send-transfer", label: "Send" },
            { name: "create-account-transaction", label: "Create Account" }
        ];

        const contractRoutes = [
            { name: "interact-with-contract", label: "Interact with Contract" },
            { name: "deploy-contract", label: "Deploy Contract" }
        ];

        const messageRoutes = [
            { name: "sign-message", label: "Sign Message" },
            { name: "verify-message", label: "Verify Message" }
        ];

        const filesRoutes = [
            { name: "upload-file", label: "Upload" },
            { name: "download-file", label: "Download" }
        ];

        const menuOpen = computed(() => store.state.ui.interfaceMenu.isOpen);

        const classObject = computed(() => {
            if (menuOpen.value) return "menu-open";
            return "menu-closed";
        });

        const notLedger = computed(() => {
            if (getters.currentUser() != null) {
                return (
                    getters.currentUser().wallet.getLoginMethod() !==
                    LoginMethod.Ledger
                );
            }

            return true;
        });

        return {
            notLedger,
            cryptoRoutes,
            contractRoutes,
            messageRoutes,
            mdiClose,
            classObject,
            filesRoutes,
            mdiFileDocumentBoxMultipleOutline,
            mdiCoinOutline,
            handleClick
        };
    }
});
</script>

<style lang="postcss" scoped>
nav {
    background: var(--color-white);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    height: 100%;
    padding: 40px 0;
    width: 270px;
    z-index: 2;

    @media (max-width: 1258px) {
        position: fixed;
        transition: transform 0.3s ease;
        width: 350px;

        &.menu-closed {
            transform: translate(-350px);
        }
    }

    @media screen and (prefers-reduced-motion: reduce) {
        transition: none;
    }
}

.side-nav-top {
    align-items: center;
    background-color: var(--color-white);
    display: flex;
    height: 85px;
    inset-block-start: 0;
    justify-content: space-between;
    position: fixed;
    transition: transform 0.3s ease;
    width: 350px;
    z-index: 2;

    &.menu-closed {
        transform: translate(-350px);
    }

    @media (min-width: 1259px) {
        display: none;
    }

    @media screen and (prefers-reduced-motion: reduce) {
        transition: none;
    }
}

.side-nav-background {
    background-color: var(--color-black);
    height: 100%;
    inset-block-start: 0;
    opacity: 0.75;
    position: fixed;
    transition: opacity 0.3s ease;
    width: 100%;
    z-index: 1;

    &.menu-closed {
        opacity: 0;
        pointer-events: none;
    }

    @media (min-width: 1259px) {
        display: none;
    }

    @media screen and (prefers-reduced-motion: reduce) {
        transition: none;
    }
}

.logo {
    color: var(--color-china-blue);
    height: 50px;
    padding-inline-start: 25px;

    & > strong {
        font-weight: 600;
    }
}

.close {
    cursor: pointer;
    margin-inline-end: 25px;
}

@media (max-width: 1012px) {
    .menu-open {
        width: 100%;
    }
}
</style>
