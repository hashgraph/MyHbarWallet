<template>
    <div class="modal-fee-summary-items">
        <div class="receipt">
            <div class="column">
                <template v-for="(item, index) in splitItems">
                    <div
                        :key="item.key"
                        class="description"
                        :class="{ total: index === splitItems.length - 1 }"
                    >
                        {{ item.description }}
                    </div>
                </template>
            </div>
            <div class="column">
                <template v-for="(item, index) in splitItems">
                    <template v-if="item.int != null">
                        <div
                            :key="item.key"
                            class="int text"
                            :class="{ total: index === splitItems.length - 1 }"
                        >
                            {{ item.int }}
                        </div>
                    </template>
                    <template v-else>
                        <div
                            :key="item.key"
                            class="text"
                            :class="{ total: index === splitItems.length - 1 }"
                        >
                            {{ item.value }}
                        </div>
                    </template>
                </template>
            </div>
            <div class="column">
                <template v-for="(item, index) in splitItems">
                    <div
                        :key="item.key"
                        class="period text"
                        :class="{ total: index === splitItems.length - 1 }"
                    >
                        .
                    </div>
                </template>
            </div>
            <div class="column">
                <template v-for="(item, index) in splitItems">
                    <div
                        v-if="item.fraction != null"
                        :key="item.key"
                        class="fraction text"
                        :class="{ total: index === splitItems.length - 1 }"
                    >
                        {{ item.fraction }}
                    </div>
                </template>
            </div>
            <div class="column">
                <template v-for="(item, index) in splitItems">
                    <div
                        v-if="
                            Number(item.int) != null &&
                                Number(item.fraction) != null
                        "
                        :key="item.key"
                        class="symbol text"
                        :class="{ total: index === splitItems.length - 1 }"
                    >
                        ℏ
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { createComponent, computed, PropType, Ref } from "@vue/composition-api";
import BigNumber from "bignumber.js";
import { KeyedItem } from "./ModalFeeSummary.vue";
import ModalFeeSummaryItem from "../components/ModalFeeSummaryItem.vue";
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
    components: {
        ModalFeeSummaryItem
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

                    parts.fraction = formatRightPad(
                        parts.fraction,
                        mostFractionDecimals
                    );

                    return {
                        key: nextItemKey(),
                        description: item.description,
                        int: parts.int,
                        fraction: parts.fraction,
                        value: item.value
                    };
                }
            );

            const computedTotal = total;

            computedTotal.value.fraction = formatRightPad(
                computedTotal.value.fraction,
                mostFractionDecimals
            );

            items.push({
                key: nextItemKey(),
                description: "Total:",
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
    font-weight: 500;
}

.receipt {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.column {
    width: fit-content;
}

.column:first-child {
    flex-grow: 1;
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
