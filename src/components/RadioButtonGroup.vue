<template>
    <div class="radio-button-group">
        <slot />
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    components: {},
    props: {
        value: { type: String, required: true }
    },
    computed: {},
    methods: {}
});
</script>

<style lang="postcss" scoped>
.radio-button-group {
    display: grid;
    grid-row-gap: 9px;
}
</style>
