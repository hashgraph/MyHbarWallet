<template>
    <div class="list-container">
        <label
            v-for="index in words"
            :key="index"
            class="list-item"
            :class="{ 'is-focused': focused === index }"
        >
            <span class="number">{{ index }}.</span>

            <input
                class="word"
                :value="value.length < index ? '' : value[index - 1]"
                :readonly="!editable"
                :data-index="index"
                :tabindex="editable ? null : -1"
                @input="handleInput"
                @focus="handleFocus"
            />
        </label>
    </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";

export default Vue.extend({
    props: {
        editable: { type: Boolean },
        words: { type: Number, required: true },
        value: { type: Array, required: true } as PropOptions<string[]>
    },
    data() {
        return {
            focused: null as (number | null)
        };
    },
    methods: {
        handleInput(event: Event) {
            const target = event.target as HTMLInputElement;
            const index = Number.parseInt(target.dataset.index || "0", 10);

            const newValues = this.value.slice();
            newValues[index - 1] = target.value;

            this.$emit("input", newValues);
        },

        handleFocus(event: Event) {
            if (!this.editable) {
                // Non-editable controls should not set focus
                return;
            }

            const target = event.target as HTMLInputElement;
            this.focused = Number.parseInt(target.dataset.index || "0", 10);
        }
    }
});
</script>

<style scoped lang="postcss">
.list-container {
    align-items: center;
    display: grid;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    grid-template-columns: 1fr 1fr 1fr;

    @media (max-width: 414px) {
        grid-template-columns: 1fr 1fr;
    }
}

.list-item {
    align-items: center;
    border-bottom: 1px solid var(--color-jupiter);
    color: var(--color-basalt-grey);
    display: flex;
    font-size: 14px;
    padding: 10px 0;

    &.is-focused {
        border-color: var(--color-melbourne-cup);
    }
}

.number {
    flex-shrink: 0;
    font-size: 14px;
}

.list-item.is-focused .number {
    color: var(--color-melbourne-cup);
}

.word {
    border: none;
    color: var(--color-ghostlands-coal);
    margin-inline-start: 10px;
    outline: none;
    padding: 0;
    width: 100%;

    &:read-only {
        cursor: default;
    }
}
</style>
