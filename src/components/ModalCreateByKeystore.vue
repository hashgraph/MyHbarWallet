<template>
    <div class="create-with-keystore-file">
        <Modal
            title="Create By Keystore File"
            :is-open="state.modalIsOpen"
            @change="handleModalChangeIsOpen"
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
            <form @submit.prevent="$emit('submit', state.password)">
                <TextInput
                    ref="input"
                    :value="state.password"
                    placeholder="Please Enter At Least 9 Characters"
                    obscure
                    @input="handleInputPassword"
                />

                <div
                    v-if="state.password.length > 0"
                    class="password-hint-container"
                >
                    Password strength:
                    <span
                        v-if="state.passwordStrength === 0"
                        class="strength very-weak"
                        >Very Weak</span
                    >
                    <span
                        v-else-if="state.passwordStrength === 1"
                        class="strength weak"
                        >Weak</span
                    >
                    <span
                        v-else-if="state.passwordStrength === 2"
                        class="strength good"
                        >Good</span
                    >
                    <span
                        v-else-if="state.passwordStrength === 3"
                        class="strength strong"
                        >Strong</span
                    >
                    <span
                        v-else-if="state.passwordStrength === 4"
                        class="strength excellent"
                        >Excellent</span
                    >
                </div>

                <div
                    v-if="
                        state.password.length > 0 && state.password.length < 9
                    "
                    class="password-hint-container"
                >
                    The password field must be at least 9 characters
                </div>

                <div
                    v-if="
                        state.password.length >= 9 &&
                            state.passwordStrength <= 3
                    "
                >
                    <div
                        v-for="(suggestion, index) in state.passwordSuggestion
                            .suggestions"
                        :key="index"
                        class="password-hint-container"
                    >
                        {{ suggestion }}
                    </div>
                </div>

                <div class="btn-container">
                    <Button
                        :disabled="
                            state.password.length < 9 &&
                                state.passwordStrength < 2
                        "
                        :busy="state.isBusy"
                        class="btn"
                        label="Next"
                        :trailing-icon="mdiArrowRight"
                    />
                </div>
            </form>

            <p class="footer">
                <span class="important"> DO NOT FORGET</span> to save your
                password. You will need this
                <span class="important">Password + Keystore</span> File to
                unlock your wallet.
            </p>
        </Modal>
    </div>
</template>

<script lang="ts">
import {
    createComponent,
    PropType,
    watch,
    SetupContext
} from "@vue/composition-api";
import Modal from "../components/Modal.vue";
import Warning from "../components/Warning.vue";
import InfoButton from "../components/InfoButton.vue";
import TextInput, {
    Component as TextInputComponent
} from "../components/TextInput.vue";
import Button from "../components/Button.vue";
import { mdiArrowRight } from "@mdi/js";
import zxcvbn, { ZXCVBNResult } from "zxcvbn";

export interface State {
    modalIsOpen: boolean;
    password: string;
    passwordStrength: number;
    passwordSuggestion: string;
    isBusy: boolean;
}

interface Props {
    state: State;
}

type Context = SetupContext & {
    refs: {
        input: TextInputComponent;
    };
};

// some common words that might be thrown into a password and make it less secure
// todo: audit and add/remove words
/*
The optional user_inputs argument is an array of strings that zxcvbn will treat as an extra dictionary.
This can be whatever list of strings you like, but is meant for user inputs from
other fields of the form, like name and email. That way a password that includes a user's personal information
can be heavily penalized. This list is also good for site-specific vocabulary — Acme Brick Co. might want to
include ['acme', 'brick', 'acmebrick', etc].
*/
const wordlist: string[] = [
    "hedera",
    "Hedera",
    "hashgraph",
    "hbar",
    "crypto",
    "cryptocoin",
    "wallet",
    "myhbarwallet",
    "myhederawallet"
];

export default createComponent({
    components: {
        Modal,
        Warning,
        InfoButton,
        TextInput,
        Button
    },
    model: {
        prop: "state",
        event: "change"
    },
    props: {
        state: (Object as unknown) as PropType<State>
    },
    setup(props: Props, context: SetupContext) {
        // Focus the single text input when the modal is opened
        watch(
            () => props.state.modalIsOpen,
            (newVal: boolean) => {
                if (newVal) {
                    context.emit("change", {
                        ...props.state,
                        password: "",
                        passwordStrength: 0,
                        passwordSuggestion: ""
                    });

                    (context as Context).refs.input.focus();
                }
            }
        );

        /**
         * zxcvbn uses a scoring system based on ->
         * 0 # too guessable: risky password. (guesses < 10^3)
         * 1 # very guessable: protection from throttled online attacks. (guesses < 10^6)
         * 2 # somewhat guessable: protection from unthrottled online attacks. (guesses < 10^8)
         * 3 # safely unguessable: moderate protection from offline slow-hash scenario. (guesses < 10^10)
         * 4 # very unguessable: strong protection from offline slow-hash scenario. (guesses >= 10^10)
         */

        function handleInputPassword(value: string): void {
            const passwordMetrics: ZXCVBNResult = zxcvbn(value, wordlist);

            context.emit("change", {
                ...props.state,
                password: value,
                passwordStrength: passwordMetrics.score,
                passwordSuggestion: passwordMetrics.feedback
            });
        }

        function handleModalChangeIsOpen(isOpen: boolean): void {
            context.emit("change", { ...props.state, modalIsOpen: isOpen });
        }

        return {
            handleModalChangeIsOpen,
            handleInputPassword,
            mdiArrowRight
        };
    }
});
</script>

<style scoped lang="postcss">
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

.btn-container {
    align-items: center;
    display: flex;
    justify-content: center;
}

.btn {
    margin-block: 40px;
}

.footer {
    color: var(--color-china-blue);
    font-size: 14px;
    margin: 0;
    padding: 0;
    text-align: center;
}

.important {
    color: var(--color-lightish-red);
    font-weight: 500;
}

.strength {
    font-weight: 600;
    margin-inline-start: 10px;
    text-align: start;
}

.very-weak {
    color: var(--color-washed-black);
}

.weak {
    color: var(--color-coral-red);
}

.good {
    color: var(--color-bubble-bobble-p2);
}

.strong {
    color: var(--color-melbourne-cup);
}

.excellent {
    color: var(--color-melbourne-cup);
}

.password-hint-container {
    color: var(--color-basalt-grey);
    font-family: Montserrat, sans-serif;
    font-size: 14px;
    margin-block-start: 10px;
}
</style>
