<template>
    <div class="create-with-keystore-file">
        <Modal
            title="Create By Keystore File"
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

            <div class="password-info-header-wrapper">
                <div class="password-info-header">
                    Your Password
                    <InfoButton
                        message="This password encrypts your private key. This does not act as a seed to generate your keys."
                    />
                </div>
            </div>

            <TextInput
                ref="input"
                v-model="password"
                placeholder="Please Enter At Least 9 Characters"
                obscure
            />

            <div class="btn-container">
                <Button
                    :disabled="password.length < 9"
                    class="btn"
                    label="Next"
                    :trailing-icon="mdiArrowRight"
                    @click="handleSubmit"
                />
            </div>

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
    value,
    Wrapper,
    PropType,
    onUpdated
} from "vue-function-api";
import Modal from "../components/Modal.vue";
import Warning from "../components/Warning.vue";
import InfoButton from "../components/InfoButton.vue";
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";
import { mdiArrowRight } from "@mdi/js";

export interface State {
    modalIsOpen: boolean;
    filename: string;
}

interface Props {
    state: State;
}

export interface Component {
    password: Wrapper<string>;
    handleModalChangeIsOpen: (isOpen: boolean) => void;
    handleSubmit: () => void;
    mdiArrowRight: string;
}

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
    setup(props: Props, context): Component {
        const password = value("");

        function handleModalChangeIsOpen(isOpen: boolean): void {
            context.emit("change", { ...props.state, modalIsOpen: isOpen });
        }

        function handleSubmit(): void {
            context.emit("submit", password);
        }

        // Focus field on creation
        onUpdated(() => {
            const textinput = context.refs.input as TextInput;
            (textinput.$refs.input as HTMLInputElement).focus();
        });

        return {
            password,
            handleModalChangeIsOpen,
            handleSubmit,
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
</style>
