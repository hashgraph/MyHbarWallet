<template>
    <div class="modal-fee-summary-items">
        <template v-for="(item, index) in splitItems">
            <div
                :key="item.key"
                class="row"
                :class="{ total: index === splitItems.length - 1 }"
            >
                <div class="description">
                    {{ item.description }}
                </div>
                <template v-if="item.int != null">
                    <div class="int text">
                        {{ item.int }}
                    </div>
                    <div class="period text">
                        .
                    </div>
                    <div class="fraction text">
                        {{ item.fraction }}
                    </div>
                    <div class="symbol text">
                        ℏ
                    </div>
                </template>
                <template v-else>
                    <div class="text">
                        {{ item.value }}
                    </div>
                </template>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { createComponent, computed, PropType, Ref } from "@vue/composition-api";
import BigNumber from "bignumber.js";
import { KeyedItem } from "./ModalFeeSummary.vue";
import { formatSplit, formatRightPad } from "../formatter";

let KEY = 0;
function nextItemKey(): number {
    return (KEY += 1);
}

interface SplitItem {
    key: number;
    description: string;
    // Nullable because value is not required to be of type number
    // which means it cannot be split
    int: string | null;
    fraction: string | null;
    value: string | null;
}

export default createComponent({
    props: {
        items: Array as PropType<KeyedItem[]>
    },
    setup(props: { items: KeyedItem[] }) {
        // Compute the total
        const total: Ref<{
            int: string;
            fraction: string | null;
        }> = computed(() => {
            let total = new BigNumber(0);

            // Only add to total if value is a BigNumber
            // Assign key to each item
            if (props.items != null) {
                for (const item of props.items) {
                    if (item.value instanceof BigNumber) {
                        total = total.plus(item.value);
                    }
                }
            }

            const parts = formatSplit(total.toString());

            // Note this should never be possbile unless it's a programmer error
            if (parts == null) {
                return {
                    int: "0",
                    fraction: "0"
                };
            }

            return {
                int: parts.int,
                fraction: parts.fraction
            };
        });

        const splitItems: Ref<SplitItem[]> = computed(() => {
            let mostFractionDecimals = 0;
            const items = props.items.map(
                (item): SplitItem => {
                    const parts = formatSplit(item.value);

                    if (parts == null) {
                        return {
                            key: nextItemKey(),
                            description: item.description,
                            int: null,
                            fraction: null,
                            value: item.value
                        };
                    }

                    if (
                        parts.fraction != null &&
                        mostFractionDecimals < parts.fraction.length
                    ) {
                        mostFractionDecimals = parts.fraction.length;
                    }

                    return {
                        key: nextItemKey(),
                        description: item.description,
                        int: parts.int,
                        fraction: parts.fraction,
                        value: item.value
                    };
                }
            );

            // Loop through all the items and right pad all the necessary ones
            for (const item of items) {
                item.fraction = formatRightPad(
                    item.fraction,
                    mostFractionDecimals
                );
            }

            const computedTotal = total;

            // Right padd the total as well
            computedTotal.value.fraction = formatRightPad(
                computedTotal.value.fraction,
                mostFractionDecimals
            );

            items.push({
                key: nextItemKey(),
                description: "Total",
                int: computedTotal.value.int,
                fraction: computedTotal.value.fraction,
                value: computedTotal.value.toString()
            });

            return items;
        });

        return {
            props,
            total,
            nextItemKey,
            splitItems
        };
    }
});
</script>

<style lang="postcss" scoped>
.modal-fee-summary-items {
    width: 100%;
}

.description {
    color: var(--color-washed-black);
    flex-grow: 1;
    font-weight: 500;
}

.row {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.text {
    color: var(--color-china-blue);
    font-family: monospace;
    font-size: 16px;
}

.int {
    text-align: end;
}

.fraction {
    text-align: start;
}

.period {
    text-align: center;
}

.symbol {
    min-width: 15px;
    text-align: end;
}

.total {
    border-top: 1px solid var(--color-jupiter);
    margin-block-start: 5px;
    padding-block-start: 5px;
}
</style>
