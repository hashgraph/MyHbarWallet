<template>
    <Modal
        :is-open="isOpen"
        title="Enter Account ID"
        @change="handleModalChangeIsOpen"
    >
        <form @submit.stop.prevent="handleSubmit">
            <TextInput
                ref="input"
                :value="state.input"
                show-validation
                :valid="valid"
                :error="state.errorMessage"
                placeholder="shard.realm.account"
                @input="handleInput"
            />

            <div class="buttons">
                <Button
                    compact
                    outline
                    label="No Account ID?"
                    class="button"
                    type="button"
                    @click="handleDontHaveAccount"
                />
                <Button
                    compact
                    label="Continue"
                    class="button"
                    type="submit"
                    :disabled="!valid"
                    :busy="state.isBusy"
                />
            </div>
        </form>
    </Modal>
</template>

<script lang="ts">
import {
    createComponent,
    computed,
    watch,
    PropType,
    reactive,
    ref,
    SetupContext
} from "@vue/composition-api";
import Modal from "../components/Modal.vue";
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";
import { Id } from "../store/modules/wallet";
import {
    Client,
    CryptoTransferTransaction,
    Ed25519PrivateKey
} from "@hashgraph/sdk";
import settings from "../settings";

export interface Props {
    isOpen: boolean;
    privateKey: Ed25519PrivateKey | null;
}

interface State {
    input: string;
    failed: string | null;
    errorMessage: string | null;
    isBusy: boolean;
    account: Id | null;
}

export default createComponent({
    components: {
        Modal,
        TextInput,
        Button
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        privateKey: (Object as unknown) as PropType<Ed25519PrivateKey | null>,
        isOpen: (Boolean as unknown) as PropType<boolean>
    },
    setup(props: Props, context: SetupContext) {
        const state = reactive<State>({
            input: "",
            failed: null,
            errorMessage: null,
            isBusy: false,
            account: null
        });

        const shardRealmAccountRegex = /^\d+\.\d+\.\d+$/;

        const valid = computed(() => shardRealmAccountRegex.test(state.input));

        const input = ref<HTMLInputElement | null>(null);

        function handleInput(accountText: string): void {
            state.input = accountText;

            if (valid.value) {
                const parts = state.input.split(".");
                state.account = {
                    shard: parseInt(parts[0]),
                    realm: parseInt(parts[1]),
                    account: parseInt(parts[2])
                };
            } else {
                state.account = null;
            }
        }

        function handleModalChangeIsOpen(isOpen: boolean): void {
            context.emit("change", isOpen);
        }

        function handleDontHaveAccount(): void {
            context.emit("noAccount");
        }

        async function handleSubmit(): Promise<void> {
            state.errorMessage = null;
            state.isBusy = true;

            if (state.account == null || props.privateKey == null) {
                throw new Error("unexpected submission of EnterAccountID");
            }

            let client;

            try {
                client = new Client({
                    url: settings.network.proxy,
                    operator: {
                        account: state.account,
                        privateKey: props.privateKey.toString()
                    }
                });

                // In Hedera, the signature map is checked BEFORE
                // the valid duration. If we fail on the signature map
                // then we know the account ID is mismatched to the private key.

                await new CryptoTransferTransaction(client)
                    .addSender(state.account, 0)
                    // 0.0.3 is _A_ node and a system account
                    .addRecipient({ realm: 0, shard: 0, account: 3 }, 0)
                    .setTransactionFee(100_000)
                    .setTransactionValidDuration(0)
                    .build()
                    .executeForReceipt();
            } catch (error) {
                if (error instanceof Error) {
                    if (error.message === "PAYER_ACCOUNT_NOT_FOUND") {
                        state.errorMessage =
                            "This account does not exist in the network.";
                    } else if (error.message === "INVALID_SIGNATURE") {
                        state.errorMessage =
                            "This account is not associated with your private key.";
                    } else if (
                        error.message === "Response closed without headers"
                    ) {
                        state.errorMessage =
                            "Could not reach the network. Check your connection" +
                            " and try again.";
                    } else if (error.message === "TRANSACTION_EXPIRED") {
                        // This is actually good here
                        context.emit("submit", client, state.account);
                        return;
                    } else {
                        throw error;
                    }
                }
            } finally {
                state.isBusy = false;
            }
        }

        watch(
            () => props.isOpen,
            (newVal: boolean) => {
                if (newVal && input.value != null) {
                    // Clear input everytime we reopen this modal
                    state.input = "";
                    input.value.focus();
                }
            }
        );

        return {
            state,
            valid,
            input,
            handleInput,
            handleModalChangeIsOpen,
            handleDontHaveAccount,
            handleSubmit
        };
    }
});
</script>

<style scoped lang="postcss">
.button {
    width: 200px;

    @media (max-width: 425px) {
        width: 100%;

        &:last-child {
            margin-block-end: 15px;
        }
    }
}

.buttons {
    display: flex;
    justify-content: space-between;
    margin-block-start: 40px;
    width: 100%;

    @media (max-width: 425px) {
        align-items: center;
        flex-direction: column-reverse;
    }
}
</style>
