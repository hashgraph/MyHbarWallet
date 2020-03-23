<template>
    <div class="hardware-wallet-affiliates">
        <PageTitle
            large
            :title="$t('hardwareWalletAffiliates.title')"
        >
            {{ $t("hardwareWalletAffiliates.purchase") }}
        </PageTitle>
        <div class="offers">
            <template v-for="offer of affiliates">
                <HardwareWalletOffer
                    v-if="offer.supported"
                    :key="offer.address"
                    :currency="offer.currency"
                    :cost="offer.cost"
                    :image="offer.image"
                    :more-info="offer.address"
                    :description="offer.description"
                />
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

import HardwareWalletOffer from "../components/HardwareWalletOffer.vue";
import PageTitle from "../components/PageTitle.vue";
import affiliates from "../../domain/affiliates";

export default defineComponent({
    components: {
        HardwareWalletOffer,
        PageTitle
    },
    props: {},
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
