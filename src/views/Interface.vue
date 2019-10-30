<template>
    <div class="interface">
        <WarningHeaderBanner
            v-if="false"
            :message="$t('interface.warnings.insecureSession')"
            @dismiss="onDismiss"
        />
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
    </div>
</template>
// TODO[11-15-2019] change v-if in Warning Header Banner to state.showWarning
<script lang="ts">
import InterfaceNavigation from "../components/InterfaceNavigation.vue";
import NetworkCard from "../components/NetworkCard.vue";
import BalanceCard from "../components/BalanceCard.vue";
import AccountCard from "../components/AccountCard.vue";
import WarningHeaderBanner from "../components/WarningHeaderBanner.vue";
import {
    computed,
    createComponent,
    reactive,
    SetupContext
} from "@vue/composition-api";
import store from "../store";
import { LoginMethod } from "../wallets/Wallet";

export default createComponent({
    components: {
        WarningHeaderBanner,
        InterfaceNavigation,
        NetworkCard,
        BalanceCard,
        AccountCard
    },
    setup(props: object, context: SetupContext) {
        if (store.state.wallet.session === null) {
            throw new Error(
                context.root.$t("common.error.noSession").toString()
            );
        }

        // Boolean used to determine if the user has been to interface
        // Otherwise don't show the Logout modal
        store.state.interfaceMenu.hasBeenToInterface = true;

        const loginMethod = store.state.wallet.session.wallet.getLoginMethod();

        const state = reactive({
            showWarning:
                loginMethod != LoginMethod.KeyStore &&
                loginMethod != LoginMethod.Hardware
        });

        function onDismiss(): void {
            state.showWarning = false;
        }

        const account = computed(() =>
            store.state.wallet.session != null
                ? store.state.wallet.session.account
                : null
        );

        return {
            state,
            account,
            onDismiss
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
