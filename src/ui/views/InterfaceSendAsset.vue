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
                @click="handleSubmitTransaction"
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

        <ModalSuccess
            v-model="state.modalSuccessState"
            @dismiss="handleModalSuccessDismiss"
        >
            <div class="success">
                <i18n path="modalSuccess.txId">
                    <strong>{{ state.transactionId }}</strong>
                </i18n>
            </div>
        </ModalSuccess>
    </InterfaceForm>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "@vue/composition-api";
import Vue from "vue";
import { BigNumber } from "bignumber.js";

import Button from "../components/Button.vue";
import InterfaceForm from "../components/InterfaceForm.vue";
import OptionalMemoField from "../components/OptionalMemoField.vue";
import ModalAddTransfer from "../components/ModalAddTransfer.vue";
import ModalEditTransfer from "../components/ModalEditTransfer.vue";
import ModalSuccess from "../components/ModalSuccess.vue";
import ModalTransferSummary from "../components/ModalTransferSummary.vue";
import TransferList from "../components/TransferList.vue";
import { Transfer } from "../../domain/transfer";
import { actions, getters } from "../store";

export default defineComponent({
    name: "InterfaceSendAsset",
    components: {
        Button,
        ModalSuccess,
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
            modalConfirm: { isOpen: false, transfers: [] as Transfer[], memo: "" },
            transactionId: "",
            modalSuccessState: { isOpen: false }
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

            // NOT A TODO: should maybe make this a handle a little better
            state.disabled = false;

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

        async function handleSubmitTransaction(): Promise<void> {
            state.busy = true;

            if (state.memo == null || state.memo === "") {
                state.memo = " "; // Hack for Nano X paging
            }

            const client = getters.currentUser().session.client;

            const { TransferTransaction, Hbar } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");

            try {
                const tx = new TransferTransaction()
                    .setTransactionMemo(state.memo)
                    .setMaxTransactionFee(new Hbar(10));

                // NOT A TODO: first group the transfers in a unique map, you can only add
                //             (account, asset) pairs at most once

                state.transfers.forEach((transfer) => {
                    if (transfer.asset === "Hbar") {
                        console.log("sending hbar", transfer.amount.toString(), "to", transfer.to);

                        tx.addHbarTransfer(transfer.to, new Hbar(transfer.amount));
                        tx.addHbarTransfer(getters.currentUser().session.account, new Hbar(transfer.amount.negated()));
                    } else {
                        const decimals = getters.currentUserTokens()!.filter(
                            (token) => token.tokenId.toString() === transfer.asset
                        )[ 0 ].decimals;

                        const scaleFactor = new BigNumber(
                            Math.pow(10, decimals)
                        );

                        const scaledAmount = new BigNumber(transfer.amount!).multipliedBy(scaleFactor);

                        console.log("transfer token", transfer.asset, "to", transfer.to, "amount", scaledAmount.toString());

                        tx.addTokenTransfer(transfer.asset, transfer.to, scaledAmount);
                        tx.addTokenTransfer(transfer.asset, getters.currentUser().session.account, scaledAmount.negated());
                    }
                });

                const transactionIntermediate = await tx.execute(client);
                const receipt = await transactionIntermediate.getReceipt(client);

                if (receipt != null) {
                    const { shard, realm, account } = transactionIntermediate.accountId;
                    const { seconds, nanos } = transactionIntermediate.validStart;

                    // build the transaction id from the data.
                    state.transactionId = `${shard}.${realm}.${account}@${seconds}.${nanos}`;
                }

                // Refresh Balance
                await actions.refreshBalancesAndRate();

                // eslint-disable-next-line require-atomic-updates
                state.modalSuccessState.isOpen = true;

                // NOT A TODO: handle errors
            } finally {
                // eslint-disable-next-line require-atomic-updates
                state.busy = false;
            }
        }

        function handleModalSuccessDismiss(): void {
            state.modalSuccessState.isOpen = false;
            state.busy = false;
            state.transfers = [];
            state.memo = "";
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
            transferListKey,
            handleModalSuccessDismiss
        };
    }
});
</script>

<style lang="postcss" scoped>
</style>
