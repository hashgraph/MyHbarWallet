<template>
    <div class="modal-enter-account-id">
        <Modal
            :is-open="state.isOpen"
            :title="$t('modalEnterAccountId.title')"
            @change="handleModalChangeIsOpen"
        >
            <template v-slot:banner>
                <Notice class="notice" :symbol="mdiHelpCircleOutline">
                    {{ $t("modalEnterAccountId.hederaAccountIdsAre") }}
                </Notice>
            </template>
            <form @submit.stop.prevent="handleSubmit">
                <IDInput
                    ref="input"
                    :is-open="state.isOpen"
                    :error-message="state.errorMessage"
                    :disabled="state.isBusy"
                    @valid="handleValid"
                    @input="handleAccount"
                />
                <div class="buttons">
                    <Button
                        compact
                        outline
                        :label="$t('modalEnterAccountId.noAccountId')"
                        class="button"
                        type="button"
                        @click="handleDontHaveAccount"
                    />
                    <Button
                        compact
                        :label="$t('common.continue')"
                        class="button"
                        type="submit"
                        :disabled="!state.valid"
                        :busy="state.isBusy"
                    />
                </div>
            </form>
        </Modal>
    </div>
</template>

<script lang="ts">
import { createComponent, PropType, SetupContext } from "@vue/composition-api";
import Modal from "../components/Modal.vue";
import Button from "../components/Button.vue";
import IDInput from "../components/IDInput.vue";
import { Id } from "../store/modules/wallet";
import Notice from "../components/Notice.vue";
import { mdiHelpCircleOutline } from "@mdi/js";

export interface State {
    failed: string | null;
    errorMessage: string | null;
    isOpen: boolean;
    isBusy: boolean;
    account: Id | null;
    valid: boolean;
}

export interface Props {
    state: State;
}

export default createComponent({
    components: {
        Modal,
        Button,
        Notice,
        IDInput
    },
    model: {
        prop: "state",
        event: "change"
    },
    props: {
        state: Object as PropType<State>
    },
    setup(props: Props, context: SetupContext) {
        function handleAccount(value: string, account: Id | null): void {
            props.state.errorMessage = null;
            props.state.account = account;
        }

        function handleValid(valid: boolean): void {
            props.state.valid = valid;
        }

        function handleModalChangeIsOpen(isOpen: boolean): void {
            context.emit("change", { ...props.state, isOpen });
        }

        function handleDontHaveAccount(): void {
            context.emit("noAccount");
        }

        async function handleSubmit(): Promise<void> {
            props.state.errorMessage = null;
            props.state.isBusy = true;

            if (props.state.account == null) {
                throw new Error("unexpected submission of EnterAccountID");
            }

            context.emit("submit", props.state.account);
        }

        return {
            handleAccount,
            handleModalChangeIsOpen,
            handleDontHaveAccount,
            handleSubmit,
            handleValid,
            mdiHelpCircleOutline
        };
    }
});
</script>

<style scoped lang="postcss">
.button {
    width: 213px;

    @media (max-width: 600px) {
        width: 100%;

        &:first-child {
            margin-block-end: 15px;
        }
    }
}

.buttons {
    display: flex;
    justify-content: space-between;
    margin-block-start: 40px;
    width: 100%;

    @media (max-width: 600px) {
        align-items: center;
        flex-direction: column;
    }
}
</style>
