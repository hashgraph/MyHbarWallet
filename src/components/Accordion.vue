<template>
    <div class="accordion">
        <div class="title" @click="toggle">
            <h3>{{ title }}</h3>
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
            <div v-if="expanded" :key="expanded" class="content">
                <div>{{ content }}</div>
                <div v-if="link !== ''">
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
a {
    color: var(--color-melbourne-cup);
    text-decoration: none;
}

.accordion {
    color: var(--color-black);
    padding: 30px 10px;
}

.title {
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    text-align: start;

    & h3 {
        font-size: 18px;
        font-weight: 500;
        padding-inline-end: 45px;
    }
}

.content {
    font-size: 14px;
    font-weight: 400;
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
