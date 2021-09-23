<template>
  <div
    v-if="networkStatus === false"
    class="fixed md:absolute md:mt-16 mt-20 bg-devils-advocate w-full min-w-screen p-3 pt-6 md:pt-8 justify-center float-left text-center text-white sm:flex"
  >
    <img
      :src="NetworkDownIcon"
      class="h-6 w-6 mr-4"
    >
    <span class="font-bold mr-1"> {{ $t("InterfaceNetworkDown.offline") }} </span>
    <span class="mr-1"> {{ $t("InterfaceNetworkDown.message") }} </span>
    <a
      href="https://status.hedera.com/"
      class="text-purple-cabbage"
    > {{ $t("InterfaceNetworkDown.status") }} </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from "vue";

import { useStore } from "../../store";
import NetworkDownIcon from "../../assets/icon_network_down.svg";

export default defineComponent({
    name: "NetworkStatusBanner",
    setup(){
        const store = useStore();

        const networkStatus = ref();

        watch( ()=> store.networkStatus, (current: boolean, previous: boolean) => {
            networkStatus.value = current;
        });

        return {
            networkStatus,
            NetworkDownIcon
        }
    }
});
</script>