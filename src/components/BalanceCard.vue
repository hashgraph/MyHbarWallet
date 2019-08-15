<template>
    <div class="balance">
        <img :src="walletHbar" />
        <div class="content">
            <div class="top">
                <div class="title">
                    Balance
                </div>

                <div v-if="balance" class="subtitle" type="string">
                    {{ balance }} ℏ
                    <div class="usd-balance">/ {{ balanceUSD }}</div>
                </div>
                <div v-else class="subtitle-null" type="string">
                    Unknown
                </div>
            </div>
            <div class="actions">
                <!-- TODO: add Chris's tooltip component? -->
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
                        @click="handleRefresh"
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
        balance: (Number as unknown) as PropType<number>
    },
    setup(props: Props) {
        const balanceUSD = computed(() => {
            // FIXME: once the unit store exists, use it
            const usd = props.balance * 0.12;
            return formatter.format(usd);
        });

        const busy = value(false);

        function handleRefresh() {
            console.warn("todo: check balance");

            busy.value = true;

            console.log("busy: " + busy);

            setTimeout(() => {
                busy.value = false;
                console.log("busy: " + busy);
            }, 2000);
        }

        return {
            busy,
            mdiRefresh,
            mdiLoading,
            balanceUSD,
            handleRefresh,
            walletHbar
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
}

img {
    align-self: flex-start;
    margin-block-start: 10px;
    margin-inline-end: 25px;
    user-select: none;
    width: 60px;
}

.title {
    font-size: 22px;
    font-weight: 500;
    user-select: none;
}

.subtitle {
    font-size: 22px;
    margin-block-end: 15px;
    user-select: none;
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
    justify-content: space-between;
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
