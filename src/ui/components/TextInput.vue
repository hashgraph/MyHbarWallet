<template>
    <div
        class="text-input"
        :class="classObject"
    >
        <label class="label-container">
            <span
                v-if="label"
                class="label"
            >{{ label }}</span>

            <span class="input-container">
                <span
                    v-if="prefix"
                    class="prefix"
                >{{ prefix }}</span>
                <span class="input-wrapper">
                    <div class="flex-container">
                        <div class="text-flex-item">
                            <textarea
                                v-if="multiline"
                                ref="input"
                                :key="inputKey"
                                class="text-area"
                                :placeholder="placeholder"
                                :tabindex="tabindex"
                                :value="value"
                                :rows="rows"
                                :class="{ resize: resizable }"
                                @focusin="handleFocusIn"
                                @focusout="handleFocusOut"
                                @input="handleInput"
                            />
                            <input
                                v-else
                                ref="input"
                                :key="inputKey"
                                :value="value"
                                :placeholder="placeholder"
                                :type="keyboardType"
                                :tabindex="tabindex"
                                :step="step"
                                :min="min"
                                :autocomplete="
                                    autocompleteDisabled ? 'off' : 'on'
                                "
                                :spellcheck="!spellcheckDisabled"
                                @focusin="handleFocusIn"
                                @focusout="handleFocusOut"
                                @input="handleInput"
                            >
                        </div>

                        <div class="deco-flex-item">
                            <span
                                v-if="hasDecorations"
                                class="decorations"
                            >
                                <MaterialDesignIcon
                                    v-if="obscure"
                                    class="eye"
                                    :class="{ 'is-open': state.isEyeOpen }"
                                    :icon="eye"
                                    @click="handleClickEye"
                                />

                                <MaterialDesignIcon
                                    v-else-if="showValidation"
                                    class="checkmark"
                                    :class="{ 'is-valid': valid }"
                                    :icon="mdiCheckCircle"
                                />
                            </span>
                        </div>
                    </div>
                </span>
                <span
                    v-if="suffix"
                    class="suffix"
                >{{ suffix }}</span>
            </span>
        </label>

        <div
            v-if="label != null"
            class="actions"
        >
            <div
                v-if="action"
                class="action"
                @click="$emit('action')"
            >
                {{ action }}
            </div>
            <div
                v-if="canClear"
                class="action"
                @click="handleClickClear"
            >
                {{ $t("common.clear") }}
            </div>
            <div
                v-if="canCopy"
                class="action"
                @click="handleClickCopy"
            >
                {{ $t("common.copy") }}
            </div>
        </div>

        <div
            v-if="error"
            class="error"
        >
            {{ error }}
        </div>
    </div>
</template>

<script lang="ts">
import { mdiCheckCircle, mdiEye, mdiEyeOutline } from "@mdi/js";
import { computed, defineComponent, PropType, reactive, ref, Ref } from "@vue/composition-api";

import { writeToClipboard } from "../../service/clipboard";

import MaterialDesignIcon from "./MaterialDesignIcon.vue";

interface Props {
    placeholder: string;
    value: string | number | boolean;
    label: string;
    tabindex: string;
    step: string;
    type: string;
    min: number;
    action: string;
    compact: boolean;
    white: boolean;
    obscure: boolean;
    canClear: boolean;
    canCopy: boolean;
    autocompleteDisabled: boolean;
    spellcheckDisabled: boolean;
    showValidation: boolean;
    valid: boolean;
    error: string;
    multiline: boolean;
    resizable: boolean;
    prefix: string;
    suffix: string;
}

export interface Component {
    input: Ref<HTMLInputElement | null>;
    inputKey: Ref<number>;
    state: {
        isEyeOpen: boolean;
    };
    keyboardType: Ref<string>;
    eye: Ref<string>;
    mdiCheckCircle: string;
    classObject: Ref<{ [key: string]: boolean }>;
    focus: () => void;
    rows: Ref<number>;
    handleClickEye: () => void;
    handleInput: (event: Event) => void;
    handleClickCopy: () => void;
    handleClickClear: () => void;
    handleFocusIn: () => void;
    handleFocusOut: () => void;
    hasDecorations: Ref<boolean>;
}

