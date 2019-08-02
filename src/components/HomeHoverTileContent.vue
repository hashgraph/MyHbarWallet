<template>
    <div class="flex-col-center">
        <div class="tile-icon">
            <FontAwesomeIcon class="icon" :icon="tileIcon" />
        </div>
        <div class="tile-content">
            <h2>{{ title }}</h2>
            <p>{{ content }}</p>
            <p v-if="actionLabel" class="action-label">
                {{ actionLabel }}
                <FontAwesomeIcon class="action-icon" :icon="faArrowRight" />
            </p>
        </div>
    </div>
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
    line-height: 1.2rem;
    margin-block-end: 20px;
    margin-block-start: 0;
}

.icon {
    height: 83.25px;
    width: 87px;
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

.tile-icon {
    padding-inline-end: 40px;
}

.flex-col-center {
    align-items: center;
    -webkit-box-align: center;
    display: flex;
}

/* Largest */

@media (min-width: 1025px) {
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
