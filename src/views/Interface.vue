<template>
    <div class="interface">
        <AppNavigation />
        <router-view class="main" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppNavigation from "../components/InterfaceNavigation.vue";

export default Vue.extend({
    name: "Interface",
    components: {
        AppNavigation
    }
});
</script>

<style lang="postcss" scoped>
.interface {
    display: flex;
    flex-grow: 1;
}

.main {
    background-color: var(--color-boysenberry-shadow);
    flex-grow: 1;
}
</style>
