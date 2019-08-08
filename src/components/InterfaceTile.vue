<template>
    <div class="interface-tile">
        <InterfaceTileTitle :title="title" />
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import InterfaceTileTitle from "../components/InterfaceTileTitle.vue";

export default Vue.extend({
    components: {
        InterfaceTileTitle
    },
    props: {
        title: { type: String, required: true }
    }
});
</script>

<style scoped lang="postcss">
.content {
    padding: 20px;
}

.interface-tile {
    background-color: var(--color-white);
    border-radius: 5px;
    margin-block-end: 10px;
    overflow: hidden;
}
</style>
