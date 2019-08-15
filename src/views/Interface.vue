<template>
    <div class="interface">
        <InterfaceNavigation />
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
import { createComponent } from "vue-function-api";

export default createComponent({
    components: {
        InterfaceNavigation,
        NetworkCard,
        BalanceCard,
        AccountCard
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
</style>
