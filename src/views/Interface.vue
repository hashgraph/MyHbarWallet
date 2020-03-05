<template>
    <div class="interface">
        <InterfaceNavigation />
        <div class="main-container">
            <div class="main">
                <router-view />
            </div>
            <div class="interface-ads">
                <AdBlockBuyHbar v-if="inMainNet" />
                <AdBlockTwitter />
            </div>
            <AccountCard
                v-if="account"
                :realm="account.realm"
                :shard="account.shard"
                :account="account.account"
                class="info-account"
            />
            <BalanceCard class="info-balance" />
            <NetworkCard class="info-network" />
        </div>
    </div>
</template>
<script lang="ts">
import InterfaceNavigation from "../components/InterfaceNavigation.vue";
import NetworkCard from "../components/NetworkCard.vue";
import BalanceCard from "../components/BalanceCard.vue";
import AccountCard from "../components/AccountCard.vue";
import AdBlockTwitter from "../components/AdBlockTwitter.vue";
import AdBlockBuyHbar from "../components/AdBlockBuyHbar.vue";
import { computed, defineComponent, SetupContext } from "@vue/composition-api";
import { store } from "../store";

export default defineComponent({
    components: {
        InterfaceNavigation,
        NetworkCard,
        BalanceCard,
        AccountCard,
        AdBlockTwitter,
        AdBlockBuyHbar
    },
    props: {},
    setup(props: object, context: SetupContext) {
        if (store.state.wallet.session == null) {
            throw new Error(context.root.$t("common.error.noSession").toString());
        }

        // Not a good idea to show the "buy" button if this isn't mainnet
        const inMainNet = computed(() => store.state.network.network.name.includes("mainnet"));

        // Boolean used to determine if the user has been to interface
        // Otherwise don't show the Logout modal
        store.state.interfaceMenu.hasBeenToInterface = true;

        const account = computed(() => store.state.wallet.session != null ?
            store.state.wallet.session.account :
            null);

        return { account, inMainNet };
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
        "main main ads";
    grid-template-columns: repeat(3, calc(100% * (1 / 3) - (30px / 3)));
    grid-template-rows: min-content 1fr;
    padding: 20px;

    @media (max-width: 1024px) {
        grid-template-areas:
            "info-account info-account info-account"
            "main main main"
            "ads ads ads";
        grid-template-columns: 1fr;
    }
}

.main {
    grid-area: main;
    min-height: 400px;
}

.interface-ads {
    display: grid;
    flex-shrink: 0;
    grid-area: ads;
    grid-auto-flow: row;
    grid-auto-rows: min-content;
    grid-row-gap: 15px;
}

.info-account {
    flex-grow: 1;
    flex-shrink: 0;
    grid-area: info-account;
}

.info-balance {
    flex-shrink: 0;
    grid-area: info-balance;

    @media (max-width: 1024px) {
        display: none;
    }
}

.info-network {
    flex-shrink: 0;
    grid-area: info-network;

    @media (max-width: 1024px) {
        display: none;
    }
}

.actions:first-child {
    display: inline;
}
</style>
