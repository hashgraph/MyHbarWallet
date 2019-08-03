<template>
    <router-link class="home-tile-button" :to="{ name: route }">
        <!-- FIXME: Use material design icons -->
        <FontAwesomeIcon class="tile-icon" :icon="icon" />
        <div class="content">
            <!-- TODO: This should likely be an hN at some point -->
            <div class="title">{{ title }}</div>
            <div class="message">{{ content }}</div>
            <div v-if="action" class="action-label">
                {{ action }}
                <!-- FIXME: Use material design icons to get a proper long arrow -->
                <FontAwesomeIcon class="action-icon" :icon="faArrowRight" />
            </div>
        </div>
    </router-link>
</template>

<script lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faWallet, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { PropType } from "vue";
import Vue from "vue";

export default Vue.extend({
    components: {
        FontAwesomeIcon
    },
    props: {
        route: { type: String, required: true },
        title: { type: String, required: true },
        content: { type: String, required: false, default: "" },
        action: { type: String, required: false, default: "" },
        icon: { type: Object as PropType<IconDefinition>, default: null }
    },
    computed: {
        faArrowRight() {
            return faArrowRight;
        }
    }
});
</script>

<style lang="postcss" scoped>
.home-tile-button {
    align-items: center;
    background-color: var(--color-byzantine-night-blue);
    border-radius: 4px;
    color: var(--color-white);
    display: flex;
    justify-content: center;
    padding: 30px 40px;
    padding-bottom: 40px;
    text-decoration: none;

    @media (min-width: 1025px) {
        transition: transform 0.3s ease;

        &:hover,
        &:focus {
            box-shadow: 0 5px 24px rgba(0, 0, 0, 0.15);
            transform: translateY(-10px);
        }
    }

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

.tile-icon {
    height: 87px;
    margin-inline-end: 40px;
    width: 87px;

    @media (max-width: 550px) {
        display: none;
    }
}

.title {
    font-size: 24px;
    font-weight: 500;
    margin-block-end: 8px;
}

.message {
    font-size: 14px;
    margin-block-end: 20px;
}

.action-icon {
    margin-inline-start: 5px;
    width: 20px;
}

.action-label {
    align-items: center;
    display: flex;
    font-size: 15px;
    font-weight: 500;
}

@media (max-width: 414px) {
    .home-tile-button {
        padding: 11px;
    }

    .title {
        display: block;
        font-size: 14px;
        font-weight: 500;
        margin-block: 10px 10px;
        text-align: center;
    }

    .message,
    .action-label {
        display: none;
    }
}
</style>
