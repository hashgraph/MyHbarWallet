<template>
    <Modal
        :is-open="state.modalIsOpen"
        :not-closable="state.isBusy"
        title="Access by Private Key"
        @change="handleModalChangeIsOpen"
    >
        <template v-slot:banner>
            <Warning />
        </template>
        <div class="modal-access-by-private-key">
            <TextInput
                ref="input"
                placeholder="Enter Private Key"
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
import Warning from "../components/Warning.vue";
import TextInput, {
    Component as TextInputComponent
} from "../components/TextInput.vue";
import Button from "../components/Button.vue";
import Modal from "../components/Modal.vue";
import CustomerSupportLink from "../components/CustomerSupportLink.vue";
import { createComponent, PropType, watch } from "vue-function-api";

export interface State {
    modalIsOpen: boolean;
    privateKey: string;
    isBusy: boolean;
}

export default createComponent({
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
        state: (Object as unknown) as PropType<State>
    },
    setup(props, context) {
        function handleModalChangeIsOpen(isOpen: boolean) {
            context.emit("change", { ...props.state, modalIsOpen: isOpen });
        }

        function handlePrivateKeyInput(privateKey: string) {
            context.emit("change", { ...props.state, privateKey });
        }

        // Focus the single text input when the modal is opened
        watch(
            () => props.state.modalIsOpen,
            (newVal: boolean) => {
                if (newVal) {
                    // FIXME: How to remove the _ unknown _ hack ?
                    ((context.refs
                        .input as unknown) as TextInputComponent).focus();
                }
            }
        );

        return {
            handleModalChangeIsOpen,
            handlePrivateKeyInput
        };
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
