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
    </Modal>
</template>

<script lang="ts">
import Modal from "../components/Modal.vue";
import {
    createComponent,
    PropType,
    computed
} from "@vue/composition-api";
import { getters } from "../store";

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

        return { url };
    }
});
</script>
