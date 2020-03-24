<template>
    <transition
        name="fade"
        @after-enter="showModal"
    >
        <div
            v-if="isOpen"
            class="modal-background"
            role="dialog"
            aria-modal="true"
            @mousedown.self="handleClose"
        >
            <transition name="slidefade">
                <div
                    v-if="backgroundShown"
                    class="modal"
                    :class="{
                        large: !props.small && props.large,
                        small: !props.large && props.small
                    }"
                >
                    <header v-if="!props.hideDecoration">
                        <span class="title">{{ props.title }}</span>
                        <MaterialDesignIcon
                            class="close"
                            :icon="mdiClose"
                            @click="handleXClose"
                        />
                    </header>
                    <MaterialDesignIcon
                        v-if="crown"
                        :icon="crown"
                        :size="140"
                        class="crown"
                    />
                    <div :class="{ main: true, garlands }">
                        <slot name="banner" />
                        <div class="content-container">
                            <slot />
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent, SetupContext, watch, ref } from "@vue/composition-api";
import { mdiClose } from "@mdi/js";

import MaterialDesignIcon from "./MaterialDesignIcon.vue";

const modalIds: number[] = [];
let nextModalId = 0;

function modalIsTop(id: number): boolean {
    return modalIds[ modalIds.length - 1 ] === id;
}

// The isOpen property controls if the modal is open or not. It should be bound with
// the v-model directive to allow the modal to close itself (click out and close button).
export default defineComponent({
    name: "Modal", // Jest needs this
    props: {
        notClosable: Boolean,
        isOpen: Boolean,
        title: String,
        hideDecoration: Boolean,
        small: Boolean,
        large: Boolean,
        garlands: Boolean,
        crown: String
    },
    components: { MaterialDesignIcon },
    model: {
        prop: "isOpen",
        event: "change"
    },
    setup(
        props: {
            notClosable: boolean;
            isOpen: boolean;
            title: string;
            hideDecoration: boolean;
            large: boolean;
        },
        context: SetupContext
    ) {
        const id = nextModalId++;
        const backgroundShown = ref(false);

        function showModal(): void {
            backgroundShown.value = true;
        }

        function handleClose(): void {
            if (!props.notClosable && modalIsTop(id)) {
                handleXClose();
            }
        }

        function handleXClose(): void {
            context.emit("change", false); // flips isOpen
        }

        function handleWindowKeyDown(event: KeyboardEvent): void {
            // ESCAPE (27)
            if (!props.notClosable && props.isOpen && event.keyCode === 27 && modalIsTop(id)) {
                handleXClose();
            }
        }

        window.addEventListener("keydown", handleWindowKeyDown);

        watch(
            () => props.isOpen,
            (isOpen: boolean, prevIsOpen: boolean) => {
                const hasOpened = isOpen && !prevIsOpen;
                const hasClosed = !isOpen && prevIsOpen;

                if (isOpen) {
                    document.body.classList.toggle("modal-is-open", isOpen);
                }

                if (hasOpened) {
                    modalIds.push(id);
                } else if (hasClosed) {
                    backgroundShown.value = false;
                    modalIds.splice(modalIds.indexOf(id), 1);
                    context.emit("close");
                }

                if (modalIds.length === 0) {
                    document.body.classList.toggle("modal-is-open", false);
                }
            }
        );

        return {
            backgroundShown,
            showModal,
            mdiClose,
            handleClose,
            handleWindowKeyDown,
            props,
            handleXClose
        };
    }
});
</script>

<style scoped lang="postcss">
.modal-background {
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    height: 100vh;
    inset: 0;
    opacity: 1;
    overflow: hidden;
    overflow-y: auto;
    padding: 0 0 50px 0;
    pointer-events: all;
    position: fixed;
    width: 100vw;
    z-index: 2;

    @supports (-webkit-overflow-scrolling: touch) {
        background-color: var(--color-white);
    }
}

.modal {
    background-clip: padding-box;
    border: 0;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.22);
    display: flex;
    flex-direction: column;
    margin: auto;
    max-width: 530px;
    overflow: visible;
    overflow-y: visible;
    transform: none;
    width: 100vw;
    z-index: 3;

    & .crown {
        background-color: var(--color-melbourne-cup);
        border-color: var(--color-melbourne-cup);
        border-radius: 1200px;
        border-style: solid;
        color: var(--color-white);
        padding: 20px;
        position: absolute;
        transform: translate(230px, -70px);
    }

    @media print {
        box-shadow: none;
    }

    @media (max-width: 600px) {
        background-color: var(--color-white);
        border-radius: 0;
        height: 100vh;
    }

    @supports (-webkit-overflow-scrolling: touch) {
        -webkit-overflow-scrolling: auto;
        padding-block-end: 75px;
    }
}

.modal.small {
    max-width: 440px;

    & .crown {
        transform: translate(150px, -70px);
    }
}

.modal.large {
    max-width: 800px;

    & .crown {
        transform: translate(330px, -70px);
    }
}

.slidefade-enter-active,
.slidefade-leave-active {
    transition: all 0.2s linear;

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

.slidefade-enter,
.slidefade-leave-to {
    opacity: 0;
    transform: translate(0, 50px);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.15s ease-out;

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

header {
    align-items: center;
    background-color: var(--color-admiralty);
    color: var(--color-white);
    display: flex;
    font-size: 20px;
    justify-content: space-between;
    padding: 14px;

    @media print {
        display: none;
    }
}

.title {
    padding-inline-start: 15px;
}

.main {
    background-color: var(--color-white);
    max-width: 100%;
    width: 100%;

    &.garlands {
        background-image: url("../assets/garlands.png");
        background-repeat: no-repeat;
        background-size: 100%;
    }

    @media (max-width: 600px) {
        height: 100%;
    }
}

.close {
    cursor: pointer;
}

.content-container {
    height: 100%;
    max-width: 100%;
    padding: 40px;

    @media (max-width: 600px) {
        padding: 20px;
    }

    @media print {
        padding: 0;
    }
}

.modal.large .content-container {
    padding: 30px;

    @media print {
        padding: 0;
    }
}
</style>
