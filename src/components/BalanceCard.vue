<template>
    <div class="balance">
        <MaterialDesignIcon class="wallet-icon" :icon="wallet" />
        <div class="content">
            <div class="title">
                Balance
            </div>
            <div v-if="balance" class="subtitle" type="string">
                {{ balance }} ℏ
            </div>
            <div v-else class="subtitle-null" type="string">
                No Balance
            </div>
            <!-- TODO: add Chris's tooltip component? -->
            <MaterialDesignIcon
                v-show="busy"
                class="spinner"
                :icon="spinner"
                spin
            />
            <MaterialDesignIcon
                v-show="!busy"
                class="refresh-icon"
                :icon="refresh"
                @click="doRefresh"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";
import { mdiRefresh, mdiWalletOutline, mdiLoading } from "@mdi/js";

export default Vue.extend({
    components: {
        MaterialDesignIcon
    },
    props: {
        image: { type: String, default: null },
        balance: { type: String, default: null }
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
        wallet() {
            return mdiWalletOutline;
        },
        spinner() {
            return mdiLoading;
        }
    },
    methods: {
        doRefresh() {
            console.log("HEY");
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
    border-radius: 5px;
    color: var(--color-white);
    display: flex;
    padding: 25px;
}

.wallet-icon {
    align-self: flex-start;
    height: 60px;
    margin-block-start: 10px;
    margin-inline-end: 25px;
    width: 60px;
}

.title {
    font-size: 22px;
    font-weight: 500;
}

.subtitle {
    font-size: 22px;
    font-weight: 500;
    margin-block-end: 15px;
}

.subtitle-null {
    font-size: 14px;
    font-weight: 300;
    margin-block-end: 27px;
}
</style>
