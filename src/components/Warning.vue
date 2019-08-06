<template>
    <div class="warning">
        <MaterialDesignIcon
            class="warning-symbol"
            :icon="cautionIcon"
            @click="handleClose"
        />
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
import Vue from "vue";
import { mdiAlertOutline } from "@mdi/js";
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";

export default Vue.extend({
    name: "Warning",
    components: {
        MaterialDesignIcon
    },
    props: {
        title: { type: String, required: true }
    },
    computed: {
        cautionIcon() {
            return mdiAlertOutline;
        }
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
