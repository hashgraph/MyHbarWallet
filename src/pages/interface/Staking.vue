<template>
  <div
    class="relative md:flex items-center pb-5 border-b border-cerebral-grey"
  >
    <div
      class="pb-[10px] md:pb-0 pr-5 text-3xl flex-grow font-medium dark:text-white dark:border-midnight-express"
    >
      {{ $t("Staking.title") }}
    </div>
    <div
      v-if="isStaking"
      class="font-medium dark:text-white"
    >
      You are currently staking <br v-if="!md">
      <span
        class="font-bold"
      >{{ accountBalance }} HBAR (${{ balanceInUsd }})</span>
    </div>
    <div
      v-else
      class="font-medium text-squant"
    >
      {{ $t("Staking.youAreNotStaking") }} <br v-if="!md"><span
        class="font-bold"
      >{{ $t("Staking.selectANodeBelow") }}</span>
    </div>
  </div>

  <div
    class="bg-cottonBall dark:bg-hei-se-black rounded-t-[10px] grid grid-cols-2 lg:grid-cols-4 p-5 lg:p-9 gap-x-[10px] gap-y-[10px] mt-[30px]"
  >
    <StakingOverviewTile
      :icon="iconNode"
      :title="$t('Staking.estimatedReward')"
      :value="estimatedReward.toString()"
    />
    <StakingOverviewTile
      :icon="iconClock"
      :title="$t('Staking.nextPeriod')"
      :value="timeToNextStakingPeriod"
    />
    <StakingOverviewTile
      :icon="iconHbar"
      :title="$t('Staking.estimatedRewardRate')"
      :value="estimatedRewardRate.toString()"
    />
    <!-- <StakingOverviewTile
      :icon="iconHbar"
      :title="$t('Staking.unclaimedReward')"
      :value="'unknown'"
      tooltip
    /> -->
  </div>

  <div class="font-medium text-xl pt-5 dark:text-white">
    {{ $t("Staking.selectNode") }}
  </div>
  <div
    v-if="md"
    class="grid grid-cols-[60px,3fr,4fr,100px] gap-x-5 text-sm text-squant font-medium border-b dark:border-midnight-express pb-[10px] pt-5 border-cerebral-grey"
  >
    <div class="justify-self-center">
      {{ $t("Staking.node") }}
    </div>
    <div>{{ $t("Staking.hostedBy") }}</div>
    <div>{{ $t("Staking.minMax") }}</div>
  </div>
  <div
    v-else
    class="w-full h-px bg-cerebral-grey my-5"
  />
  <StakingItem
    v-for="node in stakingInfo"
    :key="node.node_id"
    :account-id="node.node_account_id"
    :stake-min="node.min_stake"
    :stake-max="node.max_stake"
    :stake-rewarded="node.stake_rewarded"
    :stake-non-rewarded="node.stake_not_rewarded"
    :name="node.node_id"
    :host="getHostInfoForNode(network, node.node_id).name"
    :location="getHostInfoForNode(network, node.node_id).location"
    :is-staked="accountStakingInfo?.staked_node_id == node.node_id"
    @stake="handleStake"
    @unstake="handleUnstake"
  />

  <Modal
    title=""
    :is-visible="confirmStakeOpen"
    :show-close-button="false"
  >
    <div class="font-medium text-center text-xl">
      Confirm Selection
    </div>
    <div class="font-bold text-center text-[30px] py-[30px]">
      Stake to Node {{ selectedNode }}
    </div>
    <div class="text-center text-squant font-normal pb-[30px]">
      Network fee: 0.00290 HBAR
    </div>
    <div class="flex justify-center">
      <label class="text-base font-normal select-none relative">
        <input
          v-model="rejectRewards"
          type="checkbox"
          class="border-mountain-meadow checked:border checked:border-mountain-meadow checked:text-transparent rounded-md w-6 h-6 mr-[10px] focus:ring-mountain-meadow"
        >
        <img
          v-if="rejectRewards"
          :src="checkmark"
          class="absolute left-1 top-[7px]"
        >
        Reject rewards from this Node
      </label>
    </div>

    <div class="flex flex-col w-full items-center">
      <Button
        :busy="busy"
        color="green"
        class="h-[50px] w-[300px] mt-[30px] mb-10 text-lg font-semibold"
        @click="() => updateStake(selectedNode)"
      >
        Stake
      </Button>
      <button
        class="h-10 w-[120px] text-lg font-semibold border border-mountain-meadow rounded-full px-6 text-mountain-meadow"
        @click="handleCancel"
      >
        Cancel
      </button>
    </div>
  </Modal>
  <Modal
    title=""
    :is-visible="changeStakeOpen"
    :show-close-button="false"
  >
    <div class="font-medium text-center text-xl">
      Change Stake
    </div>
    <div class="font-bold text-center text-[30px] py-[30px]">
      Stake to Node {{ selectedNode }}?
    </div>
    <div class="text-center text-squant font-normal pb-[30px]">
      Network fee: 0.00290 HBAR
    </div>
    <div class="flex justify-center">
      <label class="text-base font-normal select-none relative">
        <input
          v-model="rejectRewards"
          type="checkbox"
          class="border-mountain-meadow checked:border checked:border-mountain-meadow checked:text-transparent rounded-md w-6 h-6 mr-[10px] focus:ring-mountain-meadow"
        >
        <img
          v-if="rejectRewards"
          :src="checkmark"
          class="absolute left-1 top-[7px]"
        >
        Reject rewards from this Node
      </label>
    </div>

    <div class="flex flex-col w-full items-center">
      <Button
        :busy="busy"
        color="green"
        class="h-[50px] w-[300px] mt-[30px] mb-10 text-lg font-semibold"
        @click="() => updateStake(selectedNode)"
      >
        Change Stake
      </Button>
      <button
        class="h-10 w-[120px] text-lg font-semibold border border-mountain-meadow rounded-full px-6 text-mountain-meadow"
        @click="handleCancel"
      >
        Cancel
      </button>
    </div>
  </Modal>

  <Modal
    title=""
    :is-visible="confirmUnstakeOpen"
    :show-close-button="false"
  >
    <div class="font-medium text-center text-xl">
      Confirm Unstake
    </div>
    <div class="font-bold text-center text-[30px] py-[30px]">
      Unstake from Node {{ selectedNode }}?
    </div>
    <div class="text-center text-squant font-normal pb-[30px]">
      Network fee: 0.00290 HBAR
    </div>

    <div class="flex flex-col w-full items-center">
      <Button
        :busy="busy"
        color="green"
        class="h-[50px] w-[300px] mt-[30px] mb-10 text-lg font-semibold"
        @click="() => updateStake(null)"
      >
        Unstake
      </Button>
      <button
        class="h-10 w-[120px] text-lg font-semibold border border-mountain-meadow rounded-full px-6 text-mountain-meadow"
        @click="handleCancel"
      >
        Cancel
      </button>
    </div>
  </Modal>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useBreakpoints, breakpointsTailwind, useNow } from "@vueuse/core";
