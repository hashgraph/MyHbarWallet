<template>
    <div class="input-container" :class="classObject">
        <label>
            <span v-if="label" class="label">{{ label }}</span>
            <textarea
                ref="input"
                :placeholder="placeholder"
                :tabindex="tabindex"
                :value="value"
                @input="handleInput"
            ></textarea>
        </label>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        placeholder: { type: String, default: "" },
        value: { type: String, default: "" },
        label: { type: String, default: null },
        tabindex: { type: String, default: null }
    },
    methods: {
        focus() {
            (this.$refs.input as HTMLTextAreaElement).focus();
        },
        handleInput(event: Event) {
            this.$emit("input", (event.target as HTMLTextAreaElement).value);
        }
    }
});
</script>

<style scoped lang="postcss">
.input-container {
    border-radius: 4px;
    position: relative;
}

textarea {
    background-color: var(--color-peral);
    border: 2px solid var(--color-peral);
    border-radius: 4px;
    color: var(--color-washed-black);
    font-size: 14px;
    min-height: 200px;
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

.label {
    display: block;
    font-size: 16px;
    font-weight: 600;
    margin-block-end: 13px;
    padding: 0 8px;
}
</style>
