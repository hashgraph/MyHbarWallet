<template>
    <div class="customer-support-link">
        <img alt="" :src="serviceBell" /> Customer Support
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import serviceBell from "@/assets/help-center.svg";

export default Vue.extend({
    computed: {
        serviceBell() {
            return serviceBell;
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
