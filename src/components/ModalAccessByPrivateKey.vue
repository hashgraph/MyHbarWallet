<template>
    <Modal
        :is-open="state.modalIsOpen"
        :not-closable="state.isBusy"
        title="Access by Private Key"
        @change="handleModalChangeIsOpen"
    >
        <template v-slot:banner>
            <Warning title="NOT RECOMMENDED">
                This is not a recommended way to access your wallet. Due to the
                Sensitivity of the information involved, these options should
                only be used in offline settings by experienced users.
            </Warning>
        </template>
        <div class="modal-access-by-private-key">
            <TextInput
                show-validation
                label="Private Key"
                :valid="state.privateKey.length > 0"
                can-copy
                can-clear
                multiline
                placeholder="Enter Private Key"
                resizable
                :value="state.privateKey"
                @input="handlePrivateKeyInput"
            />
            <Button
                class="button-access-wallet"
                label="Access Account"
                :busy="state.isBusy"
                :disabled="state.privateKey.length === 0"
                @click="$emit('submit')"
            />
            <CustomerSupportLink />
        </div>
    </Modal>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import Warning from "../components/Warning.vue";
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";
import Modal from "../components/Modal.vue";
import CustomerSupportLink from "../components/CustomerSupportLink.vue";

export interface State {
    modalIsOpen: boolean;
    privateKey: string;
    isBusy: boolean;
}

export default Vue.extend({
    components: {
        Button,
        Modal,
        CustomerSupportLink,
        TextInput,
        Warning
    },
    model: {
        prop: "state",
        event: "change"
    },
    props: {
        state: { type: Object, required: true } as PropOptions<State>
    },
    methods: {
        handleModalChangeIsOpen(isOpen: boolean) {
            this.$emit("change", { ...this.state, modalIsOpen: isOpen });
        },
        handlePrivateKeyInput(privateKey: string) {
            this.$emit("change", { ...this.state, privateKey });
        }
    }
});
</script>

<style lang="postcss" scoped>
.modal-access-by-private-key {
    align-items: stretch;
    display: flex;
    flex-direction: column;
}

.button-access-wallet {
    margin-block: 10px 20px;
}
</style>
