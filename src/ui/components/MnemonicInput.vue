<template>
    <div class="mnemonic-input">
        <div class="list-container">
            <label
                v-for="index in words"
                :key="index"
                class="list-item"
                :class="{
                    'is-focused': state.focused === index,
                    'error': errorAtIndex(index - 1)
                }"
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
                    @input="handleInput"
                    @focus="handleFocus"
                >
            </label>
        </div>
        <transition name="fade">
            <Warning
                v-if="strangeWords != null && strangeWords.length > 0"
                :message="strangeWordsMessage"
            />
        </transition>
    </div>
</template>

<script lang="ts">
import {
    computed,
    defineComponent,
    onMounted,
    PropType,
    reactive,
    ref,
    Ref,
    SetupContext,
    watch
} from "@vue/composition-api";
import Vue from "vue";

import Warning from "./Warning.vue";

interface Props {
    editable: boolean;
    words: number;
    value: string[];
    isOpen: boolean;
}

interface State {
    focused: number | null;
    inputTimeout: ReturnType<typeof setTimeout> | null;
    bip39: typeof import("bip39") | null;
    words: string[] | null;
}

const notBlank = (word: string): boolean => word.length > 0;

export default defineComponent({
    props: {
        editable: Boolean,
        words: Number,
        value: (Array as unknown) as PropType<string[]>,
        isOpen: Boolean
    },
    components: { Warning },
    setup(props: Props, context: SetupContext) {
        const state = reactive<State>({
            focused: null,
            inputTimeout: null,
            bip39: null,
            words: null
        });

        const input: Ref<HTMLElement[]|null> = ref(null);

        const notInWordList = (word: string): boolean => {
            if (state.bip39 == null) return false;
            return !state.bip39!.wordlists.english.includes(word);
        };

        const strangeWords = computed(() => {
            if (state.words == null) return null;
            if (state.words.length === 0) return [];
            return [ ...new Set(state.words.filter(notInWordList).filter(notBlank)) ];
        });

        const strangeWordsMessage = computed(() => {
            if (strangeWords.value != null) {
                if (strangeWords.value.length > 0) {
                    return `${context.root.$t("mnemonic.wordsNotInWordlist").toString()}: ${strangeWords.value.join(", ")}`;
                }
            }
            return null;
        });

        function handleInput(event: Event): void {
            if (props.value == null) {
                return;
            }

            const newValues = props.value.slice();

            const target = event.target as HTMLInputElement;
            const index = Number.parseInt(target.dataset.index!, 10) - 1;
            const splitString = target.value.trim().split(" ");

            splitString.forEach((item, i) => {
                newValues[ index + i ] = item;
            });

            // Add 500ms delay to change root dependency
            // Prevents warning form popping up as the user types
            if (state.inputTimeout != null) clearTimeout(state.inputTimeout);
            state.inputTimeout = setTimeout(() => {
                state.words = newValues;
            }, 500);

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

        function errorAtIndex(index: number): boolean {
            if (strangeWords.value != null) return strangeWords.value.includes(props.value[ index ]);
            return false;
        }

        watch(
            () => props.isOpen,
            (newVal: boolean) => {
                Vue.nextTick(() => {
                    if (newVal && input.value != null && props.editable) {
                        input.value[ 0 ].focus();
                    }
                });
            }
        );

        watch(
            () => state.words,
            (newVal) => {
                // Valid when there are props.words non-blank entries
                if (newVal != null && newVal.filter(notBlank).length === props.words) {
                    context.emit("valid", true);
                } else {
                    context.emit("valid", false);
                }
            }
        );

        onMounted(async() => {
            state.bip39 = await import(/* webpackChunkName: "vendors" */ "bip39");
        });

        return {
            state,
            strangeWords,
            strangeWordsMessage,
            errorAtIndex,
            handleInput,
            handleFocus,
            input
        };
    }
});
</script>

<style scoped lang="postcss">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.list-container {
    align-items: center;
    display: grid;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    grid-template-columns: 1fr 1fr 1fr;
    padding-block-end: 20px;

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

    &.error {
        border-bottom: 1px solid var(--color-coral-red);
        color: var(--color-coral-red);
    }

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
