<template>
    <div class="network">
        <img src="@/assets/icon-hbar-outline.svg" />
        <div class="content">
            <div class="top">
                <div class="title">
                    Network
                </div>
                <div class="subtitle">
                    mirror.mainnet.aech.io (mainnet)
                </div>
            </div>
            <div class="actions">
                <button class="change">Change</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        image: { type: String, default: null }
    }
});
</script>

<style scoped lang="postcss">
.network {
    background-color: var(--color-lynx-screen-blue);
    border-radius: 4px;
    color: var(--color-white);
    display: flex;
    padding: 25px;
}

img {
    align-self: flex-start;
    margin-block-start: 10px;
    margin-inline-end: 25px;
    user-select: none;
    width: 60px;
}

.title {
    font-size: 22px;
    font-weight: 500;
    user-select: none;
}

.subtitle {
    font-size: 14px;
    margin-block-end: 12px;
    opacity: 0.8;
    user-select: none;
}

.change {
    border: 1px solid white;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    outline: none;
    padding: 4px 8px;
    user-select: none;
}

.content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>
