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
                    &nbsp;
                    <InfoButton
                        v-if="item.description === $t('common.estimatedFee')"
                        :message="$t('modalFeeSummary.whatIsFee')"
                    />
                </div>
                <div class="value">
                    {{ item.value }}
                </div>
                <div class="symbol value">
                    ℏ
                </div>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref } from "@vue/composition-api";
import { BigNumber } from "bignumber.js";
import { Hbar, HbarUnit } from "@hashgraph/sdk";

import { formatRightPad, formatSplit } from "../../service/format";

import { Item } from "./ModalFeeSummary.vue";
import InfoButton from "./InfoButton.vue";

let KEY = 0;
function nextItemKey(): number {
    // eslint-disable-next-line no-return-assign
    return KEY += 1;
}

interface SplitItem {
    key: number;
    description: string;
    int: string | null;
    fraction: string | null;
    value: string | null;
}

export default defineComponent({
    props: { items: Array as PropType<Item[]> },
    components: { InfoButton },
    setup(props: { items: Item[] }) {
        const total: Ref<{
            int: string;
            fraction: string | null;
        }> = computed(() => {
            let total = new BigNumber(0);

            if (props.items != null) {
                for (const item of props.items) {
                    if (item.value instanceof Hbar) {
                        item.value = item.value.as(HbarUnit.Hbar);
                    }
                    if (item.value instanceof BigNumber) {
                        total = total.plus(item.value);
                    }
                }
            }
            const parts = formatSplit(total.toString());

            if (parts == null) {
                return {
                    int: "0",
                    fraction: "0"
                };
            }

            return {
                int: parts[ "int" ],
                fraction: parts.fraction
            };
        });

        const splitItems: Ref<readonly SplitItem[]> = computed(() => {
            // Track the long fraction part of a string
            let lengthLongestString = 0;

            const items = props.items.map((item): SplitItem => {
                // Break item's value into int and fraction
                const parts = formatSplit(item.value.toString());
                const itemKey = nextItemKey();

                if (parts == null) {
                    return {
                        key: itemKey,
                        description: item.description,
                        int: null,
                        fraction: null,
                        value: item.value.toString()
                    };
                }

                // Keep track of longest string so far
                if (parts.fraction != null && lengthLongestString < parts.fraction.length) {
                    lengthLongestString = parts.fraction.length;
                }

                return {
                    key: itemKey,
                    description: item.description,
                    int: parts[ "int" ],
                    fraction: parts.fraction,
                    value: ""
                };
            });

            const computedTotal = total; // Memoize above

            // Push the the total onto the item array
            items.push({
                key: nextItemKey(),
                description: "Total",
                int: computedTotal.value[ "int" ],
                fraction: computedTotal.value.fraction,
                value: ""
            });

            // Loop through all the items and right pad all the necessary ones
            for (const item of items) {
                const hasFraction = item.fraction != null;

                item.fraction = formatRightPad(
                    item.fraction,
                    " ",
                    lengthLongestString
                );

                if (item[ "int" ] != null) {
                    if (hasFraction) {
                        item.value = `${item[ "int" ]}.${item.fraction}`;
                    } else {
                        item.value = `${item[ "int" ]} ${item.fraction}`;
                    }
                }
            }

            return items;
        });

        return {
            props,
            total,
            splitItems
        };
    }
});
</script>

<style lang="postcss" scoped>
.modal-fee-summary-items {
    font-family: "Inconsolata", monospace;
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
    margin-block-end: 5px;
}

.value {
    color: var(--color-china-blue);
    font-size: 16px;
    font-weight: 600;
    height: 14px;
    padding: 0;
    text-align: end;
    white-space: pre;
}

.symbol {
    min-width: 15px;
    text-align: end;
}

/* Total is used in an active class Intellij cannot figure that out so it's greyed out */
.total {
    border-top: 1px solid var(--color-jupiter);
    margin-block-start: 12px;
    padding-block-start: 12px;
}
</style>
