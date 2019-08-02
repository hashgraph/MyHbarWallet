<template>
    <router-link v-if="route" :to="route">
        <div
            :class="backColor"
            class="tile-block"
            @mouseover="hovered = true"
            @mouseleave="hovered = false"
        >
            <slot :hovered="hovered" />
        </div>
    </router-link>
</template>

<script lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faWallet, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import Vue from "vue";

export default Vue.extend({
    props: {
        route: { type: String, required: true, default: "/" },
        backColor: { type: String, required: false, default: "none" }
    },
    data: function() {
        return {
            hovered: false,
            showModal: false
        };
    },
    computed: {
        faArrowRight() {
            return faArrowRight;
        }
    }
});
</script>

<style lang="postcss" scoped>
a {
    background-color: transparent;
    font-size: 14px;
    font-weight: 400;
    text-decoration: none;

    &:focus {
        outline: none;
    }
}

.blue {
    background-color: var(--color-byzantine-night-blue);
    color: var(--color-white);
}

.green {
    background-color: var(--color-melbourne-cup);
    color: var(--color-white);
}

.none {
    background-color: var(--color-white);
    color: var(--color-washed-black);

    @media screen and (prefers-reduced-motion: reduce) {
        &.tile-block {
            border-radius: 4px;
            height: 274px;
            inset-block-start: 0;
            margin-block-end: 0;
            padding-block: 10px 25px;
            padding-inline: 15px;
            position: relative;
            -webkit-transition: inset, background-color 0.3s ease;
            transition: none;
            width: 210px;

            &:hover,
            &:focus {
                -webkit-box-shadow: 0 5px 24px rgba(0, 0, 0, 0.07);
                box-shadow: 0 5px 24px rgba(0, 0, 0, 0.07);
                inset-block-start: -10px;
            }
        }
    }

    &.tile-block {
        border-radius: 4px;
        height: 274px;
        inset-block-start: 0;
        margin-block-end: 0;
        padding-block: 10px 25px;
        padding-inline: 15px;
        position: relative;
        -webkit-transition: inset, background-color 0.3s ease;
        transition: inset, background-color 0.3s ease;
        width: 210px;

        &:hover,
        &:focus {
            -webkit-box-shadow: 0 5px 24px rgba(0, 0, 0, 0.07);
            box-shadow: 0 5px 24px rgba(0, 0, 0, 0.07);
            inset-block-start: -10px;
        }
    }
}

.toGreen {
    &:hover,
    &:focus {
        background-color: var(--color-melbourne-cup);
    }
}

.toRed {
    &:hover,
    &:focus {
        background-color: var(--color-sunkist-coral);
    }
}

/* Largest */

@media (min-width: 1025px) {
    .tile-block {
        border-radius: 4px;
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

    @media screen and (prefers-reduced-motion: reduce) {
        .none.tile-block {
            border-radius: 4px;
            height: 100%;
            inset-block-start: 0;
            margin-block-end: 0;
            padding: 30px 40px;
            position: relative;
            -webkit-transition: none;
            transition: none;
        }
    }

    @media screen and (prefers-reduced-motion: reduce) {
        .toGreen {
            -webkit-transition: inset 0.3s ease;
            transition: none;

            &:hover,
            &:focus {
                background-color: var(--color-melbourne-cup);

                & p {
                    color: var(--color-white);
                }
            }
        }
    }

    @media screen and (prefers-reduced-motion: reduce) {
        .toBlue {
            -webkit-transition: inset 0.3s ease;
            transition: none;

            &:hover,
            &:focus {
                background-color: var(--color-byzantine-night-blue);

                & p {
                    color: var(--color-white);
                }
            }
        }
    }

    @media screen and (prefers-reduced-motion: reduce) {
        .tile-block {
            border-radius: 4px;
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
}

/* Smallest */

@media (max-width: 414px) {
    .tile-block {
        border-radius: 4px;
        margin-block-end: 15px;
        padding: 11px;
        position: relative;
    }
}
</style>
