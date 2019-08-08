<template>
    <div>
        <NetworkCard />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import NetworkCard from "@/components/NetworkCard.vue";

export default Vue.extend({
    name: "InterfaceSendTransfer",
    components: {
        NetworkCard
    }
});
</script>
