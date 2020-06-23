<template>
    <Modal
        :is-open="state.isOpen"
        :not-closable="state.isBusy"
        :title="$t('modalAccessByPrivateKey.title')"
        @change="handleModalChangeIsOpen"
    >
        <form
            class="modal-access-by-private-key"
            @submit.prevent="$emit('submit')"
        >
            <TextInput
                ref="input"
                :placeholder="$t('modalAccessByPrivateKey.enterPrivateKey')"
                :value="state.rawPrivateKey"
                :valid="valid"
                :spellcheck-disabled="true"
                show-validation
                @input="handlePrivateKeyInput"
            />
            <Button
                class="button-access-wallet"
                :label="$t('modalAccessByPrivateKey.accessAccount')"
                :busy="state.isBusy"
                :disabled="!valid"
            />
            <CustomerSupportLink />
        </form>
    </Modal>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, SetupContext, watch } from "@vue/composition-api";

import Warning from "./Warning.vue";
import TextInput from "./TextInput.vue";
import Button from "./Button.vue";
import Modal from "./Modal.vue";
import CustomerSupportLink from "./CustomerSupportLink.vue";

export interface State {
    isOpen: boolean;
    rawPrivateKey: string;
    isBusy: boolean;
}

export default defineComponent({
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
    props: { state: (Object as unknown) as PropType<State> },
    setup(props: { state: State }, context: SetupContext) {
        const valid = ref<boolean>(false);
        const input = ref<HTMLInputElement | null>(null);

        // No, it cannot be moved to enclosing scope
        // eslint-disable-next-line unicorn/consistent-function-scoping
        async function isValid(): Promise<boolean> {
            const { Ed25519PrivateKey, BadKeyError } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");

            try {
                Ed25519PrivateKey.fromString(props.state.rawPrivateKey);
                return true;
            } catch (error) {
                // The exception message changes depending on the input
                if (error instanceof BadKeyError) {
                    return false;
                }

                throw error;
            }
        }

        watch(
            () => props.state.rawPrivateKey,
            () => {
                if (props.state.rawPrivateKey.length === 0) {
                    // Back out now if we have an empty value
                    valid.value = false;
                }

                // eslint-disable-next-line promise/always-return, promise/catch-or-return
                void isValid().then((result) => {
                    valid.value = result;
                });
            }
        );

        function handleModalChangeIsOpen(isOpen: boolean): void {
            context.emit("change", { ...props.state, isOpen });
        }

        function handlePrivateKeyInput(rawPrivateKey: string): void {
            context.emit("change", { ...props.state, rawPrivateKey });
        }

        // Focus the single text input when the modal is opened
        watch(
            () => props.state.isOpen,
            (newVal: boolean) => {
                if (newVal) {
                    context.emit("change", {
                        ...props.state,
                        rawPrivateKey: ""
                    });
                    if (input.value) {
                        input.value.focus();
                    }
                }
            }
        );

        return {
            valid,
            handleModalChangeIsOpen,
            handlePrivateKeyInput,
            input
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
