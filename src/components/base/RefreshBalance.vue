<template>
  <Image
    ref="refresh"
    class="w-10 h-10 duration-300 ease-in-out transform"
    :class="{
      'rotate-180': 
        state.rotate,
    }"
    :light="refresh_green"
    :dark="refresh_green"
    alt="Refresh"
    @click="handleClick"
  />
</template>


<script lang = "ts">
import { defineComponent, ref, reactive } from "vue";

import { useStore } from "../../store";
import Image from "../base/Image.vue";
import refresh_green from "../../assets/refresh_green.svg";
import { contextBridge } from "electron";

export default defineComponent({
    name: "RefreshButton",
    components: {
        Image
    },

    props: {
        balance: String
    },
    emits: ["refresh"],
  
    setup(_, context){
        const store = useStore();
        const icon = ref(null);

        const state = reactive({
            rotate: true
        });

        function handleClick(): void{
            state.rotate = !state.rotate;
            getBalanceUSD();
        }

        async function getBalanceUSD(): Promise<string | undefined>{
            if(!store.client) {
                throw new Error("Must be logged in to fetch balance.");
            }
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
            getBalanceUSD,
            handleClick,
            refresh_green,
            icon,
            state
        }
    }
});

</script>