export default defineComponent({
    name: "TextInput",
    components: { MaterialDesignIcon },
    props: {
        placeholder: (String as unknown) as PropType<string>,
        value: (String as unknown) as PropType<string>,
        label: (String as unknown) as PropType<string>,
        min: (Number as unknown) as PropType<number>,
        tabindex: (String as unknown) as PropType<string>,
        step: (String as unknown) as PropType<string>,
        type: (String as unknown) as PropType<string>,
        action: (String as unknown) as PropType<string>,
        compact: (Boolean as unknown) as PropType<boolean>,
        multiline: (Boolean as unknown) as PropType<boolean>,
        white: (Boolean as unknown) as PropType<boolean>,
        resizable: (Boolean as unknown) as PropType<boolean>,
        canClear: (Boolean as unknown) as PropType<boolean>,
        canCopy: (Boolean as unknown) as PropType<boolean>,
        autocompleteDisabled: (Boolean as unknown) as PropType<boolean>,
        spellcheckDisabled: (Boolean as unknown) as PropType<boolean>,

        // Whether to hide the text being edited (e.g., for passwords).
        obscure: (Boolean as unknown) as PropType<boolean>,

        // Whether to validate the the input as an ID and add the check-mark to the bottom right
        showValidation: (Boolean as unknown) as PropType<boolean>,
        valid: (Boolean as unknown) as PropType<boolean>,

        // Error text to show when _not_ valid and validation should be shown
        // WARNING: this only works properly with a single line of text,
        error: (String as unknown) as PropType<string>,

        // labels to be appended before and after input text
        prefix: (String as unknown) as PropType<string>,
        suffix: (String as unknown) as PropType<string>
    },
    setup(props: Props, context): Component {
        const state = reactive({
            isEyeOpen: false,
            hasFocus: false
        });

        const input = ref<HTMLInputElement | null>(null);
        const inputKey = ref(0);

        const keyboardType = computed(() => {
            if (props.type) return props.type;
            if (props.obscure && !state.isEyeOpen) return "password";

            return "text";
        });

        const rows = computed(() => props.compact ? 2 : 8);

        const eye = computed(() => state.isEyeOpen ? mdiEye : mdiEyeOutline);

        const hasDecorations = computed(() => props.showValidation || props.obscure);

        const classObject = computed(() => ({
            "is-compact": props.compact,
            "is-white": props.white,
            "is-multiline": props.multiline,
            "has-focus": state.hasFocus,
            "has-label": props.label != null,
            "has-error": props.error != null && props.error !== "",
            "has-prefix": props.prefix != null,
            "has-suffix": props.suffix != null
        }));

        function focus(): void {
            inputKey.value += 1;
            context.root.$nextTick(() => {
                if (input.value != null) {
                    input.value.focus();
                }
            });
        }

        function handleClickEye(): void {
            state.isEyeOpen = !state.isEyeOpen;
            focus();
        }

        function handleInput(event: Event): void {
            const input = event.target as HTMLTextAreaElement;
            context.emit("input", input.value, event);
        }

        function handleClickClear(): void {
            context.emit("input", "");
        }

        async function handleClickCopy(): Promise<void> {
            inputKey.value += 1;
            context.root.$nextTick(() => {
                if (input.value != null) {
                    writeToClipboard(input.value);
                }
            });
        }

        function handleFocusIn(): void {
            state.hasFocus = true;
        }

        function handleFocusOut(): void {
            state.hasFocus = false;
        }

        return {
            input,
            inputKey,
            state,
            keyboardType,
            eye,
            mdiCheckCircle,
            classObject,
            focus,
            rows,
            handleClickEye,
            handleInput,
            handleClickCopy,
            handleClickClear,
            handleFocusIn,
            handleFocusOut,
            hasDecorations
        };
    }
});
</script>

