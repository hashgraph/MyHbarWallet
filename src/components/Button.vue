<template>
    <button
        :class="{
            'is-busy': isBusy,
            outline: outlined,
            'invert-outline': invertedOutline
        }"
        v-on="this.$listeners"
    >
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
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default Vue.extend({
    components: {
        FontAwesomeIcon
    },
    props: {
        outline: { type: Boolean },
        // Note: invert has no effect unless outline is true
        invert: { type: Boolean },
        label: { type: String, required: true },
        trailingIcon: {
            type: Object as PropType<IconDefinition>,
            default: null
        },
        isBusy: { type: Boolean }
    },
    computed: {
        faSpinner() {
            return faSpinner;
        },
        invertedOutline(): boolean {
            return this.outline && this.invert;
        },
        outlined(): boolean {
            return this.outline && !this.invertedOutline;
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

.outline {
    background-color: white;
    color: var(--color-melbourne-cup);

    &:hover:not(.is-busy),
    &:focus:not(.is-busy) {
        background-color: var(--color-melbourne-cup);
        border-color: var(--color-melbourne-cup);
        color: white;
    }
}

.invert-outline {
    &:hover:not(.is-busy),
    &:focus:not(.is-busy) {
        background-color: white;
        border-color: var(--color-melbourne-cup);
        color: var(--color-melbourne-cup);
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
