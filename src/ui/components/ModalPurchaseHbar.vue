<template>
    <Modal
        :is-open="isOpen"
        hide-decoration
        @change="onChange"
    >
        <iframe
            title="Carbon Fiber"
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
                <img
                    class="logo"
                    :src="carbonLogo"
                >
            </a>
        </div>
    </Modal>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

import { getters } from "../store";
import carbonLogo from "../assets/carbon-logo.svg";

import Modal from "./Modal.vue";

// Both of these are defined in vue.config.js.
declare const MHW_ENV: string;
declare const CARBON_API_KEY: string;

export default defineComponent({
    components: { Modal },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: { isOpen: Boolean },
    setup(props, context) {
        const user = getters.currentUser();
        const accId = user != null ? user.session.account : "";
        const accIdString = accId.toString();

        let environment = "sandbox";
        if (MHW_ENV != null) {
            environment = MHW_ENV !== "production" ? "sandbox" : "production";
        }

        const url = `https://buy.carbon.money/?tokens=hbar&receiveAddressHbar=${accIdString}&environment=${environment}&apiKey=${CARBON_API_KEY}`;

        function onChange(): void {
            context.emit("change");
        }

        return { url, carbonLogo, onChange };
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

    &:hover,
    &:focus {
        text-decoration: underline;
    }

    &:visited {
        color: var(--color-melbourne-cup);
    }
}

.logo {
    margin-inline-start: 5px;
}
</style>
