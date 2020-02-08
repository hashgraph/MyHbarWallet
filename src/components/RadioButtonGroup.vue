<template>
  <div class="radio-button-group">
    <div
      v-for="option in options"
      :key="option.value"
    >
      <RadioButton
        :checked="selected || ''"
        :image="option.image"
        :label="option.label"
        :name="name"
        :value="option.value"
        @change="$emit('change', option.value)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, PropOptions } from "@vue/composition-api";

import RadioButton from "./RadioButton.vue";

interface Option {
    label: string;
    value: string;
    image: string;
}

export default createComponent({
    name: "RadioButtonGroup",
    components: { RadioButton },
    model: {
        prop: "selected",
        event: "change"
    },
    props: {
        selected: String,
        name: { type: String, required: true },
        options: {
            type: Array,
            required: true as boolean
        } as PropOptions<Option[]>
    }
});
</script>

<style lang="postcss" scoped>
    .radio-button-group {
        display: grid;
        grid-row-gap: 9px;
    }
</style>
