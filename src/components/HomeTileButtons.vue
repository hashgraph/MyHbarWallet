<template>
  <div class="tile-grid">
    <HomeTileButton
      :action="$t('homeTileButtons.getStarted')"
      :content="$t('homeTileButtons.generateYourPrivateKey')"
      :image="wallet"
      :title="$t('homeTileButtons.createNewAccount')"
      route="create-account"
    />

    <HomeTileButton
      :action="$t('homeTileButtons.accessNow')"
      :content="$t('homeTileButtons.manageAnAccount')"
      :image="unlock"
      :title="$t('common.accessMyAccount')"
      route="access-my-account"
    />
  </div>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";

import unlockWallet from "../assets/unlock-wallet.png";
import walletImage from "../assets/wallet-hbar.svg";

import HomeTileButton from "./HomeTileButton.vue";

export default createComponent({
    name: "HomeTileButtons",
    components: { HomeTileButton },
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
