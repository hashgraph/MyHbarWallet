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
                :icon="mdiCoins"
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
                :icon="mdiToolbox"
                :title="$t('interfaceNavigation.tools')"
                :routes="toolsRoutes"
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
import { mdiClose, mdiCoins, mdiFileDocumentBoxMultipleOutline, mdiToolbox } from "@mdi/js";
import { computed, defineComponent } from "@vue/composition-api";

import { LoginMethod } from "../../domain/wallets/wallet";
import { mutations, store, getters } from "../store";

import MaterialDesignIcon from "./MaterialDesignIcon.vue";
import InterfaceNavigationSection from "./InterfaceNavigationSection.vue";

function handleClick(): void {
    mutations.setInterfaceMenuIsOpen(false);
}

export default defineComponent({
    name: "InterfaceNavigation",
    components: {
        InterfaceNavigationSection,
        MaterialDesignIcon
    },
    setup(_, context) {
        const notLedger = computed(() => {
            if (getters.currentUser() != null) {
                return (
                    getters.currentUser().wallet.getLoginMethod() !==
                    LoginMethod.Ledger
                );
            }

            return true;
        });

        const cryptoRoutes = computed(() => {
            const routes = [
                {
                    name: "send-transfer",
                    label: context.root.$t("interfaceNavigation.sendHbar").toString()
                },
                {
                    name: "send-token",
                    label: context.root.$t("interfaceNavigation.sendToken").toString()
                }
            ];

            if (notLedger.value) {
                routes.push({
                    name: "send-asset",
                    label: context.root.$t("interfaceNavigation.sendMultiple").toString()
                });
            }

            return routes;
        });

        const filesRoutes = [
            {
                name: "upload-file",
                label: context.root.$t("interfaceNavigation.uploadFile").toString()
            },
            {
                name: "download-file",
                label: context.root.$t("interfaceNavigation.downloadFile").toString()
            }
        ];

        const toolsRoutes = [
            {
                name: "token-balances",
                label: context.root.$t("interfaceNavigation.balances").toString()
            },
            {
                name: "associate-token",
                label: context.root.$t("interfaceNavigation.associate").toString()
            },
            {
                name: "create-account-transaction",
                label: context.root.$t("interfaceNavigation.createAccount").toString()
            }
        ];

        const menuOpen = computed(() => store.state.ui.interfaceMenu.isOpen);

        const classObject = computed(() => {
            if (menuOpen.value) return "menu-open";
            return "menu-closed";
        });

        return {
            notLedger,
            cryptoRoutes,
            mdiClose,
            classObject,
            filesRoutes,
            toolsRoutes,
            mdiFileDocumentBoxMultipleOutline,
            mdiCoins,
            mdiToolbox,
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
