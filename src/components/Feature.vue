<template>
    <div class="feature">
        <div class="image">
            <slot name="image"></slot>
        </div>
        <div class="text">
            <div class="header">
                <slot name="title"></slot>
            </div>
            <div class="content">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "Feature"
});
</script>

<style lang="postcss" scoped>
.feature {
    align-items: center;
    display: flex;
}

.image {
    padding-inline-end: 30px;
}

.header {
    font-size: 20px;
    font-weight: 500;
    margin-block-end: 10px;
}

.content {
    color: var(--color-china-blue);
    font-size: 14px;
}
</style>
