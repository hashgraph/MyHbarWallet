<template>
    <div class="mnemonic-phrase">
        <Modal
            title="Access by Mnemonic Phrase"
            large
            :not-closable="state.isBusy"
            :is-open="state.modalIsOpen"
            @change="handleModalChangeIsOpen"
        >
            <template v-slot:banner>
                <Warning />
            </template>

            <div class="instruction">
                Please type in your mnemonic phrase
            </div>

            <MnemonicInput
                class="phrase-input"
                :words="24"
                :value="state.words"
                :editable="true"
                @input="handleMnemonicInput"
            />

            <div v-if="state.isValid === false" class="error-message">
                Error: Invalid mnemonic
            </div>

            <Button
                class="continue-btn"
                label="Continue"
                :busy="state.isBusy"
                @click="$emit('submit')"
            />

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
import { createComponent } from "vue-function-api";

export interface State {
    modalIsOpen: boolean;
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
    setup(props, context) {
        function handleModalChangeIsOpen(isOpen: boolean) {
            context.emit("change", { ...props.state, modalIsOpen: isOpen });
        }
        function handleMnemonicInput(words: string[]) {
            context.emit("change", { ...props.state, words });
        }

        return {
            handleModalChangeIsOpen,
            handleMnemonicInput
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

.error-message {
    color: var(--color-basalt-grey);
    font-family: Montserrat, sans-serif;
    font-size: 14px;
    font-weight: 400;
}
</style>
