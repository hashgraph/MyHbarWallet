<template>
  <div
    class="z-20 flex items-center min-w-[400px] p-3 text-center text-xs top-0 absolute mt-24 sm:mt-20 transition-all duration-300 w-full bg-devils-advocate text-white"
    :class="{
      'opacity-0 invisible': networkDown === true,
      'md:mt-0': loggedIn === true
    }"
  >
    <div class="m-auto">
      <svg :src="networkBannerImage" />

      <span>
        {{ $t("InterfaceNetworkDown.offline") }}
      </span>

      <span class="opacity-70">
        {{ $t("InterfaceNetworkDown.message") }}
      </span>

      <a
        class="text-white text-bold"
        href="http://status.hedera.com/"
      > {{ $t("InterfaceNetworkDown.status") }} </a>
    </div>
  </div>
</template>


<script lang = "ts">
import { defineComponent, ref, computed, onMounted, watch } from "vue";

import { useStore } from "../../store";
import networkBannerImage from "../../assets/network_banner.svg";
import { useContainer } from "../../hooks/container";

export default defineComponent({
    name: "NetworkDown",
    setup() {
        const store = useStore();
        const networkDown = ref(false);
        const loggedIn = computed(() => store.client != null);

        async function pingNetwork(network: string): Promise<void> {
          const container = useContainer();
          networkDown.value = await container.cradle.hedera.ping({ network });
        }

        watch(() => store.network, (network: string) => {
          pingNetwork(network);
        });

        onMounted(() => pingNetwork(store.network));

        return {
            loggedIn,
            networkDown,
            networkBannerImage
        }
    }
}); 
</script>