<template>
    <div class="input-container">
        <label>
            <span v-if="label" class="label">{{ label }}</span>
            <textarea
                ref="input"
                :placeholder="placeholder"
                :tabindex="tabindex"
                :value="value"
                :rows="rows"
                :class="{ resize: resizeable }"
                @input="handleInput"
            />
        </label>
        <MaterialDesignIcon
            v-if="showValidation"
            class="validation"
            :class="{ valid }"
            :icon="checkmark"
            :size="18"
        />
        <div class="actions">
            <div v-if="canClear" class="action" @click="onClickClear">
                Clear
            </div>
            <div v-if="canCopy" class="action" @click="onClickCopy">
                Copy
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { writeToClipboard } from "../clipboard";
import { mdiCheckCircle } from "@mdi/js";
import MaterialDesignIcon from "./MaterialDesignIcon.vue";
import { createComponent, value, computed, PropType } from "vue-function-api";

interface Props {
    placeholder: string;
    value: string;
    label: string;
    tabindex: string;
    canCopy: boolean;
    canClear: boolean;
    compact: boolean;
    resizeable: boolean;
    showValidation: boolean;
    valid: boolean;
}

export default createComponent({
    components: {
        MaterialDesignIcon
    },
    // TODO: https://github.com/vuejs/vue-function-api/pull/16
    props: {
        placeholder: (String as unknown) as PropType<string>,
        value: (String as unknown) as PropType<string>,
        label: (String as unknown) as PropType<string>,
        tabindex: (String as unknown) as PropType<string>,
        canCopy: (Boolean as unknown) as PropType<boolean>,
        canClear: (Boolean as unknown) as PropType<boolean>,
        compact: (Boolean as unknown) as PropType<boolean>,
        resizeable: (Boolean as unknown) as PropType<boolean>,
        showValidation: (Boolean as unknown) as PropType<boolean>,
        valid: (Boolean as unknown) as PropType<boolean>
    },
    setup(props: Props, context) {
        const rows = computed(() => {
            return props.compact ? 2 : 8;
        });

        const checkmark = computed(() => {
            return mdiCheckCircle;
        });

        function handleInput(event: Event) {
            context.emit("input", (event.target as HTMLTextAreaElement).value);
        }

        function onClickClear() {
            context.emit("input", "");
        }

        async function onClickCopy() {
            await writeToClipboard(props.value);
        }

        return {
            rows,
            checkmark,
            handleInput,
            onClickClear,
            onClickCopy
        };
    }
});
</script>

<style scoped lang="postcss">
.input-container {
    border-radius: 4px;
    position: relative;
}

textarea {
    background-color: var(--color-peral);
    border: 2px solid var(--color-peral);
    border-radius: 4px;
    color: var(--color-washed-black);
    font-size: 14px;
    max-width: 100%;
    min-width: 100%;
    outline: none;
    padding: 20px;
    resize: none;

    &:focus {
        border-color: var(--color-melbourne-cup);
    }

    &.resize {
        min-height: 200px;
        resize: vertical;
    }

    &::placeholder {
        color: black;
        opacity: 0.2;
    }
}

.label {
    display: block;
    font-size: 16px;
    font-weight: 600;
    margin-block-end: 10px;
    padding: 0 8px;
}

.actions {
    display: flex;
    inset-block-start: 0;
    inset-inline-end: 8px;
    position: absolute;
}

.action {
    color: var(--color-basalt-grey);
    margin-inline-start: 20px;

    &:hover,
    &:focus {
        cursor: pointer;
    }
}

.validation {
    color: var(--color-jupiter);
    inset-block-end: 13px;
    inset-inline-end: 16px;
    position: absolute;

    &.valid {
        color: var(--color-melbourne-cup);
    }
}
</style>
