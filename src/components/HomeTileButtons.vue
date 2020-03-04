<template>
    <div class="tile-grid">
        <HomeTileButton
            :title="$t('homeTileButtons.createNewAccount')"
            :content="$t('homeTileButtons.generateYourPrivateKey')"
            :image="wallet"
            route="create-account"
            :action="$t('homeTileButtons.getStarted')"
        />

        <HomeTileButton
            :title="$t('common.accessMyAccount')"
            :content="$t('homeTileButtons.manageAnAccount')"
            :image="unlock"
            route="access-my-account"
            :action="$t('homeTileButtons.accessNow')"
        />
    </div>
</template>

<script lang="ts">
import HomeTileButton from "../components/HomeTileButton.vue";
import unlockWallet from "../assets/unlock-wallet.png";
import walletImage from "../assets/wallet-hbar.svg";
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
    components: { HomeTileButton },
    props: {},
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
        grid-row-gap: 8px;
    }
}

.home-tile-button:last-child {
    background-color: var(--color-melbourne-cup);
}
</style>
