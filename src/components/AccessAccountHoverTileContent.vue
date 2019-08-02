<template>
    <div class="tile-container">
        <div class="tile-image">
            <img :src="imgPath" />
        </div>
        <div class="tile-content">
            <h3 :class="classObject">{{ title }}</h3>
            <p>{{ content }}</p>
            <p class="small-note">{{ smallNote }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

interface Data {
    hoveredd: boolean;
}

export default Vue.extend({
    props: {
        title: { type: String, required: true },
        content: { type: String, required: false, default: "" },
        smallNote: { type: String, required: false, default: "" },
        imgPath: { type: String, default: null },
        hovered: { type: Boolean }
    },
    data() {
        return {
            hoveredd: false
        };
    },
    computed: {
        classObject() {
            return {
                "is-hovered": this.hoveredd
            };
        }
    },
    methods: {
        handleHover() {
            this.hoveredd = hovered;
        }
    }
});
</script>

<style lang="postcss" scoped>
p {
    color: var(--color-china-blue);
    line-height: 1.25rem;
    margin-block: 0;
}

.small-note {
    color: var(--color-sunkist-coral);
    font-size: 11px;
    margin-block: 5px 0;
}

h3 {
    font-size: 20px; /* remove */
    font-weight: 500; /* remove */

    /* line-height: 1.2; remove */
    margin-block: 0 10px;
    text-transform: none; /* remove */
}

.tile-image {
    height: 135px;
    margin-block-end: 5px;
    padding-block: 44px;
}

.img {
    font-size: 90px;
    margin-block-end: 5px;
}

/* Largest */

@media (min-width: 1025px) {
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

/* Medium Sized */

@media (min-width: 415px) and (max-width: 1024px) {
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
    .tile-content {
        display: inline;
        text-align: center;
    }

    h2 {
        display: block;
        font-size: 14px;
        font-weight: 500;
        margin-block: 10px 10px;
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
