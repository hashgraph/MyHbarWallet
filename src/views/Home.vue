<template>
    <div class="home" />
</template>

<script lang="ts">
import Vue from "vue";
import FAQ from "@/components/FAQ.vue";

export default Vue.extend({
    name: "Home"
});
</script>

<style lang="postcss" scoped>
.home {
    align-items: center;
    display: flex;
    flex-direction: column;
}
</style>
