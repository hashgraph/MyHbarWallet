<template>
    <div class="title-container">
        <!-- todo: move this to a computed, it's being difficult with the  -->
        <div class="title" :class="{ large }">{{ title }}</div>
        <div class="subtitle"><slot></slot></div>
    </div>
</template>

<script lang="ts">
import { createComponent } from "vue-function-api";

export default createComponent({
    props: {
        title: { type: String, required: true },
        large: { type: Boolean }
    }
});
</script>

<style lang="postcss" scoped>
a {
    color: var(--color-melbourne-cup);
    cursor: pointer;
    text-decoration: none;
}

.access-my-account {
    display: flex;
    flex-direction: column;
}

.wrap {
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 80px 0;
}

.title-container {
    margin-block-end: 50px;
    text-align: center;
}

.title {
    font-size: 30px;
    font-weight: 500;
    margin-block-end: 15px;
}

.title.large {
    font-size: 45px;
}

.subtitle {
    color: var(--color-china-blue);
    font-size: 14px;
    font-weight: 400;
}
</style>
