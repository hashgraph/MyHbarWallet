<template>
    <label class="toggle">
        <input type="checkbox" checked @change="onChange" />
        <span class="slider" :class="{ colored: colored }"></span>
        <span class="text left">{{ lefttext }}</span>
        <span class="text right">{{ righttext }}</span>
    </label>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "Toggle",
    props: {
        lefttext: { type: String, required: false, default: "" },
        righttext: { type: String, required: false, default: "" },
        colored: { type: Boolean, required: false }
    }
});
</script>

<style scoped lang="postcss">
label {
    align-items: center;
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    height: 30px;
    position: relative;
    width: 60px;

    & input {
        height: 0;
        opacity: 0;
        width: 0;
    }
}

@media screen and (prefers-reduced-motion: reduce) {
    .slider {
        background-color: var(--color-jupiter);
        border-radius: 30px;
        cursor: pointer;
        inset: 0;
        position: absolute;
        transition: transform 0.5s ease;
        transition: none;

        &.colored::before {
            background-color: var(--color-melbourne-cup);
        }

        &::before {
            background-color: var(--color-white);
            border-radius: 100%;
            content: "";
            height: 25px;
            inset-block-end: 3px;
            inset-inline-start: 4px;
            position: absolute;
            transition: transform 0.5s ease;
            width: 25px;
        }

        @media screen and (prefers-reduced-motion: reduce) {
            &::before {
                background-color: var(--color-white);
                border-radius: 100%;
                content: "";
                height: 25px;
                inset-block-end: 3px;
                inset-inline-start: 4px;
                position: absolute;
                transition: none;
                width: 25px;
            }
        }
    }
}

.slider {
    background-color: var(--color-jupiter);
    border-radius: 30px;
    cursor: pointer;
    inset: 0;
    position: absolute;
    -webkit-transition: 0.4s;
    transition: transform 0.5s ease;

    &.colored::before {
        background-color: var(--color-melbourne-cup);
    }

    &::before {
        background-color: var(--color-white);
        border-radius: 100%;
        content: "";
        height: 25px;
        inset-block-end: 3px;
        inset-inline-start: 4px;
        position: absolute;
        transition: transform 0.5s ease;
        width: 25px;
    }

    @media screen and (prefers-reduced-motion: reduce) {
        &::before {
            background-color: var(--color-white);
            border-radius: 100%;
            content: "";
            height: 25px;
            inset-block-end: 3px;
            inset-inline-start: 4px;
            position: absolute;
            transition: none;
            width: 25px;
        }
    }
}

input:checked + .slider::before {
    transform: translateX(27px);
}

input:checked ~ .right {
    color: var(--color-white);
}

input:not(:checked) ~ .left {
    color: var(--color-white);
}

@media screen and (prefers-reduced-motion: reduce) {
    .text {
        color: black;
        font-size: 10px;
        position: absolute;
        transition: none;
        z-index: 1;

        &.left {
            margin-inline-start: 12px;
        }

        &.right {
            margin-inline-start: 38px;
        }
    }
}

.text {
    color: black;
    font-size: 10px;
    position: absolute;
    z-index: 1;

    &.left {
        margin-inline-start: 12px;
    }

    &.right {
        margin-inline-start: 38px;
    }
}
</style>
