<template>
    <div class="hardware-link">
        {{
            $t(
                "purchaseWalletLink.purchaseAHardwareWalletForTheHighestSecurity"
            )
        }}
        <router-link :to="{ name: 'hardware-wallet-affiliates' }">
            {{ $t("purchaseWalletLink.purchaseAHardwareWallet") }}
        </router-link>
    </div>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";

export default createComponent({});
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
    display: block;
    text-decoration: none;

    &:hover,
    &:focus {
        text-decoration: underline;
    }
}
</style>
