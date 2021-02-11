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
                @delete="handleDeleteTransfer"
            />

            <OptionalMemoField
                v-model="state.memo"
            />
        </template>

        <template v-slot:footer>
            <div
                v-if="state.errorMessage !== ''"
                class="error"
            >
                {{ state.errorMessage }}
            </div>
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

        <ModalSuccess
            v-model="state.modalSuccess"
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
import ModalSuccess from "../components/ModalSuccess.vue";
import TransferList from "../components/TransferList.vue";
import { Asset, Transfer } from "../../domain/transfer";
import { actions, getters } from "../store";

export default defineComponent({
    name: "InterfaceSendAsset",
    components: {
        Button,
        ModalSuccess,
        InterfaceForm,
        OptionalMemoField,
        ModalAddTransfer,
        TransferList
    },
    setup() {
        const state = reactive({
            transfers: [] as Transfer[],
            memo: "",
            busy: false,
            disabled: true,
            errorMessage: "",
            transactionId: "",
            modalAdd: { isOpen: false },
            modalSuccess: { isOpen: false }
        });

        const transferListKey = ref(0);

        function handleAddTransfer(): void {
            Vue.nextTick(() => {
                state.errorMessage = "";
                state.modalAdd.isOpen = true;
            });
        }

        function handleAddSubmit(transfer: Transfer): void {
            state.transfers.push(transfer);
            state.disabled = false;

            Vue.nextTick(() => {
                state.modalAdd.isOpen = false;
                transferListKey.value += 1;
            });
        }

        function handleDeleteTransfer(index: number): void {
            if (state.transfers.length >= index + 1) {
                state.transfers.splice(index, 1);
            }

            Vue.nextTick(() => {
                state.errorMessage = "";
                transferListKey.value += 1;
            });
        }

        async function handleSubmitTransaction(): Promise<void> {
            state.busy = true;

            const client = getters.currentUser().session.client;

            const { TransferTransaction, Hbar } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");

            try {
                const tx = new TransferTransaction()
                    .setTransactionMemo(state.memo)
                    .setMaxTransactionFee(new Hbar(10));

                // first group the transfers in a unique map, you can only add
                // (account, asset) pairs at most once
                state.transfers.forEach((transfer) => {
                    if (transfer.asset === Asset.Hbar) {
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

                Vue.nextTick(() => {
                    state.modalSuccess.isOpen = true;
                });
            } catch (error) {
                const result = await actions.handleHederaError({ error, showAlert: true });
                state.errorMessage = result.message;
            } finally {
                // eslint-disable-next-line require-atomic-updates
                state.busy = false;
            }
        }

        function handleModalSuccessDismiss(): void {
            Vue.nextTick(() => {
                state.modalSuccess.isOpen = false;
                state.busy = false;
                state.transfers = [];
                state.memo = "";
            });
        }

        return {
            state,
            handleAddTransfer,
            handleAddSubmit,
            handleDeleteTransfer,
            handleSubmitTransaction,
            transferListKey,
            handleModalSuccessDismiss
        };
    }
});
</script>

<style lang="postcss" scoped>
.error {
    color: var(--color-coral-red);
}
</style>
