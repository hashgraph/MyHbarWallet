<template>
    <transition name="fade">
        <div v-show="visible" class="tooltip">
            <div v-html="text"></div>
            <div class="arrow"></div>
        </div>
    </transition>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data() {
        return {
            text: "",
            visible: false
        };
    }
});
</script>

<style lang="postcss" scoped>
@media screen and (prefers-reduced-motion: reduce) {
    .fade-enter-active,
    .fade-leave-active {
        transition: none;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.tooltip {
    background-color: var(--color-white);
    border: 1px solid var(--color-basalt-grey);
    border-radius: 5px;
    box-shadow: 0 10px 10px -5px rgba(0, 0, 0, 0.1);
    color: var(--color-china-blue);
    max-width: 400px;
    padding: 5px;
    z-index: 10;
}

.arrow {
    border: 5px solid transparent;
    height: 0;
    position: absolute;
    width: 0;

    &::after {
        display: block;
    }
}
</style>
