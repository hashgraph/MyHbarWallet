<template>
    <div class="modal-fee-summary-items">
        <template v-for="(item, index) in state.splitItems">
            <div
                :key="item.key"
                class="row"
                :class="{ total: index === state.splitItems.length - 1 }"
            >
                <div class="description">
                    {{ item.description }}
                </div>
                <div class="value">{{ item.value }}</div>
                <div class="symbol value">
                    ℏ
                </div>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import {
    createComponent,
    PropType,
    reactive,
    onMounted
} from "@vue/composition-api";
import { formatSplit, formatRightPad } from "../formatter";

let KEY = 0;
function nextItemKey(): number {
    return (KEY += 1);
}

export interface Item {
    description: string;
    value: import("@hashgraph/sdk").Hbar;
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

function splitItemFrom(item: Item): SplitItem {
    // Break item's value into int and fraction
    const parts = formatSplit(item.value.toString());

    // Get a key
    const itemKey = nextItemKey();

    // The item value isn't required to be a number so we'll get back a null here
    // in that case we simply use the item value as the preformatted text
    return {
        key: itemKey,
        description: item.description,
        int: parts == null ? null : parts.int,
        fraction: parts == null ? null : parts.fraction,
        value: parts == null ? item.value.toString() : ""
    };
}

interface State {
    splitItems: SplitItem[];
    total: { int: string; fraction: string | null };
}

export default createComponent({
    props: {
        items: Array as PropType<Item[]>
    },
    setup(props: { items: Item[] }) {
        const state = reactive<State>({
            splitItems: new Array<SplitItem>(),
            total: { int: "", fraction: null }
        } as State);

        onMounted(async () => {
            const { Hbar } = await (import("@hashgraph/sdk") as Promise<
                typeof import("@hashgraph/sdk")
            >);

            const total: import("@hashgraph/sdk").Hbar =
                props.items.length > 0
                    ? props.items
                          .map((item: Item): import("@hashgraph/sdk").Hbar =>
                              item.value instanceof Hbar
                                  ? item.value
                                  : Hbar.fromTinybar(0)
                          )
                          .reduce(
                              (
                                  a: import("@hashgraph/sdk").Hbar,
                                  b: import("@hashgraph/sdk").Hbar
                              ): import("@hashgraph/sdk").Hbar => a.plus(b)
                          )
                    : Hbar.fromTinybar(0);

            const parts = formatSplit(total.as("hbar").toString());

            state.total =
                parts == null
                    ? { int: "0", fraction: "0" }
                    : { int: parts.int, fraction: parts.fraction };

            if (props.items.length <= 0) {
                // nothing else to do here
                return;
            }

            // Track the long fraction part of a string
            // Used later to right pad all items
            // let lengthLongestString = 0;
            const items: SplitItem[] = props.items.map((item: Item) =>
                splitItemFrom(item)
            ) as SplitItem[];

            // Push the the total onto the item array
            // The last item in the list is always treated as the total
            items.push({
                key: nextItemKey(),
                description: "Total",
                int: state.total.int,
                fraction: state.total.fraction,
                value: ""
            });

            const maxStringLength = Math.max(
                ...items.map((item: SplitItem): number =>
                    item.fraction != null ? item.fraction.length : 0
                )
            );

            // Loop through all the items and right pad all the necessary ones
            for (const item of items) {
                // Hold onto if fraction was null originally before being formatted because
                // formatter will take a null and return you a string
                const hasFraction = item.fraction != null;

                // Format the fraction part
                item.fraction = formatRightPad(
                    item.fraction,
                    " ",
                    maxStringLength
                );

                // Determine if the item is a number and period is necessary
                // and set the result int item.value -- the pre-formatted string
                if (item.int != null) {
                    if (hasFraction) {
                        item.value = item.int + "." + item.fraction;
                    } else {
                        item.value = item.int + " " + item.fraction;
                    }
                }
            }

            state.splitItems = items;
        });

        return {
            props,
            state
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
    white-space: nowrap;
}

.value {
    color: var(--color-china-blue);
    font-family: monospace;
    font-size: 16px;
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
    margin-block-start: 5px;
    padding-block-start: 5px;
}
</style>
