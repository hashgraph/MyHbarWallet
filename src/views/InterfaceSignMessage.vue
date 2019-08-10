<template>
    <div>
        <SignMessage />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import SignMessage from "../components/SignMessage.vue";

export default Vue.extend({
    name: "InterfaceSignMessage",
    components: {
        SignMessage
    }
});
</script>
