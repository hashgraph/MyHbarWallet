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
import Vue, { PropOptions } from "vue";
import RadioButton from "../components/RadioButton.vue";

interface Option {
    label: string;
    value: string;
    image: string;
}

interface Props {
    selected: string | null;
    name: string;
    options: Option[];
}

export default Vue.extend<{}, {}, {}, Props>({
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
