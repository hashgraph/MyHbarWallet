<template>
    <div class="modal-create-by-mnemonic-phrase">
        <Modal
            :is-open="state.modalIsOpen"
            :title="$t('modalDownloadKeystore.title')"
            not-closable
            @change="handleModalChangeIsOpen"
        >
            <div class="modal-save-my-keystore-cards">
                <span class="modal-body-title">{{
                    $t("modalDownloadKeystore.saveMyKeystoreFile")
                }}</span>

                <div class="modal-card">
                    <img alt="" class="card-image" :src="noLoseIcon" />
                    <div class="card-body-wrapper">
                        <span class="card-header">{{
                            $t("modalDownloadKeystore.dontLoseIt")
                        }}</span>
                        <p class="card-body">
                            {{
                                $t(
                                    "modalDownloadKeystore.beCarefulItCanNotBeRecovered"
                                )
                            }}
                        </p>
                    </div>
                </div>

                <div class="modal-card">
                    <img alt="" class="card-image" :src="noShareIcon" />
                    <div class="card-body-wrapper">
                        <span class="card-header">{{
                            $t("modalDownloadKeystore.dontShareIt")
                        }}</span>
                        <p class="card-body">
                            {{
                                $t(
                                    "modalDownloadKeystore.yourFundsWillBeStolen"
                                )
                            }}
                        </p>
                    </div>
                </div>

                <div class="modal-card">
                    <img alt="" class="card-image" :src="makeBackupIcon" />
                    <div class="card-body-wrapper">
                        <span class="card-header">{{
                            $t("modalDownloadKeystore.makeABackup")
                        }}</span>
                        <p class="card-body">
                            {{ $t("modalDownloadKeystore.secureIt") }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="button-container">
                <!-- If we are busy we should not be able be able to click the button -->
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
    </div>
</template>

<script lang="ts">
import Modal from "../components/Modal.vue";
import Button from "../components/Button.vue";
import noLoseIcon from "../assets/icon-no-lose.svg";
import noShareIcon from "../assets/icon-no-share.svg";
import makeBackupIcon from "../assets/icon-make-backup.svg";
import { createComponent, SetupContext } from "@vue/composition-api";

export interface State {
    modalIsOpen: boolean;
    isBusy: boolean;
    downloadClicked: boolean;
}

interface Props {
    state: State;
}

export default createComponent({
    components: {
        Modal,
        Button
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
            context.emit("change", { ...props.state, modalIsOpen: isOpen });
        }

        function handleDownloadClick(): void {
            context.emit("submit");
            props.state.downloadClicked = true;
        }

        return {
            noLoseIcon,
            noShareIcon,
            makeBackupIcon,
            handleModalChangeIsOpen,
            handleDownloadClick
        };
    }
});
</script>

<style lang="postcss" scoped>
.modal-save-my-keystore-cards {
    display: flex;
    flex-flow: column nowrap;
    margin-block-end: 40px;
}

.modal-body-title {
    color: var(--color-washed-black);
    font-size: 20px;
    font-weight: 500;
    margin-block-end: 40px;
    margin-inline: auto;
}

.modal-card {
    align-items: center;
    background-color: var(--color-peral);
    border-radius: 4px;
    display: flex;
    flex-flow: row nowrap;
    margin-block-end: 7px;
    padding: 10px 20px;
}

.card-image {
    height: 80px;
    margin: 0 auto;
    margin-inline-end: 20px;
}

.card-body-wrapper {
    display: flex;
    flex-flow: column;
    text-align: start;
}

.card-header {
    font-family: Montserrat, sans-serif;
    font-size: 16px;
    font-weight: 500;
    margin-block-end: 5px;
}

.card-body {
    color: var(--color-china-blue);
    font-family: Montserrat, sans-serif;
    font-size: 14px;
    margin: 0;
    padding: 0;
}

.button-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    @media (max-width: 425px) {
        align-items: center;
        flex-direction: column;
    }
}

.download-button {
    @media (max-width: 425px) {
        margin-block-end: 15px;
        width: 100%;
    }
}

.continue-button {
    width: 213px;

    @media (max-width: 425px) {
        width: 100%;
    }
}
</style>
