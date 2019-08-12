<template>
    <div id="app">
        <Header />
        <div class="main">
            <router-view />
        </div>
        <Footer />
        <ZoomTopButton />
    </div>
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import ZoomTopButton from "@/components/ZoomTopButton.vue";
import { createComponent } from "vue-function-api";

export default createComponent({
    components: {
        Header,
        Footer,
        ZoomTopButton
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
