<template>
    <div class="tile-grid">
        <!-- TODO: Add @click="openModal" to AccountTileButton where openModal opens your modal -->
        <AccountTileButton
            title="Hardware"
            disabled
            content="Ledger wallet, FINNEY, Trezor, Digital bitbox, Secalot, KeepKey"
            :image="hardwareImage"
            @click="$emit('click', 'hardware')"
        />
        <AccountTileButton
            title="Software"
            content="Lorem ipsum dolor sit amet, consectetur"
            :image="softwareImage"
            note="Not Recommended"
            @click="$emit('click', 'software')"
        />
    </div>
</template>

<script lang="ts">
import AccountTileButton from "../components/AccountTileButton.vue";
import hardwareImage from "../assets/button-hardware.svg";
import softwareImage from "../assets/button-software.svg";
import { createComponent } from "vue-function-api";

export default createComponent({
    components: {
        AccountTileButton
    },

    setup() {
        return { hardwareImage, softwareImage };
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
