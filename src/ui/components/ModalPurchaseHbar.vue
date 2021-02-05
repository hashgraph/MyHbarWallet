<template>
    <Modal
        :is-open="isOpen"
        hide-decoration
        @change="onChange"
    >
        <iframe
            title="Moonpay"
            width="450"
            height="800"
            allow="accelerometer; autoplay; camera; gyroscope; payment"
            :src="url"
        />
        <div class="ModalPurchaseHbar-link-container">
            {{ $t('modalPurchaseHbar.poweredBy') }} <a
                class="ModalPurchaseHbar-link"
                href="https://www.moonpay.io/"
            >
                <img
                    class="logo"
                    :src="logo"
                >
            </a>
        </div>
    </Modal>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

import { getters } from "../store";
import logo from "../assets/moonpay_logo.svg";

import Modal from "./Modal.vue";

// Defined in vue.config.js.
declare const MOONPAY_API_KEY: string;

export default defineComponent({
    name: "ModalPurchaseHbar",
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

        // melbourne cup
        const color = "%233BC1AA";
        const url = `https://buy-staging.moonpay.io?apiKey=${MOONPAY_API_KEY}&currencyCode=HBAR&colorCode=${color}`;

        function onChange(isOpen: boolean): void {
            context.emit("change", isOpen);
        }

        return { url, logo, onChange };
    }
});
</script>
<style scoped lang="postcss">
.ModalPurchaseHbar-link-container {
    align-items: center;
    display: flex;
    justify-content: center;
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
    height: 35px;
    margin-inline-start: 5px;
}
</style>
