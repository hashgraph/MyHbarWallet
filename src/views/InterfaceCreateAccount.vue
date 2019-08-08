<template>
    <div>
        <TileCreateAccount />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import TileCreateAccount from "@/components/TileCreateAccount.vue";

export default Vue.extend({
    name: "InterfaceCreateAccount",
    components: {
        TileCreateAccount
    }
});
</script>
