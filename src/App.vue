<template>
    <div id="app">
        <router-view />
        <Footer />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Footer from "@/components/Footer.vue";

export default Vue.extend({
    name: "App",
    components: {
        Footer
    }
});
</script>

<style lang="postcss" scoped>
#app {
    background-color: var(--color-peral);
    font-family: "Montserrat", sans-serif;
    min-height: inherit;
}
</style>
