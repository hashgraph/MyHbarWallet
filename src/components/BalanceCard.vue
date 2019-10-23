<template>
    <div class="balance">
        <img :src="walletHbar" />
        <div class="content">
            <div class="top">
                <div class="title">
                    {{ $t("balanceCard.balance") }}
                </div>
                <div v-if="hasFetchedBalance" class="subtitle" type="string">
                    <div class="hbar-balance">
                        {{ state.balanceHbarFormatted }} ℏ
                    </div>
                    <div v-if="hasFetchedRate" class="usd-balance">
                        {{ state.balanceUSDFormatted }}
                    </div>
                </div>
                <div v-else class="subtitle-null" type="string">
                    {{ $t("balanceCard.unknown") }}
                </div>
            </div>
            <div class="actions">
                <MaterialDesignIcon
                    v-if="state.isBusy"
                    :icon="mdiLoading"
                    class="spinner"
                    spin
                />
                <Tooltip
                    v-else
                    :message="$t('balanceCard.refreshBalance')"
                    :pinnable="false"
                    class="action"
                >
                    <MaterialDesignIcon
                        :icon="mdiRefresh"
                        class="refresh-icon"
                        @click="handleRefreshBalance"
                    />
                </Tooltip>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import MaterialDesignIcon from "../components/MaterialDesignIcon.vue";
import { mdiLoading, mdiRefresh } from "@mdi/js";
import Tooltip from "./Tooltip.vue";
import {
    computed,
    createComponent,
    onMounted,
    reactive
} from "@vue/composition-api";
import walletHbar from "../assets/wallet-hbar.svg";
import store from "../store";
import { REFRESH_BALANCE_AND_RATE } from "../store/actions";
import { formatHbar, formatUSD } from "../formatter";

interface State {
    isBusy: boolean;
    balanceHbarFormatted: string;
    balanceUSDFormatted: string;
}

export default createComponent({
    components: {
        MaterialDesignIcon,
        Tooltip
    },
    async setup() {
        const state = reactive<State>({
            isBusy: false,
            balanceHbarFormatted: "",
            balanceUSDFormatted: ""
        });

        const hasFetchedBalance = computed(
            () => store.state.wallet.balance != null
        );

        const hasFetchedRate = computed(
            () => store.state.wallet.exchangeRate != null
        );

        onMounted(async () => {
            const { Hbar, BigNumber } = await (import(
                "@hashgraph/sdk"
            ) as Promise<typeof import("@hashgraph/sdk")>);

            const balance = store.state.wallet.balance || Hbar.zero();
            const exchangeRate =
                store.state.wallet.exchangeRate || new BigNumber(0);

            const formattedUSD = await formatUSD(
                balance.as("hbar").multipliedBy(exchangeRate)
            );

            state.balanceHbarFormatted = formatHbar(balance);
            state.balanceUSDFormatted = "≈ " + formattedUSD;
        });

        async function handleRefreshBalance(): Promise<void> {
            state.isBusy = true;

            try {
                await store.dispatch(REFRESH_BALANCE_AND_RATE);
            } finally {
                setTimeout(() => {
                    state.isBusy = false;
                }, 75);
            }
        }

        return {
            mdiRefresh,
            mdiLoading,
            walletHbar,
            state,
            hasFetchedBalance,
            hasFetchedRate,
            handleRefreshBalance
        };
    }
});
</script>

<style lang="postcss" scoped>
.balance {
    background-color: var(--color-byzantine-night-blue);
    border-radius: 4px;
    color: var(--color-white);
    display: flex;
    padding: 25px;

    @media (max-width: 1024px) {
        padding: 20px;
    }
}

img {
    align-self: flex-start;
    margin-block-start: 10px;
    margin-inline-end: 25px;
    user-select: none;
    width: 60px;

    @media (max-width: 1024px) {
        display: none;
    }
}

.title {
    font-size: 22px;
    font-weight: 500;
    user-select: none;

    @media (max-width: 1024px) {
        margin-block-end: 15px;
    }
}

.subtitle {
    font-size: 18px;
    font-weight: 500;
    user-select: none;

    @media (min-width: 1025px) {
        margin-block-end: 15px;
    }
}

.subtitle-null {
    font-size: 14px;
    font-weight: 300;
    margin-block-end: 42px;
}

.refresh-icon {
    cursor: pointer;
    height: 28px;
    width: 28px;
}

.content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;

    @media (max-width: 1024px) {
        flex-direction: row;
    }
}

.actions {
    align-items: center;
    display: flex;
}

.usd-balance {
    font-size: 14px;
    opacity: 0.75;
}

.spinner {
    margin-block-start: 4px;
}
</style>
