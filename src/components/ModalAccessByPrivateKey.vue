<template>
  <Modal
    :is-open="state.isOpen"
    :not-closable="state.isBusy"
    :title="$t('modalAccessByPrivateKey.title')"
    @change="handleModalChangeIsOpen"
  >
    <template v-slot:banner>
      <Warning
        :message="
          $t('warning.thisIsNotARecommendedWayToAccessYourWallet')
        "
        :title="$t('warning.title')"
      />
    </template>
    <form
      class="modal-access-by-private-key"
      @submit.prevent="$emit('submit')"
    >
      <TextInput
        ref="input"
        :placeholder="$t('modalAccessByPrivateKey.enterPrivateKey')"
        :spellcheck-disabled="true"
        :valid="valid"
        :value="state.rawPrivateKey"
        show-validation
        @input="handlePrivateKeyInput"
      />
      <Button
        :busy="state.isBusy"
        :disabled="!valid"
        :label="$t('modalAccessByPrivateKey.accessAccount')"
        class="button-access-wallet"
      />
      <CustomerSupportLink />
    </form>
  </Modal>
</template>

<script lang="ts">
import { createComponent, PropType, ref, SetupContext, watch } from "@vue/composition-api";

import Warning from "../components/Warning.vue";
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";
import Modal from "../components/Modal.vue";
import CustomerSupportLink from "../components/CustomerSupportLink.vue";

export interface State {
    isOpen: boolean;
    rawPrivateKey: string;
    isBusy: boolean;
}

export default createComponent({
    name: "ModalAccessByPrivateKey",
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
    props: { state: Object as PropType<State> },
    setup(props: { state: State }, context: SetupContext) {
        const valid = ref<boolean>(false);
        const input = ref<HTMLInputElement | null>(null);

        // eslint-disable-next-line unicorn/consistent-function-scoping
        async function isValid(): Promise<boolean> {
            try {
                const { Ed25519PrivateKey } = await import("@hashgraph/sdk");
                Ed25519PrivateKey.fromString(props.state.rawPrivateKey);
                return true;
            } catch (error) {
                return false;
            }
        }

        watch(
            () => props.state.rawPrivateKey,
            () => {
                if (props.state.rawPrivateKey.length === 0) {
                    // Back out now if we have an empty value
                    valid.value = false;
                }

                // eslint-disable-next-line promise/catch-or-return,promise/always-return
                isValid().then((result) => {
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
