<template>
    <div class="customer-support-link" @click="handleButtonClick">
        <img alt="" :src="serviceBell" /> Customer Support
        <ModalCustomerService v-model="modalCustomerServiceIsOpen" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import serviceBell from "@/assets/help-center.svg";
import ModalCustomerService from "@/components/ModalCustomerService.vue";

export default Vue.extend({
    components: {
        ModalCustomerService
    },
    data() {
        return {
            modalCustomerServiceIsOpen: false
        };
    },
    computed: {
        serviceBell() {
            return serviceBell;
        }
    },
    methods: {
        handleButtonClick() {
            this.modalCustomerServiceIsOpen = !this.modalCustomerServiceIsOpen;
        }
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
