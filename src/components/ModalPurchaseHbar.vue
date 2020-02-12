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

export default createComponent({
    components: { Modal },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: { isOpen: Boolean },
    setup() {
        const accId = getters.CURRENT_USER();
        const accIdString = accId.toString();
        const environment = process.env.NODE_ENV !== "production" ? "sandbox" : "production";
        const key = process.env.NODE_ENV !== "production" ? "89fa28dd-b26e-4af4-8313-1536054767d5" : "production";
        const url = `https://buy.carbon.money/?tokens=hbar&receiveAddressHbar=${accIdString}&environment=${environment}&apiKey=${key}`;
        console.log(url);
        return { url };
    }
});
</script>
