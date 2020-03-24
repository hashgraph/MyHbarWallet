<template>
    <Modal
        :is-open="isOpen"
        :title="$t('modalCreateByPhrase.title')"
        @change="this.$listeners.change"
    >
        <template v-slot:banner>
            <Warning
                :title="$t('warning.title')"
                :message="
                    $t('warning.thisIsNotARecommendedWayToAccessYourWallet')
                "
            />
        </template>
        <div class="password-info-header-wrapper">
            <div class="password-info-header">
                {{ $t("common.password.yourPassword") }}
                <InfoButton
                    :message="
                        $t(
                            'common.password.thisPasswordEncryptsYourPrivateKey'
                        )
                    "
                />
            </div>
        </div>
        <div class="value-switch">
            <div class="spacer" />
            <div
                class="random-button"
                @click="randomizeMnemonic"
            >
                <MaterialDesignIcon
                    :size="16"
                    :icon="cachedIcon"
                />
                {{ $t("modalCreateByPhrase.random") }}
            </div>
        </div>

        <MnemonicInput
            class="phrase-input"
            :words="24"
            :value="words"
            :editable="false"
            :is-open="isOpen"
        />

        <OptionalPasswordWithConfirm
            :password-warning="state.passwordWarning"
            @valid="handlePasswordValid"
            @change="handlePasswordChange"
        />

        <div class="continue-btn-container">
            <Button
                :busy="state.isBusy"
                :disabled="state.isDisabled"
                class="continue-btn"
                :label="
                    $t('modalCreateByPhrase.iWroteDownMyMnemonicPhrase')
                "
                @click="handleClick"
            />
            <ModalVerifyPhrase
                v-model="state.verifyPhraseIsOpen"
                :words="words"
                @success="handleVerifySuccess"
            />
            <img
                :src="printerIcon"
                class="printer-button"
                @click="handlePrintModal"
            >

            <ModalPhrasePrintPreview
                v-model="state.printModalIsOpen"
                :words="words"
                :password="state.password"
            />
        </div>

        <div class="warning-container">
            <div
                class="do-not-forget"
                v-html="
                    formatRich(
                        $t(
                            'modalCreateByPhrase.doNotForgetToSaveYourPassword'
                        ).toString(),
                        { strongClass: 'important' }
                    )
                "
            />
        </div>
    </Modal>
</template>

<script lang="ts">
import { mdiCached } from "@mdi/js";
import { computed, defineComponent, onMounted, reactive, SetupContext, watch } from "@vue/composition-api";

import printIcon from "../assets/icon-printer.svg";
import { formatRich } from "../../service/format";

import Modal from "./Modal.vue";
import Warning from "./Warning.vue";
import MnemonicInput from "./MnemonicInput.vue";
import HiddenPasswordInput from "./OptionalPasswordInput.vue";
import SwitchButton from "./SwitchButton.vue";
import Button from "./Button.vue";
import MaterialDesignIcon from "./MaterialDesignIcon.vue";
import InfoButton from "./InfoButton.vue";
import ModalPhrasePrintPreview from "./ModalPhrasePrintPreview.vue";
import ModalVerifyPhrase from "./ModalVerifyPhrase.vue";
import OptionalPasswordWithConfirm from "./OptionalPasswordWithConfirm.vue";
import { State as PasswordWithConfirmState } from "./PasswordWithConfirm.vue";

interface Props {
    isOpen: boolean;
}

export default defineComponent({
    components: {
        Modal,
        Warning,
        ModalPhrasePrintPreview,
        MnemonicInput,
        HiddenPasswordInput,
        SwitchButton,
        OptionalPasswordWithConfirm,
        Button,
        MaterialDesignIcon,
        InfoButton,
        ModalVerifyPhrase
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: { isOpen: Boolean },
    setup(props: Props, context: SetupContext) {
        const numberWords = 24;
        const state = reactive({
            password: "",
            confirmationPassword: "",
            isBusy: false,
            showPassword: false,
            isDisabled: false,
            result: null as import("@hashgraph/sdk").Mnemonic | null,
            printModalIsOpen: false,
            verifyPhraseIsOpen: false,
            passwordWarning: context.root.$t("modalCreateByPhrase.passwordWarning").toString()
        });

        const words = computed(() => state.result ? state.result.words : []);

        const cachedIcon = computed(() => mdiCached);
        const printerIcon = computed(() => printIcon);

        function handlePrintModal(): void {
            state.printModalIsOpen = !state.printModalIsOpen;
        }

        function handleClick(): void {
            state.verifyPhraseIsOpen = true;
        }

        function handlePasswordValid(valid: boolean): void {
            if (state.password === "" && state.confirmationPassword === "") return;
            state.isDisabled = !valid;
        }

        function handlePasswordChange(emitState: PasswordWithConfirmState): void {
            state.password = emitState.password;
            state.confirmationPassword = emitState.confirmationPassword;
        }

        const passwordsEmpty = computed(() => state.password === "" && state.confirmationPassword === "");
        const passwordsEqualOrEmpty = computed(() => state.password === state.confirmationPassword || passwordsEmpty.value);

        watch(
            passwordsEqualOrEmpty,
            (newValue: boolean) => {
                if (newValue) state.isDisabled = false;
            }
        );

        async function randomizeMnemonic(): Promise<void> {
            const { Mnemonic } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");
            state.result = Mnemonic.generate();
        }

        async function handleVerifySuccess(): Promise<void> {
            if (state.result == null) return;

            state.isBusy = true;
            state.verifyPhraseIsOpen = false;

            const key: import("@hashgraph/sdk").Ed25519PrivateKey = (await state.result.toPrivateKey(state.password)).derive(0);

            // eslint-disable-next-line require-atomic-updates
            state.isBusy = false;

            context.emit("submit", key);
        }

        onMounted(() => {
            randomizeMnemonic();
        });

        return {
            props,
            state,
            numberWords,
            words,
            cachedIcon,
            printerIcon,
            handlePrintModal,
            handleClick,
            handlePasswordValid,
            handlePasswordChange,
            randomizeMnemonic,
            handleVerifySuccess,
            formatRich
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

.printer-button {
    cursor: pointer;
    height: 30px;
    margin-inline-start: 20px;
}

.do-not-forget {
    color: var(--color-china-blue);
    font-size: 14px;
    margin-inline: auto;

    & >>> .important {
        color: var(--color-lightish-red);
        font-weight: 500;
    }
}

.warning-container {
    display: flex;
    flex-flow: row nowrap;
}
</style>
