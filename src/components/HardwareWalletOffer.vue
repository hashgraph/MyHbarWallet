<template>
    <div class="hardware-wallet-offer">
        <div class="offer-description">
            <p class="starting-from">Starting from</p>
            <div class="cost-container">
                {{ currency }}<span class="cost">{{ cost }}</span>
            </div>
            <p>{{ description }}</p>
            <a class="green-link" :href="moreInfo">More information</a>
        </div>
        <img :src="imgSrc" class="logo-image" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "HardwareWalletOffer",
    props: {
        description: { type: String, required: true },
        imgSrc: { type: String, required: true },
        cost: { type: Number, required: true },
        currency: { type: String, required: true },
        moreInfo: { type: String, required: true }
    }
});
</script>

<style lang="postcss" scoped>
.hardware-wallet-offer {
    align-items: center;
    background-color: White;
    border-color: White;
    border-radius: 4px;
    display: flex;
    margin: 7px auto;
    max-width: 720px;
    padding: 26px 34px;
}

.offer-description {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.logo-image {
    margin-inline-start: 30px;
    max-height: 42px;
    max-width: 140px;
    vertical-align: middle;
}

.cost-container {
    font-size: 14px;
}

.cost {
    font-size: 18px;
    font-weight: 500;
}

.starting-from {
    font-size: 12px;
}

.green-link {
    color: var(--color-melbourne-cup);
    text-decoration: none;
}
</style>
