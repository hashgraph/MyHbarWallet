<template>
    <div class="hardware-wallet-affiliates">
        <div class="title-container">
            <div class="title">Buy a Hardware wallet</div>
            <div class="subtitle">
                Purchase a hardware wallet for the highest security when
                accessing your crypto.
            </div>
        </div>
        <div class="offers">
            <HardwareWalletOffer
                v-for="offer of offers"
                :key="offer.moreInfo"
                :currency="offer.currency"
                :cost="offer.cost"
                :image="offer.image"
                :more-info="offer.moreInfo"
                :description="offer.description"
            >
            </HardwareWalletOffer>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import HardwareWalletOffer from "../components/HardwareWalletOffer.vue";
import ledgerImage from "../assets/logo-ledger.png";
import finneyImage from "../assets/logo-finney.png";
import bitboxImage from "../assets/logo-bitbox.png";
import trezorImage from "../assets/logo-trezor.png";
import secalotImage from "../assets/logo-secalot.png";
import keepkeyImage from "../assets/logo-keepkey.png";

export default Vue.extend({
    name: "HardwareWalletAffiliates",
    components: {
        HardwareWalletOffer
    },
    computed: {
        offers() {
            return [
                {
                    currency: "$",
                    cost: "59.00",
                    image: ledgerImage,
                    moreInfo: "https://www.ledger.com/?r=fa4b",
                    description:
                        "A light, yet solid multicurrency hardware wallet for cryptocurrencies. It is easy to carry everywhere thanks to its USB format."
                },
                {
                    currency: "$",
                    cost: "999.00",
                    image: finneyImage,
                    moreInfo:
                        "http://shop.sirinlabs.com/?rfsn=2397639.54fdf&utm_source=refersion&utm_medium=affiliate&utm_campaign=2397639.54fdf",
                    description:
                        "Uncompromised Security In a Blockchain Smartphone"
                },
                {
                    currency: "€",
                    cost: "44.00",
                    image: bitboxImage,
                    moreInfo: "https://shiftcrypto.ch/?ref=mew",
                    description:
                        "Our aim is to equip you for independence, with ease, in the digital world."
                },
                {
                    currency: "€",
                    cost: "83.49",
                    image: trezorImage,
                    moreInfo: "https://trezor.io/?offer_id=12&aff_id=2029",
                    description:
                        "The most trusted hardware wallet in the world. Get yours today!"
                },
                {
                    currency: "$",
                    cost: "50.00",
                    image: secalotImage,
                    moreInfo: "https://www.secalot.com",
                    description:
                        "Your all-in-one digital security companion. it is a small USB dongle that packs a wide range of features."
                },
                {
                    currency: "€",
                    cost: "79.00",
                    image: keepkeyImage,
                    moreInfo: "http://lddy.no/a4im",
                    description:
                        "Protect your cryptocurrencies, store your private keys offline, and safeguard your assets from hackers."
                }
            ];
        }
    }
});
</script>

<style lang="postcss" scoped>
.title-container {
    margin-block-end: 50px;
    text-align: center;
}

.title {
    color: var(--color-ghostlands-coal);
    font-size: 45px;
    font-weight: 500;
    margin-block-end: 15px;
}

.subtitle {
    color: var(--color-china-blue);
    font-size: 14px;
    font-weight: 400;
}

.hardware-wallet-affiliates {
    background: var(--color-boysenberry-shadow);
    padding: 100px 0 100px 0;
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
