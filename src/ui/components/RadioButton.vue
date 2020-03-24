<template>
    <label
        class="radio-button"
        :for="value"
        :class="{ selected }"
    >
        <img
            alt=""
            class="icon"
            :src="image"
        >
        <input
            :id="value"
            type="radio"
            :name="name"
            :value="value"
            class="input"
            :checked="selected"
            @change="$emit('change', value)"
        >
        <span class="label">{{ label }}</span>
        <MaterialDesignIcon
            v-if="selected"
            class="check"
            :icon="mdiCheckCircle"
        />
    </label>
</template>

<script lang="ts">
import { mdiCheckCircle } from "@mdi/js";
import { computed, defineComponent } from "@vue/composition-api";

import MaterialDesignIcon from "./MaterialDesignIcon.vue";

export default defineComponent({
    components: { MaterialDesignIcon },
    model: {
        prop: "checked",
        event: "change"
    },
    props: {
        image: { type: String, required: true },
        name: { type: String, required: true },
        label: { type: String, required: true },
        value: { type: String, required: true },
        checked: { type: String, required: true }
    },
    setup(props) {
        const selected = computed(() => props.checked === props.value);

        return { mdiCheckCircle, selected };
    }
});
</script>

<style lang="postcss" scoped>
.radio-button {
    align-items: center;
    background-color: var(--color-white);
    border: 1px solid var(--color-silver-polish);
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    padding: 5px 20px;
    position: relative;

    &:hover,
    &:focus,
    &.selected {
        border-color: var(--color-melbourne-cup);
    }

    &.selected {
        box-shadow: 0 8px 15px 0 var(--color-jupiter);
    }
}

.label {
    flex-grow: 1;
    font-size: 16px;
    font-weight: 500;
    user-select: none;
}

.selected .label {
    font-weight: 700;
}

.icon {
    height: 50px;
    margin-inline-end: 8px;
    user-select: none;
    width: 50px;
}

.check {
    color: var(--color-melbourne-cup);
    height: 19px;
    width: 19px;
}

.input {
    opacity: 0;
    position: absolute;
}
</style>
