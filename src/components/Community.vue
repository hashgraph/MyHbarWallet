<template>
    <div class="community">
        <div class="wrap">
            <div class="head">
                <div class="title">
                    {{ $t("community.joinMHWCommunity") }}
                </div>
                <div class="subtitle">
                    {{ $t("community.getInTheKnow") }}
                </div>
            </div>
            <div class="icons">
                <CommunitySocialIcon
                    name="Facebook"
                    :image="facebookSocial"
                    href="https://www.facebook.com"
                />
                <CommunitySocialIcon
                    name="Twitter"
                    :image="twitterSocial"
                    href="https://www.twitter.com"
                />
                <CommunitySocialIcon
                    name="Medium"
                    href="https://medium.com"
                    :image="mediumSocial"
                />
                <CommunitySocialIcon
                    name="Reddit"
                    href="https://www.reddit.com/"
                    :image="redditSocial"
                />
                <CommunitySocialIcon
                    name="Github"
                    href="https://github.com"
                    :image="githubSocial"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import CommunitySocialIcon from "../components/CommunitySocialIcon.vue";
import facebookSocial from "../assets/facebook.png";
import twitterSocial from "../assets/twitter.jpg";
import mediumSocial from "../assets/medium.png";
import redditSocial from "../assets/reddit.svg";
import githubSocial from "../assets/github.png";

export default defineComponent({
    components: { CommunitySocialIcon },
    props: {},
    setup() {
        return {
            facebookSocial,
            twitterSocial,
            mediumSocial,
            redditSocial,
            githubSocial
        };
    }
});
</script>

<style lang="postcss" scoped>
.community {
    background-color: var(--color-white);
    padding: 80px 0;

    @media (max-width: 1024px) {
        /* Hide on smaller screens. */
        display: none;
    }
}

.wrap {
    align-items: center;
    display: flex;
    margin: 0 auto;
    max-width: 1024px;
    padding: 0 20px;

    @media (max-width: 1024px) {
        display: block;
        padding: 0 25px;
    }
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
