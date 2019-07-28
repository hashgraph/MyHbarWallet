<template>
    <div class="input-container">
        <input
            ref="input"
            :placeholder="placeholder"
            :type="keyboardType"
            :value="value"
            @input="handleInput"
        />
        <FontAwesomeIcon
            v-if="obscure"
            class="eye"
            :class="{ 'is-open': isEyeOpen }"
            :icon="faEye"
            @click="handleClickEye"
        />
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye, IconDefinition } from "@fortawesome/free-solid-svg-icons";

export default Vue.extend({
    components: {
        FontAwesomeIcon
    },
    props: {
        placeholder: { type: String, required: true },
        value: { type: String, default: "" },

        // Whether to hide the text being edited (e.g., for passwords).
        obscure: Boolean
    },
    data() {
        return {
            faEye,

            // If the eye is open to show the obscured text anyway
            isEyeOpen: false
        };
    },
    computed: {
        keyboardType() {
            if (this.obscure && !this.isEyeOpen) return "password";
            return "text";
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
