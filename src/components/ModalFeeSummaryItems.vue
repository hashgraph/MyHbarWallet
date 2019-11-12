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
import { createComponent, computed, PropType, Ref } from "@vue/composition-api";
import BigNumber from "bignumber.js";
import { Item } from "./ModalFeeSummary.vue";
import { formatSplit, formatRightPad } from "../formatter";

let KEY = 0;
function nextItemKey(): number {
    return KEY += 1;
}

interface SplitItem {
    // Used for the for loop because each element requires `v-key` to be set
    key: number;
    description: string;
    // Nullable because value is not required to be of type number
    // which means it cannot be split
    int: string | null;
    fraction: string | null;

    // Holds the final preformatted string to be rendered
    value: string | null;
}

export default createComponent({
    props: { items: Array as PropType<Item[]> },
    setup(props: { items: Item[] }) {
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

            // Note this should never be possible unless it's a programmer error
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

        const splitItems: Ref<SplitItem[]> = computed(() => {
            // Track the long fraction part of a string
            // Used later to right padd all items
            let lengthLongestString = 0;

            // Loop through all the items and conver them to `SplitItem` type
            const items = props.items.map((item): SplitItem => {
                // Break item's value int int and fraction
                const parts = formatSplit(item.value.toString());

                // Get a key
                const itemKey = nextItemKey();

                // The item value isn't required to be a number so we'll get back a null here
                // int that case we simply use the item value as the preformatted text
                if (parts == null) {
                    return {
                        key: itemKey,
                        description: item.description,
                        int: null,
                        fraction: null,
                        value: item.value.toString()
                    };
                }

                // If the item was a number take the fraction part length and determine if this is the longest
                // fraction seen yet
                if (
                    parts.fraction != null &&
                        lengthLongestString < parts.fraction.length
                ) {
                    lengthLongestString = parts.fraction.length;
                }

                // Return the item
                return {
                    key: itemKey,
                    description: item.description,
                    int: parts[ "int" ],
                    fraction: parts.fraction,
                    value: ""
                };
            });

            // Hold the total so it's not recomputed in the middle
            const computedTotal = total;

            // Push the the total onto the item array
            // The last item in the list is always treated as the total
            items.push({
                key: nextItemKey(),
                description: "Total",
                int: computedTotal.value[ "int" ],
                fraction: computedTotal.value.fraction,
                value: ""
            });

            // Loop through all the items and right pad all the necessary ones
            for (const item of items) {
                // Hold onto if fraction was null originally before being formatted because
                // formatter will take a null and return you a string
                const hasFraction = item.fraction != null;

                // Format the fraction part
                item.fraction = formatRightPad(
                    item.fraction,
                    " ",
                    lengthLongestString
                );

                // Determine if the item is a nubmer and period is necessary
                // and set the result int item.value -- the preformatted string
                if (item[ "int" ] != null) {
                    if (hasFraction) {
                        item.value = `${item[ "int" ]}.${item.fraction}`;
                    } else {
                        item.value = `${item[ "int" ]} ${item.fraction}`;
                    }
                }
            }

            // Return split items
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

.text {
    color: var(--color-china-blue);
    font-family: monospace;
    font-size: 16px;
    white-space: nowrap;
}

.value {
    color: var(--color-china-blue);
    font-family: monospace;
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
