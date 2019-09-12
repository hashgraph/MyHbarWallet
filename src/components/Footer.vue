<template>
    <footer>
        <FooterTop />
        <div class="wrapper">
            <div class="links">
                <router-link :to="{ name: 'privacy-policy' }" class="link">
                    Privacy
                </router-link>
                <router-link
                    :to="{ name: 'terms-and-conditions' }"
                    class="link"
                >
                    Terms
                </router-link>
                <a
                    target="_blank"
                    href="https://github.com/hashgraph/myhbarwallet"
                    class="link"
                >
                    v{{ version }}+{{ hash }}
                </a>
            </div>
            <div class="copyright">
                &copy; {{ currentYear }} Hedera™ Hashgraph LLC. All Rights
                reserved.
            </div>
            <div class="social">
                <a
                    v-if="false"
                    rel="noopener"
                    target="_blank"
                    href="https://www.facebook.com/hashgraph/"
                    class="social-link"
                >
                    <MaterialDesignIcon class="social-icon" :icon="facebook" />
                </a>
                <a
                    v-if="false"
                    rel="noopener"
                    target="_blank"
                    href="https://twitter.com/hashgraph"
                    class="social-link"
                >
                    <MaterialDesignIcon class="social-icon" :icon="twitter" />
                </a>
                <a
                    rel="noopener"
                    target="_blank"
                    href="https://www.github.com/hashgraph/MyHbarWallet"
                    class="social-link"
                >
                    <MaterialDesignIcon class="social-icon" :icon="github" />
                </a>
            </div>
        </div>
    </footer>
</template>

<script lang="ts">
import { mdiFacebook, mdiGithubCircle, mdiTwitter } from "@mdi/js";
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

        const currentYear = computed(() => {
            return new Date().getFullYear();
        });

        return {
            facebook,
            twitter,
            github,
            currentYear,
            version: VERSION,
            hash: COMMIT_HASH
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
    padding: 0 15px;
    text-decoration: none;

    &:not(:last-child) {
        border-right: 1px solid var(--color-white);
    }
}

.social-link {
    color: inherit;
    text-decoration: none;

    &:not(:first-child) {
        margin-inline-start: 15px;
    }
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
