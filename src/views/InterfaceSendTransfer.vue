<template>
    <div>
        <SendTransfer />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import SendTransfer from "../components/SendTransfer.vue";

export default Vue.extend({
    name: "InterfaceSendTransfer",
    components: { SendTransfer }
});
</script>
