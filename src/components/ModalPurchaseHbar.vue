<template>
    <Modal
        :is-open="isOpen"
        hide-decoration
        @change="this.$listeners.change"
    >
        <iframe
            id="carbonFiberIFrameExample"
            title="Carbon Fiber iframe Example"
            width="450"
            height="800"
            allow="fullscreen"
            :src="url"
        />
        <div class="ModalPurchaseHbar-link-container">
            {{ $t('modalPurchaseHbar.poweredBy') }} <a
                class="ModalPurchaseHbar-link"
                href="https://www.carbon.money/"
            >
                <img :src="carbonLogo">
            </a>
        </div>
    </Modal>
</template>

<script lang="ts">
import Modal from "../components/Modal.vue";
import { createComponent } from "@vue/composition-api";
import { getters } from "../store";
import carbonLogo from "../assets/carbon-logo.svg";

// Both of these are defined in vue.config.js.
declare const MHW_ENV: string;
declare const CARBON_API_KEY: string;

export default createComponent({
    components: { Modal },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: { isOpen: Boolean },
    setup() {
        const accId = getters.CURRENT_USER()!;
        const accIdString = accId.toString();

        const environment = MHW_ENV !== "production" ? "sandbox" : "production";

        const url = `https://buy.carbon.money/?tokens=hbar&receiveAddressHbar=${accIdString}&environment=${environment}&apiKey=${CARBON_API_KEY}`;

        return { url, carbonLogo };
    }
});
</script>
<style scoped lang="postcss">
.ModalPurchaseHbar-link-container {
    text-align: center;
}

.ModalPurchaseHbar-link {
    color: var(--color-melbourne-cup);
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }

    &:visited {
        color: var(--color-melbourne-cup);
    }
}
</style>
