<template>
    <div class="hardware-link">
        <router-link :to="{ name: 'hardware-wallet-affiliates' }">
            {{ $t("purchaseWalletLink.purchaseAHardwareWallet") }}
        </router-link>
        {{ $t("purchaseWalletLink.purchaseAHardwareWalletForTheHighestSecurity") }}
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({ name: "PurchaseWalletLink" });
</script>

<style lang="postcss" scoped>
.hardware-link {
    color: var(--color-china-blue);
    font-size: 14px;
    padding: 20px;
    text-align: center;
}

a {
    color: var(--color-melbourne-cup);
    display: inline-block;
    text-decoration: none;

    &:hover,
    &:focus {
        text-decoration: underline;
    }
}
</style>
