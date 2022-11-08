<template>
  <div class="flex flex-wrap justify-between">
    <div
      v-if="showStakingBanner && !isStaking"
      class="bg-deadBlueEyes flex rounded-lg px-5 mb-7 items-center flex-grow text-white"
    >
      <div class="py-5 font-medium">
        New! Take advantage of earning HBAR Rewards through Staking
      </div>
      <div class="flex-grow" />
      <router-link
        v-if="!isLedger"
        class="underline font-semibold"
        :to="{ name: 'staking' }"
      >
        Set Up Staking Now
      </router-link>
      <img
        :src="closeCircle"
        class="ml-[42px] cursor-pointer"
        @click="closeBanner"
      >
    </div>
    <div class="flex flex-wrap items-center w-full">
      <div class="mr-2 text-3xl leading-9 text-carbon dark:text-white">
        {{ $t("App.heyThere") }}
      </div>

      <Identicon
        class="mr-2"
        :size="36"
        :public-key="publicKey?.toString()?.slice(25)"
      />

      <div
        data-cy-account-id
        class="text-3xl font-semibold text-carbon dark:text-white"
      >
        {{ accountId?.toString() }}
      </div>
    </div>

    <div class="flex flex-wrap items-center w-full">
      <TotalBalance />
      <div class="w-11 flex-grow flex-shrink-0" />
      <router-link
        data-cy-send
        :to="{ name: 'send' }"
        class="mx-auto pb-5 sm:pb-0"
      >
        <Image
          class="w-20 h-20"
          :light="sendAssetLight"
          :dark="sendAssetDark"
          alt="paper airplane"
        />

        <div class="font-medium leading-5 text-center text-andrea-blue">
          {{ $t("InterfaceHome.button.send") }}
        </div>
      </router-link>
    </div>
  </div>

  <div class="border-t border-cerebral-grey dark:border-midnight-express" />

  <div
    class="grid md:grid-flow-col md:gap-x-12 md:auto-cols-fr mt-7 dark:bg-ruined-smores"
  >
    <Assets :limit-tokens="5" />

    <Transactions
      class="mt-4 sm:mt-0"
      page-size="5"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { useStore } from "../../store";
import addAssetLight from "../../assets/img_add.svg";
import sendAssetLight from "../../assets/img_send.svg";
import addAssetDark from "../../assets/dark/img_add_dark.svg";
import sendAssetDark from "../../assets/dark/img_send_dark.svg";
import closeCircle from "../../assets/close_circle.svg";
import Image from "../../components/base/Image.vue";
import Assets from "../../components/interface/Assets.vue";
import Transactions from "../../components/interface/Transactions.vue";
import Identicon from "../../components/interface/Identicon.vue";
import TotalBalance from "../../components/interface/TotalBalance.vue";

export default defineComponent({
    name: "Home",
    components: {
        Identicon,
        TotalBalance,
        Image,
        Assets,
        Transactions,
    },
    setup() {
        const router = useRouter();
        const store = useStore();
        const accountId = computed(() => store.accountId);
        const publicKey = computed(() => store.publicKey);
        const isLedger = computed(() => !store.wallet?.hasPrivateKey() ?? false)

        const isStaking = computed(
            () =>
                (store.getAccountStakingInfo?.staked_node_id ??
                    store.getAccountStakingInfo?.staked_account_id) != null
        );
        
        const showStakingBanner = ref(!isLedger.value);
        

        onMounted(() => {
            void store.requestHbarPrice();
            void store.fetchAccountStakingInfo();
        });

        function onClickStake() {
            router.push({ name: "stake" });
        }

        function closeBanner() {
            showStakingBanner.value = false;
        }

        return {
            accountId,
            publicKey,
            addAssetLight,
            sendAssetLight,
            addAssetDark,
            sendAssetDark,
            onClickStake,
            isStaking,
            isLedger,
            closeCircle,
            closeBanner,
            showStakingBanner,
        };
    },
});
</script>
