<template>
    <footer>
        <FooterTop />
        <div class="wrapper">
            <div class="links">
                <a
                    rel="noopener"
                    target="_blank"
                    href="https://www.hedera.com/privacy"
                    class="link"
                >
                    Privacy
                </a>
                <a
                    rel="noopener"
                    target="_blank"
                    href="https://www.hedera.com/terms"
                    class="link"
                >
                    Terms
                </a>
                <a
                    target="_blank"
                    href="https://github.com/hashgraph/myhbarwallet"
                    class="link"
                >
                    v0.0.0+000000
                </a>
            </div>
            <div class="copyright">
                &copy; {{ currentYear }} Hedera Hashgraph LLC. All Rights
                reserved.
            </div>
            <div class="social">
                <a
                    rel="noopener"
                    target="_blank"
                    href="https://www.facebook.com/hashgraph/"
                    class="social-link"
                >
                    <MaterialDesignIcon class="social-icon" :icon="facebook" />
                </a>
                <a
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
                    href="https://www.github.com/hashgraph/myhbarwallet"
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
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";
import FooterTop from "@/components/FooterTop.vue";
import { createComponent, computed } from "vue-function-api";

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
            currentYear
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

    /* FIXME: Move to main.css with a good name so we can share this value */
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
    }
}
</style>
