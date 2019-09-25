<template>
    <div class="modal-mnemonic-phrase">
        <Modal
            :title="$t('modalAccessByPhrase.title')"
            :not-closable="state.isBusy"
            :is-open="state.isOpen"
            @change="handleModalChangeIsOpen"
        >
            <template v-slot:banner>
                <Warning />
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
                    @input="handleMnemonicInput"
                />

                <Button
                    class="continue-btn"
                    :label="$t('common.continue')"
                    :busy="state.isBusy"
                    :disabled="!areFieldsFilled"
                />
            </form>
            <div class="support">
                <CustomerSupportLink />
            </div>
        </Modal>
    </div>
</template>

<script lang="ts">
import { PropOptions } from "vue";
import Modal from "../components/Modal.vue";
import SwitchButton from "../components/SwitchButton.vue";
import MnemonicInput from "../components/MnemonicInput.vue";
import Button from "../components/Button.vue";
import CustomerSupportLink from "../components/CustomerSupportLink.vue";
import Warning from "../components/Warning.vue";
import {
    computed,
    createComponent,
    watch,
    SetupContext
} from "@vue/composition-api";

export interface State {
    isOpen: boolean;
    words: string[];
    isBusy: boolean;
    isValid: boolean;
}

export default createComponent({
    components: {
        Modal,
        MnemonicInput,
        SwitchButton,
        Button,
        CustomerSupportLink,
        Warning
    },
    model: {
        prop: "state",
        event: "change"
    },
    props: {
        state: { type: Object, required: true } as PropOptions<State>
    },
    setup(props: { state: State }, context: SetupContext) {
        function handleModalChangeIsOpen(isOpen: boolean): void {
            context.emit("change", { ...props.state, isOpen });
        }
        function handleMnemonicInput(words: string[]): void {
            context.emit("change", { ...props.state, words });
        }

        const areFieldsFilled = computed(() => {
            if (props.state.words.length == 24) {
                for (const word of props.state.words) {
                    if (!word || word.length === 0) {
                        return false;
                    }
                }
                return true;
            }
        });

        // Watch for the modal state to change, and clear input when the modal is reopened
        watch(
            () => props.state.isOpen,
            (newVal: boolean) => {
                if (newVal) {
                    context.emit("change", { ...props.state, words: [] });
                }
            }
        );

        return {
            handleModalChangeIsOpen,
            handleMnemonicInput,
            areFieldsFilled
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
    margin-block-end: 40px;
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
