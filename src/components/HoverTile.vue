<template>
    <a :href="isFirst ? `/create-account` : `/access-my-account`">
        <div
            :class="isFirst ? `create-account` : `access-account`"
            class="tile-block"
        >
            <div class="flex-col-center">
                <div class="tile-icon">
                    <slot></slot>
                </div>
                <div class="tile-content">
                    <h2>{{ title }}</h2>
                    <p>{{ content }}</p>
                    <p class="action-label">
                        {{ actionLabel }}
                        <FontAwesomeIcon
                            class="action-icon"
                            :icon="faArrowRight"
                        />
                    </p>
                </div>
            </div>
        </div>
    </a>
</template>

<script lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faWallet, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Vue from "vue";

export default Vue.extend({
    components: {
        FontAwesomeIcon
    },
    props: {
        title: { type: String, required: true },
        content: { type: String, required: false, default: "" },
        actionLabel: { type: String, required: false, default: "" }
    },
    computed: {
        faArrowRight() {
            return faArrowRight;
        },
        isFirst(): boolean {
            if (this.title == "Create New Account") return true;
            return false;
        }
    }
});
</script>

<style lang="postcss" scoped>
.create-account {
    background-color: var(--color-soft-blue);
}

.access-account {
    background-color: var(--color-melbourne-cup);
}

a {
    background-color: transparent;
    font-size: 14px;
    font-weight: 400;
    text-decoration: none;
}

.tile-block {
    color: var(--color-peral);
}

.flex-col-center {
    align-items: center;
    display: flex;
}

.tile-icon {
    padding-inline-end: 40px;
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

p {
    margin-block-end: 20px;
    margin-block-start: 0;
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