import BigNumber from "bignumber.js";

import { useStore } from "../../store";
import StakingItem from "../../components/interface/StakingItem.vue";
import StakingOverviewTile from "../../components/interface/StakingOverviewTile.vue";
import iconNode from "../../assets/node.svg";
import iconClock from "../../assets/clock.svg";
import iconHbar from "../../assets/hbar_gradient.svg";
import Modal from "../../components/interface/Modal.vue";
import checkmark from "../../assets/checkmark.svg";
import Button from "../../components/base/Button.vue";

export default defineComponent({
    name: "Staking",
    components: {
        StakingItem,
        StakingOverviewTile,
        Modal,
        Button,
    },
    setup() {
        const store = useStore();
        const network = computed(() => store.network);
        const stakingInfo = computed(() => store.getNodeStakingInfo);
        const accountBalance = computed(() => store.balance?.hbars.toFormat());
        const md = useBreakpoints(breakpointsTailwind).greater("md");
        const balanceInUsd = computed(() =>
            store.balance?.hbars.times(store.hbarPriceUsd ?? 0).toFormat(2, {
                decimalSeparator: ".",
                groupSeparator: ",",
                groupSize: 3,
            })
        );
        const accountStakingInfo = computed(() => store.getAccountStakingInfo);

        const isStaking = computed(
            () =>
                (accountStakingInfo.value?.staked_node_id ??
                    accountStakingInfo.value?.staked_account_id) != null
        );
        const now = useNow();
        const timeToNextStakingPeriod = computed(() => {
            if (stakingInfo.value == null) {
                return "-";
            } else {
                const firstNode = stakingInfo.value[0];
                const period = firstNode.staking_period;
                const milliseconds =
                    Number.parseInt(period.to.split(".")[0]) * 1000;
                const date = new Date(milliseconds);

                const timeUntil = Math.abs(
                    date.getTime() - now.value.getTime()
                );

                const days = Math.floor(timeUntil / (24 * 60 * 60 * 1000));
                const hours = Math.floor(
                    (timeUntil % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
                );
                const minutes = Math.floor(
                    (timeUntil % (60 * 60 * 1000)) / (60 * 1000)
                );

                let result = "";
                if (days > 0) {
                    result = `${days}d `;
                }
                if (hours > 0) {
                    result = result + `${hours}h `;
                }
                return result + `${minutes}m`;
            }
        });

        const mainnetNodes = [
            { name: "LG", location: "Seoul, South Korea" },
            { name: "Swirlds", location: "North Carolina, USA" },
            { name: "FIS", location: "Florida, USA" },
            { name: "Wipro", location: "Mumbai, India" },
            { name: "Nomura", location: "Tokyo, Japan" },
            { name: "Google", location: "Helsinki, Finland" },
            { name: "Zain Group", location: "Kuwait City, Kuwait" },
            { name: "Magalu", location: "São Paulo, Brazil" },
            { name: "Boeing", location: "Toronto, Canada" },
            { name: "DLA Piper", location: "London, UK" },
            { name: "Tata Communications", location: "California, USA" },
            { name: "IBM", location: "Washington, USA" },
            { name: "Deutsche Telekom", location: "Berlin, Germany" },
            { name: "UCL", location: "Amsterdam, Netherlands" },
            { name: "Avery Dennison", location: "Pennsylvania, USA" },
            { name: "Dentons", location: "Frankfurt, DE" },
            { name: "Standard Bank", location: "Warsaw, Poland" },
            { name: "eftpos", location: "Oregon, USA" },
            { name: "EDF", location: "Paris, France" },
            { name: "Shinhan Bank", location: "Seoul, South Korea" },
            { name: "Chainlink Labs", location: "Michigan, USA" },
            { name: "LSE", location: "Virginia, USA" },
            { name: "IIT Madras", location: "Georgia, USA" },
            { name: "DBS", location: "Singapore, Republic of Singapore" },
            { name: "ServiceNow", location: "Ogden, Utah" },
            { name: "Ubisoft", location: "Singapore, Republic of Singapore" },
        ];
        function getHostInfoForNode(
            network: "mainnet" | "testnet" | "previewnet",
            index: number
        ) {
            if (network === "mainnet") {
                return mainnetNodes[index];
            } else {
                return { name: "", location: "" };
            }
        }

        const rewardRate = computed(() => {
            if (
                accountStakingInfo.value == null ||
                accountStakingInfo.value.staked_node_id == null ||
                stakingInfo.value == null
            ) {
                return new BigNumber(0);
            } else {
                const node =
                    stakingInfo.value[accountStakingInfo.value.staked_node_id];
                return node.stake.isEqualTo(0)
                    ? new BigNumber(0)
                    : node.reward_rate_start.dividedBy(node.stake_rewarded);
            }
        });
        const estimatedReward = computed(() => {
            if (!isStaking.value || store.balance == null) {
                return "-";
            } else if (rewardRate.value.isEqualTo(0)) {
                return rewardRate.value;
            } else {
                return rewardRate.value
                    .multipliedBy(store.balance.hbars)
                    .integerValue();
            }
        });

        const estimatedRewardRate = computed(() => {
            if (!isStaking.value) {
                return "-";
            } else {
                return `${rewardRate.value.multipliedBy(100).toFormat(2)}%`;
            }
        });

        const confirmStakeOpen = ref(false);
        const confirmUnstakeOpen = ref(false);
        const changeStakeOpen = ref(false);
        const selectedNode = ref<number | null>(null);
        const rejectRewards = ref(false);
        const busy = ref(false);

        function handleStake(node: number) {
            selectedNode.value = node;
            if (isStaking.value) {
                changeStakeOpen.value = true;
            } else {
                confirmStakeOpen.value = true;
            }
        }

        function handleUnstake(node: number) {
            selectedNode.value = node;
            confirmUnstakeOpen.value = true;
        }

        function handleCancel() {
            confirmStakeOpen.value = false;
            confirmUnstakeOpen.value = false;
            changeStakeOpen.value = false;
            selectedNode.value = null;
            rejectRewards.value = false;
        }

        async function updateStake(node: number | null): Promise<void> {
            busy.value = true;

            await store.updateStake(rejectRewards.value, node);
            // reset/close any modals
            handleCancel();
            busy.value = false;

            // we need to refresh staking information after this is done!
            store.fetchAccountStakingInfo();
            store.fetchNetworkNodeStakingInfo();
        }

        onMounted(() => {
            store.fetchNetworkNodeStakingInfo();
        });

        return {
            network,
            stakingInfo,
            getHostInfoForNode,
            accountStakingInfo,
            isStaking,
            timeToNextStakingPeriod,
            estimatedReward,
            estimatedRewardRate,
            accountBalance,
            balanceInUsd,
            iconNode,
            iconClock,
            iconHbar,
            md,
            handleStake,
            handleUnstake,
            handleCancel,
            confirmStakeOpen,
            changeStakeOpen,
            confirmUnstakeOpen,
            selectedNode,
            rejectRewards,
            checkmark,
            updateStake,
            busy,
        };
    },
});
</script>
