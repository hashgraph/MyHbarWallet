<template>
    <div class="tile-grid">
        <HoverTile
            title="MEWconnect"
            content="Lorem ipsum dolor sit amet, consectetur"
        >
            <img :src="mewConnect" />
        </HoverTile>
        <HoverTile
            title="Hardware"
            content="Ledger wallet, FINNEY, Trezor, Digital bitbox, Secalot, KeepKey"
        >
            <img :src="hardware" />
        </HoverTile>
        <HoverTile
            title="MetaMask"
            content="Lorem ipsum dolor sit amet, consectetur"
        >
            <img :src="metamask" />
        </HoverTile>
        <HoverTile
            title="Software"
            content="Lorem ipsum dolor sit amet, consectetur"
            small-note="Not Recommended"
        >
            <img :src="software" />
        </HoverTile>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import HoverTile from "../components/HoverTile.vue";
import { faWallet, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import mewConnect from "../assets/button-mewconnect.svg";
import hardware from "../assets/button-hardware.svg";
import metamask from "../assets/button-metamask.svg";
import software from "../assets/button-software.svg";

export default Vue.extend({
    components: {
        HoverTile
    },
    computed: {
        faWallet() {
            return faWallet;
        },
        faUnlockAlt() {
            return faUnlockAlt;
        },
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
    display: block;
    grid-column-gap: 30px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    max-width: 900px;
    padding-block: 50px; /* remove */

    /* remove */
    text-align: center;
}

.img {
    font-size: 90px;
    margin-block-end: 5px;
}

@media (min-width: 1025px) {
    .tile-grid {
        display: grid;
        grid-column-gap: 30px;
    }
}
</style>
