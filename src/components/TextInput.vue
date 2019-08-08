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
import Vue from "vue";
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";
import { mdiEye, mdiEyeOutline, mdiCheckCircle } from "@mdi/js";

export default Vue.extend({
    components: {
        MaterialDesignIcon
    },
    model: {
        prop: "value",
        event: "input"
    },
    props: {
        placeholder: { type: String, default: "" },
        value: { type: String, default: "" },
        label: { type: String, default: null },
        tabindex: { type: String, default: null },
        step: { type: String, default: null },
        type: { type: String, default: null },

        action: { type: String, default: null },

        compact: Boolean,

        white: Boolean,

        // Whether to hide the text being edited (e.g., for passwords).
        obscure: Boolean,

        // Whether to validate the the input as an ID and add the check-mark to the bottom right
        valid: Boolean,

        // Whether to check if there is input
        input: Boolean,

        copy: Boolean
    },
    data() {
        return {
            // If the eye is open to show the obscured text anyway
            isEyeOpen: false,

            isValid: this.input ? this.value.length > 0 : false,

            text: this.value,

            // Set here instead of computed -- where constants would normally go
            // to prevent recreating object
            regex: new RegExp("\\d+\\.\\d+\\.\\d+")
        };
    },
    computed: {
        keyboardType() {
            if (this.type) return this.type;
            if (this.obscure && !this.valid && !this.isEyeOpen)
                return "password";
            return "text";
        },
        eye(): string {
            return this.isEyeOpen ? mdiEye : mdiEyeOutline;
        },
        classObject(): {} {
            return {
                "is-compact": this.compact,
                "is-white": this.white
            };
        }
    },
    watch: {
        text: function(value: string) {
            // If validateId option has been set and obscure option is not set then only emit
            // input change when the input value is an account id
            // If hasInput option has been set and obscure option is not set then only emit
            // input change when the input value is a number
            // Else always emite new value
            if (this.valid && !this.obscure) {
                this.isValid = this.regex.test(value);
                if (this.isValid) {
                    this.$emit("input", value);
                }
            } else if (this.input && !this.obscure) {
                this.isValid = value.length > 0;
                if (this.isValid) {
                    this.$emit("input", value);
                }
            } else {
                this.$emit("input", value);
            }
        }
    },
    methods: {
        focus() {
            (this.$refs.input as HTMLInputElement).focus();
        },
        handleClickEye() {
            this.isEyeOpen = !this.isEyeOpen;

            // Re-focus the input (loses focus from the tap on the eye)
            (this.$refs.input as HTMLInputElement).focus();
        },
        handleActionClick(event: Event) {
            this.$emit("action");
        }
    }
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
