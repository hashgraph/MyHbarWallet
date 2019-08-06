<template>
    <div class="mnemonic-phrase">
        <Modal
            title="Access by Mnemonic Phrase"
            :is-open="state.modalIsOpen"
            @change="handleModalChangeIsOpen"
        >
            <template v-slot:banner>
                <Warning title="NOT RECOMMENDED">
                    This is not a recommended way to access your wallet. Due to
                    the sensitivity of the information involved, these options
                    should only be used in offline settings by experienced
                    users.
                </Warning>
            </template>

            <div class="instruction">
                Please type in your mnemonic phrase
            </div>

            <div class="value-switch">
                <!-- TODO: Component that wraps this with the understanding of mnemonic types -->
                <SwitchButton
                    :checked="state.numWords"
                    class="btn"
                    :values="[12, 24]"
                    @change="handleNumWordsChange"
                />
                <div class="text">Value</div>
            </div>

            <MnemonicInput
                class="phrase-input"
                :words="state.numWords"
                :value="state.words"
                :editable="true"
                @input="handleMnemonicInput"
            />

            <PasswordInput
                :value="state.password"
                @input="handlePasswordInput"
            />

            <Button class="continue-btn" label="Continue" />

            <div class="support">
                <CustomerSupportLink />
            </div>
        </Modal>
    </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import Modal from "../components/Modal.vue";
import SwitchButton from "../components/SwitchButton.vue";
import MnemonicInput from "../components/MnemonicInput.vue";
import Button from "../components/Button.vue";
import CustomerSupportLink from "../components/CustomerSupportLink.vue";
import Warning from "../components/Warning.vue";
import PasswordInput from "../components/PasswordInput.vue";

export enum MnemonicType {
    Words12 = 12,
    Words24 = 24
}

export interface State {
    modalIsOpen: boolean;
    numWords: MnemonicType;
    words: string[];
    password: string;
}

export default Vue.extend({
    components: {
        Modal,
        MnemonicInput,
        SwitchButton,
        Button,
        CustomerSupportLink,
        Warning,
        PasswordInput
    },
    model: {
        prop: "state",
        event: "change"
    },
    props: {
        state: { type: Object, required: true } as PropOptions<State>
    },
    methods: {
        handleModalChangeIsOpen(isOpen: boolean) {
            this.$emit("change", { ...this.state, modalIsOpen: isOpen });
        },
        handleNumWordsChange(numWords: number) {
            this.$emit("change", { ...this.state, numWords });
        },
        handleMnemonicInput(words: string[]) {
            this.$emit("change", { ...this.state, words });
        },
        handlePasswordInput(password: string) {
            this.$emit("change", { ...this.state, password });
        }
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
