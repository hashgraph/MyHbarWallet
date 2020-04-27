<template>
    <div
        class="read-only-input"
        :class="{
            'has-suffix': props.suffix != null
        }"
    >
        <div
            :class="{
                value,
                multiline,
                obscure: obscure && !state.isEyeOpen
            }"
        >
            {{ value }}
        </div>
        <div
            class="suffix"
        >
            {{ props.suffix }}
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
import { computed, defineComponent, PropType, reactive } from "@vue/composition-api";
import { mdiEye, mdiEyeOutline } from "@mdi/js";

import MaterialDesignIcon from "./MaterialDesignIcon.vue";

export default defineComponent({
    props: {
        value: (String as unknown) as PropType<string | null>,
        multiline: Boolean,
        obscure: Boolean,
        suffix: (String as unknown) as PropType<string | null>
    },
    components: { MaterialDesignIcon },
    setup(props: { value: string; multiline: boolean; obscure: boolean; suffix: string }) {
        const state = reactive({
            isEyeOpen: false,
            hasFocus: false
        });

        const eye = computed(() => state.isEyeOpen ? mdiEye : mdiEyeOutline);

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
    align-items: center;
    cursor: default;
    display: flex;
    flex-grow: 1;

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
    opacity: 0.3;
    padding-inline-start: 10px;

    &.is-open {
        color: var(--color-melbourne-cup);
        opacity: 1;
    }
}

.suffix {
    justify-content: space-between;
}
</style>
