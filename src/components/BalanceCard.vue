<template>
    <div class="balance">
        <img :src="walletHbar" />
        <div class="content">
            <div class="top">
                <div class="title">
                    Balance
                </div>
                <div v-if="balance" class="subtitle" type="string">
                    {{ balanceHBar }} ℏ
                    <div class="usd-balance">/ {{ balanceUSD }}</div>
                </div>
                <div v-else class="subtitle-null" type="string">
                    Unknown
                </div>
            </div>
            <div class="actions">
                <MaterialDesignIcon
                    v-if="busy"
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
                        @click="$emit('refresh')"
                    />
                </Tooltip>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";
import { mdiLoading, mdiRefresh } from "@mdi/js";
import Tooltip from "./Tooltip.vue";
import { computed, createComponent, PropType, value } from "vue-function-api";
import walletHbar from "../assets/wallet-hbar.svg";

const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});

interface Props {
    balance: number;
}

export default createComponent({
    components: {
        MaterialDesignIcon,
        Tooltip
    },
    props: {
        busy: (Boolean as unknown) as PropType<boolean>,
        balance: (Number as unknown) as PropType<number>
    },
    setup(props: Props) {
        const balanceHBar = computed(() => {
            return props.balance / 100000000;
        });

        const balanceUSD = computed(() => {
            // FIXME: once the unit store exists, use it
            const usd = balanceHBar.value * 0.12;
            return formatter.format(usd);
        });

        return {
            mdiRefresh,
            mdiLoading,
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
    font-size: 22px;
    user-select: none;

    @media (min-width: 1025px) {
        margin-block-end: 15px;
    }
}

.subtitle-null {
    font-size: 14px;
    font-weight: 300;
    margin-block-end: 27px;
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
    display: inline;
    font-size: 13px;
    opacity: 0.75;
}
</style>
