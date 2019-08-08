<template>
    <div class="modal-password">
        <Modal
            title="Passowrd"
            :not-closable="state.isBusy"
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
            <TextInput
                class="input"
                placeholder="Enter Password"
                obscure
                @input="handleInputChange"
            />
            <Button
                class="btn"
                :busy="state.isBusy"
                label="Access Wallet"
                :disabled="state.password === ''"
                @click="submit"
            />
        </Modal>
    </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import Modal from "../components/Modal.vue";
import Warning from "../components/Warning.vue";
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";

export interface State {
    modalIsOpen: boolean;
    password: string;
    isBusy: boolean;
}

export default Vue.extend({
    components: {
        Modal,
        Warning,
        TextInput,
        Button
    },
    model: {
        prop: "state",
        event: "change"
    },
    props: {
        state: { type: Object, required: true } as PropOptions<State>
    },
    methods: {
        handleInputChange(value: string) {
            this.$emit("change", { ...this.state, password: value });
        },
        submit() {
            this.$emit("submit", this.state);
        },
        handleModalChangeIsOpen(isOpen: boolean) {
            this.$emit("change", { ...this.state, modalIsOpen: isOpen });
        }
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
