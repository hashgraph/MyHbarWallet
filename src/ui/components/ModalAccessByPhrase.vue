<template>
    <Modal
        :title="$t('modalAccessByPhrase.title')"
        not-closable
        :is-open="state.isOpen"
        @change="handleModalChangeIsOpen"
    >
        <div class="instruction">
            {{ $t("modalAccessByPhrase.pleaseTypeInYourMnemonicPhrase") }}
        </div>
        <div class="toggle">
            <SwitchButton
                v-model="state.wordToggle"
                :values="toggleValues"
                @change="handleWordCountChange"
            />
            <transition
                name="fuzz"
                mode="out-in"
            >
                <span
                    v-if="state.wordCount === 22"
                    key="22"
                >{{ $t('mnemonic.22words') }}</span>
                <span
                    v-else
                    key="24"
                >{{ $t('mnemonic.24words') }}</span>
            </transition>
        </div>
        <form @submit.prevent="$emit('submit')">
            <MnemonicInput
                class="phrase-input"
                :words="state.wordCount"
                :value="state.words"
                :editable="true"
                :is-open="state.isOpen"
                @input="handleMnemonicInput"
                @valid="handleMnemonicValid"
            />

            <OptionalPasswordInput
                :value="state.password"
                @input="handlePasswordInput"
            />

            <Button
                class="continue-btn"
                :label="$t('common.continue')"
                :busy="state.isBusy"
                :disabled="!state.isValid"
            />
        </form>
        <div class="support">
            <CustomerSupportLink />
        </div>
    </Modal>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext, watch } from "@vue/composition-api";

import Modal from "./Modal.vue";
import SwitchButton from "./SwitchButton.vue";
import MnemonicInput from "./MnemonicInput.vue";
import Button from "./Button.vue";
import CustomerSupportLink from "./CustomerSupportLink.vue";
import OptionalPasswordInput from "./OptionalPasswordInput.vue";
import Warning from "./Warning.vue";

export enum WordCount {
    TwentyTwo = 22,
    TwentyFour = 24
}

export interface State {
    isOpen: boolean;
    wordToggle: boolean;
    wordCount: WordCount;
    words: string[];
    password: string;
    isBusy: boolean;
    isValid: boolean;
}

export default defineComponent({
    components: {
        Modal,
        MnemonicInput,
        SwitchButton,
        Button,
        CustomerSupportLink,
        Warning,
        OptionalPasswordInput
    },
    model: {
        prop: "state",
        event: "change"
    },
    props: { state: { type: Object as PropType<State>, required: true }},
    setup(props: { state: State }, context: SetupContext) {
        const toggleValues = [ WordCount.TwentyFour, WordCount.TwentyTwo ];

        function handleWordCountChange(changedTo: number): void {
            props.state.wordCount = changedTo;
            if (changedTo === WordCount.TwentyTwo) {
                if (props.state.words[ 23 ] != null) props.state.words[ 23 ] = "";
                if (props.state.words[ 22 ] != null) props.state.words[ 22 ] = "";
            }
        }

        function handleModalChangeIsOpen(isOpen: boolean): void {
            context.emit("change", { ...props.state, isOpen });
        }

        function handleMnemonicInput(words: string[]): void {
            context.emit("change", { ...props.state, words });
        }

        function handlePasswordInput(password: string): void {
            context.emit("change", { ...props.state, password });
        }

        function handleMnemonicValid(valid: boolean): void {
            props.state.isValid = valid;
        }

        // Watch for the modal state to change, and clear input when the modal is reopened
        watch(
            () => props.state ? props.state.isOpen : false,
            (newVal: boolean) => {
                if (newVal) {
                    context.emit("change", { ...props.state, words: []});
                }
            }
        );

        return {
            toggleValues,
            handleWordCountChange,
            handleModalChangeIsOpen,
            handleMnemonicInput,
            handlePasswordInput,
            handleMnemonicValid
        };
    }
});
</script>

<style scoped lang="postcss">
.fuzz-enter-active,
.fuzz-leave-active {
    transition: opacity 0.1s ease-in;

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

.fuzz-enter,
.fuzz-leave-to {
    opacity: 0;
}

.instruction {
    border-bottom: 2px solid var(--color-peral);
    color: var(--color-china-blue);
    font-size: 14px;
    margin-block-end: 10px;
    padding-block-end: 10px;
}

.toggle {
    align-items: center;
    border-bottom: 2px solid var(--color-peral);
    color: var(--color-china-blue);
    display: flex;
    font-size: 14px;
    justify-content: space-between;
    margin-block-end: 10px;
    padding-block-end: 10px;
    width: 100%;
}

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
    margin-block-end: 20px;
}

.continue-btn {
    margin-block-end: 20px;
    width: 100%;
}

.support {
    align-items: center;
    display: flex;
    font-size: 14px;
    justify-content: space-around;
}
</style>
