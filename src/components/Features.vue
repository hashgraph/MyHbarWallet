<template>
    <div class="features">
        <div class="wrap">
            <div class="feature-grid">
                <Feature>
                    <template v-slot:image>
                        <img alt="wallet" :src="wallet" />
                    </template>
                    <template v-slot:title>
                        Join MHW
                    </template>
                    <template v-slot:content>
                        Access the Hedera Hashgraph's original and most-trusted
                        wallet client, now with a host of features all contained
                        in an elegant, easy-to-use interface.
                    </template>
                </Feature>
                <Feature>
                    <template v-slot:image>
                        <img alt="hardware" :src="hardware" />
                    </template>
                    <template v-slot:title>
                        Hardware Wallet Support
                    </template>
                    <template v-slot:content>
                        MHW offers support for all major hardware wallets,
                        including Ledger, Trezor, and many more.
                    </template>
                </Feature>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import {} from "@mdi/js";
import Feature from "@/components/Feature.vue";
import Wallet from "@/assets/icon-wallet.svg";
import Hardware from "@/assets/icon-hardware.svg";

export default Vue.extend({
    name: "Features",
    components: {
        Feature
    },
    computed: {
        wallet() {
            return Wallet;
        },
        hardware() {
            return Hardware;
        }
    }
});
</script>

<style lang="postcss" scoped>
.wrap {
    padding: 85px 0;
}

.feature-grid {
    display: grid;
    grid-column-gap: 130px;
    grid-row-gap: 90px;
    grid-template-columns: 1fr 1fr;
    margin: 0 auto;
    max-width: 1024px;
    padding: 0 20px;

    @media (max-width: 1025px) {
        grid-row-gap: 70px;
        grid-template-columns: 1fr;
    }
}
</style>
