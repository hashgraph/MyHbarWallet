<template>
  <InterfaceForm :title="$t('interfaceSignMessage.title')">
    <div class="description">
      {{ $t("interfaceSignMessage.includeYourNickname") }}
    </div>

    <div class="text-input-container">
      <TextInput
        v-model="state.message"
        :error="
          state.enableErr ? 'The message field is required' : null
        "
        :label="$t('common.message')"
        multiline
        type="text"
      />
    </div>

    <template v-slot:footer>
      <Button
        :disabled="!state.signable"
        :label="$t('interfaceSignMessage.sign')"
        @click="onSignClicked"
      />
    </template>
    <ModalConfirmSignMessage
      :is-open="state.confirmSignIsOpen"
      :message="state.message"
      public-key="302..."
      @change="handleConfirmModalChanged"
      @confirm="handleConfirmModalConfirm"
    />
    <!-- value should be a json thing, not `message` -->
    <ModalMessageSigned
      :is-open="state.signedModalIsOpen"
      :value="state.message"
      @change="handleSignedModalChanged"
    />
  </InterfaceForm>
</template>

<script lang="ts">
import { createComponent, reactive, watch } from "@vue/composition-api";

import InterfaceForm from "../components/InterfaceForm.vue";
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";
import ModalConfirmSignMessage from "../components/ModalConfirmSignMessage.vue";
import ModalMessageSigned from "../components/ModalMessageSigned.vue";

interface State {
    message: string | null;
    signable: boolean;
    enableErr: boolean;
    confirmSignIsOpen: boolean;
    signedModalIsOpen: boolean;
}

export default createComponent({
    props: {}, // ts hack
    components: {
        InterfaceForm,
        TextInput,
        Button,
        ModalConfirmSignMessage,
        ModalMessageSigned
    },
    setup() {
        const state = reactive<State>({
            message: null,
            signable: true,
            enableErr: false,
            confirmSignIsOpen: false,
            signedModalIsOpen: false
        });

        function onSignClicked(): void {
            state.confirmSignIsOpen = true;
        }

        function handleSignedModalChanged(value: boolean): void {
            state.signedModalIsOpen = value;
        }

        function handleConfirmModalChanged(value: boolean): void {
            state.confirmSignIsOpen = value;
        }

        function handleConfirmModalConfirm(): void {
            state.confirmSignIsOpen = false;
            state.signedModalIsOpen = true;
        }

        watch(
            () => state.message,
            (val) => {
                state.signable = val != null;
                state.enableErr = val === "";
            }
        );

        return {
            state,
            onSignClicked,
            handleSignedModalChanged,
            handleConfirmModalChanged,
            handleConfirmModalConfirm
        };
    }
});
</script>

<style lang="postcss" scoped>
    .description {
        color: var(--color-china-blue);
        font-size: 14px;
        margin-block-end: 10px;
        padding-inline: 8px;
    }
</style>
