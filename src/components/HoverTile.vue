<template>
    <router-link :to="route">
        <div :class="backColor" class="tile-block">
            <div class="flex-col-center">
                <div class="tile-icon">
                    <FontAwesomeIcon class="icon" :icon="tileIcon" />
                </div>
                <div class="tile-content">
                    <h2 v-if="actionLabel">{{ title }}</h2>
                    <h3 v-else>{{ title }}</h3>
                    <p>{{ content }}</p>
                    <p v-if="actionLabel" class="action-label">
                        {{ actionLabel }}
                        <FontAwesomeIcon
                            class="action-icon"
                            :icon="faArrowRight"
                        />
                    </p>
                    <p v-else class="small-note">{{ smallNote }}</p>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faWallet, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import Vue from "vue";

export default Vue.extend({
    components: {
        FontAwesomeIcon
    },
    props: {
        title: { type: String, required: true },
        content: { type: String, required: false, default: "" },
        actionLabel: { type: String, required: false, default: "" },
        route: { type: String, required: true, default: "/" },
        backColor: { type: String, required: false, default: "none" },
        smallNote: { type: String, required: false, default: "" },
        tileIcon: { type: Object as PropType<IconDefinition>, default: null }
    },
    computed: {
        faArrowRight() {
            return faArrowRight;
        }
    }
});
</script>

<style lang="postcss" scoped>
p {
    margin-block-end: 20px;
    margin-block-start: 0;
}

.icon {
    height: 83.25px;
    width: 87px;
}

a {
    background-color: transparent;
    font-size: 14px;
    font-weight: 400;
    text-decoration: none;
}

h2 {
    margin-block: 3px 8px;
}

.action-icon {
    height: 12px;
    margin-inline-start: 5px;
    vertical-align: middle;
    width: 20px;
}

.blue {
    background-color: var(--color-byzantine-night-blue);
    color: var(--color-white);

    & .tile-icon {
        padding-inline-end: 40px;
    }

    & .flex-col-center {
        align-items: center;
        display: flex;
    }
}

.green {
    background-color: var(--color-melbourne-cup);
    color: var(--color-white);

    & .tile-icon {
        padding-inline-end: 40px;
    }

    & .flex-col-center {
        align-items: center;
        display: flex;
    }
}

.none {
    background-color: var(--color-white);
    color: var(--color-washed-black);

    &.tile-block {
        border-radius: 5px;
        padding-block: 10px 25px;
        padding-inline: 15px;
    }

    & p {
        color: var(--color-china-blue);
        line-height: 1.25rem;
        margin-block: 0;
    }

    & .small-note {
        color: var(--color-sunkist-coral);
        font-size: 11px;
        margin-block: 5px 0;
    }

    & h3 {
        font-size: 20px; /* remove */
        font-weight: 500; /* remove */

        /* line-height: 1.2; remove */
        margin-block: 0 10px;
        text-transform: none; /* remove */
    }

    & .tile-icon {
        height: 135px;
        margin-block-end: 5px;
        padding-block: 44px;
    }
}

/* Largest */

@media (min-width: 1025px) {
    .tile-block {
        border-radius: 4px;
        color: var(--color-peral);
        height: 100%;
        inset-block-start: 0;
        margin-block-end: 0;
        padding: 30px 40px;
        position: relative;
        -webkit-transition: inset 0.3s ease;
        transition: inset 0.3s ease;

        &:hover,
        &:focus {
            -webkit-box-shadow: 0 5px 24px rgba(0, 0, 0, 0.15);
            box-shadow: 0 5px 24px rgba(0, 0, 0, 0.15);
            inset-block-start: -10px;
        }
    }

    h2 {
        font-size: 24px;
        font-weight: 500;
    }

    p {
        margin-block-end: 20px;
    }

    .action-label {
        display: inline-block;
        font-size: 15px;
        font-weight: 500;
    }

    .action-icon {
        margin-inline-start: 5px;
        vertical-align: middle;
        width: 20px;
    }

    @media screen and (prefers-reduced-motion: reduce) {
        .tile-block {
            border-radius: 4px;
            color: var(--color-peral);
            height: 100%;
            inset-block-start: 0;
            margin-block-end: 0;
            padding: 30px 40px;
            position: relative;
            -webkit-transition: none;
            transition: none;

            &:hover,
            &:focus {
                -webkit-box-shadow: 0 5px 24px rgba(0, 0, 0, 0.15);
                box-shadow: 0 5px 24px rgba(0, 0, 0, 0.15);
                inset-block-start: -10px;
            }
        }

        h2 {
            font-size: 24px;
            font-weight: 500;
        }

        p {
            margin-block-end: 20px;
        }

        .action-label {
            display: inline-block;
            font-size: 15px;
            font-weight: 500;
        }

        .action-icon {
            margin-inline-start: 5px;
            vertical-align: middle;
            width: 20px;
        }
    }
}

/* Medium Sized */

@media (min-width: 415px) and (max-width: 1024px) {
    .tile-block {
        border-radius: 4px;
        margin-block-end: 10px;
        padding: 30px 40px;
        position: relative;
    }

    .tile-icon {
        padding-inline-end: 40px;
    }

    h2 {
        font-size: 24px;
        font-weight: 500;
    }

    p {
        margin-block-end: 20px;
    }

    .action-label {
        display: inline-block;
        font-size: 15px;
        font-weight: 500;
    }

    .action-icon {
        margin-inline-start: 5px;
        vertical-align: middle;
        width: 20px;
    }
}

/* Medium Small */

@media (max-width: 550px) {
    .tile-icon {
        display: none;
    }
}

/* Smallest */

@media (max-width: 414px) {
    .tile-block {
        border-radius: 4px;
        color: #fff;
        margin-block-end: 15px;
        padding: 11px;
        position: relative;
    }

    .tile-content {
        display: inline;
        text-align: center;
    }

    h2 {
        display: block;
        font-size: 14px;
        font-weight: 500;
        margin-block: 10px 10px;
        padding: 0 65px;
        text-align: center;
    }

    p {
        display: none;
        margin-block-end: 20px;
    }

    .action-label {
        color: #fff;
        display: none;
        font-size: 15px;
        font-weight: 500;
    }

    .action-icon {
        margin-inline-start: 5px;
        vertical-align: middle;
        width: 20px;
    }
}
</style>
