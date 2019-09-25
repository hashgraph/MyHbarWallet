<template>
    <div class="unit-input">
        <div class="wrap">
            <div class="block-left">
                <div class="input-block">
                    <TextInput
                        :value="state.valueLeft"
                        compact
                        white
                        step="any"
                        :placeholder="$t('common.amount')"
                        @input="handleInputValueLeft"
                    />
                </div>
                <div class="select-block">
                    <Select
                        v-model="state.selectedLeft"
                        :options="state.options"
                        :left="true"
                        @change="handleSelect"
                    />
                </div>
            </div>

            <div class="block-center">
                <div class="convert-icon">
                    <img src="../assets/swap.svg" alt="" />
                </div>
            </div>

            <div class="block-right">
                <div class="input-block">
                    <TextInput
                        :value="state.valueRight"
                        compact
                        white
                        step="any"
                        :placeholder="$t('common.amount')"
                        @input="handleInputValueRight"
                    />
                </div>
                <div class="select-block">
                    <Select
                        v-model="state.selectedRight"
                        :options="state.options"
                        :left="false"
                        @change="handleSelect"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Select from "./Select.vue";
import TextInput from "./TextInput.vue";
import { createComponent, reactive, onMounted } from "@vue/composition-api";

interface State {
    options: string[];
    selectedLeft: import("@hashgraph/sdk").HbarUnit;
    selectedRight: import("@hashgraph/sdk").HbarUnit;
    valueLeft: string;
    valueRight: string;
}

export default createComponent({
    components: {
        Select,
        TextInput
    },
    setup() {
        const numericRegex = /^\d*\.?\d*$/;

        const state = reactive<State>({
            options: [],
            selectedLeft: "tinybar",
            selectedRight: "hbar",
            valueLeft: "100000000",
            valueRight: "1"
        });

        onMounted(async () => {
            const { hbarUnits } = await (import("@hashgraph/sdk") as Promise<
                typeof import("@hashgraph/sdk")
            >);

            state.options = hbarUnits;
        });

        async function handleSelect(): Promise<void> {
            await computeValueRight();
        }

        // TODO: A generalization of this function would be very useful for a general-purpose [AmountInput] component
        async function boundInput(
            event: Event,
            inputValue: string,
            stateValue: string
        ): Promise<void> {
            // If the computed value from the round-trip from {input} -> left -> right
            // is different than {input} then we should replace {input} so as
            // to prevent typing more

            const { BigNumber } = await (import("@hashgraph/sdk") as Promise<
                typeof import("@hashgraph/sdk")
            >);

            const computedValueNum = new BigNumber(stateValue);
            const valueNum = new BigNumber(inputValue);

            if (!computedValueNum.eq(valueNum)) {
                // Computed value is different from input value; replace
                (event.target as HTMLInputElement).value = stateValue;
            } else {
                // Strip non-digit chars from input
                (event.target as HTMLInputElement).value = inputValue.replace(
                    /[^\d.]/,
                    ""
                );
            }
        }

        async function computeValueLeft(): Promise<void> {
            const { Hbar } = await (import("@hashgraph/sdk") as Promise<
                typeof import("@hashgraph/sdk")
            >);

            state.valueLeft = Hbar.from(state.valueRight, state.selectedRight)
                .as(state.selectedLeft)
                .toFixed()
                .toString();
        }

        async function computeValueRight(): Promise<void> {
            const { Hbar } = await (import("@hashgraph/sdk") as Promise<
                typeof import("@hashgraph/sdk")
            >);

            state.valueRight = Hbar.from(state.valueLeft, state.selectedLeft)
                .as(state.selectedRight)
                .toFixed()
                .toString();
        }

        async function handleInputValueLeft(
            value: string,
            event: Event
        ): Promise<void> {
            if (!numericRegex.test(value)) value = state.valueLeft;

            state.valueLeft = value;

            await computeValueRight();
            await computeValueLeft();

            boundInput(event, value, state.valueLeft);
        }

        async function handleInputValueRight(
            value: string,
            event: Event
        ): Promise<void> {
            if (!numericRegex.test(value)) value = state.valueRight;

            state.valueRight = value;

            await computeValueLeft();
            await computeValueRight();

            boundInput(event, value, state.valueRight);
        }

        return {
            state,
            handleInputValueRight,
            handleInputValueLeft,
            handleSelect
        };
    }
});
</script>

<style lang="postcss" scoped>
.wrap {
    align-items: center;
    display: grid;
    grid-template-columns: 4fr 1fr 4fr;

    @media (max-width: 800px) {
        display: block;
    }
}

.select-block {
    position: relative;
}

.input-block {
    margin-block-end: 5px;

    @media (max-width: 800px) {
        margin-inline-end: 0;
    }
}

.block-left {
    @media (max-width: 800px) {
        display: flex;
        flex-direction: column;
    }
}

.block-center {
    text-align: center;
}

.block-right {
    @media (max-width: 800px) {
        display: flex;
        flex-direction: column;
    }
}

@media screen and (max-width: 800px) {
    .block-center {
        margin: 20px 0;
    }

    .convert-icon > img {
        transform: rotate(90deg);
    }
}
</style>
