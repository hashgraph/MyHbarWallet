<template>
    <div class="interface">
        <div
            :class="classObject"
            class="side-nav-background"
            @click="handleClick"
        />
        <div :class="classObject" class="side-nav-top">
            <div class="logo">My<strong>Hedera</strong>Wallet</div>
            <MaterialDesignIcon
                class="close"
                :icon="mdiClose"
                @click="handleClick"
            />
        </div>
        <InterfaceNavigation :class="classObject" class="side-nav" />
        <div class="main-container">
            <div class="main">
                <router-view />
            </div>
            <!-- todo: These are just placeholders for the actual items,
            which have not been merged into master yet -->
            <AccountCard
                :realm="0"
                :shard="0"
                :account="305472"
                class="info-account"
                public-key="302a300506032b65700321002cc9e2d0c16c717476d4bbbfa3307a98cf0c41d7afc77c851e476b5921f3fb65"
            />
            <BalanceCard :balance="10" class="info-balance" />
            <NetworkCard class="info-network" />
        </div>
    </div>
</template>

<script lang="ts">
import InterfaceNavigation from "../components/InterfaceNavigation.vue";
import NetworkCard from "@/components/NetworkCard.vue";
import BalanceCard from "@/components/BalanceCard.vue";
import AccountCard from "@/components/AccountCard.vue";
import { createComponent, computed } from "vue-function-api";
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";
import { mdiClose } from "@mdi/js";
import store from "@/store";
import { SETISOPEN } from "@/store/mutations";

export default createComponent({
    components: {
        InterfaceNavigation,
        NetworkCard,
        BalanceCard,
        AccountCard,
        MaterialDesignIcon
    },
    setup() {
        const menuOpen = computed(() => store.state.interfaceMenu.isOpen);

        const classObject = computed(() => {
            if (menuOpen.value) return "menu-open";
            else return "menu-closed";
        });

        function handleClick() {
            store.commit(SETISOPEN, false);
        }

        return {
            menuOpen,
            classObject,
            handleClick,
            mdiClose
        };
    }
});
</script>

<style lang="postcss" scoped>
.interface {
    display: flex;
    flex-grow: 1;
}

.main-container {
    background-color: var(--color-boysenberry-shadow);
    display: grid;
    flex-grow: 1;
    grid-gap: 15px;
    grid-template-areas:
        "info-account info-balance info-network"
        "main main main";
    grid-template-columns: repeat(3, calc(100% * (1 / 3) - (30px / 3)));
    grid-template-rows: auto;
    padding: 20px;
}

.main {
    grid-area: main;
    min-height: 400px;
}

.info-account {
    flex-shrink: 0;
    grid-area: info-account;
}

.info-balance {
    flex-shrink: 0;
    grid-area: info-balance;
}

.info-network {
    flex-shrink: 0;
    grid-area: info-network;
}

@media (min-width: 1259px) {
    .side-nav-top {
        display: none;
    }

    .side-nav-background {
        display: none;
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

    @media screen and (prefers-reduced-motion: reduce) {
        .side-nav-background {
            transition: none;
        }
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

    &.menu-closed {
        transform: translate(-350px);
        z-index: 1;
    }

    @media screen and (prefers-reduced-motion: reduce) {
        .side-nav-top {
            transition: none;
        }
    }
}

.logo {
    padding-inline-start: 25px;
}

.close {
    cursor: pointer;
    margin-inline-end: 25px;
}

.menu-open {
    z-index: 2;
}

.side-nav {
    @media (max-width: 1258px) {
        height: 100%;
        position: fixed;
        transition: transform 0.3s ease;
        width: 350px;

        &.menu-closed {
            transform: translate(-350px);
            z-index: 2;
        }
    }

    @media screen and (prefers-reduced-motion: reduce) {
        transition: none;
    }
}

@media (max-width: 1012px) {
    .menu-open {
        width: 100%;
    }
}
</style>
