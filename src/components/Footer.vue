<template>
    <footer>
        <FooterTop />
        <div class="wrapper">
            <div class="links">
                <router-link
                    :to="{ name: 'privacy-policy' }"
                    class="link"
                >
                    {{ $t("footer.privacy") }}
                </router-link>
                <router-link
                    :to="{ name: 'terms-and-conditions' }"
                    class="link"
                >
                    {{ $t("footer.terms") }}
                </router-link>
                <a
                    target="_blank"
                    :href="githubLink"
                    class="link"
                >
                    v{{ version }}+{{ hash }}
                </a>
            </div>
            <div class="copyright">
                <a
                    target="_blank"
                    href="https://www.coingecko.com/"
                    class="link"
                >
                    {{ $t("footer.prices") }}
                </a>
                &copy; {{ currentYear }} MyHbarWallet, All Rights reserved.
            </div>
            <div />
            <div class="social">
                <a
                    v-if="false"
                    rel="noopener"
                    target="_blank"
                    href="https://www.facebook.com/hashgraph/"
                    class="social-link"
                >
                    <MaterialDesignIcon
                        class="social-icon"
                        :icon="facebook"
                    />
                </a>
                <a
                    rel="noopener"
                    target="_blank"
                    href="https://twitter.com/myhbarwallet?lang=en"
                    class="social-link"
                >
                    <MaterialDesignIcon
                        class="social-icon"
                        :icon="twitter"
                    />
                </a>
                <a
                    rel="noopener"
                    target="_blank"
                    href="https://www.github.com/hashgraph/MyHbarWallet"
                    class="social-link"
                >
                    <MaterialDesignIcon
                        class="social-icon"
                        :icon="github"
                    />
                </a>
                <a
                    rel="noopener"
                    target="_blank"
                    href=" https://medium.com/myhbarwallet"
                    class="social-link"
                >
                    <MaterialDesignIcon
                        class="social-icon"
                        :icon="medium"
                    />
                </a>
            </div>
        </div>
    </footer>
</template>

<script lang="ts">
import { mdiFacebook, mdiGithubCircle, mdiTwitter, mdiMedium } from "@mdi/js";
import MaterialDesignIcon from "../components/MaterialDesignIcon.vue";
import FooterTop from "../components/FooterTop.vue";
import { createComponent, computed } from "@vue/composition-api";

// Both of these are defined in vue.config.js.
// VERSION reads from package.json and COMMIT_HASH is git rev-parse --short HEAD output
declare const VERSION: string;
declare const COMMIT_HASH: string;

export default createComponent({
    components: {
        MaterialDesignIcon,
        FooterTop
    },
    setup() {
        const facebook = mdiFacebook;

        const twitter = mdiTwitter;

        const github = mdiGithubCircle;

        const medium = mdiMedium;

        const currentYear = computed(() => new Date().getFullYear());

        const githubLink = computed(() => `https://github.com/hashgraph/MyHbarWallet/commit/${
            COMMIT_HASH}`);

        return {
            facebook,
            twitter,
            github,
            medium,
            currentYear,
            version: VERSION,
            hash: COMMIT_HASH,
            githubLink
        };
    }
});
</script>

<style lang="postcss" scoped>
footer {
    background-color: var(--color-yankees-blue);
    color: var(--color-ashen-wind);
    font-size: 14px;
    padding-block: 40px;
}

.wrapper {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 1024px;
    padding: 0 20px;
}

.link {
    color: var(--color-white);
    padding: 0 15px 0 0;
    text-decoration: none;

    &:not(:last-child) {
        border-right: 1px solid var(--color-white);
    }

    &:not(:first-child) {
        padding: 0 15px;
    }
}

.links,
.social {
    margin-block-start: 8px;
}

.social-link {
    color: inherit;
    text-decoration: none;

    &:not(:first-child) {
        margin-inline-start: 15px;
    }
}

.copyright {
    display: flex;
    flex-direction: column;
    text-align: center;
}

@media (max-width: 860px) {
    .wrapper {
        align-items: center;
        flex-direction: column;
    }

    .links {
        margin-block-end: 20px;
        order: 1;
    }

    .social {
        margin-block-end: 20px;
        order: 2;
    }

    .copyright {
        order: 3;
        text-align: center;
    }
}
</style>
