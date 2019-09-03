<template>
    <div class="customer-support-link" @click="handleButtonClick">
        <img alt="" :src="serviceBell" /> Customer Support
        <ModalCustomerService v-model="state.modalCustomerServiceIsOpen" />
    </div>
</template>

<script lang="ts">
import serviceBell from "../assets/help-center.svg";
import { createComponent, reactive } from "@vue/composition-api";

import ModalCustomerService from "../components/ModalCustomerService.vue";

export default createComponent({
    components: {
        ModalCustomerService
    },
    setup() {
        const state = reactive({
            modalCustomerServiceIsOpen: false
        });

        function handleButtonClick(): void {
            state.modalCustomerServiceIsOpen = !state.modalCustomerServiceIsOpen;
        }

        return {
            state,
            serviceBell,
            handleButtonClick
        };
    }
});
</script>

<style lang="postcss" scoped>
.customer-support-link {
    align-items: center;
    align-self: center;
    color: var(--color-melbourne-cup);
    cursor: pointer;
    display: flex;
    font-size: 14px;
    justify-content: center;
    text-align: center;

    &:hover,
    &:focus {
        text-decoration: underline;
    }
}

img {
    height: 25px;
    margin-inline-end: 10px;
    width: 25px;
}
</style>
