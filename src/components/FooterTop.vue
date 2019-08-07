<template>
    <div class="container">
        <div class="section">
            <div class="title">Discover</div>
            <div class="item">
                <router-link to="/convert-units" class="link">
                    Units
                </router-link>
            </div>
            <div class="item">
                <router-link to="/hardware-wallet-affiliates" class="link">
                    Buy a Hardware Wallet
                </router-link>
            </div>
        </div>
        <div class="section">
            <div class="title">Affiliates</div>
            <div class="item">
                <a class="link" href="https://www.ledger.com/">Ledger Wallet</a>
            </div>
            <div class="item">
                <a class="link" href="https://ether.cards/">Ether Card</a>
            </div>
            <div class="item">
                <a class="link" href="https://bity.com/">Bity</a>
            </div>
            <div class="item">
                <a class="link" href="https://billfodl.com/">Billfodl</a>
            </div>
            <div class="item">
                <a class="link" href="http://shop.sirinlabs.com/">Finney</a>
            </div>
            <div class="item">
                <a class="link" href="https://shiftcrypto.ch/">Bitbox</a>
            </div>
            <div class="item">
                <a class="link" href="https://trezor.io/">Trezor</a>
            </div>
            <div class="item">
                <a class="link" href="https://www.secalot.com/">Secalot</a>
            </div>
            <div class="item">
                <a class="link" href="https://keepkey.myshopify.com/">
                    Keepkey
                </a>
            </div>
        </div>
        <div class="section">
            <div class="title">MHW</div>
            <div class="item">
                <router-link to="/#about" class="link">About</router-link>
            </div>
            <div class="item">
                <router-link to="/#faqs" class="link">FAQs</router-link>
            </div>
            <div class="item">
                <router-link to class="link">Customer Support</router-link>
            </div>
        </div>
        <div class="section">
            <div class="title">
                Love
                <img src="../assets/heart.svg" />
                MHW? Donate!
            </div>
            <div class="item">
                MyHederaWallet is open-source and free to the community. Your
                donations go a long way towards making that possible.
            </div>
            <!-- FIXME: this is ugly -->
            <div>ħ 0.0.1050</div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "FooterTop"
});
</script>

<style scoped lang="postcss">
.container {
    border-bottom: 1px solid var(--color-ashen-wind);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1.5fr;
    justify-content: space-between;
    margin: auto;
    margin-block-end: 40px;
    max-width: 1024px;
    padding-block-end: 40px;
    padding-inline: 20px;
}

.section {
    flex-grow: 1;
}

.title {
    color: white;
    font-size: 19px;
    font-weight: 500;
    margin-block-end: 20px;
}

.item {
    margin-block-end: 15px;
}

.link {
    color: inherit;
    text-decoration: none;

    &:hover,
    &:focus {
        cursor: pointer;
    }
}

img {
    height: 30px;
    vertical-align: top;
}
</style>
