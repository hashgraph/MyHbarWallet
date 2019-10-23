<template>
    <div class="table-card">
        <div class="table-container">
            <table>
                <div class="table-header">
                    Latest Transactions
                </div>
                <tbody>
                    <tr
                        v-for="entry in rows.slice(0, 6)"
                        :key="entry.hash"
                        class="entry-rows"
                    >
                        <td class="entries">
                            <div>From {{ getFrom(entry) }}</div>
                            <div>To {{ getTo(entry) }}</div>
                        </td>
                        <td class="entries">
                            <div>
                                Value {{ (entry.value / 100000000).toFixed(2) }}
                            </div>
                            <div>
                                Fee {{ (entry.fee / 100000000).toFixed(2) }}
                            </div>
                        </td>
                        <div class="age-entry">
                            {{ getAge(entry) }}
                        </div>
                    </tr>
                    <tr>
                        <td center colspan="3">
                            <router-link class="view-all" :to="{ name: 'txs' }">
                                Powered By Kabuto
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";
import { formatDistanceToNow } from "date-fns";
import { Transaction } from "../transactions";

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

export default createComponent({
    components: {},
    props: {
        tableHeader: Boolean,
        rows: Array,
        columns: Array
    },

    setup(props) {
        return { props, getAge, getFrom, getTo };
    }
});
</script>

<style lang="postcss" scoped>
.table-card {
    display: block;
    overflow-x: auto;
}

table {
    border-collapse: collapse;
    max-width: 45vw;
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
    grid-template-columns: 50% 50%;
    grid-template-rows:
        calc(100% * (2 / 3) - (30px / 3))
        calc(100% * (1 / 3) - (30px / 3));
}

td {
    padding: 10px;
}

.entries {
    border-top: 1px solid #e3e3e3;
    font-size: 10pt;
}

.age-entry {
    font-size: 10pt;
    grid-area: age;
    margin-block-end: auto;
    margin-block-start: auto;
    padding: 10px;
    text-align: center;
}

tr:last-child {
    border-top: 1px solid #e3e3e3;
    text-align: center;
}

div {
    padding: 5px;
}
</style>
