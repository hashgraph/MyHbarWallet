<template>
    <div class="progressbar-container">
        <div class="progressbar-title">{{ title }}</div>
        <div class="progressbar-progressbar">
            <div class="percent" :style="{ width: percent }"></div>
        </div>
        <div class="progressbar-content">
            <div v-if="header" class="header">{{ header }}</div>
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        title: { type: String, default: null },
        header: { type: String, default: null },
        percent: { type: String, default: null }
    }
});
</script>

<style scoped lang="postcss">
.progressbar-container {
    border: 10px solid var(--color-yankees-blue);
    font-size: 14px;
    margin: 0 auto;
    margin-block-end: 130px;
    outline: 1px solid lightgray;
    outline-offset: 5px;
    overflow: hidden;
    padding: 0;
    width: 650px;
}

.progressbar-title {
    background-color: var(--color-dilly-blue);
    color: var(--color-white);
    font-size: 25px;
    font-weight: 600;
    padding: 20px 0;
    text-align: center;
}

.progressbar-progressbar {
    background-color: var(--color-white);
    height: 5px;
    position: relative;
    width: 100%;
}

.percent {
    background-color: var(--color-melbourne-cup);
    height: 5px;
    position: absolute;
}

.progressbar-content {
    background-color: var(--color-white);
    max-height: calc(100vh - 250px);
    overflow-y: auto;
    padding: 50px 60px;
}

.progressbar-sliding-switch {
    border-bottom: 1px solid var(--color-peral);
    border-top: 1px solid var(--color-peral);
    margin-block-start: 20px;
    padding: 15px 0;
}

p {
    color: var(--color-china-blue);
    margin-block-end: 25px;
    margin-block-start: 0;
}

.progressbar-warning {
    background-color: var(--color-light-grayish-red);
    border: 1px solid var(--color-brick-red);
    border-radius: 3px;
    color: var(--color-brick-red);
    font-size: 13px;
    font-weight: 700;
    margin-block-start: 25px;
    padding: 15px 0;
    text-align: center;
}

.header {
    /* Replaces h4 */
    font-size: 20px;
    font-weight: 600;
    margin-block-end: 25px;
}

ul {
    background-color: var(--color-distant-horizon);
    margin: 0;
    padding: 20px;
    padding-inline-start: 40px;
}

.tips {
    & > div {
        background-color: var(--color-distant-horizon);
        margin-block-end: 10px;
        padding: 20px;
    }
}

.bold-header {
    color: var(--color-china-blue);
    font-weight: 600;
    margin-block-end: 3px;
}

.tips p {
    margin-block-end: 0;
}

.img-centered {
    display: block;
    margin-block-end: 40px;
    margin-inline: auto;
}
</style>
