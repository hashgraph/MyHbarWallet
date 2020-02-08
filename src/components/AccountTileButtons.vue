<template>
  <div class="tile-grid">
    <!-- TO DO: Remove div below when hardware option is ready -->
    <div class="ribbon-container">
      <div class="coming-soon">
        {{ $t("common.comingSoon") }}
      </div>
      <AccountTileButton
        :content="$t('accountTileButtons.supportForHardwareWallets')"
        :disabled="true"
        :image="hardwareImage"
        :title="$t('accountTileButtons.hardware')"
        @click="$emit('click', 'hardware')"
      />
    </div>
    <AccountTileButton
      :content="
        $t('accountTileButtons.keystoreFilePrivateKeyMnemonicPhrase')
      "
      :image="softwareImage"
      :note="$t('accountTileButtons.notRecommended')"
      :title="$t('accountTileButtons.software')"
      @click="$emit('click', 'software')"
    />
  </div>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";

import hardwareImage from "../assets/button-hardware.svg";
import softwareImage from "../assets/button-software.svg";

import AccountTileButton from "./AccountTileButton.vue";

export default createComponent({
    name: "AccountTileButtons",
    components: { AccountTileButton },
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

    .account-tile-button:last-child {
        &:hover,
        &:focus {
            background-color: var(--color-sunkist-coral);
        }
    }

    /* TODO: Remove below css when hardware option is ready */
    .coming-soon {
        background-color: var(--color-lightish-red);
        border: 4px double var(--color-white);
        color: var(--color-white);
        font-size: 12px;
        font-weight: 600;
        margin-block-start: 25px;
        margin-inline-start: -45px;
        padding: 5px 40px;
        position: absolute;
        text-rendering: geometricPrecision;
        transform: perspective(1px) rotate(-45deg);
        transform-origin: center;
        user-select: none;
        z-index: 1;
    }
</style>
