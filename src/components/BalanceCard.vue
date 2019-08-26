<template>
    <div class="balance">
        <img :src="walletHbar" />
        <div class="content">
            <div class="top">
                <div class="title">
                    Balance
                </div>
                <div v-if="hasFetchedBalance" class="subtitle" type="string">
                    <div class="hbar-balance">{{ balanceHBar }} ℏ</div>
                    <div class="usd-balance">{{ balanceUSD }}</div>
                </div>
                <div v-else class="subtitle-null" type="string">
                    Unknown
                </div>
            </div>
            <div class="actions">
                <MaterialDesignIcon
                    v-if="isBusy"
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
import { computed, createComponent, value } from "@vue/composition-api";
import walletHbar from "../assets/wallet-hbar.svg";
import store from "../store";
import { REFRESH_BALANCE } from "../store/actions";

const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});

export default createComponent({
    components: {
        MaterialDesignIcon,
        Tooltip
    },
    setup() {
        const isBusy = value(false);
        const hasFetchedBalance = computed(
            () => store.state.wallet.balance != null
        );

        const balanceHBar = computed(() => {
            const hbar = Number(store.state.wallet.balance || 0) / 100000000;
            return formatter
                .format(Number(hbar < 0.0001 ? hbar : hbar.toFixed(4)))
                .split("$")[1];
        });

        const balanceUSD = computed(() => {
            const usd =
                (Number(store.state.wallet.balance || 0) / 100000000) * 0.12;
            return formatter.format(usd);
        });

        async function handleRefreshBalance() {
            isBusy.value = true;

            try {
                await store.dispatch(REFRESH_BALANCE);
            } finally {
                setTimeout(() => {
                    isBusy.value = false;
                }, 75);
            }
        }

        return {
            mdiRefresh,
            mdiLoading,
            isBusy,
            hasFetchedBalance,
            handleRefreshBalance,
            balanceUSD,
            walletHbar,
            balanceHBar
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
