<template>
    <div class="community">
        <div class="outer-wrap">
            <div class="inner-wrap">
                <div class="container">
                    <div class="head">
                        <div class="title">
                            Join MHW Community
                        </div>
                        <div class="subtitle">
                            Get in the know and watch the H flow!
                        </div>
                    </div>
                    <div class="icons">
                        <SocialIcon
                            name="Facebook"
                            href="https://www.facebook.com"
                        >
                            <img :src="facebook" alt="Facebook" />
                        </SocialIcon>
                        <SocialIcon
                            name="Twitter"
                            href="https://www.twitter.com"
                        >
                            <img :src="twitter" alt="Twitter" />
                        </SocialIcon>
                        <SocialIcon name="Medium" href="https://medium.com">
                            <img :src="medium" alt="Medium" />
                        </SocialIcon>
                        <SocialIcon
                            name="Reddit"
                            href="https://www.reddit.com/"
                        >
                            <img :src="reddit" alt="Reddit" />
                        </SocialIcon>
                        <SocialIcon name="Github" href="https://github.com">
                            <img :src="github" alt="Github" />
                        </SocialIcon>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import SocialIcon from "@/components/SocialIcon.vue";
import facebookSocial from "@/assets/facebook.svg";
import twitterSocial from "@/assets/twitter.svg";
import mediumSocial from "@/assets/medium.svg";
import redditSocial from "@/assets/reddit.svg";
import githubSocial from "@/assets/github.svg";

export default Vue.extend({
    name: "Community",
    components: {
        SocialIcon
    },
    computed: {
        facebook() {
            return facebookSocial;
        },
        twitter() {
            return twitterSocial;
        },
        medium() {
            return mediumSocial;
        },
        reddit() {
            return redditSocial;
        },
        github() {
            return githubSocial;
        }
    }
});
</script>

<style lang="postcss" scoped>
.community {
    background-color: var(--color-white);
}

.outer-wrap {
    padding: 80px 0;

    @media (max-width: 1024px) {
        padding: 40px 0 60px;
    }
}

.inner-wrap {
    margin: 0 auto;
    max-width: 1024px;
    padding: 0 20px;

    @media (max-width: 1024px) {
        padding: 0 25px;
    }
}

.container {
    align-items: center;
    display: flex;

    @media (max-width: 1024px) {
        display: block;
    }
}

.head {
    text-align: start;
}

.title {
    font-size: 30px;
    font-weight: 500;
    margin-block-end: 15px;
}

.subtitle {
    color: var(--color-china-blue);
    font-size: 14px;
    font-weight: 400;
}

.icons {
    display: flex;
    flex-wrap: wrap;
    margin-inline-start: auto;

    & :not(:first-child) {
        margin-inline-start: 24px;
    }

    @media (max-width: 1024px) {
        margin-block-start: 30px;
    }
}
</style>
