<template>
    <div class="modal-fee-summary">
        <Modal :is-open="isOpen" title="Transaction Summary" not-closable>
            <div class="summary-title">{{ title }}</div>

            <div class="separator" />

            <div class="summary">
                <template v-for="item in items">
                    <div :key="item.key" class="item">
                        <span class="item-description">
                            {{ item.description }}:
                        </span>
                        <span class="item-value">
                            {{ formatValue(item.value) }}
                        </span>
                    </div>
                </template>
                <div class="item">
                    <span class="item-description">Total:</span>
                    <span class="item-value">{{ formatValue(total) }}</span>
                </div>
            </div>

            <div class="buttons">
                <Button
                    compact
                    outline
                    label="Cancel"
                    class="button"
                    type="button"
                    @click="handleCancel"
                />
                <Button
                    compact
                    label="Continue"
                    class="button"
                    type="submit"
                    @submit="handleSubmit"
                    @click="handleSubmit"
                />
            </div>
        </Modal>
    </div>
</template>

<script lang="ts">
import { computed, createComponent, SetupContext } from "@vue/composition-api";
import Modal from "../components/Modal.vue";
import BigNumber from "bignumber.js";
import Button from "../components/Button.vue";
import { formatHbar } from "../formatter";

export interface Item {
    description: string;
    value: BigNumber | string;
}

export interface KeyedItem extends Item {
    key: string;
}

let KEY = 0;
function nextItemKey(): number {
    return (KEY += 1);
}

export default createComponent({
    components: {
        Modal,
        Button
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: Boolean,
        items: Array,
        title: String
    },
    setup(
        props: { isOpen: boolean; items: KeyedItem[]; title: string },
        context: SetupContext
    ): object {
        // Compute the total
        const total = computed(() => {
            let total = new BigNumber(0);

            // Only add to total if value is a BigNumber
            // Assign key to each item
            if (props.items != null) {
                for (const item of props.items) {
                    item.key = "Item" + nextItemKey();
                    if (item.value instanceof BigNumber) {
                        total = total.plus(item.value);
                    }
                }
            }

            return total;
        });

        function formatValue(value: BigNumber | string): string {
            if (value instanceof BigNumber) {
                return formatHbar(value) + " ℏ";
            } else {
                return value;
            }
        }

        function handleCancel(): void {
            context.emit("change", false);
        }

        function handleSubmit(): void {
            context.emit("change", false);
            context.emit("submit");
        }

        return {
            total,
            formatValue,
            handleCancel,
            handleSubmit
        };
    }
});
</script>

<style lang="postcss" scoped>
.summary-title {
    color: var(--color-washed-black);
    font-size: 18px;
    text-overflow: ellipsis;
}

.summary {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
}

.item {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    &:not(:last-child) {
        margin-block-end: 2px;
    }
}

.item-description {
    color: var(--color-washed-black);
    font-weight: 500;
}

.item-value {
    color: var(--color-china-blue);
    font-family: monospace;
    font-size: 16px;
}

.buttons {
    display: flex;
    justify-content: space-between;
    margin-block-start: 40px;
    width: 100%;

    @media (max-width: 425px) {
        align-items: center;
        flex-direction: column-reverse;
    }
}

.button {
    width: 200px;

    @media (max-width: 425px) {
        width: 100%;

        &:last-child {
            margin-block-end: 15px;
        }
    }
}

.separator {
    border-bottom: 1px solid var(--color-jupiter);
    height: 1px;
    margin-block: 17.5px;
    width: 100%;
}
</style>
