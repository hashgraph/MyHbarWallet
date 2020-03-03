<template>
    <Modal
        :is-open="state.isOpen"
        :title="$t('modalDownloadKeystore.title')"
        not-closable
        @change="handleModalChangeIsOpen"
    >
        <KeystoreWarningCards />
        <div class="button-container">
            <Button
                :label="$t('modalDownloadKeystore.downloadKeystoreFile')"
                :busy="state.isBusy"
                :disabled="state.isBusy"
                :outline="state.downloadClicked"
                compact
                class="download-button"
                @click="handleDownloadClick"
            />
            <Button
                :label="$t('common.continue')"
                :disabled="!state.downloadClicked"
                compact
                class="continue-button"
                @click="$emit('continue')"
            />
        </div>
    </Modal>
</template>

<script lang="ts">
import Modal from "../components/Modal.vue";
import Button from "../components/Button.vue";
import { createComponent, SetupContext } from "@vue/composition-api";
import KeystoreWarningCards from "./KeystoreWarningCards.vue";

export interface State {
    isOpen: boolean;
    isBusy: boolean;
    downloadClicked: boolean;
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
    props: { state: { type: Object, required: true }},
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
