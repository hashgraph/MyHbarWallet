<template>
    <div class="home">
        <div class="top">
            <div class="page-container">
                <div class="banner">
                    <div class="banner-content">
                        <div class="title">
                            Hedera's
                        </div>
                        <div class="title">
                            Original Wallet
                        </div>
                        <div class="subtitle">
                            MyHederaWallet is a free, client-side interface
                            helping you interact with Hedera hashgraph. Our
                            easy-to-use, open-source platform allows you to
                            generate wallets, interact with smart contracts, and
                            so much more.
                        </div>
                    </div>
                    <div class="banner-image">
                        <img src="https://placehold.it/400x400" alt="banner" />
                    </div>
                </div>
                <HomeTileButtons />
            </div>
        </div>
        <img class="circle" :src="circle" alt="circle" />
        <div id="about" class="about">
            <div class="page-container">
                <div class="banner">
                    <div class="banner-content">
                        <div class="about-title">About MyHederaWallet</div>
                        <div class="about-subtitle">
                            MyHederaWallet puts Hedera Hashgraph at your
                            fingertips. Bacon ipsum dolor amet shank swine beef
                            ribs kevin chicken, jowl prosciutto flank shankle
                            tenderloin burgdoggen leberkas sausage pork belly.
                            Bresaola flank beef meatball fatback ground round,
                            pancetta jerky porchetta.
                        </div>
                    </div>
                    <img
                        class="about-image"
                        src="https://placehold.it/300x300"
                        alt="about"
                    />
                </div>
            </div>
        </div>
        <Features />
        <FAQs />
        <Community />
        <ModalForgotToLogOut v-model="modalForgotToLogOutIsOpen" />
        <Alerts timeout="7000" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Features from "@/components/Features.vue";
import FAQs from "@/components/FAQs.vue";
import Community from "@/components/Community.vue";
import HomeTileButtons from "@/components/HomeTileButtons.vue";
import circleImage from "@/assets/circle.png";
import ModalForgotToLogOut from "@/components/ModalForgotToLogOut.vue";
import Alerts from "@/components/Alerts.vue";

export default Vue.extend({
    name: "Home",
    components: {
        FAQs,
        HomeTileButtons,
        Features,
        Community,
        Alerts,
        ModalForgotToLogOut
    },
    data() {
        return {
            modalForgotToLogOutIsOpen: false
        };
    },
    computed: {
        circle() {
            return circleImage;
        }
    },
    created() {
        // FIXME: Only spawn this if you are logged in when navigating to home
        const areWeLoggedIn = Math.random() > 0.5;
        setTimeout(() => {
            this.modalForgotToLogOutIsOpen = areWeLoggedIn;
        }, 0);
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
    margin: 0 auto;
    max-width: 1024px;
    padding: 0 20px;
    text-align: start;

    @media (min-width: 1025px) {
        /* fixme: remove 80px when there is more content */
        padding: 0 20px;
    }

    @media (max-width: 1024px) and (min-width: 415px) {
        /* fixme: remove 80px when there is more content */
        padding: 0 25px;
    }

    @media (max-width: 1024px) {
        /* fixme: remove 80px when there is more content */
        padding: 0 25px;
    }
}

.banner {
    align-items: center;
    align-self: center;
    display: flex;
    padding: 30px;
    width: 100%;
}

.top .banner {
    margin-block-end: 40px;
}

.banner-content {
    flex-grow: 1;
    font-family: Montserrat, sans-serif;
    font-size: 14px;
    text-align: start;
}

.title {
    color: var(--color-ghostlands-coal);
    font-size: 45px;
    font-weight: 700;
    height: 45px;
    line-height: 100%;
    margin-block-end: 8px;
}

.subtitle {
    color: var(--color-china-blue);
    margin-block-start: 17px;
    max-width: 420px;
}

.banner-image {
    display: flex;
    flex: 1;

    & :first-child {
        border-radius: 20px;
        height: 400px;
    }
}

.circle {
    background-color: var(--color-yankees-blue);
    width: 100%;
}

.about {
    background-color: var(--color-yankees-blue);
    color: white;
    font-size: 14px;
    padding: 20px 0;
}

.about-title {
    color: var(--color-white);
    font-size: 30px;
    font-weight: 500;
    margin-block-end: 15px;
}

.about-subtitle {
    color: var(--color-white);
    margin-block-end: 30px;
    width: 380px;
}

.about-image {
    border-radius: 20px;
    height: 300px;
}
</style>
