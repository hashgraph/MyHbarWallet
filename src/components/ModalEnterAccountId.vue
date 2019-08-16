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
                :error="state.error"
                placeholder="shard.realm.account"
                @input="handleInput"
            />

            <div class="btn-container">
                <Button
                    class="btn"
                    label="Continue"
                    :disabled="!valid"
                    :busy="state.isBusy"
                    @click="$emit('submit')"
                />
            </div>

            <div class="link-container">
                <span class="link" @click="handleDontHaveAccount">
                    Don't have an Account ID?
                </span>
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
    PropType,
    Wrapper
} from "vue-function-api";
import Modal from "../components/Modal.vue";
import TextInput, {
    Component as TextInputComponent
} from "../components/TextInput.vue";
import Button from "../components/Button.vue";
import { SetupContext } from "vue-function-api/dist/types/vue";
import { Id } from "@/store/modules/wallet";

export interface State {
    modalIsOpen: boolean;
    account: Id | null;
    isBusy: boolean;
    error: string | null;
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
        const failed: Wrapper<string | null> = value(null);
        const valid = computed(() => regex.test(input.value));

        function handleInput(accountText: string) {
            input.value = accountText;

            if (valid.value) {
                const parts = input.value.split(".");
                const account = {
                    shard: parseInt(parts[0]),
                    realm: parseInt(parts[1]),
                    account: parseInt(parts[2])
                };

                context.emit("change", { ...props.state, account });
            } else {
                context.emit("change", { ...props.state, account: null });
            }
        }

        function handleModalChangeIsOpen(isOpen: boolean) {
            context.emit("change", { ...props.state, modalIsOpen: isOpen });
        }

        function handleDontHaveAccount() {
            context.emit("noAccount");
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
            failed,
            handleInput,
            handleModalChangeIsOpen,
            handleDontHaveAccount
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
    cursor: pointer;
    font-size: 14px;
    text-decoration: none;

    &:hover,
    &:focus {
        text-decoration: underline;
    }
}
</style>
