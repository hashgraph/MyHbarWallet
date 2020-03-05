<template>
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
                    v-text="$t('modalEnterAccountId.network')"
                />
                <NetworkSelector
                    ref="networkSelector"
                    :node-error="state.nodeError"
                    :address-error="state.addressError"
                    @network="reEmitNetwork"
                    @valid="handleNetworkValid"
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
                    :disabled="!allValid"
                    :busy="state.isBusy"
                />
            </div>
        </form>
    </Modal>
</template>

<script lang="ts">
import {
    computed,
    defineComponent,
    PropType,
    SetupContext,
    ref,
    Ref
} from "@vue/composition-api";
import Modal from "../components/Modal.vue";
import Button from "../components/Button.vue";
import IDInput, { IdInputElement } from "../components/IDInput.vue";
import NetworkSelector, { NetworkSelectorElement } from "../components/NetworkSelector.vue";
import Notice from "../components/Notice.vue";
import { mdiHelpCircleOutline } from "@mdi/js";
import ReadOnlyInput from "./ReadOnlyInput.vue";
import { Ed25519PublicKey, AccountId } from "@hashgraph/sdk";
import { NetworkSettings } from "../settings";
import { Vue } from "vue/types/vue";

export type ModalEnterAccountIdElement = Vue & {
    setNodeError(message: string): void;
    setAddressError(message: string): void;
};

export interface State {
    failed: string | null;
    errorMessage: string | null;
    isOpen: boolean;
    isBusy: boolean;
    account: AccountId | null;
    valid: boolean;
    networkValid: boolean;
    publicKey: Ed25519PublicKey | null;
}

export interface Props {
    state: State;
}

export default defineComponent({
    components: {
        Modal,
        Button,
        Notice,
        IDInput,
        ReadOnlyInput,
        NetworkSelector
    },
    model: {
        prop: "state",
        event: "change"
    },
    props: { state: Object as PropType<State> },
    setup(props: Props, context: SetupContext) {
        const networkSelector: Ref<NetworkSelectorElement | null> = ref(null);
        const input: Ref<IdInputElement | null> = ref(null);

        const hasPublicKey = computed(() => props.state.publicKey != null);

        const publicKey = computed(() => {
            if (hasPublicKey.value) {
                return props.state.publicKey!.toString(true);
            }

            return null;
        });

        function handleAccount(value: string, account: AccountId | null): void {
            props.state.errorMessage = null;
            props.state.account = account;
        }

        function handleValid(valid: boolean): void {
            props.state.valid = valid;
        }

        function handleNetworkValid(valid: boolean): void {
            props.state.networkValid = valid;
        }

        const allValid = computed(() => props.state.valid && props.state.networkValid);

        function handleModalChangeIsOpen(isOpen: boolean): void {
            if (!isOpen) props.state.errorMessage = null;
            context.emit("change", { ...props.state, isOpen });
        }

        function handleDontHaveAccount(): void {
            props.state.errorMessage = null;
            context.emit("noAccount");
        }

        // Pass Child Network Events up to Parent
        function reEmitNetwork(settings: NetworkSettings): void {
            context.emit("network", settings);
        }

        function setNodeError(message: string): void {
            (networkSelector.value as NetworkSelectorElement).setNodeError(message);
        }

        function setAddressError(message: string): void {
            (networkSelector.value as NetworkSelectorElement).setAddressError(message);
        }

        async function handleSubmit(): Promise<void> {
            props.state.errorMessage = null;
            props.state.isBusy = true;

            // We're ready, prompt the child NetworkSelector to emit
            // the network event, which will be forwarded to parent context.
            // In the Parent context, we handle it with the store
            (networkSelector.value as NetworkSelectorElement).emitNetwork();

            // Then, continue the business of logging in
            if (props.state.account == null) {
                throw new Error(context.root.$t("common.error.illegalState").toString());
            }

            context.emit("submit", props.state.account);
        }

        return {
            input,
            networkSelector,
            hasPublicKey,
            publicKey,
            handleAccount,
            handleModalChangeIsOpen,
            handleDontHaveAccount,
            handleSubmit,
            handleValid,
            mdiHelpCircleOutline,
            reEmitNetwork,
            handleNetworkValid,
            allValid,
            setNodeError,
            setAddressError
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
