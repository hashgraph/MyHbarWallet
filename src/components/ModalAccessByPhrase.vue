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

            <div class="password-container">
                <div class="header">
                    <div class="text">
                        Password
                    </div>
                    <div class="password-switch">
                        <div class="text">
                            Optional
                        </div>
                        <SwitchButton v-model="showPassword" class="btn" />
                    </div>
                </div>
                <div class="password-input" :class="{ expanded: showPassword }">
                    <TextInput
                        :value="state.password"
                        placeholder="Please Enter Password"
                        obscure
                        compact
                        @input="handlePasswordInput"
                    />
                </div>
            </div>

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
import TextInput from "../components/TextInput.vue";

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
        TextInput
    },
    model: {
        prop: "state",
        event: "change"
    },
    props: {
        state: { type: Object, required: true } as PropOptions<State>
    },
    data() {
        return {
            showPassword: false
        };
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

.password-container {
    border-bottom: 2px solid var(--color-peral);
    border-top: 2px solid var(--color-peral);
    margin-block-end: 20px;
    padding: 20px 0;
}

.password-switch {
    align-items: center;
    align-self: flex-end;
    display: flex;

    & > .text {
        color: var(--color-melbourne-cup);
        font-size: 16px;
        margin-inline-end: 13px;
    }
}

.password-container > .header {
    align-items: center;
    display: flex;
    flex-grow: 0;
    justify-content: space-between;
    padding: 0 10px;
    width: 100%;

    & > .text {
        color: var(--color-washed-black);
        font-size: 16px;
        font-weight: 600;
    }
}

.continue-btn {
    margin-block-end: 20px;
    width: 100%;
}

.password-input {
    padding-inline: 10px;
    transition: max-height 0.3s ease;
    transition: padding-top 0.3s ease;

    @media screen and (prefers-reduced-motion: reduce) {
        transition: none;
    }
}

.password-input:not(.expanded) {
    max-height: 0;
    opacity: 0;
    padding-block-start: 0;
}

.password-input.expanded {
    max-height: 800px;
    opacity: 1;
    padding-block-start: 30px;
}

.support {
    align-items: center;
    display: flex;
    font-size: 14px;
    justify-content: space-around;
}
</style>