<style scoped lang="postcss">
.text-input {
    border-radius: 4px;
    position: relative;
    width: 100%;
}

.flex-container {
    display: flex;
    flex-direction: row;
}

.text-flex-item {
    flex-grow: 1;
}

.deco-flex-item {
    flex-grow: 0;
}

.actions {
    align-items: center;
    display: flex;
    height: 24px;
    inset-block-start: 0;
    inset-inline-end: 8px;
    position: absolute;
    user-select: none;
}

.action {
    color: var(--color-basalt-grey);
    cursor: pointer;
    font-size: 14px;
    padding: 6px 8px;

    &:last-child {
        margin-inline-end: -8px;
    }

    &:active {
        color: var(--color-melbourne-cup);
    }
}

textarea {
    max-width: 100%;
    min-width: 100%;
    resize: none;

    &.resize {
        resize: vertical;
    }
}

input,
textarea {
    border: 0;
    color: var(--color-washed-black);
    font-size: 14px;
    outline: none;
    padding: 20px;
    width: 100%;

    &::placeholder {
        color: var(--color-basalt-grey);
    }
}

/* Hide Spinner */
input[type="number"] {
    -webkit-appearance: textfield;
}

/* Hide Spinner */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.input-wrapper {
    flex-grow: 1;
    position: relative;
}

.label-container {
    display: flex;
    flex-direction: column;
}

.label {
    display: block;
    font-size: 16px;
    font-weight: 600;
    height: 24px;
    margin-block-end: 13px;
    padding: 0 8px;
}

.input-container {
    background-color: var(--color-peral);
    border: 2px solid var(--color-peral);
    border-radius: 4px;
    display: flex;
    outline: none;
    overflow: hidden;
    width: 100%;
}

.decorations {
    align-items: center;
    display: flex;
    height: 100%;
    inset-block-start: 0;
    inset-inline-end: 15px;
    padding-inline-end: 20px;
}

/* Compact */
.text-input.is-compact {
    & input,
    & textarea {
        border-width: 1px;
        padding: 13px 15px;
    }

    & .input-container {
        border-width: 1px;
    }
}

/* White */
.text-input.is-white {
    & .input-container {
        background-color: var(--color-white);
        border-color: var(--color-white);
    }
}

/* Has Focus */
.text-input.has-focus {
    & .input-container {
        border-color: var(--color-melbourne-cup);
    }
}

/* Has Error */
.text-input.has-error {
    & .input-container {
        border-color: var(--color-lightish-red);
    }
}

/* Decorations */
.text-input.has-decorations {
    & input,
    & textarea {
        padding-inline-end: 50px;
    }
}

/* Has Prefix */
.text-input.has-prefix {
    & input,
    & textarea {
        border-left: 1px solid var(--color-jupiter);
    }
}

.prefix,
.suffix {
    align-items: center;
    color: var(--color-basalt-grey);
    display: flex;
    flex-shrink: 0;
    font-size: 14px;
    padding: 0 14px;
    white-space: nowrap;
}

/* Has Suffix */
.text-input.has-suffix {
    & .suffix {
        border-left: 1px solid var(--color-jupiter);
    }
}

/* Is Multiline */
.text-input.is-multiline {
    & .decorations {
        align-items: flex-end;
        padding-block-end: 15px;
    }
}

.eye {
    cursor: pointer;
    margin: auto;
    opacity: 0.3;

    &.is-open {
        color: var(--color-melbourne-cup);
        opacity: 1;
    }
}

.checkmark {
    color: var(--color-jupiter);
    height: 19px;

    &.is-valid {
        color: var(--color-melbourne-cup);
    }
}

.symbol {
    color: var(--color-basalt-grey);
}

.error {
    color: var(--color-lightish-red);
    font-size: 14px;
    margin: 7px 0 0 15px;
}
</style>
