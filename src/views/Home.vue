<template>
    <div class="home">
        <HoverTileContainer />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import HoverTileContainer from "../components/AccessAccountHoverTileContainer.vue";

export default Vue.extend({
    name: "Home",
    components: {
        HoverTileContainer
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
