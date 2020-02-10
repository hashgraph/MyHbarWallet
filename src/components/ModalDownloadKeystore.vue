<template>
  <div class="modal-create-by-mnemonic-phrase">
    <Modal
      :is-open="state.isOpen"
      :title="$t('modalDownloadKeystore.title')"
      not-closable
      @change="handleModalChangeIsOpen"
    >
      <KeystoreWarningCards />
      <div class="button-container">
        <Button
          :busy="state.isBusy"
          :disabled="state.isBusy"
          :label="$t('modalDownloadKeystore.downloadKeystoreFile')"
          :outline="state.downloadClicked"
          class="download-button"
          compact
          @click="handleDownloadClick"
        />
        <Button
          :disabled="!state.downloadClicked"
          :label="$t('common.continue')"
          class="continue-button"
          compact
          @click="$emit('continue')"
        />
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { createComponent, PropType, SetupContext } from "@vue/composition-api";

import Button from "./Button.vue";
import KeystoreWarningCards from "./KeystoreWarningCards.vue";
import Modal from "./Modal.vue";

export interface State {
    isOpen: boolean;
    isBusy: boolean;
    downloadClicked: boolean;
}

interface Props {
    state: State;
}

export default createComponent({
    name: "ModalDownloadKeystore",
    components: {
        Modal,
        Button,
        KeystoreWarningCards
    },
    model: {
        prop: "state",
        event: "change"
    },
    props: { state: Object as PropType<State> },
    setup(props: Props, context: SetupContext) {
        function handleModalChangeIsOpen(isOpen: boolean): void {
            context.emit("change", { ...props.state, isOpen });
        }

        function handleDownloadClick(): void {
            context.emit("submit");
            props.state.downloadClicked = true;
        }

        return {
            handleModalChangeIsOpen,
            handleDownloadClick
        };
    }
});
</script>

<style lang="postcss" scoped>
    .button-container {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;

        @media (max-width: 600px) {
            align-items: center;
            flex-direction: column;
        }
    }

    .download-button {
        @media (max-width: 600px) {
            margin-block-end: 15px;
            width: 100%;
        }
    }

    .continue-button {
        width: 213px;

        @media (max-width: 600px) {
            width: 100%;
        }
    }
</style>
