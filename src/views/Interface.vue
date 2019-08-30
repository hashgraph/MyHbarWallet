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
                :realm="account.realm"
                :shard="account.shard"
                :account="account.account"
                class="info-account"
                :public-key="publicKey"
            />
            <BalanceCard
                :balance="state.balance"
                :busy="state.balanceIsBusy"
                class="info-balance"
                @refresh="handleBalanceRefresh"
            />
            <NetworkCard class="info-network" />
        </div>
    </div>
</template>

<script lang="ts">
import InterfaceNavigation from "../components/InterfaceNavigation.vue";
import NetworkCard from "../components/NetworkCard.vue";
import BalanceCard from "../components/BalanceCard.vue";
import AccountCard from "../components/AccountCard.vue";
import { createComponent, computed, reactive } from "@vue/composition-api";
import store from "../store";

export default createComponent({
    components: {
        InterfaceNavigation,
        NetworkCard,
        BalanceCard,
        AccountCard
    },
    setup() {
        const publicKey = computed(() =>
            store.state.wallet.session != null
                ? store.state.wallet.session.privateKey.publicKey.toString()
                : null
        );
        const account = computed(() =>
            store.state.wallet.session != null
                ? store.state.wallet.session.account
                : null
        );

        const state = reactive({
            balance: 0,
            balanceIsBusy: false
        });

        async function handleBalanceRefresh() {
            const session = store.state.wallet.session;
            if (session == null) return;

            state.balanceIsBusy = true;

            try {
                const accountBalance: BigInt = await session.client.getAccountBalance();
                state.balance = Number(accountBalance);
            } finally {
                state.balanceIsBusy = false;
            }
        }

        return {
            state,
            handleBalanceRefresh,
            account,
            publicKey
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
    grid-template-rows: min-content 1fr;
    padding: 20px;

    @media (max-width: 1024px) {
        grid-template-areas:
            "info-account info-account info-account"
            "main main main";
        grid-template-columns: 1fr;
    }
}

.main {
    grid-area: main;
    min-height: 400px;
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
