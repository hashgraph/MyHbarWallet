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
                ref="input"
                type="text"
                class="word"
                :value="value.length < index ? '' : value[index - 1]"
                :readonly="!editable"
                :data-index="index"
                :tabindex="editable ? null : -1"
                autocomplete="off"
                autocapitalize="off"
                spellcheck="false"
                @input="handleInput"
                @focus="handleFocus"
            />
        </label>
    </div>
</template>

<script lang="ts">
import {
    createComponent,
    PropType,
    reactive,
    SetupContext,
    ref,
    watch,
    Ref
} from "@vue/composition-api";
import Vue from "vue";

interface State {
    focused: number | null;
}

interface Props {
    editable: boolean;
    words: number;
    value: string[];
    isOpen: boolean;
}

export default createComponent({
    props: {
        editable: Boolean,
        words: Number,
        value: (Array as unknown) as PropType<string[]>,
        isOpen: Boolean
    },
    setup(props: Props, context: SetupContext) {
        const state = reactive<State>({
            focused: 1
        });

        const input = ref<HTMLInputElement[] | null>(null);

        function handleInput(event: Event): void {
            if (props.value == null) {
                return;
            }

            const target = event.target as HTMLInputElement;
            const newValues = props.value.slice();
            const index = Number.parseInt(target.dataset.index!, 10) - 1;

            const splitString = target.value.trim().split(" ");
            splitString.forEach((item, i) => {
                newValues[index + i] = item;
            });

            context.emit("input", newValues);
        }

        function handleFocus(event: Event): void {
            if (!props.editable) {
                // Non-editable controls should not set focus
                return;
            }

            const target = event.target as HTMLInputElement;
            state.focused = Number.parseInt(target.dataset.index || "0", 10);
        }

        watch(
            () => props.isOpen,
            (newVal: boolean) => {
                Vue.nextTick(() => {
                    if (newVal && input.value) {
                        input.value[0].focus();
                    }
                });
            }
        );

        return {
            state,
            handleInput,
            handleFocus,
            input
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
