<template>
    <Modal
        :is-open="state.isOpen"
        :title="$t('modalUploadProgress.title')"
        hide-decoration
        not-closeable
        @change="onChange"
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
                <div
                    v-if="state.inProgress || state.wasSuccess"
                    class="upload-subtext"
                >
                    {{
                        state.inProgress
                            ? $t("modalUploadProgress.inProgress.subText")
                            : state.wasSuccess
                                ? $t("modalUploadProgress.success.subText")
                                : $t("modalUploadProgress.failure.subText")
                    }}
                </div>
                <div
                    v-else
                    class="upload-subtext-try-again"
                >
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
                    v-if="state.inProgress || state.wasSuccess"
                    class="progress-text"
                >
                    {{ progressString }}
                </div>

                <div
                    v-if="!state.inProgress && !state.wasSuccess"
                    class="button-container"
                >
                    <Button
                        :label="$t('modalUploadProgress.failure.buttonLabel2')"
                        :disabled="state.inProgress"
                        class="button"
                        outline
                        danger
                        compact
                        @click="onClickCancel"
                    />

                    <Button
                        :label="$t('modalUploadProgress.failure.buttonLabel')"
                        :disabled="state.inProgress"
                        class="button"
                        compact
                        @click="onClickRetry"
                    />
                </div>
            </div>
        </template>
    </Modal>
</template>

<script lang="ts">
import { computed, defineComponent, SetupContext, PropType } from "@vue/composition-api";
import { mdiFileCheckOutline, mdiFileRemoveOutline, mdiLoading } from "@mdi/js";

import Button from "./Button.vue";
import Modal from "./Modal.vue";
import Warning from "./Warning.vue";
import MaterialDesignIcon from "./MaterialDesignIcon.vue";

export interface State {
    isOpen: boolean;
    inProgress: boolean;
    wasSuccess: boolean;
    currentChunk: number;
    totalChunks: number;
}

export default defineComponent({
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
    props: { state: { type: (Object as unknown) as PropType<State>, required: true }},
    setup(props: { state: State }, context: SetupContext) {
        const buttonLabel = computed<string>(() => context.root
            .$t("modalUploadProgress.failure.buttonLabel")
            .toString());

        const progressString = computed<string>(() => {
            const completionPercentage =
                props.state.currentChunk <= props.state.totalChunks ?
                    props.state.currentChunk / props.state.totalChunks * 100 :
                    0;

            return `${completionPercentage.toFixed(2)}%`;
        });

        const isElectron = computed(() =>
            // todo [2019-15-11]: actually detect if this is electron.
            false);

        function close(): void {
            context.emit("change", false);
        }

        function onClickRetry(): void {
            // user clicked retry
            context.emit("retry");
        }

        function onClickCancel(): void {
            close();
        }

        function onChange(): void {
            context.emit("change");
        }

        return {
            buttonLabel,
            mdiLoading,
            mdiFileCheckOutline,
            mdiFileRemoveOutline,
            progressString,
            isElectron,
            onClickRetry,
            onClickCancel,
            onChange
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

.progress-text {
    color: var(--color-china-blue);
    font-size: 18px;
    margin-block-start: 60px;
}

.upload-subtext {
    color: var(--color-china-blue);
    font-size: 18px;
    margin-block-end: 60px;
}

.upload-subtext-try-again {
    color: var(--color-china-blue);
    font-size: 18px;
    margin-block-end: 52px;
}

.icon {
    margin-inline-start: 10px;
}

.button-container {
    display: flex;

    /* flex-flow: row nowrap; */
    justify-content: space-between;
    margin-block-start: 52px;
    width: 100%;

    @media (max-width: 600px) {
        align-items: center;
        flex-direction: column;
    }
}

.button {
    width: 200px;

    @media (max-width: 600px) {
        width: 100%;

        &:last-child {
            margin-block-end: 15px;
        }
    }
}
</style>
