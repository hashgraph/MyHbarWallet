<template>
    <Modal title="Buy HBAR" :is-visible="open" @close="$emit('close')">
        <div class="m-4 mt-8 h-[450px] overflow-auto">
            <iframe
                allow="accelerometer; autoplay; camera; gyroscope; payment"
                frameborder="0"
                class="w-full h-full rounded"
                :src="widgetURL"
            />
        </div>
    </Modal>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios, { AxiosResponse } from "axios";
import { useStore } from "../../store";

import Modal from "./Modal.vue";

export default defineComponent({
    name: "BuyAssetsModal",
    components: {
        Modal,
    },
    props: {
        open: { type: Boolean, default: false },
    },
    emits: ["close"],
    setup() {
        const store = useStore();
        const widgetURL = ref("");

        // set widget URL on component mount
        onMounted(() => setWidgetURL());

        function setWidgetURL(): void {
            const walletAddress = store.accountId.toString();

            // invoke 'getSignedURL' Netlify function to retrieve signed URL w/ pre-filled wallet address
            axios
                .get(
                    `/.netlify/functions/getSignedURL?walletAddress=${walletAddress}`
                )
                .then(
                    ({ data: signedURL }: AxiosResponse<string>) =>
                        // set widget URL w/ signed URL
                        (widgetURL.value = signedURL)
                )
                .catch((error: Error) => {
                    throw error;
                });
        }

        return {
            widgetURL,
        };
    },
});
</script>
