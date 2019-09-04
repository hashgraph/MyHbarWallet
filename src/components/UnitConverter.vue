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
import { Unit, convert, getValueOfUnit } from "../units";
import { createComponent, reactive } from "@vue/composition-api";

interface State {
    selectedLeft: Unit;
    selectedRight: Unit;
    valueLeft: string;
    valueRight: string;
}

function nanCheck(amt: string): string {
    if (amt == "NaN") return "";
    return amt;
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
            state.valueRight = nanCheck(
                convert(
                    state.valueLeft,
                    state.selectedLeft,
                    state.selectedRight,
                    false
                )
            );
        }

        function handleInputValueLeft(value: string, event: Event): void {
            if (!numericRegex.test(value)) value = state.valueLeft;

            state.valueRight = nanCheck(
                convert(value, state.selectedLeft, state.selectedRight, false)
            );

            state.valueLeft = nanCheck(
                convert(
                    state.valueRight,
                    state.selectedRight,
                    state.selectedLeft,
                    false
                )
            );

            if (
                state.valueLeft.includes(".") &&
                state.valueLeft
                    .toString()
                    .substring(state.valueLeft.indexOf(".")).length >=
                    getValueOfUnit(state.selectedLeft).toFixed.length
            )
                (event.target as HTMLInputElement).value = state.valueLeft;
        }

        function handleInputValueRight(value: string, event: Event): void {
            if (!numericRegex.test(value)) value = state.valueRight;

            state.valueLeft = nanCheck(
                convert(value, state.selectedRight, state.selectedLeft, false)
            );

            state.valueRight = nanCheck(
                convert(
                    state.valueLeft,
                    state.selectedLeft,
                    state.selectedRight,
                    false
                )
            );

            if (
                state.valueRight.includes(".") &&
                state.valueRight
                    .toString()
                    .substring(state.valueRight.indexOf(".")).length -
                    1 >=
                    getValueOfUnit(state.selectedRight).toFixed().length - 1
            ) {
                (event.target as HTMLInputElement).value = state.valueRight;
            }
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
