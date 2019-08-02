<template>
    <div class="warning">
        <div class="warning-symbol">
            ⚠️
        </div>
        <div class="text">
            <div class="title">
                {{ title }}
            </div>
            <div class="message">
                <slot></slot>
            </div>
            <!-- TODO: > Read: Using MEW Offline Component here -->
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "Warning",
    props: {
        title: { type: String, required: true }
    }
});
</script>

<style scoped lang="postcss">
.warning {
    background-color: var(--color-sheer-peach);
    display: flex;
    padding: 20px;
    width: 100%;
}

.warning-symbol {
    flex-shrink: 0;
    font-size: 30px;
    width: 60px;
}

.title {
    font-size: 20px;
    font-weight: 600;
    margin-block-end: 10px;
}

.message {
    color: var(--color-china-blue);
    font-size: 14px;
}
</style>
