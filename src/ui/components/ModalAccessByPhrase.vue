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
        <div class="word-count">
            <span class="bold">{{ $t('mnemonic.myMnemonicHas') }}</span>
            <Select
                v-model="selected"
                class="select"
                :options="wordCountOptions"
                @change="handleWordCountChange"
            />
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
import { defineComponent, PropType, SetupContext, watch, ref } from "@vue/composition-api";

import Modal from "./Modal.vue";
import SwitchButton from "./SwitchButton.vue";
import MnemonicInput from "./MnemonicInput.vue";
import Button from "./Button.vue";
import Select from "./Select.vue";
import CustomerSupportLink from "./CustomerSupportLink.vue";
import OptionalPasswordInput from "./OptionalPasswordInput.vue";
import Warning from "./Warning.vue";

export enum WordCount {
    Twelve = 12,
    TwentyTwo = 22,
    TwentyFour = 24
}

const wordCountOptions = Object.keys(WordCount).map((x) => parseInt(x)).filter((x) => !isNaN(x))
    .map((x) => `${x} Words`);

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
    name: "ModalAccessByPhrase",
    components: {
        Modal,
        MnemonicInput,
        Select,
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
        const selected = ref("24 Words");

        function handleWordCountChange(changedTo: string): void {
            props.state.wordCount = parseInt(changedTo.split(" ")[ 0 ]);
            props.state.words = props.state.words.slice(0, props.state.wordCount);
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
            selected,
            wordCountOptions,
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
.instruction {
    border-bottom: 2px solid var(--color-peral);
    color: var(--color-china-blue);
    font-size: 14px;
    margin-block-end: 10px;
    padding-block-end: 10px;
}

.bold {
    color: var(--color-washed-black);
    font-size: 16px;
    font-weight: 600;
}

.select {
    flex: 1 1 0;
    max-width: 200px;
}

.word-count {
    align-items: center;
    border-bottom: 2px solid var(--color-peral);
    color: var(--color-china-blue);
    display: flex;
    font-size: 14px;
    justify-content: space-between;
    width: 100%;
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
