<template>
    <div class="modal-open modal fade" role="dialog" aria-modal="true">
        <div class="modal-container">
            <header>
                <span class="title">{{ title }}</span>
                <FontAwesomeIcon class="close" :icon="closeIcon" />
            </header>
            <div class="main">
                <slot name="banner"></slot>
                <div class="content-container">
                    <slot name="content"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default Vue.extend({
    name: "Modal",
    components: {
        FontAwesomeIcon
    },
    props: {
        title: { type: String, required: true }
    },
    computed: {
        closeIcon() {
            return faTimes;
        }
    }
});
</script>

<style scoped lang="postcss">
.modal-open {
    overflow-x: hidden;
    overflow-y: auto;
}

.modal {
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    inset: 0;
    position: fixed;
    z-index: 2;
}

.fade {
    transition: opacity 0.15s linear;
    transition-delay: 0s;
    transition-duration: 15s;
    transition-property: opacity;
    transition-timing-function: linear;
}

.modal-container {
    background-clip: padding-box;
    border: 0;
    border-radius: 5px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.22);
    display: flex;
    flex-direction: column;
    margin: auto;
    max-width: 530px;
    z-index: 3;
}

header {
    align-items: center;
    background-color: var(--color-admiralty);
    color: white;
    display: flex;
    font-size: 20px;
    justify-content: space-between;
    padding: 14px;
}

.title {
    padding-inline-start: 15px;
}

.main {
    background-color: white;
}

.content-container {
    padding: 40px;
}

@media screen and (prefers-reduced-motion: reduce) {
    .fade {
        transition: none;
    }
}
</style>
