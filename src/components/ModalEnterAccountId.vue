<template>
    <div class="enter-account-id">
        <Modal
            :is-open="isOpen"
            title="Enter Account ID"
            @change="handleModalChangeIsOpen"
        >
            <form @submit.stop.prevent="handleSubmit">
                <div class="label">
                    Bacon ipsum dolor amet jerky
                </div>

                <TextInput
                    ref="input"
                    :value="state.input"
                    show-validation
                    :valid="valid"
                    :error="state.errorMessage"
                    placeholder="shard.realm.account"
                    @input="handleInput"
                />

                <div class="btn-container">
                    <Button
                        class="btn"
                        label="Continue"
                        :disabled="!valid"
                        :busy="state.isBusy"
                    />
                </div>
            </form>

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
    computed,
    watch,
    PropType,
    reactive,
    ref
} from "@vue/composition-api";
import Modal from "../components/Modal.vue";
import TextInput, {
    Component as TextInputComponent
} from "../components/TextInput.vue";
import Button from "../components/Button.vue";
import { Id } from "../store/modules/wallet";
import {
    Client,
    CryptoTransferTransaction,
    Ed25519PrivateKey
} from "@hashgraph/sdk";

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
    setup(props: Props, context) {
        const state = reactive<State>({
            input: "",
            failed: null,
            errorMessage: null,
            isBusy: false,
            account: null
        });

        const regex = /^\d+\.\d+\.\d+$/;
        const valid = computed(() => regex.test(state.input));

        const input = ref<HTMLInputElement | null>(null);

        function handleInput(accountText: string) {
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

        function handleModalChangeIsOpen(isOpen: boolean) {
            context.emit("change", isOpen);
        }

        function handleDontHaveAccount() {
            context.emit("noAccount");
        }

        async function handleSubmit() {
            state.errorMessage = null;
            state.isBusy = true;

            if (state.account == null || props.privateKey == null) {
                throw new Error("unexpected submission of EnterAccountID");
            }

            let client;

            try {
                client = new Client({
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
                    } else {
                        // This is actually good here
                        context.emit("submit", client, state.account);
                        return;
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
