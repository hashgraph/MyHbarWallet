<template>
  <div
    class="flex flex-col items-center bg-white dark:bg-kuroi-black dark:text-white rounded-[10px] py-4 px-5 lg:px-[40px] lg:py-[30px]"
  >
    <img :src="icon">
    <div class="flex items-center">
      <div class="text-center pt-5 pb-[11px]">
        {{ title }}
        <StakingInfoTooltip v-if="tooltip" />
      </div>
    </div>
    <div class="text-center font-semibold text-2xl">
      {{ value }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import StakingInfoTooltip from "./StakingInfoTooltip.vue";

export default defineComponent({
    name: "StakingOverviewTile",
    components: {
        StakingInfoTooltip,
    },
    props: {
        icon: { type: String, required: true },
        title: { type: String, required: true },
        value: { type: String, required: true },
        tooltip: { type: Boolean, default: false },
    },
});
</script>
