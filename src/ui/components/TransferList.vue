<template>
    <div class="transfer-list">
        <div
            v-if="!table"
            class="editor"
        >
            <div
                v-for="(transfer, index) in transfers"
                :key="index"
                class="transfer"
            >
                <span>{{ transfer.from.toString() }}</span>
                <span>{{ transfer.to.toString() }}</span>
                <span>{{ transfer.asset }}</span>
                <span>{{ transfer.amount.toString() }}</span>
                <MaterialDesignIcon
                    :icon="mdiFileEdit"
                    @click="$emit('edit', index)"
                />
                <MaterialDesignIcon
                    :icon="mdiDelete"
                    @click="$emit('delete', index)"
                />
            </div>
            <Button
                compact
                label="Add"
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
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 100%;
}

.transfer {
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-block-end: 5px;
}
</style>
