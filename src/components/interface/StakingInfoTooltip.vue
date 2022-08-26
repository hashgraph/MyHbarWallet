<template>
  <div
    class="ml-1 relative inline-block"
  >
    <img
      :src="infoCircle"
      class="inline-block cursor-help"
      @click="toggleTooltip"
    >
    <div
      v-if="open"
      class="absolute bg-white w-[340px] -right-5 top-7 rounded-[10px] p-5 text-sm"
      style="box-shadow: 0 4px 10px rgba(0,0,0,0.25)"
    >
      Submit any transaction or query that affects your balance and your unclaimed rewards will be added to your account.
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import infoCircle from "../../assets/info_circle.svg";

export default defineComponent({
    name: "StakingInfoTooltip",
    setup() {
        const open = ref(false);
        function toggleTooltip() {
            open.value =  !open.value;
        }

        return { infoCircle, open, toggleTooltip };
    }
});
</script>
