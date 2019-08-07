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
import Vue from "vue";
import Select from "./Select.vue";
import TextInput from "./TextInput.vue";
import BigNumber from "bignumber.js";

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

interface Data {
    selectedLeft: Unit;
    selectedRight: Unit;
    valueLeft: string;
    valueRight: string;
}

interface Methods {
    getValueOfUnit(unit: Unit): BigNumber;
    convertFromTo(amt: number, from: string, to: string): string;
}

export default Vue.extend<Data, Methods, {}, {}>({
    components: {
        Select,
        TextInput
    },
    data() {
        return {
            selectedLeft: Unit.Tinybar,
            selectedRight: Unit.Hbar,
            valueLeft: "100000000",
            valueRight: "1"
        };
    },
    computed: {
        options() {
            return Object.values(Unit);
        }
    },
    watch: {
        valueLeft(newValue) {
            this.valueRight = this.convertFromTo(
                newValue,
                this.selectedLeft,
                this.selectedRight
            );
        },
        valueRight(newValue) {
            this.valueLeft = this.convertFromTo(
                newValue,
                this.selectedRight,
                this.selectedLeft
            );
        },
        selectedLeft(newValue) {
            this.valueRight = this.convertFromTo(
                Number(this.valueLeft),
                newValue,
                this.selectedRight
            );
        },
        selectedRight(newValue) {
            this.valueLeft = this.convertFromTo(
                Number(this.valueRight),
                newValue,
                this.selectedLeft
            );
        }
    },
    methods: {
        getValueOfUnit(unit: Unit): BigNumber {
            return new BigNumber(unitMap.get(unit)!);
        },
        convertFromTo(amt: number, from: Unit, to: Unit): string {
            let x = new BigNumber(amt);
            let y = this.getValueOfUnit(from) as BigNumber;
            let z = this.getValueOfUnit(to) as BigNumber;

            return x
                .multipliedBy(y)
                .dividedBy(z)
                .toFixed();
        }
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
