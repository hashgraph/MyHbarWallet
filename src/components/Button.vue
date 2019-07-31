<template>
    <button
        :class="{
            busy,
            outline,
            compact
        }"
        v-on="this.$listeners"
    >
        <FontAwesomeIcon v-if="busy" class="spinner" :icon="faSpinner" spin />
        <span v-else>{{ label }}</span>

        <FontAwesomeIcon
            v-if="trailingIcon"
            class="icon"
            :icon="trailingIcon"
        />
    </button>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default Vue.extend({
    components: {
        FontAwesomeIcon
    },
    props: {
        outline: { type: Boolean },
        compact: { type: Boolean },
        label: { type: String, required: true },
        busy: { type: Boolean },
        trailingIcon: {
            type: Object as PropType<IconDefinition>,
            default: null
        }
    },
    computed: {
        faSpinner() {
            return faSpinner;
        }
    }
});
</script>

<style scoped lang="postcss">
button {
    background: var(--color-melbourne-cup);
    border: 1px solid var(--color-melbourne-cup);
    border-radius: 4px;
    color: var(--color-white);
    font-size: 14px;
    font-weight: 500;
    min-width: 250px;
    outline: none;
    padding: 15px;
    position: relative;
    user-select: none;

    &:not(.busy) {
        cursor: pointer;
    }

    &:hover:not(.busy),
    &:focus:not(.busy) {
        background-color: var(--color-celestial-green);
        border-color: var(--color-celestial-green);
    }

    &:active:not(.busy) {
        background-color: var(--color-green-jelly);
        border-color: var(--color-green-jelly);
    }
}

.outline {
    background-color: transparent;
    color: var(--color-melbourne-cup);

    &:hover:not(.busy),
    &:focus:not(.busy) {
        background-color: transparent;
        color: var(--color-celestial-green);
    }

    &:active:not(.busy) {
        background-color: var(--color-distant-horizon);
        border-color: var(--color-green-fluorite);
        color: var(--color-green-fluorite);
    }
}

.compact {
    min-width: initial;
    padding: 10px 20px;
}

.spinner {
    padding: 1px 0;
}

.icon {
    inset-block: 0;
    inset-inline-end: 15px;
    margin: auto 0;
    position: absolute;
}
</style>
