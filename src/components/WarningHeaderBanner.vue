<template>
    <div
        v-scroll="onScroll"
        :class="{ scrolled: state.scrolled }"
        class="warning-banner-container"
    >
        <div class="warning-text">
            {{ message }}
        </div>
        <div class="dismiss-button" @click="onDismissClick">
            {{ $t("common.dismiss") }}
        </div>
    </div>
</template>

<script lang="ts">
import { createComponent, reactive, SetupContext } from "@vue/composition-api";
import { PropType } from "vue";

export default createComponent({
    props: {
        message: (String as unknown) as PropType<string>
    },
    setup(props: object, ctx: SetupContext) {
        const state = reactive({
            scrolled: false
        });

        function onScroll(): void {
            console.log("scrolled");
            state.scrolled = window.scrollY > 150;
        }

        function onDismissClick(event: Event): void {
            ctx.emit("dismiss", event);
        }

        return {
            state,
            onDismissClick,
            onScroll
        };
    }
});
</script>

<style lang="postcss" scoped>
@media screen and (prefers-reduced-motion: reduce) {
    .warning-banner-container {
        align-items: center;
        background-color: var(--color-safety-orange);
        box-shadow: 0 2px 13px rgba(0, 0, 0, 0.1);
        display: flex;
        inset-block-start: 0;
        inset-inline: 0;
        margin-block-start: 85px;
        position: fixed;
        transition: none;
        z-index: 1;
    }
}

.warning-banner-container {
    align-items: center;
    background-color: var(--color-safety-orange);
    box-shadow: 0 2px 13px rgba(0, 0, 0, 0.1);
    display: flex;
    inset-block-start: 0;
    inset-inline: 0;
    margin-block-start: 85px;
    position: fixed;
    transition: margin 0.3s ease;
    z-index: 1;
}

.scrolled {
    margin-block-start: 65px;
}

.warning-text {
    align-content: center;
    color: var(--color-white);
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    font-size: 16px;
    justify-content: space-around;
    margin-block: 3px;
}

.dismiss-button {
    color: var(--color-white);
    font-size: 16px;
    inset-inline-end: 0;
    margin-inline-end: 10px;
    position: fixed;

    &:hover,
    &:focus {
        cursor: pointer;
    }
}
</style>
