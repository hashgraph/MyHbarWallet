<template>
  <div
    class="grid grid-cols-[auto,1fr] gap-y-[10px] md:grid-cols-[60px,3fr,4fr,100px] gap-x-5 py-5 md:py-2 md:items-center border-b dark:border-midnight-express border-cerebral-grey dark:text-white"
  >
    <div
      v-if="!md"
      class="font-medium text-squant text-sm"
    >
      {{ $t("Staking.node") }}
    </div>
    <div class="font-semibold text-base md:text-center">
      {{ name }}
    </div>
    <div
      v-if="!md"
      class="font-medium text-squant text-sm"
    >
      {{ $t("Staking.hostedBy") }}
    </div>
    <div class="font-medium">
      <div>{{ hostName }}</div>
      <div class="text-squant text-sm">
        {{ accountId }}
        <span v-if="location.length > 0">• {{ location }}</span>
      </div>
    </div>
    <div
      v-if="!md"
      class="font-medium text-squant text-sm"
    >
      {{ $t("Staking.minMax") }}
    </div>
    <StakingBar
      :min="stakeMin"
      :max="stakeMax"
      :current="nodeStake"
    />
    <button
      class="h-[34px] col-span-2 w-full md:col-span-1 md:w-auto mt-[10px] md:my-0 font-semibold border border-mountain-meadow rounded-full px-4 justify-self-end"
      :class="{
        'text-mountain-meadow': !isStaked,
        'text-white bg-mountain-meadow': isStaked,
      }"
      @click="handleClick"
    >
      {{ $t(buttonText) }}
    </button>
  </div>
</template>

<script lang="ts">
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import BigNumber from "bignumber.js";
import { computed, defineComponent } from "vue";

import { useStore } from "../../store";

import StakingBar from "./StakingBar.vue";

export default defineComponent({
    name: "StakingItem",
    components: {
        StakingBar,
    },
    props: {
        name: { type: Number, required: true },
        isStaked: { type: Boolean, default: false },
        stakeMin: { type: BigNumber, required: true },
        stakeMax: { type: BigNumber, required: true },
        stakeRewarded: { type: BigNumber, required: true },
        stakeNonRewarded: { type: BigNumber, required: true },
        host: { type: String, default: "" },
        accountId: { type: String, required: true },
        location: { type: String, default: "" },
    },
    emits: ["stake", "unstake"],
    setup(props, { emit }) {
        const store = useStore();
        const md = useBreakpoints(breakpointsTailwind).greater("md");
        const buttonText = computed(() =>
            props.isStaked ? "Staking.unstake" : "Staking.stake"
        );
        const nodeStake = computed(() =>
            props.stakeRewarded.plus(props.stakeNonRewarded)
        );
        const hostName = computed(() =>
            props.host === "" ? store.network : props.host
        );

        function handleClick() {
            if (props.isStaked) {
                emit("unstake", props.name);
            } else {
                emit("stake", props.name);
            }
        }

        return {
            buttonText,
            nodeStake,
            hostName,
            md,
            handleClick,
        };
    },
});
</script>
