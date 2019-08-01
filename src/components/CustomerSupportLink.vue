<template>
    <div class="CustomerSupportLink">
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
.CustomerSupportLink {
    color: var(--color-melbourne-cup);
    cursor: pointer;
    text-align: center;
}
</style>
