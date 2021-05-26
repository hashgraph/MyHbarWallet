<template>
    <Button
        :compact="true"
        :label="props.address"
        @click="connectToMetamask"
    />
</template>

<script lang="ts">
import { defineComponent, SetupContext, PropType } from "@vue/composition-api";

import Button from "../Button.vue";

// export interface State {}

export default defineComponent({
    name: "ConnectWalletButton",
    components: { Button },
    props: {
        state: Object as PropType<{}>,
        address: { type: String }
    },
    model: {
        prop: "state",
        event: "connect"
    },
    setup(props, context: SetupContext): object {
        function connectToMetamask(): void {
            context.emit("connect");
        }

        return {
            props,
            connectToMetamask
        };
    }
});
</script>

<style scoped>
button{
    font-size: 12px;
    inset-inline-end: 10px;
    min-width: 10px;
    padding: 8px 12px;
    /* position: relative !important;
    top: 30px;
    right: 0 !important;
    z-index: 1; */
}

</style>
