<template>
    <div class="interface-form-title-container">
        <div class="interface-form-title">{{ title }}</div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props: {
        title: { type: String, required: true }
    }
});
</script>

<style lang="postcss" scoped>
.interface-form-title-container {
    border-bottom: 2px solid var(--color-peral);
    padding: 15px 0;
}

.interface-form-title {
    border-left: 5px solid var(--color-melbourne-cup);
    font-size: 24px;
    padding-inline-start: 27px;
}
</style>
