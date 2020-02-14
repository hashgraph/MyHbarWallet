<template>
    <transition name="ease">
        <div
            v-if="isOpen"
            transition="modal-fade"
            class="modal-background"
            role="dialog"
            aria-modal="true"
            @mousedown.self="handleClose"
        >
            <div
                class="modal"
                :class="{
                    large: !props.small && props.large,
                    small: !props.large && props.small
                }"
            >
                <header v-if="!props.hideDecoration">
                    <span class="title">{{ props.title }}</span>
                    <MaterialDesignIcon
                        v-if="!props.notClosable"
                        class="close"
                        :icon="mdiClose"
                        @click="handleClose"
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
        </div>
    </transition>
</template>

<script lang="ts">
import {
    createComponent,
    watch,
    onUnmounted,
    SetupContext,
    onMounted
} from "@vue/composition-api";
import { mdiClose } from "@mdi/js";
import MaterialDesignIcon from "../components/MaterialDesignIcon.vue";

const modalIds: number[] = [];
let nextModalId = 0;

function modalIsTop(id: number): boolean {
    return modalIds[ modalIds.length - 1 ] === id;
}

// The isOpen property controls if the modal is open or not. It should be bound with
// the v-model directive to allow the modal to close itself (click out and close button).
export default createComponent({
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

        function handleClose(): void {
            if (!props.notClosable && modalIsTop(id)) {
                context.emit("change", false);
            }
        }

        function handleWindowKeyDown(event: KeyboardEvent): void {
            // ESCAPE (27)
            if (!props.notClosable && props.isOpen && event.keyCode === 27) {
                handleClose();
            }
        }

        function unregister(): void {
            modalIds.splice(modalIds.indexOf(id), 1);
        }

        window.addEventListener("keydown", handleWindowKeyDown);

        onMounted(() => {
            // Do nothing if the modal is not open
            if (!props.isOpen) {
                return;
            }

            const elModals = context.root.$el.querySelectorAll(".modal");
            elModals.forEach((element) => {
                element.addEventListener(
                    "touchstart",
                    () => {
                        if (element.scrollTop <= 0) {
                            element.scrollTo(0, 1);
                            return;
                        }
                        if (
                            element.scrollTop + element.clientHeight >=
                            element.scrollHeight
                        ) {
                            element.scrollTo(
                                0,
                                element.scrollHeight - element.clientHeight - 1
                            );
                        }
                    },
                    { passive: true }
                );
            });
        });

        onUnmounted(() => {
            unregister();
            window.removeEventListener("keydown", handleWindowKeyDown);
            const elModals = context.root.$el.querySelectorAll(".modal");
            elModals.forEach((element) => {
                element.removeEventListener("touchstart", () => {
                    if (element.scrollTop <= 0) {
                        element.scrollTo(0, 1);
                        return;
                    }
                    if (
                        element.scrollTop + element.clientHeight >=
                        element.scrollHeight
                    ) {
                        element.scrollTo(
                            0,
                            element.scrollHeight - element.clientHeight - 1
                        );
                    }
                });
            });
        });

        watch(
            () => props.isOpen,
            (isOpen: boolean, prevIsOpen: boolean) => {
                const hasOpened = isOpen && !prevIsOpen;
                const hasClosed = !isOpen && prevIsOpen;

                document.body.classList.toggle("modal-is-open", isOpen);

                if (hasOpened) {
                    modalIds.push(id);
                } else if (hasClosed) {
                    unregister();
                }
            }
        );

        return {
            mdiClose,
            handleClose,
            handleWindowKeyDown,
            props
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
    width: 100vw;
    inset: 0;
    opacity: 1;
    overflow: hidden;
    overflow-y: auto;
    padding: 0 0 50px 0;
    pointer-events: all;
    position: fixed;
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
    width: 100vw;
    overflow: hidden;
    overflow-y: auto;
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

.modal-background .modal {
    transform: none;
}

.ease-enter-active,
.ease-leave-active {
    transition: all 0.35s;

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

.ease-enter,
.ease-leave-to {
    opacity: 0;
    transform: translate(0, -50px);
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
    padding: 40px;
    height: 100%;
    max-width: 100%;

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
