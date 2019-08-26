<template>
    <div class="text-input" :class="classObject">
        <label class="label-container">
            <span v-if="label" class="label">{{ label }}</span>

            <span class="input-container">
                <span v-if="prefix" class="prefix">{{ prefix }}</span>

                <span class="input-wrapper">
                    <textarea
                        v-if="multiline"
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
                        :value="value"
                        :placeholder="placeholder"
                        :type="keyboardType"
                        :tabindex="tabindex"
                        :step="step"
                        :min="min"
                        :autocomplete="autocompleteDisabled ? 'off' : 'on'"
                        @focusin="handleFocusIn"
                        @focusout="handleFocusOut"
                        @input="handleInput"
                    />

                    <span v-if="hasDecorations" class="decorations">
                        <MaterialDesignIcon
                            v-if="obscure"
                            class="eye"
                            :class="{ 'is-open': isEyeOpen }"
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
                </span>

                <span v-if="suffix" class="suffix">{{ suffix }}</span>
            </span>
        </label>

        <div v-if="label != null" class="actions">
            <div v-if="action" class="action" @click="$emit('action')">
                {{ action }}
            </div>
            <div v-if="canClear" class="action" @click="handleClickClear">
                Clear
            </div>
            <div v-if="canCopy" class="action" @click="handleClickCopy">
                Copy
            </div>
        </div>

        <div v-if="error" class="error">
            {{ error }}
        </div>
    </div>
</template>

<script lang="ts">
import MaterialDesignIcon from "../components/MaterialDesignIcon.vue";
import { mdiEye, mdiEyeOutline, mdiCheckCircle } from "@mdi/js";
import {
    createComponent,
    reactive,
    Ref,
    computed,
    PropType
} from "@vue/composition-api";
import { writeToClipboard } from "../clipboard";

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
    showValidation: boolean;
    valid: boolean;
    error: string;
    multiline: boolean;
    resizable: boolean;
    prefix: string;
    suffix: string;
}

export interface Component {
    isEyeOpen: boolean;
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

export default createComponent({
    components: {
        MaterialDesignIcon
    },
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
        // If the eye is open to show the obscured text anyway
        let isEyeOpen = reactive(false);

        let hasFocus = false;

        const keyboardType = computed(() => {
            if (props.type) return props.type;
            if (props.obscure && !isEyeOpen) return "password";

            return "text";
        });

        const rows = computed(() => (props.compact ? 2 : 8));

        const eye = computed(() => {
            return isEyeOpen ? mdiEye : mdiEyeOutline;
        });

        const hasDecorations = computed(
            () => props.showValidation || props.obscure
        );

        const classObject = computed(() => {
            return {
                "is-compact": props.compact,
                "is-white": props.white,
                "is-multiline": props.multiline,
                "has-focus": hasFocus,
                "has-label": props.label != null,
                "has-error": props.error != null && props.error != "",
                "has-prefix": props.prefix != null,
                "has-suffix": props.suffix != null
            };
        });

        function focus() {
            (context.refs.input as HTMLInputElement).focus();
        }

        function handleClickEye() {
            isEyeOpen = !isEyeOpen;
            focus();
        }

        function handleInput(event: Event) {
            const input = event.target as HTMLTextAreaElement;
            context.emit("input", input.value);
        }

        function handleClickClear() {
            context.emit("input", "");
        }

        async function handleClickCopy() {
            await writeToClipboard(props.value.toString());
        }

        function handleFocusIn() {
            hasFocus = true;
        }

        function handleFocusOut() {
            hasFocus = false;
        }

        return {
            isEyeOpen,
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
    position: absolute;
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

/* Has Suffix */
.text-input.has-suffix {
    & input,
    & textarea {
        border-right: 1px solid var(--color-jupiter);
    }
}

/* Is Multiline */
.text-input.is-multiline {
    & .decorations {
        align-items: flex-end;
        padding-block-end: 15px;
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
