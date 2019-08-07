<template>
    <div class="feature">
        <img class="image" :src="image" alt="" />
        <div class="text">
            <div class="header">
                {{ title }}
            </div>
            <div class="content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "Feature",
    props: {
        image: { type: String, required: true },
        title: { type: String, required: true }
    }
});
</script>

<style lang="postcss" scoped>
.feature {
    align-items: center;
    display: flex;
}

.image {
    margin-inline-end: 30px;
    width: 80px;
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
