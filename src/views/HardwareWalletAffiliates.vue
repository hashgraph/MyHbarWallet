<template>
  <div class="hardware-wallet-affiliates">
    <PageTitle
      :title="$t('hardwareWalletAffiliates.title')"
      large
    >
      {{ $t("hardwareWalletAffiliates.purchase") }}
    </PageTitle>
    <!-- enable and add offers/affiliates in src/affiliates.ts -->
    <div class="offers">
      <template v-for="offer of affiliates">
        <HardwareWalletOffer
          v-if="offer.supported"
          :key="offer.address"
          :cost="offer.cost"
          :currency="offer.currency"
          :description="offer.description"
          :image="offer.image"
          :more-info="offer.address"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";

import HardwareWalletOffer from "../components/HardwareWalletOffer.vue";
import PageTitle from "../components/PageTitle.vue";
import affiliates from "../affiliates";

export default createComponent({
    name: "HardwareWalletAffiliates",
    components: {
        HardwareWalletOffer,
        PageTitle
    },
    setup() {
        return { affiliates };
    }
});
</script>

<style lang="postcss" scoped>
    .hardware-wallet-affiliates {
        background: var(--color-boysenberry-shadow);
        flex: 1;
        padding: 80px 0 80px 0;

        @media (max-width: 425px) {
            padding: 40px 0 40px 0;
        }
    }

    .header {
        align-items: center;
        display: flex;
        flex-direction: column;
    }

    .offers {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        max-width: 720px;
    }
</style>
