<template>
    <div class="home">
        <HHoverTileContainer />
        <AAHoverTileContainer />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import HHoverTileContainer from "../components/HomeHoverTileContainer.vue";
import AAHoverTileContainer from "../components/AccessAccountHoverTileContainer.vue";

export default Vue.extend({
    name: "Home",
    components: {
        HHoverTileContainer,
        AAHoverTileContainer
    }
});
</script>

<style lang="postcss" scoped>
.home {
    align-items: center;
    display: flex;
    flex-direction: column;
}
</style>
