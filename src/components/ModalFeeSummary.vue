<template>
    <div class="modal-fee-summary">
        <Modal :is-open="isOpen" title="Transaction Summary" not-closable>
            <div class="summary-title">
                {{ title }}
            </div>

            <div class="separator" />

            <div class="summary">
                <template v-for="item in items">
                    <div :key="item.key" class="item">
                        <span class="item-description">
                            {{ item.description }}:
                        </span>
                        <span
                            v-if="item.value instanceof BigNumber"
                            :key="item.key"
                            class="item-value"
                            >{{
                                formatter.format(item.value).split("$")[1]
                            }}
                            ℏ</span
                        >
                        <span v-else class="item-value">
                            {{ item.value }}
                        </span>
                    </div>
                </template>
                <div class="item">
                    <span class="item-description">Total:</span>
                    <span class="item-value">
                        {{ formatter.format(total).split("$")[1] }} ℏ
                    </span>
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
import {
    computed,
    createComponent,
    SetupContext,
    ref
} from "@vue/composition-api";
import Modal from "../components/Modal.vue";
import BigNumber from "bignumber.js";
import Button from "../components/Button.vue";
import { USDCurrencyFormatter } from "../formatter";

export interface Item {
    description: string;
    value: BigNumber | string;
}

export interface KeyedItem extends Item {
    key: string;
}

let KEY = 0;
function nextItemKey() {
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

        function handleCancel() {
            context.emit("change", false);
        }

        function handleSubmit() {
            context.emit("change", false);
            context.emit("submit");
        }

        const formatter = ref(USDCurrencyFormatter);

        return {
            total,
            formatter,
            BigNumber,
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
}

.item-description {
    color: var(--color-washed-black);
    font-weight: 500;
}

.item-value {
    color: var(--color-china-blue);
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
    background-color: var(--color-basalt-grey);
    height: 1px;
    margin-block: 17.5px;
    width: 100%;
}
</style>
