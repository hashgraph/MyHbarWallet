<template>
    <div id="modal-unwrap-tokens">
        <Modal
            :is-open="state.isOpen"
            not-closable
            :title="$t('interfaceUnWrapHbar.title')"
            @change="handleChange"
        >
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
                        :busy="state.depositBusy"
                        :disabled="state.depositDisabled"
                        :compact="true"
                        :label="$t('interfaceWrapHbar.deposit')"
                        @click="handleDeposit"
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

import TransferSummary from "./TransferSummary.vue";

export interface State {
    isOpen: boolean;
    isBusy: boolean;
    noticeText: string;
    depositDisabled: boolean;
    depositBusy: boolean;
    depositCompleted: boolean;
    asset: string;
    receiver: string;
    amount: string;
    serviceFee: string;
    totalToReceive: string;
}

export default defineComponent({
    name: "ModalUnwrapTokens",
    props: { state: Object as PropType<State> },
    components: {
        TransferSummary,
        Button,
        Modal,
        Notice,
        InfoButton
    },
    model: {
        prop: "state",
        event: "change"
    },
    setup(props, context: SetupContext): object {
        function handleChange(): void {
            context.emit("change", { ...props.state, isOpen: false, isBusy: false });
        }

        function handleDeposit(): void {
            if (!props.state?.depositBusy) {
                context.emit("deposit");
            }
        }

        return {
            props,
            handleChange,
            handleDeposit
        };
    }
});

</script>

<style lang="postcss" scoped>
.buttons-containter{
    width: 100%;
    display: flex;
    justify-content: center;
}

.buttons-containter button{
    width: 40%;
    margin: 5%;
}

.fee-display{
    display: flex;
    justify-content: space-between;
    margin-bottom: 0;
}

.fee-display .fee-label{
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #828282;
    display: flex;
    align-items: center;
}

.fee-display .fee-value{
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;
    color: #333333;
}

.status-info > p{
    color: #62C0AA;
    text-align: center;
    font-size: 12px;
}

</style>

<style>

#modal-unwrap-tokens {
    font-family: Montserrat;
    font-style: normal;
}

#modal-unwrap-tokens .notice{
    background: rgba(98, 192, 170, 0.1);
    border-radius: 5px;
    align-items: center;
    justify-content: center;
}

#modal-unwrap-tokens .notice .message{
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #62C0AA;
    text-align: center;
}

#modal-unwrap-tokens .icon{
    width: 15px;
    margin-left: 2px;
}

</style>
