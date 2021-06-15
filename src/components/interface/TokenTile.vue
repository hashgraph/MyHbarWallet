<template>
  <div
    :class="[
      'shadow-md p-5 border border-jupiter rounded text-black-out dark:text-white dark:border-midnight-express',
      'lg:px-10 lg:py-7',
    ]"
  >
    <div class="flex flex-wrap items-center lg:items-start">
      <img class="h-16 mr-5" :src="img" alt="" />

      <div class="contents lg:block">
        <div class="text-2xl font-semibold lg:mb-2">
          {{ token }}
        </div>

        <div
          class="
            text-squant
            leading-5
            max-w-lg
            order-4
            lg:order-2
            dark:text-argent
          "
        >
          {{ blurb }}
        </div>
      </div>

      <TokenAssociateButton
        class="flex w-full my-7 lg:w-auto lg:ml-auto lg:mt-2"
        :associated="associated"
      />
    </div>

    <div class="mt-7">
      <TokenStat
        :title="$t('InterfaceTokenTile.price')"
        stat="$0.9979 @ 0.001544 HBAR"
      />
      <TokenStat
        :title="$t('InterfaceTokenTile.marketCap')"
        stat="$12,615,123,958.64"
      />
      <TokenStat
        :title="$t('InterfaceTokenTile.totalSupply')"
        stat="12,642,013,512.397079 USDT"
      />
      <TokenStat
        :title="$t('InterfaceTokenTile.holders')"
        :stat="
          $t('InterfaceTokenTile.holders.addresses', {
            numOfAddresses: '2,180,411',
          })
        "
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import greenCheck from "../../assets/icon_check_green.svg";
import TokenStat from "./TokenStat.vue";
import TokenAssociateButton from "./TokenAssociateButton.vue";

export default defineComponent({
  name: "TokenTile",
  components: { TokenStat, TokenAssociateButton },
  props: {
    img: { type: String, required: true },
    token: { type: String, required: true },
    blurb: { type: String, required: true },
    associated: { type: Boolean, default: false },
  },
  setup() {
    return {
      greenCheck,
    };
  },
});
</script>
