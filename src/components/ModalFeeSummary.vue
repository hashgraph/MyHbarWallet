<template>
    <div class="modal-fee-summary">
        <Modal />
    </div>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";
import Modal from "../components/Modal.vue";

export default createComponent({
    components: {
        Modal
    }
});
</script>

<style lang="postcss" scoped>
.modal-fee-summary {
    background-color: pink;
}
</style>
