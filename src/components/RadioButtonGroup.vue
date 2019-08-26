<template>
    <div class="radio-button-group">
        <div v-for="option in options" :key="option.value">
            <RadioButton
                :checked="selected || ''"
                :name="name"
                :label="option.label"
                :value="option.value"
                :image="option.image"
                @change="$emit('change', option.value)"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";
import { PropOptions } from "vue";
import RadioButton from "../components/RadioButton.vue";

interface Option {
    label: string;
    value: string;
    image: string;
}

export default createComponent({
    components: {
        RadioButton
    },
    model: {
        prop: "selected",
        event: "change"
    },
    props: {
        selected: { type: String, default: null },
        name: { required: true, type: String },
        options: {
            type: Array,
            required: true
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
