<template>
    <div class="tile-grid">
        <!-- TODO: Remove div below when hardware option is ready -->
        <div class="coming-soon">Hardware Coming Soon!</div>
        <AccountTileButton
            disabled
            title="Hardware"
            content="Trezor (support for more wallets in development)"
            :image="hardwareImage"
            @click="$emit('click', 'hardware')"
        />
        <AccountTileButton
            title="Software"
            content="Keystore file, Private key, Mnemonic phrase"
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
import { createComponent } from "@vue/composition-api";

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
    grid-gap: 20px;
    grid-template-columns: 210px 210px;
    justify-items: center;

    @media (max-width: 600px) {
        grid-template-columns: auto;
        padding-inline: 20px;

        & .account-tile-button {
            width: 100%;
        }
    }
}

.account-tile-button:last-child {
    &:hover,
    &:focus {
        background-color: var(--color-sunkist-coral);
    }
}

/* TODO: Remove below css when hardware option is ready */
.coming-soon {
    background-color: var(--color-white);
    border: 1px solid var(--color-lightish-red);
    border-radius: 5px;
    color: var(--color-lightish-red);
    padding: 10px;
    position: absolute;
    transform: translate(-53%, 115px) rotate(-45deg);
    user-select: none;
    z-index: 1;

    @media (max-width: 600px) {
        padding: 15px;
        transform: translate(-10%, 100%);
    }
}
</style>
