<template>
    <button v-on="this.$listeners" :class="{ 'is-busy': isBusy }">
        <FontAwesomeIcon v-if="isBusy" class="spinner" :icon="faSpinner" spin />
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
import { faSpinner, IconDefinition } from "@fortawesome/free-solid-svg-icons";

export default Vue.extend({
    props: {
        label: { type: String, required: true },
        trailingIcon: Object as PropType<IconDefinition>,
        isBusy: { type: Boolean, default: false }
    },
    components: {
        FontAwesomeIcon
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

    &:not(.is-busy) {
        cursor: pointer;
    }

    &:hover:not(.is-busy),
    &:focus:not(.is-busy) {
        background-color: var(--color-celestial-green);
        border-color: var(--color-celestial-green);
    }

    &:active:not(.is-busy) {
        background-color: var(--color-green-jelly);
        border-color: var(--color-green-jelly);
    }
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
