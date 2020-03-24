<template>
    <div class="footer-top">
        <div class="section">
            <div class="title">
                {{ $t("footerTop.discover") }}
            </div>
            <div class="item">
                <router-link
                    :to="{ name: 'convert-units' }"
                    class="link"
                >
                    {{ $t("footerTop.units") }}
                </router-link>
            </div>
            <div class="item">
                <router-link
                    :to="{ name: 'hardware-wallet-affiliates' }"
                    class="link"
                >
                    {{ $t("footerTop.buyAHardwareWallet") }}
                </router-link>
            </div>
        </div>
        <!-- enable and add affiliates in src/affiliates.ts -->
        <div class="section">
            <div class="title">
                {{ $t("footerTop.affiliates") }}
            </div>
            <template v-for="affiliate of affiliates">
                <div
                    v-if="affiliate.supported"
                    :key="affiliate.name"
                    class="item"
                >
                    <a
                        rel="noopener"
                        target="_blank"
                        class="link"
                        :href="affiliate.address"
                    >
                        {{ affiliate.name }}
                    </a>
                </div>
            </template>
        </div>
        <div class="section">
            <div class="title">
                MyHbarWallet
            </div>
            <div class="item">
                <router-link
                    :to="{ name: 'home', hash: '#about' }"
                    class="link"
                >
                    {{ $t("common.about") }}
                </router-link>
            </div>
            <div class="item">
                <router-link
                    :to="{ name: 'home', hash: '#faqs' }"
                    class="link"
                >
                    {{ $t("common.faqs") }}
                </router-link>
            </div>
            <div
                class="item customer-service"
                @click="handleButtonClick"
            >
                {{ $t("footerTop.customerSupport") }}
            </div>
        </div>
        <div class="section">
            <div class="title">
                <i18n path="footerTop.donate">
                    <img
                        class="love"
                        src="../assets/heart.svg"
                    >
                </i18n>
            </div>
            <div class="item">
                {{ $t("footerTop.MHWIsOpenSourced") }}
            </div>
            <div class="donation">
                <img
                    class="hbar-icon"
                    :src="hbar"
                >
                0.0.1001
            </div>
        </div>
        <ModalCustomerService v-model="state.modalCustomerServiceIsOpen" />
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/composition-api";

import hbar from "../assets/icon-hbar-outline.svg";
import affiliates from "../../domain/affiliates";

import ModalCustomerService from "./ModalCustomerService.vue";

export default defineComponent({
    components: { ModalCustomerService },
    props: {},
    setup() {
        const state = reactive({ modalCustomerServiceIsOpen: false });

        function handleButtonClick(): void {
            state.modalCustomerServiceIsOpen = !state.modalCustomerServiceIsOpen;
        }

        return {
            hbar,
            state,
            handleButtonClick,
            affiliates
        };
    }
});
</script>

<style scoped lang="postcss">
.footer-top {
    border-bottom: 1px solid var(--color-china-blue);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1.5fr;
    justify-content: space-between;
    margin: auto;
    margin-block-end: 40px;
    max-width: 1024px;
    padding-block-end: 40px;
    padding-block-start: 30px;
    padding-inline: 20px;

    @media (max-width: 900px) {
        grid-row-gap: 25px;
        grid-template-columns: auto;
        padding-block-start: 0;
    }
}

.section {
    flex-grow: 1;
}

.title {
    color: var(--color-white);
    font-size: 19px;
    font-weight: 500;
    margin-block-end: 20px;
}

.item {
    margin-block-end: 15px;
}

.customer-service {
    &:hover,
    &:focus {
        cursor: pointer;
    }
}

.link {
    color: inherit;
    text-decoration: none;

    &:hover,
    &:focus {
        cursor: pointer;
    }
}

.love {
    height: 30px;
    vertical-align: top;
}

.hbar-icon {
    height: 28px;
    margin-inline-end: 8px;
}

.donation {
    align-items: center;
    color: var(--color-melbourne-cup);
    display: flex;
}
</style>
