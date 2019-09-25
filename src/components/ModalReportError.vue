<template>
    <Modal :is-open="isOpen" hide-decoration @change="this.$listeners.change">
        <template>
            <div class="modal-container">
                <div class="header">Something went wrong.</div>
                <div class="sub-header">
                    Do you want to inform MHW about this error?
                </div>

                <div class="stack-trace">
                    error in
                    /home/josh/Projects/github.com/hashgraph/MyHbarWallet/src/components/ModalFeeSummaryItems.vue
                    ERROR in
                    /home/josh/Projects/github.com/hashgraph/MyHbarWallet/src/components/ModalFeeSummaryItems.vue(152,13):
                    152:13 Type 'SplitItem[]' is not assignable to type '(string
                    | null)[]'. Type 'SplitItem' is not assignable to type
                    'string'. 150 | } 151 | > 152 | state.splitItems = items; |
                    ^ 153 | }); 154 | 155 | return { error in
                    /home/josh/Projects/github.com/hashgraph/MyHbarWallet/src/views/InterfaceCreateAccount.vue
                    ERROR in
                    /home/josh/Projects/github.com/hashgraph/MyHbarWallet/src/views/InterfaceCreateAccount.vue(152,17):
                    152:17 Type 'Item[]' is not assignable to type '(string |
                    (() => BigNumber))[]'. Type 'Item' is not assignable to type
                    'string | (() => BigNumber)'. Type 'Item' is not assignable
                    to type '() => BigNumber'. Type 'Item' provides no match for
                    the signature '(): BigNumber'. 150 |
                    validateHbar(newBalance); 151 | state.summaryAmount =
                    formatHbar(newBalanceHbar); > 152 | state.summaryItems = [ |
                    ^ 153 | { 154 | description: "Initial Balance", 155 | value:
                    state.validBalance error in
                    /home/josh/Projects/github.com/hashgraph/MyHbarWallet/src/views/InterfaceSendTransfer.vue
                    ERROR in
                    /home/josh/Projects/github.com/hashgraph/MyHbarWallet/src/views/InterfaceSendTransfer.vue(149,17):
                    149:17 Type 'Item[]' is not assignable to type '(string |
                    (() => BigNumber))[]'. 147 | state.summaryAmount =
                    formattedAmount; 148 | > 149 | state.summaryItems = [ | ^
                    150 | { 151 | description: context.root 152 |
                    .$t("interfaceSendTransfer.transferAmount") ERROR Build
                    failed with errors. error Command failed with exit code 1.
                </div>

                <div class="button-group">
                    <Button
                        class="button-cancel"
                        label="Cancel"
                        :outline="true"
                        :compact="true"
                    />
                    <Button class="button-send" label="Send" :compact="true" />
                </div>
            </div>
        </template>
    </Modal>
</template>

<script>
import Modal from "../components/Modal.vue";
import Button from "../components/Button.vue";
import { createComponent } from "@vue/composition-api";

export default createComponent({
    components: {
        Button,
        Modal
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    setup() {
        console.log("hi");

        return {
            isOpen: true
        };
    }
});
</script>

<style lang="postcss" scoped>
.button-group {
    display: flex;
    justify-content: space-between;
    justify-self: center;
}

.button-cancel,
.button-send {
    min-width: initial;
    width: 48.2%;
}

.stack-trace {
    color: var(--color-christmas-pink);
    font-family: monospace;
    font-size: 13px;
    margin-block: 40px;
    max-height: 300px;
    overflow-x: hidden;
    overflow-y: scroll;
}

.header {
    color: var(--color-ghostlands-coal);
    display: flex;
    font-size: 32px;
    font-weight: 700;
    justify-content: center;
    margin-block-end: 20px;
    max-width: 300px;
    text-align: center;
}

.sub-header {
    color: var(--color-china-blue);
    font-size: 14px;
}

.modal-container {
    align-items: center;
    display: flex;
    flex-flow: column;
    padding: 20px;
}
</style>
