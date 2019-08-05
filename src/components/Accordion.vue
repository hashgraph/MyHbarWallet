<template>
    <div class="accordion">
        <div class="title" @click="toggle">
            <div class="title-text">
                <slot name="title"></slot>
            </div>
            <transition mode="out-in" enter-active-class="spin">
                <FontAwesomeIcon
                    :key="expanded"
                    size="lg"
                    class="icon"
                    :icon="icon"
                />
            </transition>
        </div>
        <transition name="component-fade" :duration="250">
            <div v-if="expanded" :key="expanded" class="content">
                <div class="content-text">
                    <slot name="content"></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
    faChevronCircleUp,
    faChevronCircleDown
} from "@fortawesome/free-solid-svg-icons";

export default Vue.extend({
    name: "Accordion",
    components: {
        FontAwesomeIcon
    },
    data: function() {
        return {
            expanded: false
        };
    },
    computed: {
        icon() {
            if (this.expanded) {
                return faChevronCircleDown;
            } else {
                return faChevronCircleUp;
            }
        }
    },
    methods: {
        toggle() {
            this.expanded = !this.expanded;
        }
    }
});
</script>

<style lang="postcss" scoped>
a {
    color: var(--color-melbourne-cup);
    text-decoration: none;
}

.icon {
    color: var(--color-melbourne-cup);
}

.accordion {
    border-bottom: 1px solid var(--color-jupiter);
    color: var(--color-black);
    padding: 30px 10px;
}

.title {
    align-items: center;
    cursor: pointer;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    text-align: start;
    user-select: none;
}

.title-text {
    font-size: 18px;
    font-weight: 500;
    padding-inline-end: 45px;
}

.content {
    font-size: 14px;
    font-weight: 400;
}

.content-text {
    max-height: 500px;
    padding-block-start: 20px;
}

@keyframes rotate {
    from {
        transform: rotate(180deg);
    }

    to {
        transform: rotate(0);
    }
}

.component-fade-enter-active,
.component-fade-leave-active {
    transition: opacity 0.5s ease;

    @media screen and (prefers-reduced-motion: reduce) {
        transition: none;
    }
}

.component-fade-enter,
.component-fade-leave-to {
    opacity: 0;
}

.spin {
    animation: rotate;
    animation-duration: 0.5s;
    animation-iteration-count: 1;
    animation-timing-function: linear;

    @media screen and (prefers-reduced-motion: reduce) {
        animation: none;
    }
}
</style>
