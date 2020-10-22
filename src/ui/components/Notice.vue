<template>
    <div class="notice">
        <div
            class="symbol-container"
            :class="classObject"
        >
            <MaterialDesignIcon
                class="symbol"
                :icon="symbol"
            />
        </div>
        <div class="text">
            <div
                v-if="title"
                class="title"
            >
                {{ title }}
            </div>
            <div class="message">
                <slot />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/composition-api";

import MaterialDesignIcon from "./MaterialDesignIcon.vue";

export default defineComponent({
    components: { MaterialDesignIcon },
    props: {
        title: String,
        symbol: { type: String, required: true }
    },
    setup(props) {
        const classObject = computed(() => ({ compact: props.title == null }));

        return { classObject };
    }
});
</script>

<style scoped lang="postcss">
.notice {
    background-color: var(--color-sheer-peach);
    display: flex;
    padding: 20px;
    width: 100%;
}

.symbol-container {
    display: flex;
    flex-shrink: 0;
    padding-block-start: 10px;
    width: 60px;

    &.compact {
        padding-block-start: 5px;
    }
}

.symbol {
    height: 30px;
    width: 30px;
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

.text {
    align-self: center;
}
</style>
