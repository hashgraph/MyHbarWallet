<template>
    <div class="text-input" :class="classObject">
        <label>
            <div v-if="label" class="label">{{ label }}</div>
            <textarea
                v-if="multiline"
                class="text-area"
                :placeholder="placeholder"
                :tabindex="tabindex"
                :value="value"
                :rows="rows"
                :class="{ resize: resizable }"
                @input="handleInput"
            />
            <input
                v-else
                ref="input"
                :value="value"
                :class="classObject"
                :placeholder="placeholder"
                :type="keyboardType"
                :tabindex="tabindex"
                :step="step"
                @input="handleInput"
            />
        </label>

        <div class="decorations">
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
                :icon="checkmark"
            />
        </div>

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

        <div v-if="error != null && error !== true" class="error">
            {{ error }}
        </div>
    </div>
</template>

<script lang="ts">
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";
import { mdiEye, mdiEyeOutline, mdiCheckCircle } from "@mdi/js";
import {
    createComponent,
    value,
    computed,
    PropType,
    Wrapper
} from "vue-function-api";
import { writeToClipboard } from "@/clipboard";

interface Props {
    placeholder: string;
    value: string;
    label: string;
    tabindex: string;
    step: string;
    type: string;
    action: string;
    compact: boolean;
    white: boolean;
    obscure: boolean;
    canClear: boolean;
    canCopy: boolean;
    showValidation: boolean;
    valid: boolean;
    error: string;
    multiline: boolean;
    resizable: boolean;
}

export interface Component {
    isEyeOpen: Wrapper<boolean>;
    keyboardType: Wrapper<string>;
    eye: Wrapper<string>;
    checkmark: Wrapper<string>;
    classObject: Wrapper<{ [key: string]: boolean }>;
    focus: () => void;
    rows: Wrapper<number>;
    handleClickEye: () => void;
    handleInput: (event: Event) => void;
    handleClickCopy: () => void;
    handleClickClear: () => void;
}

export default createComponent({
    components: {
        MaterialDesignIcon
    },
    props: {
        placeholder: (String as unknown) as PropType<string>,
        value: (String as unknown) as PropType<string>,
        label: (String as unknown) as PropType<string>,
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

        // Whether to hide the text being edited (e.g., for passwords).
        obscure: (Boolean as unknown) as PropType<boolean>,

        // Whether to validate the the input as an ID and add the check-mark to the bottom right
        showValidation: (Boolean as unknown) as PropType<boolean>,
        valid: (Boolean as unknown) as PropType<boolean>,

        // Error text to show when _not_ valid and validation should be shown
        // WARNING: this only works properly with a single line of text,
        error: (String as unknown) as PropType<string>
    },
    setup(props: Props, context): Component {
        // If the eye is open to show the obscured text anyway
        const isEyeOpen = value(false);

        const keyboardType = computed(() => {
            if (props.type) return props.type;
            if (props.obscure && !props.showValidation && !isEyeOpen.value)
                return "password";
            return "text";
        });

        const rows = computed(() => (props.compact ? 2 : 8));

        const eye = computed(() => {
            return isEyeOpen.value ? mdiEye : mdiEyeOutline;
        });

        const checkmark = computed(() => {
            return mdiCheckCircle;
        });

        const classObject = computed(() => {
            return {
                "is-compact": props.compact,
                "is-white": props.white,
                "is-multiline": props.multiline,
                "has-label": props.label != null,
                "has-error": props.error != null
            };
        });

        function focus() {
            (context.refs.input as HTMLInputElement).focus();
        }

        function handleClickEye() {
            isEyeOpen.value = !isEyeOpen.value;

            // Re-focus the input (loses focus from the tap on the eye)
            (context.refs.input as HTMLInputElement).focus();
        }

        function handleInput(event: Event) {
            context.emit("input", (event.target as HTMLTextAreaElement).value);
        }

        function handleClickClear() {
            context.emit("input", "");
        }

        async function handleClickCopy() {
            await writeToClipboard(props.value);
        }

        return {
            isEyeOpen,
            keyboardType,
            eye,
            checkmark,
            classObject,
            focus,
            rows,
            handleClickEye,
            handleInput,
            handleClickCopy,
            handleClickClear
        };
    }
});
</script>

<style scoped lang="postcss">
.text-input {
    border-radius: 4px;
    position: relative;
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

label {
    display: flex;
    flex-direction: column;
}

input,
textarea {
    background-color: var(--color-peral);
    border: 2px solid var(--color-peral);
    border-radius: 4px;
    color: var(--color-washed-black);
    font-size: 14px;
    outline: none;
    padding: 20px;
    width: 100%;
}

input {
    &:not(:only-child) {
        padding-inline-end: 50px;
    }

    &.is-compact {
        border-width: 1px;
        padding: 13px 15px;
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

input:focus,
textarea:focus {
    border-color: var(--color-melbourne-cup);
}

input::placeholder,
textarea::placeholder {
    color: var(--color-basalt-grey);
}

.has-error input,
.has-error textarea {
    border-color: var(--color-lightish-red);
}

.is-white input {
    background-color: var(--color-white);

    &:not(:focus) {
        border-color: var(--color-white);
    }
}

.label {
    display: block;
    font-size: 16px;
    font-weight: 600;
    height: 24px;
    margin-block-end: 13px;
    padding: 0 8px;
}

.decorations {
    align-items: center;
    display: flex;
    height: 100%;
    inset-block-start: 0;
    inset-inline-end: 15px;
    position: absolute;
}

.has-error .decorations {
    padding-block-end: 28px;
}

.has-label .decorations {
    height: calc(100% - 37px);
    inset-block-start: 37px;
}

.is-multiline:not(.has-error) .decorations {
    align-items: flex-end;
    padding-block-end: 15px;
}

.is-multiline.has-error .decorations {
    align-items: flex-end;
    padding-block-end: 43px;
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

.error {
    color: var(--color-lightish-red);
    font-size: 14px;
    margin: 7px 0 0 15px;
}
</style>
