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
import Feature from "@/components/Feature.vue";
import wallet from "../assets/icon-wallet.svg";
import hardware from "../assets/icon-hardware.svg";
import { createComponent } from "vue-function-api";

export default createComponent({
    components: {
        Feature
    },
    setup() {
        return {
            wallet,
            hardware
        };
    }
});
</script>

<style lang="postcss" scoped>
.wrap {
    padding: 85px 0;

    @media (max-width: 500px) {
        padding: 40px 0;
    }
}

.feature-grid {
    display: grid;
    grid-column-gap: 130px;
    grid-row-gap: 90px;
    grid-template-columns: auto auto;
    margin: 0 auto;
    max-width: 1024px;
    padding: 0 20px;

    @media (max-width: 1024px) {
        grid-row-gap: 70px;
        grid-template-columns: auto;
        padding: 0 25px;
    }

    @media (max-width: 500px) {
        grid-row-gap: 40px;
    }
}
</style>
