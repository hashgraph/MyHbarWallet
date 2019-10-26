<template>
    <div class="modal-create-by-mnemonic-phrase">
        <Modal
            :is-open="isOpen"
            :title="$t('modalCreateByPhrase.title')"
            @change="this.$listeners.change"
        >
            <template v-slot:banner>
                <Warning />
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
                <div class="random-button" @click="randomizeMnemonic">
                    <MaterialDesignIcon :size="16" :icon="cachedIcon" />
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

            <HiddenPasswordInput
                v-if="false"
                :value="state.passwordValue"
                :password-warning="$t('modalCreateByPhrase.passwordWarning')"
                @input="handlePasswordChange"
            />

            <div class="continue-btn-container">
                <Button
                    :busy="state.isBusy"
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
                />

                <ModalPhrasePrintPreview
                    v-model="state.printModalIsOpen"
                    :words="words"
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
    reactive,
    SetupContext
} from "@vue/composition-api";
import { formatRich } from "../formatter";

interface Props {
    isOpen: boolean;
}

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
    setup(props: Props, context: SetupContext) {
        const numberWords = 24;
        const state = reactive({
            isBusy: false,
            passwordValue: "",
            result: null as import("@hashgraph/sdk").MnemonicResult | null,
            printModalIsOpen: false,
            verifyPhraseIsOpen: false
        });

        const words = computed(() => {
            return state.result ? state.result.mnemonic.split(" ") : [];
        });

        const cachedIcon = computed(() => {
            return mdiCached;
        });
        const printerIcon = computed(() => {
            return printIcon;
        });

        function handlePasswordChange(password: string): void {
            state.passwordValue = password;
        }

        function handlePrintModal(): void {
            state.printModalIsOpen = !state.printModalIsOpen;
        }

        function handleClick(): void {
            state.verifyPhraseIsOpen = true;
        }

        async function randomizeMnemonic(): Promise<void> {
            const { generateMnemonic } = await (import(
                "@hashgraph/sdk"
            ) as Promise<typeof import("@hashgraph/sdk")>);
            state.result = generateMnemonic();
        }

        async function handleVerifySuccess(): Promise<void> {
            if (state.result == null) return;

            state.isBusy = true;
            state.verifyPhraseIsOpen = false;

            // `.derive(0)` to generate the same key as the default account of the mobile wallet
            const key: import("@hashgraph/sdk").Ed25519PrivateKey = (await state.result.generateKey()).derive(
                0
            );

            // eslint-disable-next-line require-atomic-updates
            state.isBusy = false;

            context.emit("submit", key);
        }

        onMounted(() => {
            randomizeMnemonic();
        });

        return {
            state,
            numberWords,
            words,
            cachedIcon,
            printerIcon,
            handlePrintModal,
            handlePasswordChange,
            handleClick,
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
