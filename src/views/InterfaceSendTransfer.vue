<template>
    <div>
        <SendTransfer />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import SendTransfer from "../components/SendTransfer.vue";
// import TextInput from "../components/TextInput.vue";

export default Vue.extend({
    name: "InterfaceSendTransfer",
    components: {
        SendTransfer
    }
});
</script>
