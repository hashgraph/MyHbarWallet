<template>
    <div class="transfer-list">
        <!-- TODO: Transfer.vue -->
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
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { mdiFileEdit, mdiDelete } from "@mdi/js";

import { Transfer } from "../../domain/transfer";

import Button from "./Button.vue";
import MaterialDesignIcon from "./MaterialDesignIcon.vue";

export default defineComponent({
    name: "TransferList",
    components: { Button, MaterialDesignIcon },
    props: { transfers: Array as PropType<Transfer[]> },
    setup() {
        return {
            mdiFileEdit,
            mdiDelete
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
