<template>
  <!-- negative top margin comes from the negative top used in the marketing/hero-image -->
  <div
    class="
      md:pb-32
      pb-20
      pt-16
      px-5
      max-w-2xl
      m-auto
      flex flex-col
      items-center
      lg:mt-[-141px]
      md:mt-[-90px]
    "
  >
    <Image
      class="mb-7 h-32 w-32"
      :light="walletLight"
      :dark="walletDark"
      alt="hbar wallet"
    />

    <div
      class="
        text-center text-abbadon-black
        dark:text-white
        font-semibold
        text-3xl
        mb-7
      "
    >
      {{ $t("Marketing.about.header") }}
    </div>

    <div class="text-center text-carbon dark:text-white font-medium">
      {{ $t("Marketing.about.paragraph") }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import walletLight from "../../assets/img_hbar_wallet.svg";
import walletDark from "../../assets/dark/img_hbar_wallet.svg";
import Image from "../base/Image.vue";

export default defineComponent({
  name: "MarketingAbout",
  components: { Image },
  setup() {
    return {
      walletLight,
      walletDark,
    };
  },
});
</script>
