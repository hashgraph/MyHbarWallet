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
            @click="handleClickEye"
            v-if="obscure"
            class="eye"
            :class="{ 'is-open': isEyeOpen }"
            :icon="faEye"
        />
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye, IconDefinition } from "@fortawesome/free-solid-svg-icons";

export default Vue.extend({
    props: {
        placeholder: String,
        value: String,

        // Whether to hide the text being edited (e.g., for passwords).
        obscure: Boolean
    },
    components: {
        FontAwesomeIcon
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
    position: relative;
    border-radius: 4px;
}

input {
    background-color: var(--color-peral);
    font-size: 14px;
    border-radius: 4px;
    padding: 20px;
    outline: none;
    border: 2px solid var(--color-peral);
    color: var(--color-washed-black);
    width: 100%;

    &:focus {
        border-color: var(--color-melbourne-cup);
    }

    &:not(:only-child) {
        padding-right: 50px;
    }
}

.eye {
    opacity: 0.3;
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 0;
    bottom: 0;
    margin: auto;

    &.is-open {
        opacity: 1;
        color: var(--color-melbourne-cup);
    }
}
</style>
