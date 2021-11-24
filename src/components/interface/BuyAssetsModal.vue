<template>
  <Modal
    title="Buy Assets"
    :is-visible="open"
    @close="$emit('close')"
  >
    <div class="m-4 mt-8 h-[450px] overflow-auto">
      <iframe
        allow="accelerometer; autoplay; camera; gyroscope; payment"
        frameborder="0"
        height="100%"
        :src="widgetURL"
        width="100%"
        class="rounded"
      />
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Modal from "./Modal.vue";

// from vite.config.js
declare const __MOONPAY_PROD_KEY__: string;

export default defineComponent({
    name: "BuyAssetsModal",
    components: {
        Modal
    },
    props: {
        open: { type: Boolean, default: false }
    },
    emits: [ "close" ],
    setup(){
        const widgetURL = `https://buy.moonpay.com?apiKey=${__MOONPAY_PROD_KEY__}`;

        return {
            widgetURL
        }
    }
});
</script>
