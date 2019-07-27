<template>
    <div class="input-container">
        <input :placeholder="placeholder" :type="keyboardType" />
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

export default Vue.extend({
    props: {
        placeholder: String,

        // Whether to hide the text being edited (e.g., for passwords).
        obscure: Boolean
    },
    computed: {
        keyboardType() {
            if (this.obscure) return "password";
            return "text";
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

    &:focus {
        border-color: var(--color-melbourne-cup);
    }
}
</style>
