<template>
  <div
    ref="ttEl"
    class="tooltip-container"
    :class="{ active }"
    @click.stop=""
  >
    <div
      class="slot-container"
      @click="handleTogglePinned"
      @mouseenter="handleMouseOver"
      @mouseleave="handleMouseOut"
    >
      <slot />
    </div>
    <div class="message">
      {{ message }}
    </div>
  </div>
</template>

<script lang="ts">
import {
    computed,
    onBeforeMount,
    reactive,
    createComponent,
    SetupContext
} from "@vue/composition-api";

interface Props {
    message: string;
    pinnable: boolean;
}

type Context = SetupContext & {
    refs: {
        ttEl: HTMLElement;
    };
};

export default createComponent({
    props: {
        message: { type: String, required: true },
        pinnable: { type: Boolean, required: false }
    },
    setup(props: Props, context) {
        const state = reactive({
            hovered: false,
            pinned: false
        });

        // computed
        const active = computed((): boolean => {
            if (!props.pinnable) {
                return state.hovered;
            }
            return state.hovered || state.pinned;
        });

        // methods
        function handleMouseOver(): void {
            state.hovered = true;
        }

        function handleMouseOut(): void {
            state.hovered = false;
        }

        function handleTogglePinned(): void {
            state.pinned = !state.pinned;
            getPosition();
        }

        function handleCloseOnWindowClick(): void {
            state.pinned = false;
        }

        function getPosition(): void {
            const tt = (context as Context).refs.ttEl;
            if (tt) {
                const curleft = tt.getBoundingClientRect().left;
                if (curleft > 2 * (window.innerWidth / 3)) tt.classList.add("on-right");
            }
        }

        window.addEventListener("click", handleCloseOnWindowClick);

        onBeforeMount(() => {
            window.removeEventListener("click", handleCloseOnWindowClick);
        });

        return {
            handleTogglePinned,
            handleMouseOver,
            handleMouseOut,
            active
        };
    }
});
</script>

<style lang="postcss" scoped>
.tooltip-container {
    position: relative;
}

.message {
    background-color: var(--color-white);
    border: 1px solid var(--color-basalt-grey);
    border-radius: 4px;
    color: var(--color-china-blue);
    cursor: default;
    font-size: 14px;
    inset-block-end: calc(100% + 12px);
    inset-inline-start: calc((100% / 2));
    line-height: 2;
    margin: 0 auto;
    max-width: 250px;
    opacity: 0;
    padding: 6px 12px;
    pointer-events: none;
    position: absolute;
    text-align: start;
    transform: translateX(-50%);
    transition: opacity 225ms ease;
    width: max-content;
    z-index: 2;

    &::before {
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid var(--color-basalt-grey);
        content: "";
        height: 10px;
        inset-block-end: -11px;
        inset-inline: 0;
        margin: 0 auto;
        position: absolute;
        width: 10px;
    }

    &::after {
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid white;
        content: "";
        height: 10px;
        inset-block-end: -10px;
        inset-inline: 0;
        margin: 0 auto;
        position: absolute;
        width: 10px;
    }

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

.tooltip-container.active .message {
    opacity: 1;
    pointer-events: all;
}

/* TODO: below may need refactor if we use these elsewhere */

@media (max-width: 600px) {
    .on-right .message {
        inset-inline-start: -50px;

        &::before {
            inset-inline-start: 123px;
        }

        &::after {
            inset-inline-start: 123px;
        }
    }
}
</style>
