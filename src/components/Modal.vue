<template>
    <div
        class="modal-background"
        :class="{ 'is-open': isOpen }"
        role="dialog"
        aria-modal="true"
        @click="handleClose"
    >
        <div class="modal" :class="{ large: large }" @click.stop="">
            <header v-if="!hideDecoration">
                <span class="title">{{ title }}</span>
                <MaterialDesignIcon
                    class="close"
                    :icon="mdiClose"
                    @click="handleClose"
                />
            </header>
            <div class="main">
                <slot name="banner"></slot>
                <div class="content-container">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    createComponent,
    watch,
    PropType,
    onCreated,
    onBeforeDestroy
} from "vue-function-api";
import { mdiClose } from "@mdi/js";
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";

function setModalIsOpenOnBody(isOpen: boolean) {
    document.body.classList.toggle("modal-is-open", isOpen);
}

interface Props {
    notClosable: boolean;
    isOpen: boolean;
    title: string;
    hideDecoration: boolean;
    large: boolean;
}

// The isOpen property controls if the modal is open or not. It should be bound with
// the v-model directive to allow the modal to close itself (click out and close button).
export default createComponent({
    name: "Modal",
    components: {
        MaterialDesignIcon
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        notClosable: (Boolean as unknown) as PropType<boolean>,
        isOpen: (Boolean as unknown) as PropType<boolean>,
        title: (String as unknown) as PropType<string>,
        hideDecoration: (Boolean as unknown) as PropType<boolean>,
        large: (Boolean as unknown) as PropType<boolean>
    },

    setup(props: Props, context) {
        function handleClose() {
            if (!props.notClosable) {
                context.emit("change", false);
            }
        }

        function handleWindowKeyDown(event: KeyboardEvent) {
            // ESCAPE (27)
            if (props.isOpen && event.keyCode == 27) {
                handleClose();
            }
        }

        onCreated(() => {
            setModalIsOpenOnBody(props.isOpen);
            window.addEventListener("keydown", handleWindowKeyDown);
        });

        onBeforeDestroy(() => {
            setModalIsOpenOnBody(false);
            window.removeEventListener("keydown", handleWindowKeyDown);
        });

        watch(() => props.isOpen, setModalIsOpenOnBody);

        return {
            mdiClose,
            handleClose,
            handleWindowKeyDown
        };
    }
});
</script>

<style scoped lang="postcss">
.modal-background {
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    inset: 0;
    opacity: 0;
    overflow: hidden;
    padding: 25px 0;
    pointer-events: none;
    position: fixed;
    transition: opacity 0.15s linear;
    z-index: 2;

    &.is-open {
        opacity: 1;
        overflow-x: hidden;
        overflow-y: auto;
        pointer-events: all;
    }

    @media screen and (prefers-reduced-motion: reduce) {
        transition: none;
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
    overflow: hidden;
    transform: translateY(-50px);
    transition: transform 0.3s ease-out;
    width: 100%;
    z-index: 3;

    @media screen and (prefers-reduced-motion: reduce) {
        transition: none;
    }
}

.modal.large {
    max-width: 800px;
}

.modal-background.is-open .modal {
    transform: none;
}

header {
    align-items: center;
    background-color: var(--color-admiralty);
    color: var(--color-white);
    display: flex;
    font-size: 20px;
    justify-content: space-between;
    padding: 14px;
}

.title {
    padding-inline-start: 15px;
}

.main {
    background-color: var(--color-white);
}

.close {
    cursor: pointer;
}

.content-container {
    padding: 40px;

    @media (max-width: 415px) {
        padding: 20px;
    }
}

.modal.large .content-container {
    padding: 30px;
}
</style>
