<template>
  <Button
    color="green"
    class="p-3 flex-none block"
    @click="getBalanceUSD"
  >
    {{ $t("BaseButton.refresh.balance") }}
  </Button>
</template>


<script lang = "ts">
import { defineComponent } from "vue";

import { useStore } from "../../store";
import Button from "../base/Button.vue";


export default defineComponent({
    name: "RefreshButton",
    components: {
        Button
    },

    props: {
        balance: String
    },
    emits: ["refresh"],
  
    setup(_, context){
        const store = useStore();

        async function getBalanceUSD(): Promise<string | undefined>{
            if(store.hbarPriceUsd == null || store.balance == null) return undefined;
            const balance = (await store.client?.getAccountBalance())?.hbars.times(store.hbarPriceUsd).toFormat(2, {
                decimalSeparator: ".",
                groupSeparator: ",",
                groupSize: 3,
            });
            context.emit("refresh", {
                balance: balance
            });
            return balance;
        }
        return {
            getBalanceUSD
        }
    }
});

</script>