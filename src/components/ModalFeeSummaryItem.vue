<template>
    <div class="modal-fee-summary-item">
        <span class="description"> {{ props.description }}: </span>
        <span v-if="isBigNumber(props.value)" class="value bignumber">
            <span class="whole">{{ wholePart }}</span>
            <span class="fraction">{{ fractionPart }}</span>
            <span class="symbol">ℏ</span>
        </span>
        <span v-else class="value string">
            {{ props.value }}
        </span>
    </div>
</template>

<script lang="ts">
import { createComponent, computed, PropType } from "@vue/composition-api";
import BigNumber from "bignumber.js";
import { formatHbar } from "../formatter";

export default createComponent({
    props: {
        description: String,
        value: Object as PropType<BigNumber | string>
    },
    setup(props: { description: string; value: BigNumber | string }) {
        function isBigNumber(value: BigNumber | string): boolean {
            return value instanceof BigNumber;
        }

        const splitValue = computed(() => {
            if (isBigNumber(props.value)) {
                const value: BigNumber = props.value as BigNumber;
                const formatted = formatHbar(value);

                if (formatted.includes(".")) {
                    return formatted.split(".");
                }

                return [formatted, ""];
            }

            return ["", ""];
        });

        const wholePart = computed(() => {
            return splitValue.value[0];
        });

        const fractionPart = computed(() => {
            if (splitValue.value[1] !== "") {
                return "." + splitValue.value[1];
            }

            return "";
        });

        return {
            wholePart,
            fractionPart,
            isBigNumber,
            props
        };
    }
});
</script>

<style lang="postcss" scoped>
.modal-fee-summary-item {
    align-items: center;
    display: flex;
    justify-content: space-between;
}

.description {
    color: var(--color-washed-black);
    font-weight: 500;
}

.value {
    color: var(--color-china-blue);
    font-family: monospace;
    font-size: 16px;
    min-width: 0;
}

.bignumber {
    display: flex;
    flex-wrap: nowrap;
    text-align: end;

    & :nth-child(2) {
        text-align: start;
    }
}

.whole {
    min-width: 100px;
}

.fraction {
    min-width: 50px;
}

.symbol {
    min-width: 15px;
}
</style>
