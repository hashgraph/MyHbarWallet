<template>
  <div class="relative">
    <Headline
      :title="$t('InterfaceHistory.header')"
      class="pb-20 lg:pb-8 mb-5"
    />

    <div
      class="
                absolute
                top-14
                lg:right-0
                lg:top-2
                w-64
                flex
                justify-around
                items-end
                text-andrea-blue
                font-medium
            "
    >
      <span class="py-1 px-4 rounded text-white bg-andrea-blue">{{
        $t("InterfaceHistory.button.all")
      }}</span>

      <span class="py-1 px-4 rounded">{{
        $t("InterfaceHistory.button.sent")
      }}</span>

      <span class="py-1 px-4 rounded">{{
        $t("InterfaceHistory.button.received")
      }}</span>
    </div>
  </div>

  <Transactions
    class="lg:mx-8"
    hide-header
    title="Token Transfer"
    timing="0.0.5678  •  14 seconds"
    transaction="+0.01 HBAR, +0.02 hBTC"
    fee="Fee  -0.0025"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Headline from "../../components/interface/Headline.vue";
import Transactions from "../../components/interface/Transactions.vue";

export default defineComponent({
  name: "History",
  components: {
    Headline,
    Transactions,
  },
});
</script>
