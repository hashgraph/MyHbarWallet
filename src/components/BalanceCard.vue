<template>
    <div class="balance">
        <img src="@/assets/wallet.svg" />
        <div class="content">
            <div class="title">
                Balance
            </div>

            <div v-if="balance" class="subtitle" type="string">
                {{ balance }} ℏ
            </div>
            <div v-else class="subtitle-null" type="string">
                Unknown
            </div>

            <!-- TODO: add Chris's tooltip component? -->

            <MaterialDesignIcon
                v-if="busy"
                class="spinner"
                :icon="spinner"
                spin
            />
            <MaterialDesignIcon
                v-else
                class="refresh-icon"
                :icon="refresh"
                @click="handleRefresh"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";
import { mdiRefresh, mdiLoading } from "@mdi/js";

export default Vue.extend({
    components: {
        MaterialDesignIcon
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
    align-items: center;
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
    font-weight: 300;
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
</style>
