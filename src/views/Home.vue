<template>
    <div class="home">
        <div class="top">
            <div class="page-container">
                <div class="banner">
                    <div class="banner-content">
                        <div class="title">
                            {{ $t("home.theNumberOneHbarWallet") }}
                        </div>
                        <div class="subtitle">
                            {{
                                $t(
                                    "home.myHbarWalletIsAFreeClientSideInterface"
                                )
                            }}
                        </div>
                    </div>
                    <div class="banner-image">
                        <img :src="mountainTop" alt="banner" />
                    </div>
                </div>
                <HomeTileButtons />
            </div>
        </div>
        <img class="circle" :src="circleImage" alt="circle" />
        <div id="about" class="about">
            <div class="page-container">
                <div class="about-banner">
                    <div class="banner-content">
                        <div class="about-title">
                            {{ $t("home.aboutMyHbarWallet") }}
                        </div>
                        <div class="about-subtitle">
                            {{ $t("home.myHbarWalletIsAClone") }}
                        </div>
                    </div>
                    <img class="about-image" :src="hbarOrb" alt="about" />
                </div>
            </div>
        </div>
        <Features />
        <FAQs />
        <Community v-if="false" />
        <ModalWelcome v-model="state.welcomeIsOpen" :platform="platform" />
    </div>
</template>

<script lang="ts">
import Features from "../components/Features.vue";
import FAQs from "../components/FAQs.vue";
import Community from "../components/Community.vue";
import HomeTileButtons from "../components/HomeTileButtons.vue";
import circleImage from "../assets/circle.png";
import { createComponent, reactive, computed } from "@vue/composition-api";
import hbarOrb from "../assets/hbar_orb.svg";
import mountainTop from "../assets/mountain_top.svg";
import ModalWelcome from "../components/ModalWelcome.vue";
import { store } from "../store";
import { UAParser } from "ua-parser-js";
export default createComponent({
    components: {
        FAQs,
        HomeTileButtons,
        Features,
        Community,
        ModalWelcome
    },
    setup() {
        const ua = new UAParser(navigator.userAgent);
        const state = reactive({ welcomeIsOpen: false });

        const platform = computed(() => {
            if (navigator.userAgent.indexOf("(darwin)") > 0) {
                // This is running in Node on macOS
                return "Mac OS";
            }
            return ua.getOS().name;
        });

        if (
            platform.value === "Android" ||
            platform.value === "iOS" ||
            process.env.IS_ELECTRON
        ) {
            state.welcomeIsOpen = false;
        } else if (!store.state.home.hasBeenToHome) {
            state.welcomeIsOpen = true;
        }

        // Boolean used to determine if the user has been to home
        // Otherwise don't show the Welcome modal
        store.state.home.hasBeenToHome = true;

        return {
            state,
            platform,
            circleImage,
            hbarOrb,
            mountainTop
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
    padding: 80px 30px;
    width: 100%;

    @media (max-width: 1024px) {
        padding-block: 30px;
        padding-inline: 0;
    }

    @media (max-width: 600px) {
        padding-block: 40px;
    }

    @media (max-width: 414px) {
        padding: 35px;
    }

    @media (max-width: 360px) {
        padding: 25px;
    }

    @media (max-width: 300px) {
        padding: 10px;
    }
}

.about-banner {
    align-items: center;
    align-self: center;
    display: flex;
    padding: 80px 30px;
    width: 100%;

    @media (max-width: 700px) {
        flex-direction: column;
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
    line-height: 100%;
    margin-block-end: 20px;

    @media (max-width: 480px) {
        font-size: 32px;
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
        height: 300px;

        @media (max-width: 1024px) {
            height: 235px;
        }

        @media (max-width: 700px) {
            display: none;
        }
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
