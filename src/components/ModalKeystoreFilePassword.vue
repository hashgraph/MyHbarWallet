<template>
  <div class="modal-password">
    <Modal
      :is-open="state.isOpen"
      :not-closable="state.isBusy"
      :title="$t('modalKeystoreFilePassword.title')"
      @change="handleModalChangeIsOpen"
    >
      <form @submit.prevent="handleSubmit">
        <TextInput
          ref="input"
          :error="state.error"
          :placeholder="$t('common.password.nineCharacters')"
          :value="state.password"
          class="input"
          obscure
          @input="handleInputChange"
        />
        <Button
          :busy="state.isBusy"
          :disabled="disabled"
          :label="$t('modalKeystoreFilePassword.accessWallet')"
          class="btn"
        />
      </form>
    </Modal>
  </div>
</template>

<script lang="ts">
import { computed, createComponent, PropOptions, ref, SetupContext, watch } from "@vue/composition-api";

import Button from "../components/Button.vue";
import Modal from "../components/Modal.vue";
import TextInput from "../components/TextInput.vue";
import Warning from "../components/Warning.vue";

export interface State {
    isOpen: boolean;
    password: string;
    error: string | null;
    isBusy: boolean;
}

interface Props {
    state: State;
}

export default createComponent({
    components: {
        Modal,
        Warning,
        TextInput,
        Button
    },
    props: { state: { type: Object, required: true as boolean } as PropOptions<State> },
    model: {
        prop: "state",
        event: "change"
    },
    setup(props: Props, context: SetupContext) {
        const input = ref<HTMLInputElement | null>(null);

        const disabled = computed(() => props.state.password === "" || props.state.password.length < 9);

        function handleModalChangeIsOpen(isOpen: boolean): void {
            if (!isOpen) props.state.error = null;
            context.emit("change", { ...props.state, isOpen });
        }

        function handleInputChange(value: string): void {
            props.state.error = null;
            context.emit("change", { ...props.state, password: value });
        }

        function handleSubmit(): void {
            context.emit("submit", props.state);
        }

        watch(
            () => props.state.isOpen,
            (newVal: boolean) => {
                if (newVal) {
                    context.emit("change", { ...props.state, password: "" });
                }
                if (newVal && input.value) {
                    // Clear input every time we reopen this modal
                    props.state.password = "";
                    input.value.focus();
                }
            }
        );

        return {
            disabled,
            handleModalChangeIsOpen,
            handleInputChange,
            handleSubmit,
            input
        };
    }
});
</script>

<style lang="postcss" scoped>
    .input {
        margin-block-end: 20px;
    }

    .btn {
        width: 100%;
    }
</style>
