<template>
    <div>
        <NetworkCard />
        <BalanceCard :balance="10" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import NetworkCard from "@/components/NetworkCard.vue";
import BalanceCard from "@/components/BalanceCard.vue";

export default Vue.extend({
    name: "InterfaceSendTransfer",
    components: {
        NetworkCard,
        BalanceCard
    }
});
</script>
