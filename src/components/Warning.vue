<template>
    <div class="warning">
        <div class="warning-symbol">
            ⚠️
        </div>
        <div class="text">
            <div class="title">
                {{ title }}
            </div>
            <slot></slot>
            <!-- TODO: > Read: Using MEW Offline Component here -->
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "Warning",
    props: {
        title: { type: String, required: false, default: "" }
    }
});
</script>

<style scoped lang="postcss">
.warning {
    /* grid-template-columns: 60px 1fr; */
    background-color: var(--color-sheer-peach);
    display: flex;
    padding: 20px;
    width: 100%;
}

.warning-symbol {
    flex-shrink: 0;
    font-size: 30px;
    height: 122px;
    width: 60px;
}

.image {
    height: 30px;
    width: 30px;
}

.title {
    font-size: 20px;
    font-weight: 600;
    margin-block-end: 10px;
}
</style>
