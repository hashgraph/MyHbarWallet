<template>
    <div class="interface-tile-title-container">
        <div class="interface-tile-title">{{ title }}</div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "InterfaceTileTitle",
    props: {
        title: { type: String, required: true }
    }
});
</script>

<style lang="postcss" scoped>
.interface-tile-title-container {
    border-bottom: 2px solid var(--color-peral);
    padding: 15px 0;
}

.interface-tile-title {
    border-left: 5px solid var(--color-melbourne-cup);
    font-size: 24px;
    padding-inline-start: 27px;
}
</style>
