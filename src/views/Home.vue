<template>
    <div class="home">
        <div class="top">
            <div class="page-container">
                <div class="banner">
                    <div class="banner-content">
                        <h1>Hedera's</h1>
                        <h1>Original Wallet</h1>
                        MyHederaWallet is a free, client-side interface helping
                        you interact with Hedera hashgraph. Our easy-to-use,
                        open-source platform allows you to generate wallets,
                        interact with smart contracts, and so much more.
                    </div>
                    <div class="banner-image"></div>
                </div>
                <HomeTileButtons />
            </div>
        </div>
        <div class="about">
            <div class="page-container">
                <div class="banner">
                    <div class="banner-content">
                        <h2>About MyHederaWallet</h2>
                        <p>
                            MyHederaWallet puts Hedera Hashgraph at your
                            fingertips. Bacon ipsum dolor amet shank swine beef
                            ribs kevin chicken, jowl prosciutto flank shankle
                            tenderloin burgdoggen leberkas sausage pork belly.
                            Bresaola flank beef meatball fatback ground round,
                            pancetta jerky porchetta.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <Features />
        <FAQs />
        <Community />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Features from "@/components/Features.vue";
import FAQs from "@/components/FAQs.vue";
import Community from "@/components/Community.vue";
import HomeTileButtons from "@/components/HomeTileButtons.vue";

export default Vue.extend({
    name: "Home",
    components: {
        FAQs,
        HomeTileButtons,
        Features,
        Community
    }
});
</script>

<style lang="postcss" scoped>
.home {
    @media (max-width: 414px) {
        align-items: stretch;
    }
}

.top {
    background-color: white;
}

.page-container {
    align-items: center;
    align-self: center;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 1024px;

    @media (min-width: 1025px) {
        /* fixme: remove 80px when there is more content */
        padding: 80px 20px;
    }

    @media (max-width: 1024px) and (min-width: 415px) {
        /* fixme: remove 80px when there is more content */
        padding: 80px 25px;
    }

    @media (max-width: 1024px) {
        /* fixme: remove 80px when there is more content */
        padding: 80px 25px;
    }
}

.banner {
    align-items: center;
    align-self: center;
    display: flex;
    width: 100%;
}

.banner-content {
    font-family: Montserrat, sans-serif;
    font-size: 14px;
    max-width: 50%;
    text-align: start;

    & > h1 {
        color: var(--color-ghostlands-coal);
        font-size: 45px;
        font-weight: 700;
        letter-spacing: -1px;
    }
}

.banner-image {
    display: flex;
    flex: 1;
}

.about {
    background-color: var(--color-yankees-blue);
    color: white;
}
</style>
