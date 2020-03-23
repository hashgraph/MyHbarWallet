<template>
    <span class="info-button">
        <Tooltip
            :message="message"
            :pinnable="true"
        >
            <MaterialDesignIcon
                class="icon"
                :icon="mdiAlertCircle"
            />
        </Tooltip>
    </span>
</template>

<script lang="ts">
import { mdiAlertCircle } from "@mdi/js";
import { defineComponent } from "@vue/composition-api";

import MaterialDesignIcon from "./MaterialDesignIcon.vue";
import Tooltip from "./Tooltip.vue";

export default defineComponent({
    components: {
        MaterialDesignIcon,
        Tooltip
    },
    props: { message: { type: String, required: true }},
    setup() {
        return { mdiAlertCircle };
    }
});
</script>

<style lang="postcss" scoped>
button {
    border: none;
    outline: none;
    padding: 0;
}

.info-button {
    cursor: pointer;
    display: inline-flex;
}

.icon {
    color: var(--color-basalt-grey);

    &:hover,
    &:focus {
        color: var(--color-melbourne-cup);
    }
}
</style>
