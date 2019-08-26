<template>
    <div class="hardware-wallet-affiliates">
        <PageTitle large title="Buy a Hardware Wallet">
            Purchase a hardware wallet for the highest security when accessing
            your crypto.
        </PageTitle>
        <div class="offers">
            <template v-for="offer of offers">
                <HardwareWalletOffer
                    v-if="offer.supported"
                    :key="offer.moreInfo"
                    :currency="offer.currency"
                    :cost="offer.cost"
                    :image="offer.image"
                    :more-info="offer.moreInfo"
                    :description="offer.description"
                >
                </HardwareWalletOffer>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { createComponent } from "vue-function-api";
import HardwareWalletOffer from "../components/HardwareWalletOffer.vue";
import PageTitle from "../components/PageTitle.vue";
import ledgerImage from "../assets/logo-ledger.png";
import finneyImage from "../assets/logo-finney.png";
import bitboxImage from "../assets/logo-bitbox.png";
import trezorImage from "../assets/logo-trezor.png";
import secalotImage from "../assets/logo-secalot.png";
import keepkeyImage from "../assets/logo-keepkey.png";

export default createComponent({
    components: {
        HardwareWalletOffer,
        PageTitle
    },
    setup() {
        const offers = [
            {
                supported: false,
                currency: "$",
                cost: "59.00",
                image: ledgerImage,
                moreInfo: "https://www.ledger.com",
                description:
                    "A light, yet solid multicurrency hardware wallet for cryptocurrencies. It is easy to carry everywhere thanks to its USB format."
            },
            {
                supported: false,
                currency: "$",
                cost: "999.00",
                image: finneyImage,
                moreInfo:
                    "http://shop.sirinlabs.com/?rfsn=2397639.54fdf&utm_source=refersion&utm_medium=affiliate&utm_campaign=2397639.54fdf",
                description: "Uncompromised Security In a Blockchain Smartphone"
            },
            {
                supported: false,
                currency: "€",
                cost: "44.00",
                image: bitboxImage,
                moreInfo: "https://shiftcrypto.ch/?ref=mew",
                description:
                    "Our aim is to equip you for independence, with ease, in the digital world."
            },
            {
                supported: true,
                currency: "€",
                cost: "83.49",
                image: trezorImage,
                moreInfo: "https://shop.trezor.io/product/trezor-one-white",
                description:
                    "The most trusted hardware wallet in the world. Get yours today!"
            },
            {
                supported: false,
                currency: "$",
                cost: "50.00",
                image: secalotImage,
                moreInfo: "https://www.secalot.com",
                description:
                    "Your all-in-one digital security companion. it is a small USB dongle that packs a wide range of features."
            },
            {
                supported: false,
                currency: "€",
                cost: "79.00",
                image: keepkeyImage,
                moreInfo: "http://lddy.no/a4im",
                description:
                    "Protect your cryptocurrencies, store your private keys offline, and safeguard your assets from hackers."
            }
        ];
        return {
            offers
        };
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
