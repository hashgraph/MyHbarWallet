<template>
    <div class="info-button">
        <Tooltip :message="message" pinnable="true">
            <button>
                <MaterialDesignIcon class="icon" :icon="icon" />
            </button>
        </Tooltip>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";
import { mdiAlertCircle } from "@mdi/js";
import Tooltip from "@/components/Tooltip.vue";
import { computed } from "vue-function-api";

export default Vue.extend({
    components: {
        MaterialDesignIcon,
        Tooltip
    },
    props: {
        message: { type: String, required: true }
    },
    setup() {
        const icon = computed(() => {
            return mdiAlertCircle;
        });
        return { icon };
    }
});
</script>

<style lang="postcss" scoped>
button {
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0;
}

.icon {
    color: var(--color-basalt-grey);

    &:hover,
    &:focus {
        color: var(--color-melbourne-cup);
    }
}
</style>
