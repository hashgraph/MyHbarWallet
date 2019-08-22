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
        <form
            class="modal-access-by-private-key"
            @submit.prevent="$emit('submit')"
        >
            <TextInput
                ref="input"
                placeholder="Enter Private Key"
                :value="state.rawPrivateKey"
                :valid="valid"
                :error="errorMessage"
                @input="handlePrivateKeyInput"
            />
            <Button
                class="button-access-wallet"
                label="Access Account"
                :busy="state.isBusy"
                :disabled="!valid"
            />
            <CustomerSupportLink />
        </form>
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
import { computed, createComponent, PropType, watch } from "vue-function-api";
import { SetupContext } from "vue-function-api/dist/types/vue";
import { Ed25519PrivateKey } from "hedera-sdk-js";

export interface State {
    modalIsOpen: boolean;
    rawPrivateKey: string;
    isBusy: boolean;
}

type Context = SetupContext & {
    refs: {
        input: TextInputComponent;
    };
};

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
        const valid = computed(() => {
            if (props.state.rawPrivateKey.length === 0) {
                // Back out now if we have an empty value
                return false;
            }

            try {
                // TODO: Perhaps debounce this?
                // TODO: Find a clean way to re-use the derived public key back in AccessMyAccount
                Ed25519PrivateKey.fromString(props.state.rawPrivateKey);
                return true;
            } catch (error) {
                console.warn(error);
                return false;
            }
        });

        // TODO: When this button does something, change to value, set in error handling try catch
        const errorMessage = computed(() => {
            if (!valid) {
                return "Invalid Private Key";
            }
            return "";
        });

        function handleModalChangeIsOpen(isOpen: boolean) {
            context.emit("change", { ...props.state, modalIsOpen: isOpen });
        }

        function handlePrivateKeyInput(rawPrivateKey: string) {
            context.emit("change", { ...props.state, rawPrivateKey });
        }

        // Focus the single text input when the modal is opened
        watch(
            () => props.state.modalIsOpen,
            (newVal: boolean) => {
                if (newVal) {
                    (context as Context).refs.input.focus();
                }
            }
        );

        return {
            valid,
            errorMessage,
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
