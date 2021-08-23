<template>
  <div
    class="z-20 flex items-center min-w-[400px] p-3 text-center text-xs top-0 absolute mt-24 sm:mt-20 transition-all duration-300 w-full bg-devils-advocate text-white"
    :class="{
      'opacity-0 invisible': networkDown === true,
      'md:mt-0': loggedIn === true
    }"
  >
    <div class="m-auto">
      <!-- TODO: Replace with icon import -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        width="1em"
        height="1em"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 20 20"
        class="w-6 h-6 float-left mr-2"
      ><g fill="none"><path
        d="M3.707 2.293a1 1 0 0 0-1.414 1.414l6.921 6.922c.05.062.105.118.168.167l6.91 6.911a1 1 0 0 0 1.415-1.414l-.675-.675a9.001 9.001 0 0 0-.668-11.982A1 1 0 1 0 14.95 5.05a7.002 7.002 0 0 1 .657 9.143l-1.435-1.435a5.002 5.002 0 0 0-.636-6.294A1 1 0 0 0 12.12 7.88c.924.923 1.12 2.3.587 3.415l-1.992-1.992a.922.922 0 0 0-.018-.018l-6.99-6.991z"
        fill="currentColor"
      /><path
        d="M3.238 8.187a1 1 0 0 0-1.933-.516c-.8 3-.025 6.336 2.331 8.693a1 1 0 0 0 1.414-1.415a6.997 6.997 0 0 1-1.812-6.762z"
        fill="currentColor"
      /><path
        d="M7.4 11.5a1 1 0 1 0-1.73 1c.214.371.48.72.795 1.035a1 1 0 0 0 1.414-1.414c-.191-.191-.35-.4-.478-.622z"
        fill="currentColor"
      /></g></svg>

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
import { defineComponent, onMounted, reactive, computed } from "vue";

import { useStore } from "../../store";

export default defineComponent({
    name: "NetworkDown",
    setup(){
        const store = useStore();

        const networkDown = computed(()=>{
            return state.networkDown;
        });

        const loggedIn = computed(()=>{
            if(store.client) return true;
            return false;
        });

        const state = reactive({
            networkDown: false,
        });

        onMounted(async()=>{
            try{
                state.networkDown = await store.client?.networkPing() ?? true;
            } catch(error) {
                state.networkDown = true;
                throw new Error(error);
            }
        });

        return {
            loggedIn,
            networkDown
        }
    }
}); 
</script>