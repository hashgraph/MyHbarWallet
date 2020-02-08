<template>
  <div class="modal-export-download-keystore">
    <Modal
      :is-open="state.isOpen"
      :title="$t('modalExportDownloadKeystore.title')"
      @change="handleModalChangeIsOpen"
    >
      <KeystoreWarningCards />
      <Button
        :busy="state.isBusy"
        :disabled="state.isBusy"
        :label="$t('modalExportDownloadKeystore.downloadKeystoreFile')"
        class="download"
        compact
        @click="handleDownloadClick"
      />
    </Modal>
  </div>
</template>

<script lang="ts">
import { createComponent, PropOptions, SetupContext } from "@vue/composition-api";

import Button from "./Button.vue";
import KeystoreWarningCards from "./KeystoreWarningCards.vue";
import Modal from "./Modal.vue";

export interface State {
    isOpen: boolean;
    isBusy: boolean;
}

interface Props {
    state: State;
}

export default createComponent({
    name: "ModalExportDownloadKeystore",
    components: {
        Modal,
        Button,
        KeystoreWarningCards
    },
    model: {
        prop: "state",
        event: "change"
    },
    props: { state: { type: Object, required: true } as PropOptions<State, true> },
    setup(props: Props, context: SetupContext) {
        function handleModalChangeIsOpen(isOpen: boolean): void {
            context.emit("change", { ...props.state, isOpen });
        }

        function handleDownloadClick(): void {
            context.emit("submit");
        }

        return {
            handleModalChangeIsOpen,
            handleDownloadClick
        };
    }
});
</script>

<style lang="postcss" scoped>
    .download {
        width: 100%;
    }
</style>
