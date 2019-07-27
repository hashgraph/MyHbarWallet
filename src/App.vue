<template>
    <div id="app">
        <Header />
        <router-view class="main" />
        <Modal></Modal>
        <Footer />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Modal from "@/components/Modal.vue";

export default Vue.extend({
    name: "App",
    components: {
        Modal,
        Header,
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
