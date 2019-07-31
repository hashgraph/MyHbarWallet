<template>
    <div class="accordion-card">
        <div class="title" @click="toggle">
            <h3>{{ title }}</h3>
            <div class="icon-container">
                <transition name="flip" mode="out-in" enter-active-class="spin">
                    <FontAwesomeIcon
                        :key="expanded"
                        size="lg"
                        class="icon"
                        :icon="icon"
                    />
                </transition>
            </div>
        </div>
        <div v-if="expanded" class="content-container">
            <div class="content">{{ content }}</div>
            <div v-if="link !== ''">
                For more information, click <a :href="link">here</a>.
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export default Vue.extend({
    name: "AccordionCard",
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
                return faPlus;
            } else {
                return faMinus;
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
@keyframes rotate {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
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
