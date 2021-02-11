<template>
    <div class="transfer-list">
        <div class="transfer-label">
            {{ $t("transferList.transfers") }}
        </div>
        <div
            v-if="table"
            class="header"
        >
            <span>{{ $t("transferList.recipient") }}</span>
            <span>{{ $t("transferList.asset") }}</span>
            <span>{{ $t("transferList.amount") }}</span>
        </div>
        <div class="transfer-inner-list">
            <div
                v-for="(transfer, index) in transfers"
                :key="index"
                class="transfer"
            >
                <span class="transfer-to">{{ transfer.to.toString() }}</span>
                <span class="transfer-asset">{{ transfer.asset }}</span>
                <span class="transfer-amount">{{ transfer.amount.toString() }}</span>
                <MaterialDesignIcon
                    v-if="!table"
                    :icon="mdiDelete"
                    class="transfer-delete"
                    @click="$emit('delete', index)"
                />
            </div>
        </div>
        <Button
            v-if="!table"
            compact
            label="Add Transfer"
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
    props: { table: Boolean, transfers: { type: Array as PropType<Transfer[]>, required: true }},
    setup() {
        return {
            mdiFileEdit,
            mdiDelete
        };
    }
});
</script>

<style lang="postcss" scoped>
.header {
    display: flex;
    width: 100%;
}

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
    flex-basis: 100px;
    flex: 1;
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
