<template>
    <div class="interface">
        <InterfaceNavigation />
        <div class="main-container">
            <router-view class="main" />
            <!-- todo: These are just placeholders for the actual items,
            which have not been merged into master yet -->
            <div class="info-1" />
            <div class="info-2" />
            <div class="info-3" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import InterfaceNavigation from "../components/InterfaceNavigation.vue";

export default Vue.extend({
    name: "Interface",
    components: {
        InterfaceNavigation
    }
});
</script>

<style lang="postcss" scoped>
.interface {
    display: flex;
    flex-grow: 1;
}

.main-container {
    background-color: var(--color-boysenberry-shadow);
    display: grid;
    flex-grow: 1;
    grid-gap: 15px;
    grid-template-areas:
        "info-1 info-2 info-3"
        "main main main";
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    padding: 20px;
}

.main {
    grid-area: main;
}

/* placeholders to show formatting. */

.info-1 {
    background: green;
    grid-area: info-1;
}

.info-2 {
    background: palevioletred;
    grid-area: info-2;
}

.info-3 {
    background: red;
    grid-area: info-3;
}
</style>
