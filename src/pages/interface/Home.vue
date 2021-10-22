<template>
  <div class="md:flex md:justify-between">
    <div>
      <div class="flex">
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

      <TotalBalance />
    </div>

    <div class="flex justify-center py-12 font-medium leading-5 text-center text-andrea-blue">
      <div class="mr-4 cursor-pointer">
        <Image
          class="w-20 h-20"
          :light="addAssetLight"
          :dark="addAssetDark"
          alt="buy assets"
          @click="openBuyAssetsModal"
        />
        <div>{{ $t("InterfaceHome.button.buy") }}</div>
      </div>
      <router-link
        data-cy-send
        :to="{ name: 'send' }"
      >
        <Image
          class="w-20 h-20"
          :light="sendAssetLight"
          :dark="sendAssetDark"
          alt="paper airplane"
        />
        <div>{{ $t("InterfaceHome.button.send") }}</div>
      </router-link>
    </div>
  </div>

  <div class="border-t border-cerebral-grey dark:border-midnight-express" />

  <div class="grid md:grid-flow-col md:gap-x-12 md:auto-cols-fr mt-7 dark:bg-ruined-smores">
    <Assets :limit-tokens="5" />

    <Transactions
      class="mt-4 sm:mt-0"
      page-size="5"
    />
  </div>

  <BuyAssetsModal
    :open="state.showBuyAssetsModal"
    @close="closeBuyAssetsModal"
  />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from "vue";

import { useStore } from "../../store";
import addAssetLight from "../../assets/img_add.svg";
import sendAssetLight from "../../assets/img_send.svg";
import addAssetDark from "../../assets/dark/img_add_dark.svg";
import sendAssetDark from "../../assets/dark/img_send_dark.svg";
import Image from "../../components/base/Image.vue";
import Assets from "../../components/interface/Assets.vue";
import Transactions from "../../components/interface/Transactions.vue";
import Identicon from "../../components/interface/Identicon.vue";
import TotalBalance from "../../components/interface/TotalBalance.vue";
import BuyAssetsModal from "../../components/interface/BuyAssetsModal.vue";

export default defineComponent({
  name: "Home",
  components: {
    Identicon,
    TotalBalance,
    Image,
    Assets,
    Transactions,
    BuyAssetsModal
  },
  setup() {
    const store = useStore();
    const accountId = computed(() => store.accountId);
    const publicKey = computed(() => store.publicKey);

    const state = reactive({
      showBuyAssetsModal: false
    });

    onMounted(() => {
      void store.requestHbarPrice();
    });

    function openBuyAssetsModal(): void {
      state.showBuyAssetsModal = true;
    }

    function closeBuyAssetsModal(): void {
      state.showBuyAssetsModal = false;
    }

    return {
      state,
      accountId,
      publicKey,
      addAssetLight,
      sendAssetLight,
      addAssetDark,
      sendAssetDark,
      openBuyAssetsModal,
      closeBuyAssetsModal
    };
  },
});
</script>
