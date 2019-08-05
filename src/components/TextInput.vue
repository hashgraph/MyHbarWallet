<template>
    <div class="input-container" :class="classObject">
        <label>
            <span v-if="label" class="label">{{ label }}</span>
            <input
                ref="input"
                :placeholder="placeholder"
                :type="keyboardType"
                :value="value"
                @input="handleInput"
            />
        </label>
        <MaterialDesignIcon
            v-if="obscure"
            class="eye"
            :class="{ 'is-open': isEyeOpen }"
            :icon="eye"
            @click="handleClickEye"
        />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";
import { mdiEye } from "@mdi/js";

export default Vue.extend({
    components: {
        MaterialDesignIcon
    },
    props: {
        placeholder: { type: String, default: "" },
        value: { type: String, default: "" },
        label: { type: String, default: null },

        compact: Boolean,

        // Whether to hide the text being edited (e.g., for passwords).
        obscure: Boolean
    },
    data() {
        return {
            // If the eye is open to show the obscured text anyway
            isEyeOpen: false
        };
    },
    computed: {
        keyboardType() {
            if (this.obscure && !this.isEyeOpen) return "password";
            return "text";
        },
        eye() {
            return mdiEye;
        },
        classObject() {
            return {
                "is-compact": this.compact
            };
        }
    },
    methods: {
        handleInput(event: Event) {
            this.$emit("input", (event.target as HTMLInputElement).value);
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
</style>
