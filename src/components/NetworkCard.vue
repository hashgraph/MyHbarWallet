<template>
    <div class="network">
        <img src="@/assets/icon-hbar-outline.svg" />
        <div class="content">
            <div class="title">
                Network
            </div>
            <div class="subtitle">
                mirror.mainnet.aech.io (mainnet)
            </div>
            <button class="change">Change</button>
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
    align-items: center;
    background-color: var(--color-lynx-screen-blue);
    border-radius: 5px;
    color: var(--color-white);
    display: flex;
    padding: 25px;
}

img {
    align-self: flex-start;
    margin-block-start: 10px;
    margin-inline-end: 25px;
    width: 60px;
}

.title {
    font-size: 22px;
    font-weight: 500;
}

.subtitle {
    font-size: 14px;
    font-weight: 300;
    margin-block-end: 12px;
}

.change {
    border: 1px solid white;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    font-size: 12px;
    outline: none;
    padding: 4px 8px;
}
</style>
