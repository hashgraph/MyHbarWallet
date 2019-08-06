<template>
    <div class="convert-units">
        <div class="wrap">
            <div class="page-container">
                <div class="title-wrap">
                    <h2 class="page-title">Convert Units</h2>
                    <p class="page-subtitle">
                        Our helpful conversion tool and ether unit reference
                        allow you to calculate the total cost of your
                        transactions.
                    </p>
                </div>
                <div><UnitInput :options="options" /></div>

                <div class="hbar-unit-reference-guide">
                    <div class="block-title">
                        <h3>HBAR Unit Reference Guide</h3>
                    </div>

                    <div class="unit-table">
                        <table>
                            <tbody>
                                <tr v-for="hu in hbarUnitRef" :key="hu.key">
                                    <td>{{ hu.name }}</td>
                                    <td class="unit-long">{{ hu.unit1 }}</td>
                                    <td class="unit-short"></td>
                                    <td>
                                        <div>
                                            {{ hu.unit2 }}
                                            <span>{{ hu.unit2e }}</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import UnitInput from "../components/UnitInput.vue";

export default Vue.extend({
    name: "UnitConvert",
    components: {
        UnitInput
    },
    data() {
        return {
            hbarUnitRef: [
                {
                    name: "Tinybar",
                    unit1: "1",
                    unit2: "1",
                    unit2e: "",
                    desc: ""
                },
                {
                    name: "Microbar",
                    unit1: "100",
                    unit2: "10",
                    unit2e: "2",
                    desc: ""
                },
                {
                    name: "Milibar",
                    unit1: "100,000",
                    unit2: "10",
                    unit2e: "5",
                    desc: ""
                },
                {
                    name: "Hbar",
                    unit1: "100,000,000",
                    unit2: "10",
                    unit2e: "8",
                    desc: ""
                },
                {
                    name: "Kilobar",
                    unit1: "100,000,000,000",
                    unit2: "10",
                    unit2e: "11",
                    desc: ""
                },
                {
                    name: "Megabar",
                    unit1: "100,000,000,000,000",
                    unit2: "10",
                    unit2e: "14",
                    desc: ""
                },
                {
                    name: "Gigabar",
                    unit1: "100,000,000,000,000,000",
                    unit2: "10",
                    unit2e: "17",
                    desc: ""
                }
            ],
            options: [
                "tinybar",
                "microbar",
                "millibar",
                "hbar",
                "kilobar",
                "megabar",
                "gigabar"
            ]
        };
    }
});
</script>

<style lang="postcss" scoped>
.convert-units {
    background-color: #f2f4fa;
    display: flex;
    justify-content: center;
}

.wrap {
    padding: 100px 0;
    width: 60vw;
}

.title-wrap {
    margin-block-end: 60px;
    margin-block-start: 0;
    text-align: center;
}

.page-title {
    font-size: 45px;
    font-weight: 500;
    margin: 0;
}

p.page-subtitle {
    margin: 0 auto;
    max-width: 600px;
    padding: 20px;
}

.hbar-unit-reference-guide {
    margin-block-start: 60px;
}

.block-title {
    text-align: center;
}

.unit-table {
    margin-block-start: 20px;
}

table {
    border-top: 1px solid #e0e0e0;
    width: 100%;
}

tr {
    border-bottom: 1px solid #e0e0e0;
    position: relative;
}

td {
    padding: 18px 10px;
    position: relative;
}

span {
    font-size: 9px;
    margin-block-start: -10px;
    position: absolute;
}

.unit-short {
    position: relative;
}
</style>
