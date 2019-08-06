<template>
    <div class="info-tooltip">
        <MaterialDesignIcon :icon="icon" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";
import { mdiExclamation } from "@mdi/js";

export default Vue.extend({
    name: "InfoTooltip",
    components: {
        MaterialDesignIcon
    },
    props: {
        message: { type: String, required: true, default: "" }
    },
    computed: {
        icon() {
            return mdiExclamation;
        }
    }
});
</script>

<style lang="postcss" scoped>
.info-tooltip {
    color: var(--color-china-blue);
}
</style>
