<template>
    <div class="AdBlockBuyHbar">
        <div class="AdBlockBuyHbar-follow">
            {{ $t("ads.buyHbarWithCard") }}
        </div>
        <div class="AdBlockBuyHbar-action">
            <Button :label="$t('ads.buyHbarNow')" outline compact @click="handleOpenBuyModal" />
            <img class="AdBlockBuyHbar-icon" :src="visaMasterImage" />
        </div>
        <img class="AdBlockBuyHbar-backdrop" :src="iconHBarOutline" />
        <ModalPurchaseHbar v-model="state.isOpen" />
    </div>
</template>

<script lang="ts">
import { createComponent, reactive } from "@vue/composition-api";
import MaterialDesignIcon from "../components/MaterialDesignIcon.vue";
import Button from "../components/Button.vue";
import visaMasterImage from "../assets/visamaster.png";
import ModalPurchaseHbar from "../components/ModalPurchaseHbar.vue";
import iconHBarOutline from "../assets/icon-hbar-outline.svg";
import { mdiTwitter } from "@mdi/js";

export default createComponent({
    components: { Button, MaterialDesignIcon, ModalPurchaseHbar },
    setup() {
        const state = reactive({ isOpen: false });

        function handleOpenBuyModal(): void {
            state.isOpen = true;
        }

        return {
            state,
            mdiTwitter,
            visaMasterImage,
            handleOpenBuyModal,
            iconHBarOutline
        };
    }
});
</script>

<style scoped lang="postcss">
.AdBlockBuyHbar {
    display: flex;
    flex-direction: column;
    padding: 20px;
    align-items: flex-start;
    justify-content: center;
    border-radius: 5px;
    color: var(--color-washed-black);
    background: white;
    font-size: 18px;
    font-weight: 600;
    position: relative;
    overflow: hidden;
}

.AdBlockBuyHbar-backdrop {
    position: absolute;
    height: 150%;
    right: -30px;
    opacity: 0.3;
}

.AdBlockBuyHbar-action {
    display: flex;
    margin-top: 15px;
    align-items: center;
}

.AdBlockBuyHbar-button {
    border: 1px solid var(--color-melbourne-cup);
    border-radius: 5px;
}

.AdBlockBuyHbar-icon {
    margin-left: 10px;
    height: 26px;
}
</style>
