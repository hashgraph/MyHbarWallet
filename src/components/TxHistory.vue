<template>
    <div class="table-card">
        <div class="table-container">
            <table>
                <div class="table-header">
                    Latest Transactions
                </div>
                <tbody>
                    <tr
                        v-for="entry in rows.slice(0, 10)"
                        :key="entry.hash"
                        class="entry-rows"
                    >
                        <td class="entries to-from">
                            <div class="to">
                                {{ getTo(entry) }}
                            </div>
                        </td>
                        <td class="entries to-from">
                            <MaterialDesignIcon
                                class="icon"
                                :icon="mdiRayStartArrow"
                                viewbox="7 0 24 24"
                            />
                        </td>
                        <td class="entries to-from">
                            <div class="from">
                                {{ getFrom(entry) }}
                            </div>
                        </td>
                        <td class="entries">
                            <div class="value">{{ getValue(entry) }} ℏ</div>
                            <div class="age-entry">
                                {{ getAge(entry) }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-footer" center colspan="3">
                            Powered By
                            <img class="logo" :src="logoKabuto" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";
import { Transaction } from "../transactions";
import { formatDistanceToNow } from "date-fns";
import logoKabuto from "../assets/logo_kabuto.svg";
import MaterialDesignIcon from "../components/MaterialDesignIcon.vue";
import { mdiRayStartArrow } from "@mdi/js";
import { formatHbar } from "../formatter";
import BigNumber from "bignumber.js";
import { Unit, convert } from "../units";

interface Props {
    tableHeader: boolean;
    columns: string[];
    rows: object[];
}

function getAge(entry: Transaction): string {
    const age = `${formatDistanceToNow(
        new Date(entry.id.valid_start_at)
    )} ago `;
    if (age.toString() === "less than a minute ago ") return "<1";
    return age;
}

function getFrom(entry: Transaction): string {
    for (const tx of entry.transfers) {
        if (tx.type === "value" && tx.amount < 0) {
            return tx.account;
        }
    }
    return "";
}

function getTo(entry: Transaction): string {
    for (const tx of entry.transfers) {
        if (tx.type === "value" && tx.amount > 0) {
            return tx.account;
        }
    }
    return "";
}

function getValue(entry: Transaction): string {
    for (const tx of entry.transfers) {
        if (tx.type === "value" && tx.amount > 0) {
            return formatHbar(
                new BigNumber(
                    convert(tx.amount.toString(), Unit.Tinybar, Unit.Hbar)
                )
            );
        }
    }
    return "";
}

export default createComponent({
    components: { MaterialDesignIcon },
    props: {
        tableHeader: Boolean,
        rows: Array,
        columns: Array
    },

    setup(props) {
        return {
            props,
            getAge,
            getFrom,
            getTo,
            logoKabuto,
            mdiRayStartArrow,
            getValue
        };
    }
});
</script>

<style lang="postcss" scoped>
.table-card {
    background-color: var(--color-white);
    border-radius: 5px;
    display: block;
    margin-block-end: auto;
    margin-block-start: 20px;
    max-width: 300px;
    min-width: 300px;
    overflow-x: auto;
}

table {
    border-collapse: collapse;
    width: 100%;
}

.table-header {
    padding-block-end: 15px;
    padding-block-start: 5px;
    text-align: center;
}

.entry-rows {
    display: grid;
    grid-template-areas:
        "to-from value-fee"
        "age age";
    grid-template-columns: 25% 8% 25% 42%;
}

td {
    padding: 5px;
}

.entries {
    border-top: 1px solid #e3e3e3;
    font-size: 10pt;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.to-from {
    color: var(--color-california-orange);
    padding-block-start: 18px;
    padding-inline-end: 0;
    padding-inline-start: 0;
}

.icon {
    color: var(--color-basalt-grey);
    margin-block-start: 3px;
    margin-inline-start: 5px;
    opacity: 0.5;
    transform: scale(1, 1);
}

.value {
    display: inline-block;
    max-width: 132px;
    overflow: hidden;
    padding-inline-end: 10px;
    text-overflow: ellipsis;
    vertical-align: bottom;
    white-space: nowrap;
}

.age-entry {
    font-size: 8pt;
    grid-area: age;
    margin-block-end: auto;
    margin-block-start: auto;
}

tr:last-child {
    border-top: 1px solid #e3e3e3;
    text-align: center;
}

.table-footer {
    color: var(--color-fluorescent-red-orange);
    font-size: 22px;
    font-weight: 500;
    padding-block-start: 15px;
}

.logo {
    margin-block-start: -6px;
    margin-inline-start: 2px;
}

div {
    padding: 5px;
}
</style>
