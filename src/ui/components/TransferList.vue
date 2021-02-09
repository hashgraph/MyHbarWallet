<template>
    <div class="transfer-list">
        <div
            v-if="!table"
            class="editor"
        >
            <div class="transfer-label">Transfers</div>
            <div class="transfer-inner-list">
                <div
                    v-for="(transfer, index) in transfers"
                    :key="index"
                    class="transfer"
                >
                    <span class="transfer-to">{{ transfer.to.toString() }}</span>
                    <span class="transfer-asset">{{ transfer.asset }}</span>
                    <span class="transfer-amount">{{ transfer.amount.toString() }}</span>
                    <!-- <MaterialDesignIcon
                        :icon="mdiFileEdit"
                        @click="$emit('edit', index)"
                    /> -->
                    <MaterialDesignIcon
                        :icon="mdiDelete"
                        class="transfer-delete"
                        @click="$emit('delete', index)"
                    />
                </div>
            </div>
            <Button
                compact
                label="Add Transfer"
                @click="$emit('add')"
            />
        </div>
        <div
            v-else
            class="table"
        >
            <!-- TODO Summarize List -->
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "@vue/composition-api";
import { mdiFileEdit, mdiDelete } from "@mdi/js";
import { BigNumber } from "bignumber.js";

import { Transfer } from "../../domain/transfer";

import Button from "./Button.vue";
import MaterialDesignIcon from "./MaterialDesignIcon.vue";

export default defineComponent({
    name: "TransferList",
    components: { Button, MaterialDesignIcon },
    props: { table: Boolean, transfers: { type: Array as PropType<Transfer[]>, required: true }},
    setup(props) {
        // hate js so much rn
        // eslint-disable-next-line sonarjs/cognitive-complexity
        const summaryTransfers = computed(() => {
            if (props.table) {
                const map = new Map<string, Map<string, BigNumber>>();

                for (const transfer of props.transfers) {
                    // For each transfer, if a record is incomplete or missing, add it
                    // If it already exists, modify it
                    // Build map of to --> asset --> amount for summary
                    if (map.has(transfer.to.toString())) {
                        const extant = map.get(transfer.to.toString());

                        if (extant) {
                            if (extant.has(transfer.asset)) {
                                const total = extant.get(transfer.asset);

                                if (total) {
                                    extant.set(
                                        transfer.asset,
                                        total.plus(transfer.amount));
                                }

                                map.set(
                                    transfer.to.toString(),
                                    extant);
                                continue;
                            }
                        }
                    }

                    map.set(
                        transfer.to.toString(),
                        new Map().set(transfer.asset, transfer.amount)
                    );
                }

                return map;
            }

            return null;
        });

        return {
            mdiFileEdit,
            mdiDelete,
            summaryTransfers
        };
    }
});
</script>

<style lang="postcss" scoped>
.transfer-list {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.transfer-inner-list {
    background: rgba(103,157,230,0.15);
    padding: 30px;
    margin-bottom: 20px;
}

.transfer-label {
    color: var(--color-washed-black);
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
    margin-top: -15px;
}

.transfer {
    background: white;
    border: 1px solid #e0e0e0;
    align-items: center;
    display: flex;
    width: 100%;
    padding-block-end: 5px;
    padding: 20px;
    border-radius: 4px;

    & + .transfer {
       margin-top: 4px;
    }
}

.transfer-to {
    flex: 1;
}

.transfer-asset {
    flex-basis: 150px;
}

.transfer-amount {
    flex-basis: 50px;
    text-align: right;
    padding-right: 15px;
}

.transfer-delete {
    opacity: 0.5;
    cursor: pointer;

    &:hover {
        opacity: 1;
        color: var(--color-coral-red);
    }
}
</style>
