<template>
    <div class="input-container" :class="classObject">
        <label>
            <span v-if="label" class="label">{{ label }}</span>
            <input
                ref="input"
                v-model="text"
                :placeholder="placeholder"
                :type="keyboardType"
                :tabindex="tabindex"
                :step="step"
            />
        </label>
        <MaterialDesignIcon
            v-if="obscure && !validate"
            class="eye"
            :class="{ 'is-open': isEyeOpen }"
            :icon="eye"
            @click="handleClickEye"
        />
        <MaterialDesignIcon
            v-if="validate && !obscure"
            class="checkmark"
            :class="{ 'is-valid': valid }"
            :icon="checkmark"
        />
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

        compact: Boolean,

        white: Boolean,

        // Whether to hide the text being edited (e.g., for passwords).
        obscure: Boolean,

        // Whether to validate the the input as an ID and add the check-mark to the bottom right
        validate: Boolean
    },
    data() {
        return {
            // If the eye is open to show the obscured text anyway
            isEyeOpen: false,

            valid: false,

            text: this.value,

            // Set here instead of computed -- where constants would normally go
            // to prevent recreating object
            regex: new RegExp("\\d+\\.\\d+\\.\\d+")
        };
    },
    computed: {
        keyboardType() {
            if (this.type) return this.type;
            if (this.obscure && !this.validate && !this.isEyeOpen)
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
        text: function(value: String) {
            // If validation is on and obscure is off then only emit
            // input change when the input value is valid
            // Else always emite new value
            if (this.validate && !this.obscure) {
                this.valid = this.regex.test(value);
                if (this.valid) {
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
        }
    }
});
</script>

<style scoped lang="postcss">
.input-container {
    border-radius: 4px;
    position: relative;
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
}

.is-compact input {
    border-width: 1px;
    padding: 13px 15px;
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
    inset-block: 0;
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
    height: 14px;
    inset-block-end: 13px;
    inset-inline-end: 13px;
    opacity: 1;
    position: absolute;
    width: 14px;

    &.is-valid {
        color: var(--color-melbourne-cup);
        opacity: 1;
    }
}
</style>
