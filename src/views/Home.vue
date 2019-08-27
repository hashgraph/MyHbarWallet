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
                            MyHbarWallet is a free, client-side interface
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
        <img class="circle" :src="circleImage" alt="circle" />
        <div id="about" class="about">
            <div class="page-container">
                <div class="banner">
                    <div class="banner-content">
                        <div class="about-title">About MyHbarWallet</div>
                        <div class="about-subtitle">
                            MyHbarWallet puts Hedera Hashgraph at your
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
        <Community v-if="false" />
        <ModalForgotToLogOut
            v-model="modalForgotToLogOutIsOpen"
            @change="handleForgotToLogoutChange"
        />
    </div>
</template>

<script lang="ts">
import Features from "../components/Features.vue";
import FAQs from "../components/FAQs.vue";
import Community from "../components/Community.vue";
import HomeTileButtons from "../components/HomeTileButtons.vue";
import circleImage from "../assets/circle.png";
import ModalForgotToLogOut from "../components/ModalForgotToLogOut.vue";
import { createComponent, computed } from "@vue/composition-api";
import store from "../store";

export default createComponent({
    components: {
        FAQs,
        HomeTileButtons,
        Features,
        Community,
        ModalForgotToLogOut
    },
    setup() {
        const modalForgotToLogOutIsOpen = computed(
            () => store.getters.IS_LOGGED_IN
        );

        function handleForgotToLogoutChange() {
            modalForgotToLogOutIsOpen.value = false;
        }

        return {
            circleImage,
            modalForgotToLogOutIsOpen,
            handleForgotToLogoutChange
        };
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
    background-color: var(--color-white);

    @media (max-width: 480px) {
        & .banner-image {
            display: none;
        }
    }
}

.page-container {
    margin: 0 auto;
    max-width: 1024px;
    padding: 0 20px;
    text-align: start;
}

.banner {
    align-items: center;
    align-self: center;
    display: flex;
    padding: 30px;
    width: 100%;

    @media (max-width: 810px) {
        flex-direction: column;
    }

    @media (max-width: 350px) {
        padding: 10px;
    }
}

.top .banner {
    margin-block-end: 40px;

    @media (max-width: 480px) {
        margin-block-end: 0;
    }
}

.top .page-container {
    @media (max-width: 480px) {
        padding-block-end: 25px;
    }
}

.banner-content {
    flex-grow: 1;
    font-family: Montserrat, sans-serif;
    font-size: 14px;
    text-align: start;

    @media (max-width: 810px) {
        margin-block-end: 20px;
    }
}

.title {
    color: var(--color-ghostlands-coal);
    font-size: 45px;
    font-weight: 700;
    height: 45px;
    line-height: 100%;
    margin-block-end: 8px;

    @media (max-width: 480px) {
        font-size: 32px;
        margin-block-end: 0;
    }
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
    inset-block-end: -1px;
    position: relative;
    width: 100%;
}

.about {
    background-color: var(--color-yankees-blue);
    color: var(--color-white);
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
    max-width: 380px;
}

.about-image {
    border-radius: 20px;
    height: 300px;

    @media (max-width: 350px) {
        height: 250px;
    }
}
</style>
