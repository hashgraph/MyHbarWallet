<template>
    <div class="customer-support-link" @click="handleButtonClick">
        <img alt="" :src="serviceBell" /> Customer Support
        <ModalCustomerService v-model="modalCustomerServiceIsOpen" />
    </div>
</template>

<script lang="ts">
import serviceBell from "@/assets/help-center.svg";
import { createComponent, value } from "vue-function-api";

import ModalCustomerService from "@/components/ModalCustomerService.vue";

export default createComponent({
    components: {
        ModalCustomerService
    },
    setup() {
        const modalCustomerServiceIsOpen = value(false);

        function handleButtonClick() {
            modalCustomerServiceIsOpen.value = !modalCustomerServiceIsOpen.value;
        }

        return {
            modalCustomerServiceIsOpen,
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
