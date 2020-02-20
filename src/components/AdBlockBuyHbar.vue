<template>
    <div class="AdBlockBuyHbar">
        <div class="AdBlockBuyHbar-follow">
            {{ $t("ads.buyHbarWithCard") }}
        </div>
        <div class="AdBlockBuyHbar-action">
            <Button
                :label="$t('ads.buyHbarNow')"
                outline
                compact
                @click="handleOpenBuyModal"
            />
            <img
                class="AdBlockBuyHbar-icon"
                :src="visaMasterImage"
            >
        </div>
        <img
            class="AdBlockBuyHbar-backdrop"
            :src="iconHBarOutline"
        >
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
    align-items: flex-start;
    background: white;
    border-radius: 5px;
    color: var(--color-washed-black);
    display: flex;
    flex-direction: column;
    font-size: 18px;
    font-weight: 600;
    justify-content: center;
    overflow: hidden;
    padding: 20px;
    position: relative;
}

.AdBlockBuyHbar-backdrop {
    height: 150%;
    inset-inline-end: -30px;
    opacity: 0.3;
    position: absolute;
}

.AdBlockBuyHbar-action {
    align-items: center;
    display: flex;
    margin-block-start: 15px;
}

.AdBlockBuyHbar-button {
    border: 1px solid var(--color-melbourne-cup);
    border-radius: 5px;
}

.AdBlockBuyHbar-icon {
    height: 26px;
    margin-inline-start: 10px;
}
</style>
