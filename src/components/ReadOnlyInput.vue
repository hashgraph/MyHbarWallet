<template>
    <div class="read-only-input">
        <div
            :class="{ value, multiline, obscure: obscure && !state.isEyeOpen }"
        >
            {{ value }}
        </div>
        <MaterialDesignIcon
            v-if="obscure"
            :class="{ eye, 'is-open': state.isEyeOpen }"
            :icon="eye"
            :size="40"
            @click="handleClickEye"
        />
    </div>
</template>

<script lang="ts">
import {
    computed,
    createComponent,
    PropType,
    reactive
} from "@vue/composition-api";
import { mdiEye, mdiEyeOutline } from "@mdi/js";
import MaterialDesignIcon from "./MaterialDesignIcon.vue";

export default createComponent({
    props: {
        value: (String as unknown) as PropType<string | null>,
        multiline: Boolean,
        obscure: Boolean
    },
    components: {
        MaterialDesignIcon
    },
    setup(props: { value: string; multiline: boolean; obscure: boolean }) {
        const state = reactive({
            isEyeOpen: false,
            hasFocus: false
        });

        const eye = computed(() => {
            return state.isEyeOpen ? mdiEye : mdiEyeOutline;
        });

        function handleClickEye(): void {
            state.isEyeOpen = !state.isEyeOpen;
        }

        return {
            props,
            state,
            eye,
            handleClickEye
        };
    }
});
</script>

<style lang="postcss" scoped>
.read-only-input {
    background-color: var(--color-peral);
    border: 2px solid var(--color-peral);
    border-radius: 4px;
    color: var(--color-washed-black);
    display: flex;
    flex-wrap: nowrap;
    font-family: "Inconsolata", monospace;
    font-size: 14px;
    padding: 13px 15px;
    width: 100%;
}

.value {
    cursor: default;

    &.obscure {
        color: transparent;
        text-shadow: rgba(0, 0, 0, 0.3) 0 0 5px;
        user-select: none;
    }

    &:not(.multiline) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

.eye {
    cursor: pointer;
    flex-shrink: 0;
    margin: auto;
    opacity: 0.3;
    padding-inline-start: 10px;

    &.is-open {
        color: var(--color-melbourne-cup);
        opacity: 1;
    }
}
</style>
