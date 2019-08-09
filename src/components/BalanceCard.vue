<template>
    <div class="balance">
        <img src="@/assets/wallet.svg" />
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
                    :icon="spinner"
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
                        :icon="refresh"
                        @click="handleRefresh"
                    />
                </Tooltip>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";
import { mdiRefresh, mdiLoading } from "@mdi/js";
import Tooltip from "./Tooltip.vue";

let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});

export default Vue.extend({
    components: {
        MaterialDesignIcon,
        Tooltip
    },
    props: {
        balance: { type: Number, default: null }
    },
    data() {
        return {
            busy: false
        };
    },
    computed: {
        refresh() {
            return mdiRefresh;
        },
        spinner() {
            return mdiLoading;
        },
        balanceUSD() {
            let usd = this.balance * 0.12;
            let usdFormatted = formatter.format(usd);
            return usdFormatted;
        }
    },
    methods: {
        handleRefresh() {
            console.warn("todo: check balance");

            this.busy = true;

            setTimeout(() => {
                this.busy = false;
            }, 2000);
        }
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
