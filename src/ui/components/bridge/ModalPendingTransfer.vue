<template>
    <div id="modal-pending-transfer">
        <Modal
            :is-open="state.isOpen"
            not-closable
            :title="$t('interfacePendingTransfer.title')"
            @change="handleChange"
        >
            <div class="description">
                You have unclaimed assets on the Polygon network. <br>Select the transaction which you would like to claim.
            </div>
            <div class="modal-header">
                <Select
                    v-model="state.selectedTransaction"
                    class="select-transaction"
                    :options="state.transactionIds"
                    @change="handleSelectChange"
                />
                <ConnectWalletButton
                    :address="state.metamask ? state.metamask.croppedSelectedAddress() : $t('interfaceWrapHbar.connectWallet')"
                    @connect="handleConnectToMetamask"
                />
            </div>
            <TransferSummary
                :asset="state.asset"
                :receiver="state.receiver"
                :amount="state.amount"
                :service-fee="state.serviceFee"
                :total-to-receive="state.totalToReceive"
            />
            <Notice><div v-html="state.noticeText" /></Notice>

            <template>
                <div class="buttons-containter">
                    <Button
                        :busy="state.claimBusy"
                        :compact="true"
                        :disabled="state.claimDisabled ? true : false"
                        :label="$t('interfaceWrapHbar.claim')"
                        @click="handleClaim"
                    />
                </div>
            </template>
        </Modal>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from "@vue/composition-api";

import Button from "../Button.vue";
import Modal from "../Modal.vue";
import Notice from "../Notice.vue";
import InfoButton from "../InfoButton.vue";
import Select from "../Select.vue";
import ConnectWalletButton from "../bridge/ConnectWalletButton.vue";
import { MetamaskService } from "../../../service/bridge/metamask/metamask";

import TransferSummary from "./TransferSummary.vue";

export interface PendingTransaction {
    amount: string;
    asset: string;
    receiver: string;
    serviceFee: string;
    totalToReceive: string;
    transactionId: string;
}

export interface State {
    isOpen: boolean;
    isBusy: boolean;
    noticeText: string;
    claimDisabled: boolean;
    claimBusy: boolean;
    asset: string;
    receiver: string;
    amount: string;
    serviceFee: string;
    totalToReceive: string;
    pendingTransactions: PendingTransaction[];
    transactionIds: string[];
    metamask: MetamaskService;
    depositCompleted: boolean;
    selectedTransaction: string;
}

export default defineComponent({
    name: "ModalPendingTransfer",
    props: { state: Object as PropType<State> },
    components: {
        TransferSummary,
        Button,
        Modal,
        Notice,
        Select,
        InfoButton,
        ConnectWalletButton
    },
    model: {
        prop: "state",
        event: "change"
    },
    setup(props, context: SetupContext): object {
        function handleChange(): void {
            context.emit("change", { ...props.state, isOpen: false, isBusy: false });
        }

        function handleClaim(): void {
            if (!props.state?.claimBusy) {
                context.emit("claim");
            }
        }

        function handleConnectToMetamask(): void {
            context.emit("connectMetamask");
        }

        function handleSelectChange(changedTo: string): void {
            const selectedTransaction = props.state?.pendingTransactions.filter((t: PendingTransaction) => t.transactionId === changedTo);
            if (selectedTransaction) {
                context.emit("changeSelectedPendingTransaction", { selectedTransaction });
            }
        }

        // const transactions = computed(() => {
        //     context.emit("fuckoff");
        //     if (props.state?.pendingTransactions) {
        //         return props.state?.pendingTransactions.map((t: any) => t.asset);
        //     }
        //     return [ ];
        // });

        return {
            props,
            handleChange,
            handleClaim,
            handleConnectToMetamask,
            handleSelectChange
        };
    }
});

</script>

<style lang="postcss" scoped>
.description{
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #BDBDBD;
    margin-bottom: 15px;
}

.modal-header{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.buttons-containter{
    width: 100%;
    display: flex;
    justify-content: center;
}

.buttons-containter button{
    width: 40%;
    margin: 5%;
}

.status-info > p{
    color: #62C0AA;
    text-align: center;
    font-size: 12px;
}
</style>

<style>

#modal-pending-transfer {
    font-family: Montserrat;
    font-style: normal;
}

#modal-pending-transfer .select-value-container {
    border: 1px solid #62c0aa;
    border-radius: 4px;
    box-sizing: border-box;
    width: 280px !important;
    margin: 0 !important;
}

#modal-pending-transfer .select-value-container {
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: bold;
    line-height: 17px;
}

#modal-pending-transfer .select-option {
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: bold;
    line-height: 17px;
    width: 280px !important;
}

#modal-pending-transfer .select-menu {
    width: 280px !important;
}

#modal-pending-transfer .notice{
    background: rgba(98, 192, 170, 0.1);
    border-radius: 5px;
    align-items: center;
    justify-content: center;
}

#modal-pending-transfer .notice .message{
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #62C0AA;
    text-align: center;
}

#modal-pending-transfer .icon{
    width: 15px;
    margin-left: 2px;
}

</style>
