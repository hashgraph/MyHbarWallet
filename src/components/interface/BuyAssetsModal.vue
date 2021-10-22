<template>
  <Modal
    title="Buy Assets"
    :is-visible="open"
    @close="$emit('close')"
  >
    <div class="m-4 mt-8 h-80">
      <iframe
        allow="accelerometer; autoplay; camera; gyroscope; payment"
        frameborder="0"
        height="100%"
        src="https://buy-staging.moonpay.io?apiKey=pk_test_123"
        width="100%"
        class="rounded"
      />
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Modal from "./Modal.vue";

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
        console.log("from buy assets");
    }
});
</script>