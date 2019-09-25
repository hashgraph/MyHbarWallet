<template>
    <div class="modal-export-download-keystore">
        <Modal
            :is-open="state.isOpen"
            :title="$t('modalExportDownloadKeystore.title')"
            @change="handleModalChangeIsOpen"
        >
            <KeystoreWarningCards />
            <Button
                :label="$t('modalExportDownloadKeystore.downloadKeystoreFile')"
                :busy="state.isBusy"
                :disabled="state.isBusy"
                compact
                class="download"
                @click="handleDownloadClick"
            />
        </Modal>
    </div>
</template>

<script lang="ts">
import Modal from "../components/Modal.vue";
import Button from "../components/Button.vue";
import { createComponent, SetupContext } from "@vue/composition-api";
import KeystoreWarningCards from "./KeystoreWarningCards.vue";

export interface State {
    isOpen: boolean;
    isBusy: boolean;
}

interface Props {
    state: State;
}

export default createComponent({
    components: {
        Modal,
        Button,
        KeystoreWarningCards
    },
    model: {
        prop: "state",
        event: "change"
    },
    props: {
        state: { type: Object, required: true }
    },
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
