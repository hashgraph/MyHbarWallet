<template>
    <div class="tile-container">
        <div class="tile-image">
            <img :src="imgPath" />
        </div>
        <div class="tile-content">
            <h3 :class="classObject">{{ title }}</h3>
            <p :class="classObject">{{ content }}</p>
            <p :class="classObject" class="small-note">{{ smallNote }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        title: { type: String, required: true },
        content: { type: String, required: false, default: "" },
        smallNote: { type: String, required: false, default: "" },
        imgPath: { type: String, default: null },
        hovered: { type: Boolean }
    },
    computed: {
        classObject() {
            return {
                "is-hovered": this.hovered
            };
        }
    }
});
</script>

<style lang="postcss" scoped>
@media screen and (prefers-reduced-motion: reduce) {
    p {
        color: var(--color-china-blue);
        line-height: 1.25rem;
        margin-block: 0;
        -webkit-transition: color 0.3s ease;
        transition: none;

        &.is-hovered {
            color: var(--color-white);
        }
    }
}

p {
    color: var(--color-china-blue);
    line-height: 1.25rem;
    margin-block: 0;
    -webkit-transition: color 0.3s ease;
    transition: color 0.3s ease;

    &.is-hovered {
        color: var(--color-white);
    }
}

@media screen and (prefers-reduced-motion: reduce) {
    .small-note {
        color: var(--color-sunkist-coral);
        font-size: 11px;
        margin-block: 5px 0;
        -webkit-transition: color 0.3s ease;
        transition: none;

        &.is-hovered {
            color: var(--color-white);
        }
    }
}

.small-note {
    color: var(--color-sunkist-coral);
    font-size: 11px;
    margin-block: 5px 0;
    -webkit-transition: color 0.3s ease;
    transition: color 0.3s ease;

    &.is-hovered {
        color: var(--color-white);
    }
}

@media screen and (prefers-reduced-motion: reduce) {
    h3 {
        font-size: 20px;
        font-weight: 500;
        margin-block: 0 5px;
        -webkit-transition: color 0.3s ease;
        transition: none;

        &.is-hovered {
            color: var(--color-white);
        }
    }
}

h3 {
    font-size: 20px;
    font-weight: 500;
    margin-block: 0px 5px;
    -webkit-transition: color 0.3s ease;
    transition: color 0.3s ease;

    &.is-hovered {
        color: var(--color-white);
    }
}

.tile-image {
    height: 135px;
    margin-block-end: 10px;
    padding-block: 44px;
}

.img {
    font-size: 90px;
    margin-block-end: 5px;
}

/* Largest */

@media (min-width: 1025px) {
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

/* Medium Sized */

@media (min-width: 415px) and (max-width: 1024px) {
    .tile-icon {
        padding-inline-end: 40px;
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
    .tile-content {
        display: inline;
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
