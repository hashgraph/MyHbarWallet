<template>
    <div class="enter-account-id">
        <Modal
            :is-open="state.modalIsOpen"
            :not-closable="state.isBusy"
            title="Enter Account ID"
            @change="handleModalChangeIsOpen"
        >
            <div class="label">
                Bacon ipsum dolor amet jerky
            </div>

            <TextInput
                ref="input"
                :value="input"
                show-validation
                :valid="valid"
                placeholder="shard.realm.account"
                @input="handleInput"
            />

            <div class="btn-container">
                <Button
                    class="btn"
                    label="Continue"
                    :disabled="!valid"
                    :busy="state.isBusy"
                    @click="handleSubmit"
                />
            </div>

            <div class="link-container">
                <a href="#" class="link">Don't have an Account ID?</a>
            </div>
        </Modal>
    </div>
</template>

<script lang="ts">
import {
    createComponent,
    value,
    computed,
    watch,
    PropType
} from "vue-function-api";
import Modal from "../components/Modal.vue";
import TextInput, {
    Component as TextInputComponent
} from "../components/TextInput.vue";
import Button from "../components/Button.vue";
import { SetupContext } from "vue-function-api/dist/types/vue";

export interface State {
    modalIsOpen: boolean;
    account: string;
    isBusy: boolean;
}

export interface Props {
    state: State;
}

type Context = SetupContext & {
    refs: {
        input: TextInputComponent;
    };
};

export default createComponent({
    components: {
        Modal,
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
    setup(props: Props, context) {
        const regex = /\d+\.\d+\.\d+/;
        const input = value("");
        const valid = computed(() => regex.test(input.value));

        function handleInput(account: string) {
            input.value = account;
            context.emit("change", { ...props.state, account });
        }

        function handleSubmit() {
            context.emit("submit", props.state);
        }

        function handleModalChangeIsOpen(isOpen: boolean) {
            context.emit("change", { ...props.state, modalIsOpen: isOpen });
        }

        watch(
            () => props.state.modalIsOpen,
            (newVal: boolean) => {
                if (newVal) {
                    (context as Context).refs.input.focus();
                }
            }
        );

        return {
            input,
            valid,
            handleSubmit,
            handleInput,
            handleModalChangeIsOpen
        };
    }
});
</script>

<style scoped lang="postcss">
.label {
    color: var(--color-china-blue);
    font-size: 14px;
    margin-block-end: 10px;
}

.btn-container {
    align-items: center;
    display: flex;
    justify-content: center;
    padding: 20px;
    width: 100%;
}

.link-container {
    align-items: center;
    display: flex;
    justify-content: center;
}

.link {
    color: var(--color-china-blue);
    font-size: 14px;
    text-decoration: none;

    :hover,
    :focus {
        text-decoration: underline;
    }
}
</style>
