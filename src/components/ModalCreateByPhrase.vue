<template>
    <div class="modal-create-by-mnemonic-phrase">
        <Modal
            :is-open="isOpen"
            title="Create by Mnemonic Phrase"
            @change="this.$listeners.change"
        >
            <template v-slot:banner>
                <Warning />
            </template>
            <div class="password-info-header-wrapper">
                <div class="password-info-header">
                    Your Password
                    <InfoButton
                        message="This password encrypts your private key. This does not act as a seed to generate your keys."
                    />
                </div>
            </div>
            <div class="value-switch">
                <!-- TODO: Component that wraps this with the understanding of mnemonic types -->
                <SwitchButton
                    :checked="numWords"
                    class="btn"
                    :values="[12, 24]"
                    @change="handleNumWordsChange"
                />
                <div class="text">Value</div>
                <div class="spacer" />
                <div class="random-button">
                    <MaterialDesignIcon :size="16" :icon="mdiCached" />
                    Random
                </div>
            </div>

            <MnemonicInput
                class="phrase-input"
                :words="numWords"
                :value="words"
                :editable="false"
            />

            <HiddenPasswordInput
                :value="passwordValue"
                @input="handlePasswordChange"
            />

            <div class="continue-btn-container">
                <Button
                    class="continue-btn"
                    label="I Wrote Down My Mnemonic Phrase"
                />
                <img
                    :src="printerIcon"
                    class="printer-button"
                    @click="handlePrintModal"
                />
                <ModalPhrasePrintPreview v-model="printModalIsOpen" />
            </div>

            <p>
                <span class="important"> DO NOT FORGET</span> to save your
                password. You will need this
            </p>
        </Modal>
    </div>
</template>

<script lang="ts">
import { createComponent, value, PropType } from "vue-function-api";
import Modal from "../components/Modal.vue";
import Warning from "../components/Warning.vue";
import MnemonicInput from "../components/MnemonicInput.vue";
import HiddenPasswordInput from "../components/OptionalPasswordInput.vue";
import SwitchButton from "../components/SwitchButton.vue";
import Button from "../components/Button.vue";
import MaterialDesignIcon from "../components/MaterialDesignIcon.vue";
import InfoButton from "../components/InfoButton.vue";
import ModalPhrasePrintPreview from "../components/ModalPhrasePrintPreview.vue";
import printerIcon from "../assets/icon-printer.svg";
import { mdiCached } from "@mdi/js";

export default createComponent({
    components: {
        Modal,
        Warning,
        ModalPhrasePrintPreview,
        MnemonicInput,
        HiddenPasswordInput,
        SwitchButton,
        Button,
        MaterialDesignIcon,
        InfoButton
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: (Boolean as unknown) as PropType<boolean>
    },
    setup() {
        const numWords = value(12);
        const passwordValue = value("");
        const words = value([]);
        const printModalIsOpen = value(false);

        function handleNumWordsChange(num: number) {
            numWords.value = num;
        }

        function handlePasswordChange(password: string) {
            passwordValue.value = password;
        }

        function handlePrintModal() {
            printModalIsOpen.value = !printModalIsOpen.value;
        }

        return {
            numWords,
            passwordValue,
            words,
            mdiCached,
            printerIcon,
            printModalIsOpen,
            handlePrintModal,
            handleNumWordsChange,
            handlePasswordChange
        };
    }
});
</script>

<style lang="postcss" scoped>
.value-switch {
    align-items: center;
    display: flex;
    margin-block-end: 10px;

    & > .btn {
        margin-inline-end: 10px;
    }

    & > .text {
        color: var(--color-boathouse);
        font-size: 14px;
    }
}

.phrase-input {
    margin-block-end: 40px;
}

.continue-btn {
    flex-grow: 1;
}

.continue-btn-container {
    align-items: center;
    display: flex;
    flex-direction: row;
    margin-block-end: 20px;
}

.password-info-header-wrapper {
    display: flex;
    justify-content: space-around;
}

.password-info-header {
    display: inline;
    font-size: 20px;
    font-weight: 500;
    padding-block-end: 40px;
}

.spacer {
    flex-grow: 1;
}

.random-button {
    color: var(--color-melbourne-cup);
    cursor: pointer;
    font-size: 14px;
}

.important {
    color: var(--color-lightish-red);
    font-weight: 500;
}

.printer-button {
    cursor: pointer;
    height: 30px;
    margin-inline-start: 20px;
}
</style>
