<template>
    <div class="modal-password">
        <Modal
            title="Password"
            :not-closable="state.isBusy"
            :is-open="state.modalIsOpen"
            @change="handleModalChangeIsOpen"
        >
            <template v-slot:banner>
                <Warning />
            </template>
            <form @submit.prevent="$emit('submit', state.password)">
                <TextInput
                    ref="input"
                    :value="state.password"
                    placeholder="Please Enter At Least 9 Characters"
                    obscure
                    @input="handleInputChange"
                />
                <Button
                    class="btn"
                    :busy="state.isBusy"
                    label="Access Wallet"
                    :disabled="state.password === ''"
                />
            </form>
        </Modal>
    </div>
</template>

<script lang="ts">
import Modal from "../components/Modal.vue";
import Warning from "../components/Warning.vue";
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";
import { createComponent, PropType } from "vue-function-api";

export interface State {
    modalIsOpen: boolean;
    password: string;
    isBusy: boolean;
}

interface Props {
    state: State;
}

export default createComponent({
    components: {
        Modal,
        Warning,
        TextInput,
        Button
    },
    props: {
        state: (Object as unknown) as PropType<State>
    },
    model: {
        prop: "state",
        event: "change"
    },
    setup(props: Props, context) {
        function handleInputChange(value: string) {
            context.emit("change", { ...props.state, password: value });
        }

        function handleModalChangeIsOpen(isOpen: boolean) {
            context.emit("change", { ...props.state, modalIsOpen: isOpen });
        }

        return {
            handleInputChange,
            handleModalChangeIsOpen
        };
    }
});
</script>

<style scoped lang="postcss">
.input {
    margin-block-end: 20px;
}

.btn {
    width: 100%;
}
</style>
