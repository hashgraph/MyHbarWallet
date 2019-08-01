<template>
    <div class="accordion">
        <div class="title-container" @click="toggle">
            <h3 class="title">{{ title }}</h3>
            <transition name="flip" mode="out-in" enter-active-class="spin">
                <FontAwesomeIcon
                    :key="expanded"
                    size="lg"
                    class="icon"
                    :icon="icon"
                />
            </transition>
        </div>
        <transition name="fade">
            <div v-if="expanded" :key="expanded" class="content-container">
                <div class="content">{{ content }}</div>
                <div v-if="link !== ''" class="content">
                    For more information, click <a :href="link">here</a>.
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export default Vue.extend({
    name: "Accordion",
    components: {
        FontAwesomeIcon
    },
    props: {
        title: { required: true, type: String },
        content: { required: true, type: String },
        link: { required: false, type: String, default: "" }
    },
    data: function() {
        return {
            expanded: false
        };
    },
    computed: {
        icon() {
            if (this.expanded) {
                return faMinus;
            } else {
                return faPlus;
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
.title-container {
    align-items: center;
    display: flex;
    text-align: start;
}

.title {
    color: var(--color-black);
    flex-grow: 1;
    font-size: 18px;
    font-weight: 500;
    padding-inline-end: 45px;
}

.content {
    color: var(--color-china-blue);
    font-size: 14px;
}

@keyframes rotate {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(180deg);
    }
}

.spin {
    animation: rotate;
    animation-duration: 0.1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;

    @media screen and (prefers-reduced-motion: reduce) {
        animation: none;
    }
}
</style>
