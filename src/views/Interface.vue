<template>
    <div class="interface">
        <InterfaceNavigation />
        <div class="main-container">
            <div class="main">
                <router-view />
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
        <TxHistory :columns="columns" :rows="rows" />
    </div>
</template>

<script lang="ts">
import InterfaceNavigation from "../components/InterfaceNavigation.vue";
import NetworkCard from "../components/NetworkCard.vue";
import BalanceCard from "../components/BalanceCard.vue";
import AccountCard from "../components/AccountCard.vue";
import TxHistory from "../components/TxHistory.vue";
import {
    computed,
    createComponent,
    watch,
    ref,
    Ref
} from "@vue/composition-api";
import store from "../store";
import { Id } from "../store/modules/wallet";
import { Transactions } from "../transactions";

export default createComponent({
    components: {
        InterfaceNavigation,
        NetworkCard,
        BalanceCard,
        AccountCard,
        TxHistory
    },
    setup() {
        const txRows: Ref<Transactions | null> = ref(null);

        // Boolean used to determine if the user has been to interface
        // Otherwise don't show the Logout modal
        store.state.interfaceMenu.hasBeenToInterface = true;

        const account = computed(() =>
            store.state.wallet.session != null
                ? store.state.wallet.session.account
                : null
        );

        async function getData(): Promise<Transactions> {
            const reqAccount = account.value as Id;
            const axios = (await import("axios")).default;
            const response = await axios.get(
                "http://api.kabuto.sh/v1/account/" +
                    reqAccount.realm +
                    "." +
                    reqAccount.shard +
                    "." +
                    reqAccount.account +
                    "/transaction"
            );
            return response.data;
        }

        watch(getData, async (result: Promise<Transactions>) => {
            txRows.value = await result;
        });

        const columns = ["1", "2", "3"];

        const rows = computed(() => {
            if (txRows.value !== null) {
                return txRows.value.transactions;
            }

            return "";
        });

        return {
            account,
            columns,
            rows
        };
    }
});
</script>

<style lang="postcss" scoped>
.interface {
    background-color: var(--color-boysenberry-shadow);
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
