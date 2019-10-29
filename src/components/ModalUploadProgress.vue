<template>
    <Modal
        :is-open="isOpen"
        :title="$t('modalUploadProgress.title')"
        hide-decoration
        not-closeable
        @change="this.$listeners.change"
    >
        <template v-slot:banner>
            <Warning
                :title="$t('modalUploadProgress.warning.title')"
                :message="$t('modalUploadProgress.warning.message')"
            />
        </template>
        <template>
            <div class="modal-upload-progress">
                <div class="be-patient-text">
                    {{ $t("modalUploadProgress.bePatient") }}
                </div>
                <div class="be-patient-subtext">
                    {{ $t("modalUploadProgress.bePatientL2") }}
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
                <div class="button-container">
                    <Button
                        :label="state.buttonLabel"
                        :disabled="state.inProgress"
                        class="progress-button"
                        @click="handleDownloadClick"
                    />
                </div>
            </div>
        </template>
    </Modal>
</template>

<script lang="ts">
import { createComponent, reactive, watch } from "@vue/composition-api";
import Button from "../components/Button.vue";
import Modal from "../components/Modal.vue";
import Warning from "../components/Warning.vue";
import { mdiLoading, mdiFileCheckOutline, mdiFileRemoveOutline } from "@mdi/js";
import MaterialDesignIcon from "./MaterialDesignIcon.vue";

export default createComponent({
    components: {
        Button,
        Modal,
        Warning,
        MaterialDesignIcon
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: { type: Boolean }
    },
    setup(props: { isOpen: boolean }) {
        const state = reactive({
            inProgress: true,
            wasSuccess: true,
            percentage: 0,
            buttonLabel: "0%"
        });

        watch(
            () => props.isOpen,
            (newVal: boolean) => {
                if (newVal) {
                    console.log("hi");
                }
            }
        );

        return {
            state,
            mdiLoading,
            mdiFileCheckOutline,
            mdiFileRemoveOutline
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

.be-patient-text {
    color: var(--color-ghostlands-coal);
    display: flex;
    font-size: 20px;
    font-weight: 500;
    justify-content: center;
    margin-block-end: 20px;
    text-align: center;
}

.be-patient-subtext {
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
