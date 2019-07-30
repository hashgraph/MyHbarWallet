<template>
    <label class="radio-button" :class="{ 'is-selected': selected }">
        <img alt="" class="icon" :src="image" />
        <input
            type="radio"
            :name="name"
            :value="value"
            class="input"
            :checked="selected"
            @change="handleChange"
        />
        <span class="label">{{ label }}</span>
        <FontAwesomeIcon v-if="selected" class="check" :icon="faCheckCircle" />
    </label>
</template>

<script lang="ts">
import Vue from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default Vue.extend({
    components: {
        FontAwesomeIcon
    },
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
    computed: {
        faCheckCircle() {
            return faCheckCircle;
        },
        selected() {
            return this.checked === this.value;
        }
    },
    methods: {
        handleChange() {
            this.$emit("change", this.value);
        }
    }
});
</script>

<style lang="postcss" scoped>
.radio-button {
    align-items: center;
    background-color: var(--color-white);
    border: 1px solid var(--color-american-silver);
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    padding: 5px 20px;

    &:hover,
    &:focus,
    &.is-selected {
        border-color: var(--color-melbourne-cup);
    }

    &.is-selected {
        box-shadow: 0 8px 15px 0 var(--color-dying-light);
    }
}

.label {
    flex-grow: 1;
    font-size: 16px;
    font-weight: 500;
    user-select: none;
}

.is-selected .label {
    font-weight: 700;
}

.icon {
    height: 50px;
    user-select: none;
    width: 50px;
}

.check {
    color: var(--color-melbourne-cup);
}

.input {
    visibility: hidden;
}
</style>
