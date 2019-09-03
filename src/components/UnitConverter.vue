<template>
    <div class="unit-input">
        <div class="wrap">
            <div class="block-left">
                <div class="select-block">
                    <Select
                        v-model="state.selectedLeft"
                        :options="options"
                        :left="true"
                    />
                </div>
                <div>
                    <TextInput
                        v-model="state.valueLeft"
                        compact
                        white
                        type="number"
                        step="any"
                        placeholder="Amount"
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
                    />
                </div>
                <div>
                    <TextInput
                        v-model="state.valueRight"
                        compact
                        white
                        type="number"
                        step="any"
                        placeholder="Amount"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Select from "./Select.vue";
import TextInput from "./TextInput.vue";
import BigNumber from "bignumber.js";
import { createComponent, watch, reactive } from "@vue/composition-api";

export enum Unit {
    Tinybar = "tinybar",
    Microbar = "microbar",
    Millibar = "millibar",
    Hbar = "hbar",
    Kilobar = "kilobar",
    Megabar = "megabar",
    Gigabar = "gigabar"
}

const unitMap: Map<Unit, number> = new Map([
    [Unit.Tinybar, 1],
    [Unit.Microbar, 100],
    [Unit.Millibar, 100000],
    [Unit.Hbar, 100000000],
    [Unit.Kilobar, 100000000000],
    [Unit.Megabar, 100000000000000],
    [Unit.Gigabar, 100000000000000000]
]);

export function getValueOfUnit(unit: Unit): BigNumber {
    return new BigNumber(unitMap.get(unit) || 0);
}

function convertFromTo(amt: string, from: Unit, to: Unit): string {
    const x = new BigNumber(amt);
    const y = getValueOfUnit(from);
    const z = getValueOfUnit(to);
    return x
        .multipliedBy(y)
        .dividedBy(z)
        .toFixed();
}

interface State {
    selectedLeft: Unit;
    selectedRight: Unit;
    valueLeft: string;
    valueRight: string;
    options: Unit[];
}

export default createComponent({
    components: {
        Select,
        TextInput
    },
    setup() {
        const state = reactive<State>({
            selectedLeft: Unit.Tinybar,
            selectedRight: Unit.Hbar,
            valueLeft: "100000000",
            valueRight: "1",
            options: Object.values(Unit)
        });

        watch(
            () => state.valueLeft,
            (newValue: string) => {
                state.valueRight = convertFromTo(
                    newValue,
                    state.selectedLeft,
                    state.selectedRight
                );
            }
        );

        watch(
            () => state.valueRight,
            (newValue: string) => {
                state.valueLeft = convertFromTo(
                    newValue,
                    state.selectedRight,
                    state.selectedLeft
                );
            }
        );

        watch(
            () => state.selectedLeft,
            (newValue: Unit) => {
                state.valueRight = convertFromTo(
                    state.valueLeft,
                    newValue,
                    state.selectedRight
                );
            }
        );

        watch(
            () => state.selectedRight,
            (newValue: Unit) => {
                state.valueLeft = convertFromTo(
                    state.valueRight,
                    newValue,
                    state.selectedLeft
                );
            }
        );

        return {
            state
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
