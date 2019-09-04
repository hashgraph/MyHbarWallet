<template>
    <div class="balance">
        <img :src="walletHbar" />
        <div class="content">
            <div class="top">
                <div class="title">
                    Balance
                </div>
                <div v-if="hasFetchedBalance" class="subtitle" type="string">
                    <div class="hbar-balance">{{ balanceHBarFormatted }} ℏ</div>
                    <div class="usd-balance">{{ balanceUSDFormatted }}</div>
                </div>
                <div v-else class="subtitle-null" type="string">
                    Unknown
                </div>
            </div>
            <div class="actions">
                <MaterialDesignIcon
                    v-if="state.isBusy"
                    class="spinner"
                    :icon="mdiLoading"
                    spin
                />
                <Tooltip
                    v-else
                    class="action"
                    :pinnable="false"
                    message="Refresh Balance"
                >
                    <MaterialDesignIcon
                        class="refresh-icon"
                        :icon="mdiRefresh"
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
import { computed, createComponent, reactive } from "@vue/composition-api";
import walletHbar from "../assets/wallet-hbar.svg";
import store from "../store";
import { REFRESH_BALANCE } from "../store/actions";
import { formatHbar, formatUSD } from "../formatter";
import BigNumber from "bignumber.js";

export default createComponent({
    components: {
        MaterialDesignIcon,
        Tooltip
    },
    setup() {
        const state = reactive({
            isBusy: false
        });

        const hasFetchedBalance = computed(
            () => store.state.wallet.balance != null
        );

        const balanceHbar = computed(() =>
            (store.state.wallet.balance || new BigNumber(0)).div(100000000)
        );

        const balanceHBarFormatted = computed(() => {
            const balance = balanceHbar.value;
            return formatHbar(
                balance.isLessThan(0.0001) ? balance : balance.decimalPlaces(4)
            );
        });

        const balanceUSDFormatted = computed(() => {
            const balanceUSD = balanceHbar.value.multipliedBy(0.12);
            return formatUSD(balanceUSD);
        });

        async function handleRefreshBalance(): Promise<void> {
            state.isBusy = true;

            try {
                await store.dispatch(REFRESH_BALANCE);
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
            handleRefreshBalance,
            balanceHbar,
            balanceHBarFormatted,
            balanceUSDFormatted
        };
    }
});
</script>

<style scoped lang="postcss">
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
