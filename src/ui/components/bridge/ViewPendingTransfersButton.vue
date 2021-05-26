<template>
    <Button
        :compact="true"
        :label="props.label"
        @click="openPendingTransfersModal"
    />
</template>

<script lang="ts">
import { defineComponent, SetupContext, PropType } from "@vue/composition-api";

import Button from "../Button.vue";

// export interface State {}

export default defineComponent({
    name: "ViewPendingTransfersButton",
    components: { Button },
    props: {
        state: Object as PropType<{}>,
        label: { type: String, required: true }
    },
    model: {
        prop: "state",
        event: "click"
    },
    setup(props, context: SetupContext): object {
        function openPendingTransfersModal(): void {
            context.emit("openPendingTransfersModal");
        }

        return {
            props,
            openPendingTransfersModal
        };
    }
});
</script>

<style scoped>
button{
    font-size: 12px;
    inset-inline-end: 10px;
    min-width: 10px;
    right: 0 !important;
}

</style>
