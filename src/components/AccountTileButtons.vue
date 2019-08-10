<template>
    <div class="tile-grid">
        <!-- TODO: Add @click="openModal" to AccountTileButton where openModal opens your modal -->
        <AccountTileButton
            title="Hardware"
            content="Ledger wallet, FINNEY, Trezor, Digital bitbox, Secalot, KeepKey"
            :image="hardware"
            @click="$emit('click', 'hardware')"
        />
        <AccountTileButton
            title="Software"
            content="Lorem ipsum dolor sit amet, consectetur"
            :image="software"
            note="Not Recommended"
            @click="$emit('click', 'software')"
        />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import AccountTileButton from "../components/AccountTileButton.vue";
import hardwareImage from "../assets/button-hardware.svg";
import softwareImage from "../assets/button-software.svg";
import { computed } from "vue-function-api";

export default Vue.extend({
    components: {
        AccountTileButton
    },

    setup() {
        const hardware = computed(() => hardwareImage);

        const software = computed(() => softwareImage);

        return { hardware, software };
    }
});
</script>

<style lang="postcss" scoped>
.tile-grid {
    display: grid;
    grid-column-gap: 20px;
    grid-template-columns: 210px 210px;
    justify-items: center;
}

.account-tile-button:last-child {
    &:hover,
    &:focus {
        background-color: var(--color-sunkist-coral);
    }
}
</style>
