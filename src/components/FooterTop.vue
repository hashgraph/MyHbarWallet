<template>
    <div class="footer-top">
        <div class="section">
            <div class="title">Discover</div>
            <div class="item">
                <router-link :to="{ name: 'convert-units' }" class="link">
                    Units
                </router-link>
            </div>
            <div class="item">
                <router-link
                    :to="{ name: 'hardware-wallet-affiliates' }"
                    class="link"
                >
                    Buy a Hardware Wallet
                </router-link>
            </div>
        </div>
        <div class="section">
            <div class="title">Affiliates</div>
            <div class="item">
                <a
                    rel="noopener"
                    target="_blank"
                    class="link"
                    href="https://www.ledger.com/"
                >
                    Ledger Wallet
                </a>
            </div>
            <div class="item">
                <a
                    rel="noopener"
                    target="_blank"
                    class="link"
                    href="https://ether.cards/"
                >
                    Ether Card
                </a>
            </div>
            <div class="item">
                <a
                    rel="noopener"
                    target="_blank"
                    class="link"
                    href="https://bity.com/"
                >
                    Bity
                </a>
            </div>
            <div class="item">
                <a
                    rel="noopener"
                    target="_blank"
                    class="link"
                    href="https://billfodl.com/"
                >
                    Billfodl
                </a>
            </div>
            <div class="item">
                <a
                    rel="noopener"
                    target="_blank"
                    class="link"
                    href="http://shop.sirinlabs.com/"
                >
                    Finney
                </a>
            </div>
            <div class="item">
                <a
                    rel="noopener"
                    target="_blank"
                    class="link"
                    href="https://shiftcrypto.ch/"
                >
                    Bitbox
                </a>
            </div>
            <div class="item">
                <a
                    rel="noopener"
                    target="_blank"
                    class="link"
                    href="https://trezor.io/"
                >
                    Trezor
                </a>
            </div>
            <div class="item">
                <a
                    rel="noopener"
                    target="_blank"
                    class="link"
                    href="https://www.secalot.com/"
                >
                    Secalot
                </a>
            </div>
            <div class="item">
                <a
                    rel="noopener"
                    target="_blank"
                    class="link"
                    href="https://keepkey.myshopify.com/"
                >
                    Keepkey
                </a>
            </div>
        </div>
        <div class="section">
            <div class="title">MHW</div>
            <div class="item">
                <router-link
                    :to="{ name: 'home', hash: '#about' }"
                    class="link"
                >
                    About
                </router-link>
            </div>
            <div class="item">
                <router-link :to="{ name: 'home', hash: '#faqs' }" class="link">
                    FAQs
                </router-link>
            </div>
            <div class="item">
                <router-link to class="link">Customer Support</router-link>
            </div>
        </div>
        <div class="section">
            <div class="title">
                Love
                <img class="love" src="../assets/heart.svg" />
                MHW? Donate!
            </div>
            <div class="item">
                MyHederaWallet is open-source and free to the community. Your
                donations go a long way towards making that possible.
            </div>
            <div class="donation">
                <img class="hbar-icon" src="../assets/icon-hbar-outline2.svg" />
                0.0.1050
            </div>
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
.footer-top {
    border-bottom: 1px solid var(--color-china-blue);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1.5fr;
    justify-content: space-between;
    margin: auto;
    margin-block-end: 40px;
    max-width: 1024px;
    padding-block-end: 40px;
    padding-block-start: 30px;
    padding-inline: 20px;
}

.section {
    flex-grow: 1;
}

.title {
    color: var(--color-white);
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

.love {
    height: 30px;
    vertical-align: top;
}

.hbar-icon {
    height: 28px;
    margin-inline-end: 5px;
}

.donation {
    color: var(--color-melbourne-cup);
}
</style>
