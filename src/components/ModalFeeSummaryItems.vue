<template>
    <div class="modal-fee-summary-items">
        <template v-for="item in props.items">
            <ModalFeeSummaryItem
                :key="item.key"
                :description="item.description"
                :value="item.value"
            />
        </template>
        <ModalFeeSummaryItem class="total" description="Total" :value="total" />
    </div>
</template>

<script lang="ts">
import { createComponent, computed, PropType } from "@vue/composition-api";
import BigNumber from "bignumber.js";
import { KeyedItem } from "./ModalFeeSummary.vue";
import ModalFeeSummaryItem from "../components/ModalFeeSummaryItem.vue";

let KEY = 0;
function nextItemKey(): number {
    return (KEY += 1);
}

export default createComponent({
    props: {
        items: Array as PropType<KeyedItem[]>
    },
    components: {
        ModalFeeSummaryItem
    },
    setup(props: { items: KeyedItem[] }) {
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

        return {
            props,
            total
        };
    }
});
</script>

<style lang="postcss" scoped>
.modal-fee-summary-items {
    width: 100%;
}

.total {
    border-top: 1px solid var(--color-jupiter);
    margin-block-start: 5px;
    padding-block-start: 5px;
}
</style>
