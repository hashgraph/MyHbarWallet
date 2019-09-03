<template>
    <div class="tile-grid">
        <HomeTileButton
            title="Create A New Wallet"
            content="Generate your private key and obtain an account ID. Key saving and security is your responsibility."
            :image="wallet"
            route="create-account"
            action="Get Started"
        />

        <HomeTileButton
            title="Access My Account"
            content="Send or swap your ETH and tokens, purchase ENS domains, interact with smart contracts, and more! This is where the magic happens."
            :image="unlock"
            route="access-my-account"
            action="Access Now"
        />
    </div>
</template>

<script lang="ts">
import HomeTileButton from "../components/HomeTileButton.vue";
import unlockWallet from "../assets/unlock-wallet.png";
import walletImage from "../assets/wallet-hbar.svg";
import { createComponent } from "@vue/composition-api";

export default createComponent({
    components: {
        HomeTileButton
    },
    setup() {
        const wallet = walletImage;

        const unlock = unlockWallet;

        return { wallet, unlock };
    }
});
</script>

<style lang="postcss" scoped>
.tile-grid {
    display: grid;
    grid-column-gap: 30px;
    grid-row-gap: 10px;

    @media (min-width: 1025px) {
        grid-template-columns: 1fr 1fr;
        max-width: 1024px;
    }

    @media (max-width: 414px) {
        grid-row-gap: 15px;
    }
}

.home-tile-button:last-child {
    background-color: var(--color-melbourne-cup);
}
</style>
