<template>
    <div id="modal-wrap-tokens">
        <Modal
            :is-open="state.isOpen"
            not-closable
            :title="$t('interfaceWrapHbar.title')"
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
            <template v-if="!state.depositCompleted">
                <p class="fee-display">
                    <span class="fee-label">{{ $t("interfaceWrapHbar.hedera.fee") }}<InfoButton :message="$t('interfaceWrapHbar.hederaFeeInfo')" /></span>
                    <span class="fee-value">0.1</span>
                </p>
            </template>
            <template>
                <div class="buttons-containter">
                    <Button
                        :busy="state.depositBusy"
                        :disabled="state.depositDisabled"
                        :compact="true"
                        :label="$t('interfaceWrapHbar.deposit')"
                        @click="handleDeposit"
                    />
                    <Button
                        :busy="state.claimBusy"
                        :compact="true"
                        :disabled="state.claimDisabled"
                        :label="$t('interfaceWrapHbar.claim')"
                        @click="handleClaim"
                    />
                </div>
            </template>

            <template>
                <div class="steps-component">
                    <div class="steps-display">
                        <span class="step-wrapper">
                            <span
                                class="step1"
                                :class="{ 'step-inactive': state.depositCompleted }"
                            >1</span>
                            <span
                                class="step1-label"
                                :class="{ 'step-label-inactive': state.depositCompleted }"
                            >{{ $t('interfaceWrapHbar.deposit') }}</span>
                        </span>
                        <span class="middle" />
                        <span class="step-wrapper">
                            <span
                                class="step2"
                                :class="{ 'step-inactive': !state.depositCompleted }"
                            >2</span>
                            <span
                                class="step2-label"
                                :class="{ 'step-label-inactive': !state.depositCompleted }"
                            >{{ $t('interfaceWrapHbar.claim') }}</span>
                        </span>
                    </div>
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
    claimDisabled: boolean;
    depositBusy: boolean;
    claimBusy: boolean;
    depositCompleted: boolean;
    asset: string;
    receiver: string;
    amount: string;
    serviceFee: string;
    totalToReceive: string;
    hederaNetworkFee: string;
}

export default defineComponent({
    name: "ModalWrapTokens",
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
        function handleClaim(): void {
            if (!props.state?.claimBusy) {
                context.emit("claim");
            }
        }

        return {
            props,
            handleChange,
            handleDeposit,
            handleClaim
        };
    }
});

</script>

<style lang="postcss" scoped>
.buttons-containter{
    width: 100%;
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

.steps-component{
    margin-left: 10px;
    margin-right: 10px;
}

.steps-display{
    display: flex;
    align-items: center;
    width: 70%;
    margin: auto;
}

.step-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.step1, .step2{
    display: inline-block;
    text-align: center;
    line-height: 26px;
    width: 26px;
    height: 26px;
    color: #62C0AA;
    background-color: rgba(98, 192, 170, 0.2);
    border: 1px solid rgba(98, 192, 170, 0.2);;
    border-radius: 13px;
}

.step-inactive{
    background-color: rgba(0, 0, 0, 0.05);
    color: #BDBDBD;
}

.step1-label, .step2-label{
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;
    margin-left: 10px;
    margin-right: 10px;
    color: #62C0AA;
}

.step-label-inactive{
    color: #BDBDBD;
}

.middle{
    flex-grow: 1;
    border-bottom: 2px solid #E5E5E5;
    margin-bottom: 20px
}

.status-info > p{
    color: #62C0AA;
    text-align: center;
    font-size: 12px;
}

</style>

<style>

#modal-wrap-tokens {
    font-family: Montserrat;
    font-style: normal;
}

#modal-wrap-tokens .notice{
    background: rgba(98, 192, 170, 0.1);
    border-radius: 5px;
    align-items: center;
    justify-content: center;
}

#modal-wrap-tokens .notice .message{
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #62C0AA;
    text-align: center;
}

#modal-wrap-tokens .icon{
    width: 15px;
    margin-left: 2px;
}

</style>
