<template>
  <label
    :class="{ selected }"
    :for="value"
    class="radio-button"
  >
    <img
      :src="image"
      alt=""
      class="icon"
    >
    <input
      :id="value"
      :checked="selected"
      :name="name"
      :value="value"
      class="input"
      type="radio"
      @change="$emit('change', value)"
    >
    <span class="label">{{ label }}</span>
    <MaterialDesignIcon
      v-if="selected"
      :icon="mdiCheckCircle"
      class="check"
    />
  </label>
</template>

<script lang="ts">
import { mdiCheckCircle } from "@mdi/js";
import { computed, createComponent } from "@vue/composition-api";

import MaterialDesignIcon from "../components/MaterialDesignIcon.vue";

export default createComponent({
    name: "RadioButton",
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
