<template>
    <div class="features">
        <div class="wrap">
            <div class="feature-grid">
                <Feature :image="wallet" title="Join MyHederaWallet">
                    Access the Hedera Hashgraph's original and most-trusted
                    wallet client, now with a host of features all contained in
                    an elegant, easy-to-use interface.
                </Feature>
                <Feature :image="hardware" title="Hardware Wallet Support">
                    MHW offers support for all major hardware wallets, including
                    Ledger, Trezor, and many more.
                </Feature>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Feature from "@/components/Feature.vue";
import imageWallet from "@/assets/icon-wallet.svg";
import imageHardware from "@/assets/icon-hardware.svg";

export default Vue.extend({
    name: "Features",
    components: {
        Feature
    },
    computed: {
        wallet() {
            return imageWallet;
        },
        hardware() {
            return imageHardware;
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
    grid-template-columns: auto auto;
    margin: 0 auto;
    max-width: 1024px;
    padding: 0 20px;

    @media (max-width: 1025px) {
        grid-row-gap: 70px;
        grid-template-columns: auto;
        padding: 0 25px;
    }
}
</style>
