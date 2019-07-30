<template>
    <div class="home"></div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "Home",
    components: {}
});
</script>

<style lang="postcss" scoped>
.home {
    align-items: center;
    display: flex;
    flex-direction: column;

    /* NOTE: this is required because of Header */
    padding-block-start: 70px;
}
</style>
