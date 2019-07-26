<template>
    <button @click="handleClick" :class="{ 'is-busy': isBusy }">
        <FontAwesomeIcon v-if="isBusy" :icon="faSpinner" spin />
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
    },
    methods: {
        handleClick() {
            this.$emit("click");
        }
    }
});
</script>

<style scoped lang="postcss">
button {
    position: relative;
    background: var(--color-melbourne-cup);
    color: #fff;
    padding: 15px;
    border-radius: 4px;
    border: 1px solid var(--color-melbourne-cup);
    outline: none;
    font-size: 14px;
    font-weight: 500;
    user-select: none;
    min-width: 250px;

    &:not(.is-busy) {
        cursor: pointer;
    }

    &:hover:not(.is-busy) {
        background-color: var(--color-celestial-green);
        border-color: var(--color-celestial-green);
    }

    &:active:not(.is-busy) {
        background-color: var(--color-green-jelly);
        border-color: var(--color-green-jelly);
    }
}

.icon {
    position: absolute;
    right: 15px;
    top: 0;
    bottom: 0;
    margin: auto 0;
}
</style>
