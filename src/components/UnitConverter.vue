<template>
    <div class="unit-input">
        <div class="wrap">
            <div class="block-left">
                <div class="select-block">
                    <Select
                        v-model="selectedLeft"
                        :options="options"
                        :left="true"
                    />
                </div>
                <div>
                    <TextInput
                        v-model="valueLeft"
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
                        v-model="selectedRight"
                        :options="options"
                        :left="false"
                    />
                </div>
                <div>
                    <TextInput
                        v-model="valueRight"
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

import { createComponent, value, watch } from "vue-function-api";

enum Unit {
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

function getValueOfUnit(unit: Unit): BigNumber {
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

export default createComponent({
    components: {
        Select,
        TextInput
    },
    setup() {
        const selectedLeft = value(Unit.Tinybar);
        const selectedRight = value(Unit.Hbar);
        const valueLeft = value("100000000");
        const valueRight = value("1");
        const options = Object.values(Unit);

        watch(valueLeft, newValue => {
            valueRight.value = convertFromTo(
                newValue,
                selectedLeft.value,
                selectedRight.value
            );
        });

        watch(valueRight, newValue => {
            valueLeft.value = convertFromTo(
                newValue,
                selectedRight.value,
                selectedLeft.value
            );
        });

        watch(selectedLeft, newValue => {
            valueRight.value = convertFromTo(
                valueLeft.value,
                newValue,
                selectedRight.value
            );
        });

        watch(selectedRight, newValue => {
            valueLeft.value = convertFromTo(
                valueRight.value,
                newValue,
                selectedLeft.value
            );
        });

        return {
            selectedLeft,
            selectedRight,
            valueLeft,
            valueRight,
            options
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
    background-color: white;
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
