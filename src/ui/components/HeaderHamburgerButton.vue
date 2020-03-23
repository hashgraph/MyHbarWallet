<template>
    <div
        :class="wrapperStyle"
        @click="handleToggle"
    >
        <div :class="style('1')">
            <MaterialDesignIcon
                class="icon"
                :icon="icon"
            />
        </div>
        <div :class="style('2')">
            <MaterialDesignIcon
                class="icon"
                :icon="icon"
            />
        </div>
        <div :class="style('3')">
            <MaterialDesignIcon
                class="icon"
                :icon="icon"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { mdiMinus } from "@mdi/js";
import { computed, defineComponent, PropType, SetupContext } from "@vue/composition-api";

import MaterialDesignIcon from "./MaterialDesignIcon.vue";

interface Props {
    isOpen: boolean;
    isInterface: boolean;
}

export default defineComponent({
    components: { MaterialDesignIcon },
    props: {
        isOpen: (Boolean as unknown) as PropType<boolean>,
        isInterface: (Boolean as unknown) as PropType<boolean>
    },
    setup(props: Props, context: SetupContext) {
        const icon = mdiMinus;

        function style(ind: string): string {
            return props.isOpen ? `bar-${ind}-anim` : `bar-${ind}`;
        }

        const wrapperStyle = computed(() => props.isInterface ? "interface-button-wrapper" : "button-wrapper");

        function handleToggle(): void {
            context.emit("toggle", !props.isOpen);
            document.body.classList.toggle("ham-menu-is-open", !props.isOpen);
        }

        return {
            icon,
            style,
            handleToggle,
            wrapperStyle
        };
    }
});
</script>

<style lang="postcss" scoped>
.button-wrapper {
    border-color: var(--color-white);
    border-radius: 50%;
    cursor: pointer;
    inset-inline-end: 15px;
    max-height: 40px;
    min-width: 40px;
    overflow: hidden;
    position: absolute;
    transform: translate(-10px, 10px);

    &:active {
        background-color: rgba(0, 0, 0, 0.1);
    }
}

.interface-button-wrapper {
    border-color: var(--color-white);
    border-radius: 50%;
    cursor: pointer;
    inset-inline-end: 15px;
    max-height: 40px;
    min-width: 40px;
    overflow: hidden;
    position: absolute;
    transform: translate(-10px, 10px);

    &:active {
        background-color: rgba(0, 0, 0, 0.1);
    }

    @media screen and (max-width: 1024px) {
        inset-inline-end: 50px;
    }
}

.bar-1 {
    transform: translate(12px) scaleY(1.75) scaleX(1.5);
    transition: transform 0.2s linear;

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

.bar-2 {
    transform: translate(12px, -17.5px) scaleY(1.75) scaleX(1.5);
    transition: transform 0.2s linear;

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

.bar-3 {
    transform: translate(4.5px, -35px) scaleY(1.75);
    transition: transform 0.2s linear;

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

.bar-1-anim {
    transform: rotate(45deg) translate(19.75px, 4px) scaleX(1.75) scaleY(2);
    transition: transform 0.2s linear;

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

.bar-2-anim {
    transform:
        rotate(-45deg) translate(26.5px, -13.625px) scaleX(1.75)
        scaleY(2);
    transition: transform 0.2s linear;

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

.bar-3-anim {
    transform: translateX(15px) translateX(-5px);
    transition: transform 0.2s linear;

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

@media screen and (min-width: 1025px) {
    .button-wrapper {
        visibility: hidden;
    }

    .interface-button-wrapper {
        visibility: hidden;
    }
}
</style>
