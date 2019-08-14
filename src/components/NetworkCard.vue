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
                <Tooltip :pinnable="false" message="Change Network">
                    <!--FIXME: Disabling button until it can do something -->
                    <button v-if="false" class="change">Change</button>
                </Tooltip>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Tooltip from "./Tooltip.vue";
import { createComponent } from "vue-function-api";

export default createComponent({
    components: {
        Tooltip
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
    color: var(--color-white);
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

.actions {
    align-items: center;
    display: flex;
}
</style>
