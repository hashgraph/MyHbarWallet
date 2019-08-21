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
                <slot name="title">{{ title }}</slot>
            </div>
            <div class="message">
                <slot>
                    This is not a recommended way to access your wallet. Due to
                    the sensitivity of the information involved, these options
                    should only be used in offline settings by experienced
                    users.
                </slot>
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
        title: { type: String, default: "NOT RECOMMENDED" }
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
