<template>
    <div class="tile-grid">
        <!-- fixme: Material Design: wallet-outline -->
        <HomeTileButton
            title="Create A New Wallet"
            content="Obtain an ETH address and generate your private key. Saving and safekeeping the key will be your responsibility."
            :icon="wallet"
            route="create-account"
            action="Get Started"
        />

        <!--Material Design: lock-open-outline -->
        <HomeTileButton
            title="Access My Account"
            content="Send or swap your ETH and tokens, purchase ENS domains, interact with smart contracts, and more! This is where the magic happens."
            :icon="unlock"
            route="access-my-account"
            action="Access Now"
        />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import HomeTileButton from "../components/HomeTileButton.vue";
import { mdiWallet, mdiLockOpen } from "@mdi/js";

export default Vue.extend({
    components: {
        HomeTileButton
    },
    computed: {
        wallet() {
            return mdiWallet;
        },
        unlock() {
            return mdiLockOpen;
        }
    },
    methods: {
        handleClickLeft() {
            console.log("LEFTG");
        }
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

.home-tile-button:nth-child(2) {
    background-color: var(--color-melbourne-cup);
}
</style>
