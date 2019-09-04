<template>
    <CirclePage>
        <div class="wrap">
            <div class="title-wrap">
                <div class="page-title">Convert Units</div>
                <div class="page-subtitle">
                    Our helpful conversion tool and hbar unit reference allow
                    you to calculate your total transaction cost.
                </div>
            </div>

            <div>
                <UnitConverter />
            </div>

            <div class="hbar-unit-reference-guide">
                <div class="block-title">Hbar Unit Reference Guide</div>

                <div class="unit-table">
                    <table>
                        <tbody>
                            <tr v-for="hu in hbarUnitRef" :key="hu.key">
                                <td>{{ hu.name }}</td>
                                <template>
                                    <div class="sub-row-container">
                                        <td class="amount">
                                            {{ hu.amount }} {{ hu.symbol }}
                                        </td>
                                        <td class="amount-hbar">
                                            {{ hu.amountInHbar }} ℏ
                                        </td>
                                    </div>
                                </template>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </CirclePage>
</template>

<script lang="ts">
import UnitConverter from "../components/UnitConverter.vue";
import CirclePage from "../components/CirclePage.vue";
import { createComponent } from "@vue/composition-api";

export default createComponent({
    components: {
        UnitConverter,
        CirclePage
    },
    setup() {
        const hbarUnitRef = [
            {
                name: "Tinybar",
                symbol: "tℏ",
                amount: "100,000,000",
                amountInHbar: "1"
            },
            {
                name: "Microbar",
                symbol: "μℏ",
                amount: "1,000,000",
                amountInHbar: "1"
            },
            {
                name: "Milibar",
                symbol: "mℏ",
                amount: "1,000",
                amountInHbar: "1"
            },
            {
                name: "Hbar",
                symbol: "ℏ",
                amount: "1",
                amountInHbar: "1"
            },
            {
                name: "Kilobar",
                symbol: "kℏ",
                amount: "1",
                amountInHbar: "1,000"
            },
            {
                name: "Megabar",
                symbol: "Mℏ",
                amount: "1",
                amountInHbar: "1,000,000"
            },
            {
                name: "Gigabar",
                symbol: "Gℏ",
                amount: "1",
                amountInHbar: "1,000,000,000"
            }
        ];
        return { hbarUnitRef };
    }
});
</script>

<style lang="postcss" scoped>
.wrap {
    margin: 0 auto;
    max-width: 1024px;
    padding: 100px 20px;
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

.page-subtitle {
    color: var(--color-china-blue);
    font-size: 14px;
    margin: 0 auto;
    margin-block-start: 20px;
    max-width: 700px;
}

.hbar-unit-reference-guide {
    margin-block-start: 60px;
}

.block-title {
    font-size: 20px;
    font-weight: 500;
    text-align: center;
}

.unit-table {
    color: var(--color-washed-black);
    margin-block-start: 20px;
}

table {
    border-top: 1px solid var(--color-jupiter);
    width: 100%;
}

tr {
    border-bottom: 1px solid var(--color-jupiter);
    position: relative;

    @media (max-width: 414px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 10px 0;
    }
}

td {
    padding: 18px 10px;
    position: relative;

    @media (max-width: 414px) {
        padding: 0 10px;
    }
}

tr > td:first-child {
    @media (max-width: 414px) {
        font-weight: 500;
    }
}

.sub-row-container > td:last-child {
    @media (max-width: 414px) {
        text-align: end;
    }

    @media (max-width: 336px) {
        white-space: nowrap;
    }
}

.sub-row-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-block-start: 5px;
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
