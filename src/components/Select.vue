<template>
    <div class="select" :class="{ 'is-open': dropdownIsOpen }" @click.stop="">
        <div class="select-value-container" @click="toggleDropdown">
            <div class="select-value">{{ selected }}</div>
            <MaterialDesignIcon class="icon" :icon="dropdownIcon" />
        </div>
        <div class="select-menu">
            <div
                v-for="(opt, idx) in options"
                :key="opt + idx"
                class="select-option"
                @click="handleOptionClick(opt)"
            >
                {{ opt }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import MaterialDesignIcon from "./MaterialDesignIcon.vue";
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";
import {
    createComponent,
    value,
    computed,
    onCreated,
    PropType,
    onBeforeDestroy
} from "vue-function-api";

interface Props {
    options: string[];
    selected: string;
}

export default createComponent({
    components: {
        MaterialDesignIcon
    },
    model: {
        prop: "selected",
        event: "change"
    },
    props: {
        selected: (String as unknown) as PropType<string>,
        options: (Array as unknown) as PropType<string[]>
    },
    setup(props: Props, context) {
        const dropdownIsOpen = value(false);

        const dropdownIcon = computed(() => {
            if (dropdownIsOpen.value) {
                return mdiChevronUp;
            }

            return mdiChevronDown;
        });

        function handleCloseOnWindowClick() {
            dropdownIsOpen.value = false;
        }

        onCreated(() => {
            window.addEventListener("click", handleCloseOnWindowClick);
        });

        onBeforeDestroy(() => {
            window.removeEventListener("click", handleCloseOnWindowClick);
        });

        function toggleDropdown() {
            dropdownIsOpen.value = !dropdownIsOpen.value;
        }

        function handleOptionClick(option: string) {
            context.emit("change", option);
            dropdownIsOpen.value = false;
        }

        return {
            dropdownIsOpen,
            dropdownIcon,
            toggleDropdown,
            handleOptionClick
        };
    }
});
</script>

<style lang="postcss" scoped>
.select {
    position: relative;
    user-select: none;
}

.select-value-container {
    align-items: center;
    background-color: var(--color-white);
    border: 1px solid white;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    height: 49px;
    padding: 0 15px;
    transition: border-color 225ms ease, border-radius 225ms ease;

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

.select.is-open .select-value-container {
    border-color: var(--color-melbourne-cup);
    border-radius: 4px 4px 0 0;
}

.select-value {
    color: var(--color-washed-black);
    flex-grow: 1;
    font-size: 14px;
    text-transform: capitalize;
}

.icon {
    color: var(--color-international);
    width: 18px;
}

.select-menu {
    background: white;
    border: 1px solid var(--color-melbourne-cup);
    border-radius: 0 0 4px 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    inset-block-start: 48px;
    inset-inline: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    transition: opacity 225ms ease;
    z-index: 1;

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

.select.is-open .select-menu {
    opacity: 1;
    pointer-events: all;
}

.select-option {
    cursor: pointer;
    font-size: 14px;
    padding: 10px 15px;
    text-transform: capitalize;

    &:hover,
    &:focus {
        background-color: var(--color-jupiter);
    }
}
</style>
