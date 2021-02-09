<template>
    <InterfaceForm
        :title="$t('interfaceSendAsset.title')"
        @submit.prevent.stop="handleSubmit"
    >
        <template>
            <TransferList
                :key="transferListKey"
                :transfers="state.transfers"
                @add="handleAddTransfer"
                @edit="handleEditTransfer"
                @delete="handleDeleteTransfer"
            />

            <OptionalMemoField
                v-model="state.memo"
            />
        </template>

        <template v-slot:footer>
            <Button
                type="submit"
                :busy="state.busy"
                :disabled="state.disabled"
                :label="$t('interfaceSendAsset.send')"
                @click="handleConfirmTransaction"
            />
        </template>

        <ModalAddTransfer
            v-model="state.modalAdd"
            @submit="handleAddSubmit"
        />

        <ModalEditTransfer
            v-model="state.modalEdit"
            @submit="handleEditSubmit"
        />

        <ModalTransferSummary
            v-model="state.modalConfirm"
            @submit="handleSubmitTransaction"
        />
    </InterfaceForm>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "@vue/composition-api";
import Vue from "vue";

import Button from "../components/Button.vue";
import InterfaceForm from "../components/InterfaceForm.vue";
import OptionalMemoField from "../components/OptionalMemoField.vue";
import ModalAddTransfer from "../components/ModalAddTransfer.vue";
import ModalEditTransfer from "../components/ModalEditTransfer.vue";
import ModalTransferSummary from "../components/ModalTransferSummary.vue";
import TransferList from "../components/TransferList.vue";
import { Transfer } from "../../domain/transfer";

export default defineComponent({
    name: "InterfaceSendAsset",
    components: {
        Button,
        InterfaceForm,
        OptionalMemoField,
        ModalAddTransfer,
        ModalEditTransfer,
        ModalTransferSummary,
        TransferList
    },
    setup() {
        const state = reactive({
            currentIndex: -1,
            transfers: [] as Transfer[],
            memo: "",
            busy: false,
            disabled: true,
            modalAdd: { isOpen: false },
            modalEdit: { isOpen: false, transfer: null as Transfer | null },
            modalConfirm: { isOpen: false, transfers: [] as Transfer[], memo: "" }
        });

        const transferListKey = ref(0);

        function handleAddTransfer(): void {
            state.currentIndex = -1;

            Vue.nextTick(() => {
                state.modalAdd.isOpen = true;
            });
        }

        function handleAddSubmit(transfer: Transfer): void {
            state.transfers.push(transfer);

            Vue.nextTick(() => {
                state.modalAdd.isOpen = false;
                transferListKey.value += 1;
            });
        }

        function handleEditTransfer(index: number): void {
            state.currentIndex = index;
            state.modalEdit.transfer = state.transfers[ index ];

            Vue.nextTick(() => {
                state.modalEdit.isOpen = true;
            });
        }

        function handleEditSubmit(transfer: Transfer): void {
            state.transfers.splice(state.currentIndex, 1, transfer);

            Vue.nextTick(() => {
                state.modalEdit.isOpen = false;
                transferListKey.value += 1;
                state.modalEdit.transfer = null;
            });
        }

        function handleDeleteTransfer(index: number): void {
            state.currentIndex = -1;

            if (state.transfers.length >= index + 1) {
                state.transfers.splice(index, 1);
            }

            Vue.nextTick(() => {
                transferListKey.value += 1;
            });
        }

        function handleConfirmTransaction(): void {
            state.modalConfirm.transfers = state.transfers;
            state.modalConfirm.memo = state.memo;

            Vue.nextTick(() => {
                state.modalConfirm.isOpen = true;
            });
        }

        function handleSubmitTransaction(): void {
            Vue.nextTick(() => {
                state.modalConfirm.transfers = [];
                state.modalConfirm.memo = "";
                state.modalConfirm.isOpen = false;
            });
        }

        return {
            state,
            handleAddTransfer,
            handleAddSubmit,
            handleEditTransfer,
            handleEditSubmit,
            handleDeleteTransfer,
            handleConfirmTransaction,
            handleSubmitTransaction,
            transferListKey
        };
    }
});
</script>

<style lang="postcss" scoped>
</style>
