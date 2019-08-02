<template>
    <div class="tile-grid">
        <HoverTile back-color="none toGreen">
            <template v-slot="{ hovered }">
                <HoverTileContent
                    title="MEWconnect"
                    content="Lorem ipsum dolor sit amet, consectetur"
                    :img-path="mewConnect"
                    :hovered="hovered"
                />
            </template>
        </HoverTile>
        <HoverTile back-color="none toBlue">
            <template v-slot="{ hovered }">
                <HoverTileContent
                    title="Hardware"
                    content="Ledger wallet, FINNEY, Trezor, Digital bitbox, Secalot, KeepKey"
                    :img-path="hardware"
                    :hovered="hovered"
                />
            </template>
        </HoverTile>
        <HoverTile back-color="none">
            <template v-slot="{ hovered }">
                <HoverTileContent
                    title="MetaMask"
                    content="Lorem ipsum dolor sit amet, consectetur"
                    :img-path="metamask"
                    :hovered="hovered"
                />
            </template>
        </HoverTile>
        <HoverTile back-color="none">
            <template v-slot="{ hovered }">
                <HoverTileContent
                    title="Software"
                    content="Lorem ipsum dolor sit amet, consectetur"
                    small-note="Not Recommended"
                    :img-path="software"
                    :hovered="hovered"
                />
            </template>
        </HoverTile>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import HoverTileContent from "../components/AccessAccountHoverTileContent.vue";
import HoverTile from "../components/HoverTile.vue";
import mewConnect from "../assets/button-mewconnect.svg";
import hardware from "../assets/button-hardware.svg";
import metamask from "../assets/button-metamask.svg";
import software from "../assets/button-software.svg";

export default Vue.extend({
    components: {
        HoverTile,
        HoverTileContent
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
    text-align: center;
}

@media (min-width: 1025px) {
    .tile-grid {
        display: grid;
        grid-column-gap: 30px;
    }
}
</style>
