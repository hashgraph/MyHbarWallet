<template>
    <div class="warning">
        <div class="warning-symbol-container">
            <MaterialDesignIcon
                class="warning-symbol"
                :icon="mdiAlertOutline"
            />
        </div>
        <div class="text">
            <div class="title">
                {{ title }}
            </div>
            <div class="message">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { createComponent } from "vue-function-api";
import { mdiAlertOutline } from "@mdi/js";
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";

export default createComponent({
    components: {
        MaterialDesignIcon
    },
    props: {
        title: { type: String, required: true }
    },
    setup() {
        return { mdiAlertOutline };
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

.warning-symbol-container {
    display: flex;
    flex-shrink: 0;
    padding-block-start: 10px;
    width: 60px;
}

.warning-symbol {
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
</style>
