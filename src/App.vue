<template>
    <div id="app">
        <Header />
        <router-view class="main" />
        <FAQ />
        <Footer />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "@/components/Header.vue";
import FAQ from "@/components/FAQ.vue";
import Footer from "@/components/Footer.vue";

export default Vue.extend({
    name: "App",
    components: {
        Header,
        FAQ,
        Footer
    }
});
</script>

<style lang="postcss" scoped>
#app {
    background-color: var(--color-peral);
    display: flex;
    flex-direction: column;
    font-family: "Montserrat", sans-serif;
    min-height: inherit;
}

.main {
    /* NOTE: this is required because of Header */
    padding-block-start: 85px;
}
</style>
