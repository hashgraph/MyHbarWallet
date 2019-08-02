<template>
    <div class="tile-grid">
        <HoverTile back-color="blue" route="/create-account">
            <HomeHoverTileContent
                title="Create New Account"
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore"
                action-label="Get Started"
                :tile-icon="faWallet"
            />
            <!--Material Design: wallet-outline -->
        </HoverTile>
        <HoverTile back-color="green" route="/access-account">
            <HomeHoverTileContent
                title="Access My Account"
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore"
                action-label="Access Now"
                :tile-icon="faUnlockAlt"
            />
            <!--Material Design: lock-open-outline -->
        </HoverTile>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import HoverTile from "../components/HoverTile.vue";
import HomeHoverTileContent from "../components/HomeHoverTileContent.vue";
import { faWallet, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";

export default Vue.extend({
    components: {
        HoverTile,
        HomeHoverTileContent
    },
    computed: {
        faWallet() {
            return faWallet;
        },
        faUnlockAlt() {
            return faUnlockAlt;
        }
    }
});
</script>

<style lang="postcss" scoped>
.tile-grid {
    display: block;
    grid-column-gap: 30px;
    grid-template-columns: 1fr 1fr;
    padding-block: 50px; /* remove */
    width: 85%;

    /* remove */
}

@media (min-width: 1025px) {
    .tile-grid {
        display: grid;
        max-width: 1024px;
    }
}

@media (max-width: 414px) {
    width: 85%;
}
</style>
