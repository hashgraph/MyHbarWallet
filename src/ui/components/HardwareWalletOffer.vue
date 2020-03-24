<template>
    <div class="hardware-wallet-offer">
        <div class="offer-description">
            <div class="starting-from">
                {{ $t("hardwareWalletOffer.startingFrom") }}
            </div>
            <div class="cost-container">
                {{ currency }}<span class="cost">{{ cost }}</span>
            </div>
            <div class="description-text">
                {{ description }}
            </div>
            <a
                rel="noopener"
                target="_blank"
                class="green-link"
                :href="moreInfo"
            >
                {{ $t("hardwareWalletOffer.moreInformation") }} >
            </a>
        </div>
        <a
            :href="moreInfo"
            rel="noopener"
            target="_blank"
        >
            <img
                :src="image"
                class="logo-image"
            >
        </a>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
    props: {
        description: { type: String, required: true },
        image: { type: String, required: true },
        cost: { type: String, required: true },
        currency: { type: String, required: true },
        moreInfo: { type: String, required: true }
    }
});
</script>

<style lang="postcss" scoped>
.hardware-wallet-offer {
    align-items: center;
    background-color: var(--color-white);
    border-color: var(--color-white);
    border-radius: 4px;
    display: flex;
    margin: 7px 0;
    padding: 26px 34px;

    @media (max-width: 500px) {
        align-items: flex-start;
        flex-direction: column-reverse;
    }
}

.offer-description {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.description-text {
    color: var(--color-china-blue);
    font-size: 14px;
    margin-block: 11px;
}

.logo-image {
    flex-shrink: 0;
    margin-inline-start: 30px;
    max-height: 42px;
    max-width: 140px;

    @media (max-width: 500px) {
        margin-inline-start: 0;
        padding-block-end: 10px;
    }
}

.cost-container {
    font-size: 14px;
    font-weight: 700;
}

.cost {
    font-size: 18px;
    margin-inline-start: 3px;
}

.starting-from {
    color: var(--color-basalt-grey);
    font-size: 12px;
}

.green-link {
    color: var(--color-melbourne-cup);
    font-size: 13px;
    text-decoration: none;

    &:hover,
    &:focus {
        text-decoration: underline;
    }
}
</style>
