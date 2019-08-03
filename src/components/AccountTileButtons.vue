<template>
    <div class="tile-grid">
        <AccountTileButton
            title="MEWconnect"
            content="Lorem ipsum dolor sit amet, consectetur"
            :image="mewConnect"
        />
        <AccountTileButton
            title="Hardware"
            content="Ledger wallet, FINNEY, Trezor, Digital bitbox, Secalot, KeepKey"
            :image="hardware"
        />
        <AccountTileButton
            title="MetaMask"
            content="Lorem ipsum dolor sit amet, consectetur"
            :image="metamask"
        />
        <AccountTileButton
            title="Software"
            content="Lorem ipsum dolor sit amet, consectetur"
            :image="software"
            note="Not Recommended"
        />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import AccountTileButton from "../components/AccountTileButton.vue";
import mewConnect from "../assets/button-mewconnect.svg";
import hardware from "../assets/button-hardware.svg";
import metamask from "../assets/button-metamask.svg";
import software from "../assets/button-software.svg";

export default Vue.extend({
    components: {
        AccountTileButton
    },
    computed: {
        mewConnect() {
            return mewConnect;
        },
        hardware() {
            return hardware;
        },
        metamask() {
            return metamask;
        },
        software() {
            return software;
        }
    }
});
</script>

<style lang="postcss" scoped>
.tile-grid {
    display: grid;
    grid-column-gap: 20px;
    grid-template-columns: 1fr 1fr 1fr 1fr;;
    max-width: 900px;
    padding-block: 50px; /* remove */
    text-align: center;
    /* todo: (mobile) Access-Account page should not have a top level 
    align-items: center; for this overflow to work correctly */
    overflow: auto;
}

.account-tile-button:nth-child(4) {
    &:hover,
    &:focus {
        background-color: var(--color-sunkist-coral);
    }
}
</style>
