<template>
    <Modal
        :is-open="state.isOpen"
        :title="$t('modalUploadProgress.title')"
        hide-decoration
        not-closeable
    >
        <template v-slot:banner>
            <Warning
                :title="$t('modalUploadProgress.warning.title')"
                :message="
                    isElectron
                        ? $t('modalUploadProgress.warning.messageElectron')
                        : $t('modalUploadProgress.warning.message')
                "
            />
        </template>
        <template>
            <div class="modal-upload-progress">
                <div class="upload-text">
                    {{
                        state.inProgress
                            ? $t("modalUploadProgress.inProgress.text")
                            : state.wasSuccess
                            ? $t("modalUploadProgress.success.text")
                            : $t("modalUploadProgress.failure.text")
                    }}
                </div>
                <div class="upload-subtext">
                    {{
                        state.inProgress
                            ? $t("modalUploadProgress.inProgress.subText")
                            : state.wasSuccess
                            ? $t("modalUploadProgress.success.subText")
                            : $t("modalUploadProgress.failure.subText")
                    }}
                </div>
                <div class="visual-container">
                    <MaterialDesignIcon
                        v-if="state.inProgress"
                        class="icon"
                        :icon="mdiLoading"
                        height="120"
                        width="120"
                        slow-spin
                    />
                    <MaterialDesignIcon
                        v-else-if="!state.inProgress && state.wasSuccess"
                        class="icon"
                        :icon="mdiFileCheckOutline"
                        height="120"
                        width="120"
                    />
                    <MaterialDesignIcon
                        v-else
                        class="icon"
                        :icon="mdiFileRemoveOutline"
                        height="120"
                        width="120"
                    />
                </div>

                <div
                    v-if="!state.inProgress && state.wasSuccess"
                    class="upload-text"
                >
                    File ID: {{ state.fileId }}
                </div>

                <div class="button-container">
                    <Button
                        v-if="!state.inProgress && !state.wasSuccess"
                        :label="$t('modalUploadProgress.failure.buttonLabel2')"
                        :disabled="state.inProgress"
                        class="cancel-button"
                        outline
                        danger
                        @click="onClickCancel"
                    />

                    <Button
                        :label="buttonLabel"
                        :disabled="state.inProgress"
                        class="progress-button"
                        @click="onClickFinish"
                    />
                </div>
            </div>
        </template>
    </Modal>
</template>

<script lang="ts">
import { computed, createComponent, SetupContext } from "@vue/composition-api";
import Button from "../components/Button.vue";
import Modal from "../components/Modal.vue";
import Warning from "../components/Warning.vue";
import { mdiLoading, mdiFileCheckOutline, mdiFileRemoveOutline } from "@mdi/js";
import MaterialDesignIcon from "./MaterialDesignIcon.vue";

export interface State {
    isOpen: boolean;
    inProgress: boolean;
    wasSuccess: boolean;
    currentChunk: number;
    totalChunks: number;
    fileId: string;
}

export default createComponent({
    components: {
        Button,
        Modal,
        Warning,
        MaterialDesignIcon
    },
    model: {
        prop: "state",
        event: "change"
    },
    props: {
        state: { type: Object, required: true }
    },
    setup(props: { state: State }, context: SetupContext) {
        const buttonLabel = computed<string>(() => {
            if (props.state.inProgress) {
                const completionPercentage =
                    props.state.currentChunk < props.state.totalChunks
                        ? (props.state.currentChunk / props.state.totalChunks) *
                          100
                        : 0;
                return completionPercentage.toFixed(2) + "%";
            }

            if (props.state.wasSuccess) {
                return context.root
                    .$t("modalUploadProgress.success.buttonLabel")
                    .toString();
            }

            return context.root
                .$t("modalUploadProgress.failure.buttonLabel")
                .toString();
        });

        const isElectron = computed(() => {
            // todo [2019-15-11]: actually detect if this is electron.
            return false;
        });

        function close(): void {
            context.emit("change", false);
        }

        function onClickFinish(): void {
            if (!props.state.wasSuccess) {
                // user clicked retry
                context.emit("retry");
                return;
            }

            context.emit("change", false);
            context.emit("finish");
            return;
        }

        function onClickCancel(): void {
            close();
        }

        return {
            buttonLabel,
            mdiLoading,
            mdiFileCheckOutline,
            mdiFileRemoveOutline,
            isElectron,
            onClickFinish,
            onClickCancel
        };
    }
});
</script>

<style lang="postcss" scoped>
.modal-upload-progress {
    align-items: center;
    display: flex;
    flex-direction: column;
}

.upload-text {
    color: var(--color-ghostlands-coal);
    display: flex;
    font-size: 20px;
    font-weight: 500;
    justify-content: center;
    margin-block-end: 20px;
    text-align: center;
}

.upload-subtext {
    color: var(--color-china-blue);
    font-size: 18px;
    margin-block-end: 60px;
}

.icon {
    margin-inline-start: 10px;
}

.button-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-block-start: 60px;

    @media (max-width: 600px) {
        align-items: center;
        flex-direction: column;
    }
}
</style>
