<template>
    <div class="customer-support-link">
        <div
            class="customer-support-container"
            @click="handleButtonClick"
        >
            <img
                alt=""
                :src="serviceBell"
            >{{
                $t("customerSupport.customerSupport")
            }}
        </div>
        <ModalCustomerService v-model="state.modalCustomerServiceIsOpen" />
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/composition-api";

import serviceBell from "../assets/help-center.svg";

import ModalCustomerService from "./ModalCustomerService.vue";

export default defineComponent({
    name: "CustomerSupportLink",
    components: { ModalCustomerService },
    setup() {
        const state = reactive({ modalCustomerServiceIsOpen: false });

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
.customer-support-container {
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
