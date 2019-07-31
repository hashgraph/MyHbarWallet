<template>
    <div class="tile-grid">
        <HoverTile
            is-first="true"
            title="Create New Account"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore"
            action-label="Get Started"
        >
            <FontAwesomeIcon class="icon" :icon="faWallet" />
        </HoverTile>
        <HoverTile
            title="Access My Account"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore"
            action-label="Access Now"
        >
            <FontAwesomeIcon class="icon" :icon="faUnlockAlt" />
        </HoverTile>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import HoverTile from "../components/HoverTile.vue";
import { faWallet, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";

export default Vue.extend({
    components: {
        HoverTile,
        FontAwesomeIcon
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
}

.icon {
    height: 83.25px;
    width: 87px;
}

@media (min-width: 1025px) {
    .tile-grid {
        display: grid;
        grid-column-gap: 30px;
    }
}
</style>
