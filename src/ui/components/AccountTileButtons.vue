<template>
    <div class="tile-grid">
        <AccountTileButton
            :title="$t('accountTileButtons.hardware')"
            :content="$t('accountTileButtons.walletsSupported')"
            :image="hardwareImage"
            @click="$emit('click', 'hardware')"
        />
        <AccountTileButton
            :title="$t('accountTileButtons.software')"
            :content="
                $t('accountTileButtons.keystoreFilePrivateKeyMnemonicPhrase')
            "
            :image="softwareImage"
            @click="$emit('click', 'software')"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

import hardwareImage from "../assets/button-hardware.svg";
import softwareImage from "../assets/button-software.svg";

import AccountTileButton from "./AccountTileButton.vue";

export default defineComponent({
    name: "AccountTileButtons",
    components: { AccountTileButton },
    props: {},
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

.ribbon-container {
    align-items: stretch;
    display: flex;
    overflow: hidden;
    padding: 0;
    position: relative;
}
</style>
