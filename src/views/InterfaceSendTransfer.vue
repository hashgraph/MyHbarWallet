<template>
    <div>
        <AccountCard
            :realm="0"
            :shard="0"
            :account="305472"
            public-key="302a300506032b65700321002cc9e2d0c16c717476d4bbbfa3307a98cf0c41d7afc77c851e476b5921f3fb65"
        />
        <BalanceCard :balance="10" />
        <NetworkCard />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import NetworkCard from "@/components/NetworkCard.vue";
import BalanceCard from "@/components/BalanceCard.vue";
import AccountCard from "@/components/AccountCard.vue";

export default Vue.extend({
    name: "InterfaceSendTransfer",
    components: {
        NetworkCard,
        BalanceCard,
        AccountCard
    }
});
</script>
