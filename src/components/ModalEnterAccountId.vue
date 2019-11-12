<template>
  <div class="modal-enter-account-id">
    <Modal
      :is-open="state.isOpen"
      :title="$t('modalEnterAccountId.title')"
      @change="handleModalChangeIsOpen"
    >
      <template v-slot:banner>
        <Notice
          class="notice"
          :symbol="mdiHelpCircleOutline"
        >
          {{ $t("modalEnterAccountId.hederaAccountIdsAre") }}
        </Notice>
      </template>
      <form @submit.stop.prevent="handleSubmit">
        <div
          v-if="hasPublicKey"
          class="container"
        >
          <div
            class="subtitle"
            v-text="$t('modalEnterAccountId.verifyKey')"
          />
          <ReadOnlyInput
            class="input"
            :value="publicKey"
            multiline
          />
        </div>
        <div class="container">
          <div
            class="subtitle"
            v-text="$t('modalEnterAccountId.accountId')"
          />
          <IDInput
            ref="input"
            :is-open="state.isOpen"
            :error="state.errorMessage"
            :disabled="state.isBusy"
            @valid="handleValid"
            @input="handleAccount"
          />
        </div>
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
import {
    computed,
    createComponent,
    PropType,
    SetupContext
} from "@vue/composition-api";
import Modal from "../components/Modal.vue";
import Button from "../components/Button.vue";
import IDInput from "../components/IDInput.vue";
import { Id } from "../store/modules/wallet";
import Notice from "../components/Notice.vue";
import { mdiHelpCircleOutline } from "@mdi/js";
import ReadOnlyInput from "./ReadOnlyInput.vue";
import { Ed25519PublicKey } from "@hashgraph/sdk";

export interface State {
    failed: string | null;
    errorMessage: string | null;
    isOpen: boolean;
    isBusy: boolean;
    account: Id | null;
    valid: boolean;
    publicKey: Ed25519PublicKey | null;
}

export interface Props {
    state: State;
}

export default createComponent({
    components: {
        Modal,
        Button,
        Notice,
        IDInput,
        ReadOnlyInput
    },
    model: {
        prop: "state",
        event: "change"
    },
    props: { state: Object as PropType<State> },
    setup(props: Props, context: SetupContext) {
        const hasPublicKey = computed(() => props.state.publicKey !== null &&
                props.state.publicKey !== undefined);

        const publicKey = computed(() => {
            if (hasPublicKey.value) {
                return props.state.publicKey!.toString(true);
            }

            return null;
        });

        function handleAccount(value: string, account: Id | null): void {
            props.state.errorMessage = null;
            props.state.account = account;
        }

        function handleValid(valid: boolean): void {
            props.state.valid = valid;
        }

        function handleModalChangeIsOpen(isOpen: boolean): void {
            if (!isOpen) props.state.errorMessage = null;
            context.emit("change", { ...props.state, isOpen });
        }

        function handleDontHaveAccount(): void {
            props.state.errorMessage = null;
            context.emit("noAccount");
        }

        async function handleSubmit(): Promise<void> {
            props.state.errorMessage = null;
            props.state.isBusy = true;

            if (props.state.account == null) {
                throw new Error(context.root.$t("common.error.illegalState").toString());
            }

            context.emit("submit", props.state.account);
        }

        return {
            hasPublicKey,
            publicKey,
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
.container {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-block-end: 40px;
}

.subtitle {
    color: var(--color-china-blue);
    font-size: 24px;
    margin-block-end: 10px;
}

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
    width: 100%;

    @media (max-width: 600px) {
        align-items: center;
        flex-direction: column;
    }
}
</style>
