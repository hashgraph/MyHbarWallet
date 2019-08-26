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
                <div class="spacer" />
                <div class="random-button" @click="randomizeMnemonic">
                    <MaterialDesignIcon :size="16" :icon="cachedIcon" />
                    Random
                </div>
            </div>

            <MnemonicInput
                class="phrase-input"
                :words="numberWords"
                :value="words"
                :editable="false"
            />

            <HiddenPasswordInput
                v-if="false"
                :value="passwordValue"
                password-warning="If you choose to include a password, understand you will ALWAYS need this password with your mnemonic phrase. You can not change it. It becomes a permanent part of your phrase."
                @input="handlePasswordChange"
            />

            <div class="continue-btn-container">
                <Button
                    :busy="isBusy"
                    class="continue-btn"
                    label="I Wrote Down My Mnemonic Phrase"
                    @click="handleClick"
                />
                <ModalVerifyPhrase
                    v-model="verifyPhraseIsOpen"
                    :words="words"
                    @success="handleVerifySuccess"
                />
                <img
                    :src="printerIcon"
                    class="printer-button"
                    @click="handlePrintModal"
                />

                <ModalPhrasePrintPreview
                    v-model="printModalIsOpen"
                    :words="words"
                />
            </div>

            <div class="warning-container">
                <p class="do-not-forget">
                    <span class="important"> DO NOT FORGET</span> to save your
                    password. You will need this
                </p>
            </div>
        </Modal>
    </div>
</template>

<script lang="ts">
import Modal from "../components/Modal.vue";
import Warning from "../components/Warning.vue";
import MnemonicInput from "../components/MnemonicInput.vue";
import HiddenPasswordInput from "../components/OptionalPasswordInput.vue";
import SwitchButton from "../components/SwitchButton.vue";
import Button from "../components/Button.vue";
import MaterialDesignIcon from "../components/MaterialDesignIcon.vue";
import InfoButton from "../components/InfoButton.vue";
import ModalPhrasePrintPreview from "../components/ModalPhrasePrintPreview.vue";
import printIcon from "../assets/icon-printer.svg";
import { mdiCached } from "@mdi/js";
import ModalVerifyPhrase from "../components/ModalVerifyPhrase.vue";
import {
    computed,
    createComponent,
    onMounted,
    PropType,
    value,
    Wrapper
} from "@vue/composition-api";
import {
    generateMnemonic,
    MnemonicResult,
    Ed25519PrivateKey
} from "@hashgraph/sdk/src/Keys";

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
        InfoButton,
        ModalVerifyPhrase
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: ({ type: Boolean, required: true } as unknown) as PropType<
            boolean
        >
    },
    setup(props, context) {
        const numberWords = 24;
        const isBusy = value(false);
        const passwordValue = value("");
        const result: Wrapper<MnemonicResult | null> = value(null);
        const printModalIsOpen = value(false);
        const verifyPhraseIsOpen = value(false);

        const words = computed(() => {
            return result.value ? result.value.mnemonic.split(" ") : [];
        });

        const cachedIcon = computed(() => {
            return mdiCached;
        });
        const printerIcon = computed(() => {
            return printIcon;
        });

        function handlePasswordChange(password: string) {
            passwordValue.value = password;
        }

        function handlePrintModal() {
            printModalIsOpen.value = !printModalIsOpen.value;
        }

        function handleClick() {
            verifyPhraseIsOpen.value = true;
        }

        function randomizeMnemonic() {
            result.value = generateMnemonic();
        }

        async function handleVerifySuccess() {
            if (result.value == null) return;

            isBusy.value = true;
            verifyPhraseIsOpen.value = false;

            const key: Ed25519PrivateKey = await result.value.generateKey();

            isBusy.value = false;

            context.emit("submit", key);
        }

        onMounted(() => {
            randomizeMnemonic();
        });

        return {
            numberWords,
            passwordValue,
            words,
            isBusy,
            cachedIcon,
            printerIcon,
            printModalIsOpen,
            verifyPhraseIsOpen,
            handlePrintModal,
            handlePasswordChange,
            handleClick,
            randomizeMnemonic,
            handleVerifySuccess
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
    user-select: none;
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

.do-not-forget {
    color: var(--color-china-blue);
    font-size: 14px;
    margin-inline: auto;
}

.warning-container {
    display: flex;
    flex-flow: row nowrap;
}
</style>
