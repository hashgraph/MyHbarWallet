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
    components: {
        MaterialDesignIcon
    },
    props: {
        disabled: { type: Boolean },
        icon: { type: String }
    },
    setup(props, _) {
        return {
            props
        };
    }
});
</script>

<style scoped lang="postcss">
button {
    border: none;

    &:disabled {
        background-color: var(--color-basalt-grey);
        border-color: var(--color-basalt-grey);
        cursor: default;
    }

    &:active:not(:disabled) {
        transform: scale(0.9);
    }
}
</style>
