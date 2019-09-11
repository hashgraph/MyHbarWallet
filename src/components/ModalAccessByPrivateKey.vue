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
                show-validation
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
import {
    computed,
    createComponent,
    SetupContext,
    PropType,
    watch
} from "@vue/composition-api";
import { Ed25519PrivateKey } from "@hashgraph/sdk";

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
    setup(props: { state: State }, context: SetupContext) {
        const valid = computed(() => {
            if (props.state.rawPrivateKey.length === 0) {
                // Back out now if we have an empty value
                return false;
            }

            try {
                Ed25519PrivateKey.fromString(props.state.rawPrivateKey);
                return true;
            } catch (error) {
                if (error instanceof Error) {
                    // The exception message changes depending on the input
                    if (
                        error.message ===
                        "invalid private key: " + props.state.rawPrivateKey
                    ) {
                        return false;
                    } else {
                        throw error;
                    }
                }
            }
        });

        function handleModalChangeIsOpen(isOpen: boolean): void {
            context.emit("change", { ...props.state, modalIsOpen: isOpen });
        }

        function handlePrivateKeyInput(rawPrivateKey: string): void {
            context.emit("change", { ...props.state, rawPrivateKey });
        }

        // Focus the single text input when the modal is opened
        watch(
            () => props.state.modalIsOpen,
            (newVal: boolean) => {
                if (newVal) {
                    context.emit("change", {
                        ...props.state,
                        rawPrivateKey: ""
                    });
                    if ((context as Context).refs.input != undefined) {
                        (context as Context).refs.input.focus();
                    }
                }
            }
        );

        return {
            valid,
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
