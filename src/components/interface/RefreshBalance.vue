<template>
  <Image
    class="w-10 h-10 cursor-pointer"
    :class="{
      'animate-spin opacity-80': rotate,
    }"
    :light="refresh_green"
    :dark="refresh_green"
    :alt="$t('BaseButton.refresh.balance')"
    @click="handleClick"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useTimeoutFn } from "@vueuse/core";

import { useStore } from "../../store";
import Image from "../base/Image.vue";
import refresh_green from "../../assets/refresh_green.svg";

export default defineComponent({
    name: "RefreshBalance",
    components: {
        Image
    },
    setup() {
        const store = useStore();
        const rotate = ref(false);

        const { start } = useTimeoutFn(() => {
          rotate.value = false;
        }, 1000);

        function handleClick(): void{
            rotate.value = true;
            start();
            store.requestAccountBalance();
        }

        return {
            handleClick,
            refresh_green,
            rotate
        }
    }
});

</script>