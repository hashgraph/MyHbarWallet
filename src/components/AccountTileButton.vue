<template>
    <div class="account-tile-button" v-on="this.$listeners">
        <!--fixme: can remove div: tile-image if image sizes are normalized-->
        <img class="tile-image" :src="image" />
        <div class="tile-content">
            <div class="title">{{ title }}</div>
            <div class="content">{{ content }}</div>
            <div class="note">{{ note }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        title: { type: String, required: true },
        content: { type: String, required: false, default: "" },
        note: { type: String, required: false, default: "" },
        image: { type: String, default: null }
    }
});
</script>

<style lang="postcss" scoped>
.title {
    color: var(--color-washed-black);
    font-size: 20px;
    font-weight: 500;
    padding-block-end: 5px;
    padding-block-start: 5px;
}

.content {
    color: var(--color-china-blue);
    font-size: 14px;
}

.note {
    color: var(--color-sunkist-coral);
    font-size: 11px;
    margin-block-start: 5px;
}

.account-tile-button {
    background-color: var(--color-white);
    border-radius: 4px;
    cursor: pointer;
    padding-block: 10px 25px;
    padding-inline: 15px;
    /* stylelint-disable-next-line plugin/no-low-performance-animation-properties */
    transition: background-color, transform 0.3s ease;

    @media screen and (prefers-reduced-motion: reduce) {
        & .title,
        & .content,
        & .note {
            /* stylelint-disable-next-line plugin/no-low-performance-animation-properties */
            transition: none;
        }
    }

    & .title,
    & .content,
    & .note {
        /* stylelint-disable-next-line plugin/no-low-performance-animation-properties */
        transition: color 0.3s ease;
    }

    &:hover,
    &:focus {
        background-color: var(--color-melbourne-cup);
        box-shadow: 0 5px 24px rgba(0, 0, 0, 0.07);
        transform: translateY(-10px);

        & .title,
        & .content,
        & .note {
            color: var(--color-white);
        }
    }

    @media screen and (prefers-reduced-motion: reduce) {
        & .title,
        & .content,
        & .note {
            /* stylelint-disable-next-line plugin/no-low-performance-animation-properties */
            transition: none;
        }
    }

    @media screen and (prefers-reduced-motion: reduce) {
        & .title,
        & .content,
        & .note {
            /* stylelint-disable-next-line plugin/no-low-performance-animation-properties */
            transition: none;
        }
    }

    @media screen and (prefers-reduced-motion: reduce) {
        & .title,
        & .content,
        & .note {
            /* stylelint-disable-next-line plugin/no-low-performance-animation-properties */
            transition: none;
        }
    }

    @media screen and (prefers-reduced-motion: reduce) {
        & .title,
        & .content,
        & .note {
            /* stylelint-disable-next-line plugin/no-low-performance-animation-properties */
            transition: none;
        }
    }

    @media screen and (prefers-reduced-motion: reduce) {
        & .title,
        & .content,
        & .note {
            /* stylelint-disable-next-line plugin/no-low-performance-animation-properties */
            transition: none;
        }
    }

    @media screen and (prefers-reduced-motion: reduce) {
        & .title,
        & .content,
        & .note {
            /* stylelint-disable-next-line plugin/no-low-performance-animation-properties */
            transition: none;
        }
    }

    @media screen and (prefers-reduced-motion: reduce) {
        & .title,
        & .content,
        & .note {
            transition: none;
        }
    }

    @media screen and (prefers-reduced-motion: reduce) {
        & .title,
        & .content,
        & .note {
            transition: none;
        }
    }
}

@media screen and (prefers-reduced-motion: reduce) {
    .account-tile-button {
        transition: none;
    }
}

.tile-image {
    padding-block: 17.5px;
}
</style>
