<template>
    <button
        type="button"
        :disabled="disabled"
        v-on="disabled ? null : $listeners"
    >
        <MaterialDesignIcon :icon="icon" />
    </button>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";
import MaterialDesignIcon from "../components/MaterialDesignIcon.vue";

export default createComponent({
    components: { MaterialDesignIcon },
    props: {
        disabled: { type: Boolean },
        icon: { type: String }
    },
    setup(props) {
        return { props };
    }
});
</script>

<style scoped lang="postcss">
button {
    border: 2px solid transparent;
    cursor: pointer;
    margin: 0 0 0 4px;
    outline: none;
    text-align: center;

    &:disabled {
        background-color: var(--color-basalt-grey);
        border-color: var(--color-basalt-grey);
        cursor: default;
    }

    &:hover:not(:disabled),
    &:focus:not(:disabled) {
        border: 2px solid var(--color-melbourne-cup);
        border-radius: 4px;
    }

    &:active:not(:disabled) {
        transform: scale(0.85);
    }
}
</style>
