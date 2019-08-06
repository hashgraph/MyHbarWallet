<template>
    <div class="unit-input">
        <div class="wrap">
            <div class="block-left">
                <div class="select-block">
                    <DropDownUnitSelector
                        :options="options"
                        :current-selected="selectedLeft"
                        :left="true"
                        @updatedSelected="updateCurrency"
                    />
                </div>
                <div>
                    <input
                        v-model="valueLeft"
                        type="number"
                        step="any"
                        placeholder="Amount"
                    />
                </div>
            </div>

            <div class="block-center">
                <div class="convert-icon">
                    <img src="../assets/swap.svg" alt="swap" />
                </div>
            </div>

            <div class="block-right">
                <div class="select-block">
                    <DropDownUnitSelector
                        :options="options"
                        :current-selected="selectedRight"
                        :left="false"
                        @updatedSelected="updateCurrency"
                    />
                </div>
                <div>
                    <input
                        v-model="valueRight"
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
import DropDownUnitSelector from "../components/DropDownUnitSelector.vue";
import JSBI from "jsbi";
import { mapState } from 'vuex';

interface UnitMap {
    [key: string]: number;
}

const unitMap: UnitMap = {
    tinybar: 1,
    microbar: 100,
    millibar: 100000,
    hbar: 100000000,
    kilobar: 100000000000,
    megabar: 100000000000000,
    gigabar: 100000000000000000
};

export default Vue.extend({
    components: {
        DropDownUnitSelector
    },
    props: {
        options: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {
            selectedLeft: "tinybar",
            selectedRight: "hbar",
            valueLeft: 100000000,
            valueRight: 1
        };
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
                this.valueLeft,
                newValue,
                this.selectedRight
            );
        },
        selectedRight(newValue) {
            this.valueLeft = this.convertFromTo(
                this.valueRight,
                newValue,
                this.selectedLeft
            );
        }
    },
    methods: {
        getValueOfUnit(unit: any): any {
            unit = unit ? unit.toLowerCase() : "hbar";
            const newValue: any = unitMap[unit];
            return JSBI.BigInt(newValue);
        },
        convertFromTo(amt: number, from: string, to: string) {
            let x = JSBI.BigInt(amt);
            let y = JSBI.BigInt(this.getValueOfUnit(from));
            let z = JSBI.BigInt(this.getValueOfUnit(to));
            return JSBI.toNumber(JSBI.divide(JSBI.multiply(x, y), z));
        },
        updateCurrency(e: any ) {
            if (e[1] === "left") {
                this.selectedLeft = e[0];
            } else {
                this.selectedRight = e[0];
            }
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
