<template>
    <Modal
        :title="$t('modalAccessByPhrase.title')"
        :not-closable="state.isBusy"
        :is-open="state.isOpen"
        @change="handleModalChangeIsOpen"
    >
        <template v-slot:banner>
            <Warning
                :title="$t('warning.title')"
                :message="
                    $t('warning.thisIsNotARecommendedWayToAccessYourWallet')
                "
            />
        </template>

        <div class="instruction">
            {{ $t("modalAccessByPhrase.pleaseTypeInYourMnemonicPhrase") }}
        </div>
        <form @submit.prevent="$emit('submit')">
            <MnemonicInput
                class="phrase-input"
                :words="24"
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
import Modal from "../components/Modal.vue";
import SwitchButton from "../components/SwitchButton.vue";
import MnemonicInput from "../components/MnemonicInput.vue";
import Button from "../components/Button.vue";
import CustomerSupportLink from "../components/CustomerSupportLink.vue";
import OptionalPasswordInput from "./OptionalPasswordInput.vue";
import Warning from "../components/Warning.vue";
import {
    defineComponent,
    watch,
    SetupContext,
    PropType
} from "@vue/composition-api";

export interface State {
    isOpen: boolean;
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
            () => props.state.isOpen,
            (newVal: boolean) => {
                if (newVal) {
                    context.emit("change", { ...props.state, words: []});
                }
            }
        );

        return {
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
    color: var(--color-china-blue);
    font-size: 14px;
    margin-block-end: 20px;
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
