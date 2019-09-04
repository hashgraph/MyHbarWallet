<template>
    <div class="unit-input">
        <div class="wrap">
            <div class="block-left">
                <div class="select-block">
                    <Select
                        v-model="state.selectedLeft"
                        :options="options"
                        :left="true"
                        @change="handleSelect"
                    />
                </div>
                <div>
                    <TextInput
                        :value="state.valueLeft"
                        compact
                        white
                        step="any"
                        placeholder="Amount"
                        @input="handleInputValueLeft"
                    />
                </div>
            </div>

            <div class="block-center">
                <div class="convert-icon">
                    <img src="../assets/swap.svg" alt="" />
                </div>
            </div>

            <div class="block-right">
                <div class="select-block">
                    <Select
                        v-model="state.selectedRight"
                        :options="options"
                        :left="false"
                        @change="handleSelect"
                    />
                </div>
                <div>
                    <TextInput
                        :value="state.valueRight"
                        compact
                        white
                        step="any"
                        placeholder="Amount"
                        @input="handleInputValueRight"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Select from "./Select.vue";
import TextInput from "./TextInput.vue";
import { Unit, convert } from "../units";
import { createComponent, reactive } from "@vue/composition-api";
import BigNumber from "bignumber.js";

interface State {
    selectedLeft: Unit;
    selectedRight: Unit;
    valueLeft: string;
    valueRight: string;
}

export default createComponent({
    components: {
        Select,
        TextInput
    },
    setup() {
        const options = Object.values(Unit);

        const numericRegex = /^\d*\.?\d*$/;

        const state = reactive<State>({
            selectedLeft: Unit.Tinybar,
            selectedRight: Unit.Hbar,
            valueLeft: "100000000",
            valueRight: "1"
        });

        function handleSelect(): void {
            state.valueRight = convert(
                state.valueLeft,
                state.selectedLeft,
                state.selectedRight,
                false
            );
        }

        // TODO: A generalization of this function would be very useful for a general-purpose [AmountInput] component
        function boundInput(
            event: Event,
            inputValue: string,
            stateValue: string
        ): void {
            // If the computed value from the round-trip from {input} -> left -> right
            // is different than {input} then we should replace {input} so as
            // to prevent typing more

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

        function computeValueLeft(): void {
            state.valueLeft = convert(
                state.valueRight,
                state.selectedRight,
                state.selectedLeft,
                false
            );
        }

        function computeValueRight(): void {
            state.valueRight = convert(
                state.valueLeft,
                state.selectedLeft,
                state.selectedRight,
                false
            );
        }

        function handleInputValueLeft(value: string, event: Event): void {
            if (!numericRegex.test(value)) value = state.valueLeft;

            state.valueLeft = value;

            computeValueRight();
            computeValueLeft();

            boundInput(event, value, state.valueLeft);
        }

        function handleInputValueRight(value: string, event: Event): void {
            if (!numericRegex.test(value)) value = state.valueRight;

            state.valueRight = value;

            computeValueLeft();
            computeValueRight();

            boundInput(event, value, state.valueRight);
        }

        return {
            state,
            options,
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
}

select,
input {
    background-color: var(--color-white);
    border: 0;
    border-radius: 4px;
    padding: 18px;
    width: 100%;
}

select {
    margin: 0;
    margin-block-end: 5px;
    position: relative;
}

.select-block {
    margin-block-end: 5px;
    position: relative;
}

.block-center {
    text-align: center;
}

@media screen and (max-width: 800px) {
    .wrap {
        display: block;
    }

    .block-center {
        margin: 20px 0;
        text-align: center;
    }

    .convert-icon > img {
        transform: rotate(90deg);
    }
}
</style>
