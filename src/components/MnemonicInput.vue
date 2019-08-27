<template>
    <div class="list-container">
        <label
            v-for="index in words"
            :key="index"
            class="list-item"
            :class="{ 'is-focused': state.focused === index }"
        >
            <span class="number">{{ index }}.</span>

            <input
                class="word"
                :value="value.length < index ? '' : value[index - 1]"
                :readonly="!editable"
                :data-index="index"
                :tabindex="editable ? null : -1"
                autocomplete-disabled
                @input="handleInput"
                @focus="handleFocus"
            />
        </label>
    </div>
</template>

<script lang="ts">
import { createComponent, PropType, reactive } from "@vue/composition-api";

interface State {
    focused: number | null;
}

export default createComponent({
    props: {
        editable: (Boolean as unknown) as boolean,
        words: (Number as unknown) as number,
        value: (Array as unknown) as PropType<string[]>
    },
    setup(props, context) {
        const state = reactive<State>({
            focused: null
        });

        function handleInput(event: Event) {
            const target = event.target as HTMLInputElement;
            const index = Number.parseInt(target.dataset.index || "0", 10);

            if (props.value == null) {
                return;
            }

            const newValues = props.value.slice();
            newValues[index - 1] = target.value;

            context.emit("input", newValues);
        }

        function handleFocus(event: Event) {
            if (!props.editable) {
                // Non-editable controls should not set focus
                return;
            }

            const target = event.target as HTMLInputElement;
            state.focused = Number.parseInt(target.dataset.index || "0", 10);
        }

        return {
            state,
            handleInput,
            handleFocus
        };
    }
});
</script>

<style scoped lang="postcss">
.list-container {
    align-items: center;
    display: grid;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    grid-template-columns: 1fr 1fr 1fr;

    @media (max-width: 414px) {
        grid-template-columns: 1fr 1fr;
    }
}

.list-item {
    align-items: center;
    border-bottom: 1px solid var(--color-jupiter);
    color: var(--color-basalt-grey);
    display: flex;
    font-size: 14px;
    padding: 10px 0;

    &.is-focused {
        border-color: var(--color-melbourne-cup);
    }

    @media print {
        border: none;
    }
}

.number {
    flex-shrink: 0;
    font-size: 14px;
}

.list-item.is-focused .number {
    color: var(--color-melbourne-cup);
}

.word {
    border: none;
    color: var(--color-ghostlands-coal);
    margin-inline-start: 10px;
    outline: none;
    padding: 0;
    width: 100%;

    &:read-only {
        cursor: default;
    }
}
</style>
