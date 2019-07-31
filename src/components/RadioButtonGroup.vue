<template>
    <div class="radio-button-group">
        <div v-for="option in validOptions" :key="option.value">
            <RadioButton
                :checked="selected"
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
    selected: string;
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
        selected: { required: true, type: String },
        name: { required: true, type: String },
        options: {
            type: Array,
            required: true
        } as PropOptions<Option[]>
    },
    computed: {
        validOptions: function() {
            return this.options.filter(function(
                option: Record<string, string>
            ) {
                return (
                    "image" in option && "label" in option && "value" in option
                );
            });
        }
    }
});
</script>

<style lang="postcss" scoped>
.radio-button-group {
    display: grid;
    grid-row-gap: 9px;
}
</style>
