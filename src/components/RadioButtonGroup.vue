<template>
    <div class="radio-button-group">
        <div v-for="option in validOptions" :key="option.value">
            <RadioButton
                v-model="selected"
                :name="name"
                :label="option.label"
                :value="option.value"
                :image="option.image"
                :checked="option.value"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import RadioButton from "../components/RadioButton.vue";

type Option = {
    label: string;
    value: string;
    image: string;
};

type Props = {
    name: string;
    options: Option[];
};

export default Vue.extend<{}, {}, {}, Props>({
    components: {
        RadioButton
    },
    props: {
        name: { required: true, type: String },
        options: {
            type: Array,
            required: true
        } as PropOptions<Option[]>
    },
    data() {
        return {
            selected: ""
        };
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
