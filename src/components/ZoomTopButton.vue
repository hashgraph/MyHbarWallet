<template>
    <button
        v-scroll="handleWindowScroll"
        :class="classObject"
        @click="handleClick"
    >
        <FontAwesomeIcon class="icon" :icon="faChevronUp" />
    </button>
</template>

<script lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Vue from "vue";

interface Data {
    isActive: boolean;
}

export default Vue.extend<Data, {}, {}>({
    components: {
        FontAwesomeIcon
    },
    data() {
        return {
            isActive: false
        };
    },
    computed: {
        faChevronUp() {
            return faChevronUp;
        },
        classObject() {
            return {
                "is-active": this.isActive
            };
        }
    },
    methods: {
        handleClick() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        },
        handleWindowScroll() {
            // FIXME: 150 should be in a common file somewhere
            this.isActive = window.scrollY > 150;
        }
    }
});
</script>

<style lang="postcss" scoped>
button {
    background: var(--color-peral);
    border: 2px solid var(--color-melbourne-cup);
    border-radius: 50%;
    color: var(--color-melbourne-cup);
    cursor: pointer;
    height: 50px;
    inset-block-end: 40px;
    inset-inline-end: 50px;
    opacity: 0;
    outline: none;
    pointer-events: none;
    position: fixed;
    transition: opacity 0.3s ease;
    width: 50px;

    &.is-active {
        opacity: 1;
        pointer-events: initial;
    }
}

@media screen and (prefers-reduced-motion) {
    button {
        transition: none;
    }
}
</style>
