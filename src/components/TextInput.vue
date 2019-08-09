<template>
    <div class="text-input" :class="classObject">
        <label>
            <span v-if="label" class="label">{{ label }}</span>
            <input
                ref="input"
                v-model="text"
                :class="classObject"
                :placeholder="placeholder"
                :type="keyboardType"
                :tabindex="tabindex"
                :step="step"
            />
        </label>

        <MaterialDesignIcon
            v-if="obscure && !valid"
            class="eye"
            :class="{ 'is-open': isEyeOpen }"
            :icon="eye"
            @click="handleClickEye"
        />

        <MaterialDesignIcon
            v-if="(valid || input) && !obscure"
            class="checkmark"
            :class="{ 'is-valid': isValid }"
            :icon="checkmark"
        />

        <div class="action" @click="$emit('action')">
            {{ action }}
        </div>
    </div>
</template>

<script lang="ts">
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";
import { mdiEye, mdiEyeOutline, mdiCheckCircle } from "@mdi/js";
import {
    createComponent,
    value as vueValue,
    computed,
    watch,
    onCreated,
    PropType,
    onBeforeDestroy,
    Wrapper
} from "vue-function-api";

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
    valid: boolean;
    input: boolean;
}

export default createComponent({
    components: {
        MaterialDesignIcon
    },
    model: {
        prop: "value",
        event: "input"
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
        white: (Boolean as unknown) as PropType<boolean>,

        // Whether to hide the text being edited (e.g., for passwords).
        obscure: (Boolean as unknown) as PropType<boolean>,

        // Whether to validate the the input as an ID and add the check-mark to the bottom right
        valid: (Boolean as unknown) as PropType<boolean>,

        // Whether to check if there is input
        input: (Boolean as unknown) as PropType<boolean>
    },
    setup(
        {
            placeholder,
            value,
            label,
            tabindex,
            step,
            type,
            action,
            compact,
            white,
            obscure,
            valid,
            input
            }: Props,
        context
    ) {
        // If the eye is open to show the obscured text anyway
        let isEyeOpen = vueValue(false);
        let isValid = vueValue(input ? value.length > 0 : false);
        const text = vueValue(value);
        const regex = new RegExp("\\d+\\.\\d+\\.\\d+");

        const keyboardType = computed(() => {
            if (type) return type;
            if (obscure && !valid && !isEyeOpen) return "password";
            return "text";
        });

        const eye = computed(() => {
            return isEyeOpen ? mdiEye : mdiEyeOutline;
        });

        const checkmark = computed(() => {
            return mdiCheckCircle;
        });

        const classObject = computed(() => {
            return {
                "is-compact": compact,
                "is-white": white
            };
        });

        function focus() {
            (context.refs.input as HTMLInputElement).focus();
        }

        function handleClickEye() {
            isEyeOpen = !isEyeOpen;

            // Re-focus the input (loses focus from the tap on the eye)
            (context.refs.input as HTMLInputElement).focus();
        }

        function handleActionClick(event: Event) {
            context.emit("action");
        }

        watch(
            new Wrapper<string>(value),
            (newValue: string, oldValue: string) => {
                // If validateId option has been set and obscure option is not set then only emit
                // input change when the input newValue is an account id
                // If hasInput option has been set and obscure option is not set then only emit
                // input change when the input newValue is a number
                // Else always emite new newValue
                if (valid && !obscure) {
                    isValid = regex.test(newValue);
                    if (isValid) {
                        context.emit("input", newValue);
                    }
                } else if (input && !obscure) {
                    isValid = newValue.length > 0;
                    if (isValid) {
                        context.emit("input", newValue);
                    }
                } else {
                    context.emit("input", newValue);
                }
            }
        );

        return {
            isEyeOpen,
            isValid,
            text,
            regex,
            keyboardType,
            eye,
            checkmark,
            classObject
        };
    },
    methods: {}
});
</script>

<style scoped lang="postcss">
.text-input {
    border-radius: 4px;
    position: relative;
}

.action {
    color: var(--color-melbourne-cup);
    cursor: pointer;
    font-size: 14px;
    inset-block-end: 0;
    inset-block-start: 0;
    inset-inline-end: 20px;
    position: absolute;
}

input {
    background-color: var(--color-peral);
    border: 2px solid var(--color-peral);
    border-radius: 4px;
    color: var(--color-washed-black);
    font-size: 14px;
    outline: none;
    padding: 20px;
    width: 100%;

    &:focus {
        border-color: var(--color-melbourne-cup);
    }

    &:not(:only-child) {
        padding-inline-end: 50px;
    }

    &.is-compact {
        border-width: 1px;
        padding: 13px 15px;
    }
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
    margin-block-end: 13px;
    padding: 0 8px;
}

.eye {
    cursor: pointer;
    inset-block-end: 13px;
    inset-inline-end: 20px;
    margin: auto;
    opacity: 0.3;
    position: absolute;

    &.is-open {
        color: var(--color-melbourne-cup);
        opacity: 1;
    }
}

.checkmark {
    color: var(--color-jupiter);
    inset-block-end: 13px;
    inset-inline-end: 20px;
    position: absolute;

    &.is-valid {
        color: var(--color-melbourne-cup);
    }
}
</style>
