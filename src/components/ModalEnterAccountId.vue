<template>
    <div class="modal-enter-account-id">
        <Modal
            :is-open="isOpen"
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
                    :is-open="isOpen"
                    @valid="handleValid"
                    @input="handleAccount"
                ></IDInput>
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
import IDInput from "../components/IDInput.vue";
import { Id } from "../store/modules/wallet";
import settings from "../settings";
import Notice from "../components/Notice.vue";
import { mdiHelpCircleOutline } from "@mdi/js";
import { ALERT } from "../store/actions";
import store from "../store";

export interface Props {
    isOpen: boolean;
    privateKey: import("@hashgraph/sdk").Ed25519PrivateKey | null;
}

interface State {
    failed: string | null;
    errorMessage: string | null;
    isBusy: boolean;
    account: Id | null;
    valid: boolean;
}

export default createComponent({
    components: {
        Modal,
        TextInput,
        Button,
        Notice,
        IDInput
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        privateKey: (Object as unknown) as PropType<
            import("@hashgraph/sdk").Ed25519PrivateKey | null
        >,
        isOpen: Boolean
    },
    setup(props: Props, context: SetupContext) {
        const state = reactive<State>({
            failed: null,
            errorMessage: null,
            isBusy: false,
            account: null,
            valid: false
        });

        function handleAccount(value: string, account: Id | null): void {
            state.account = account;
        }

        function handleValid(valid: boolean): void {
            state.valid = valid;
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

            const { Client, HederaError, ResponseCodeEnum } = await (import(
                "@hashgraph/sdk"
            ) as Promise<typeof import("@hashgraph/sdk")>);

            let client;

            try {
                client = new Client({
                    nodes: {
                        [settings.network.proxy]: {
                            shard: 0,
                            realm: 0,
                            account: 3
                        }
                    },
                    operator: {
                        account: state.account,
                        privateKey: props.privateKey.toString()
                    }
                });

                // In Hedera, the signature map is checked BEFORE
                // the valid duration. If we fail on the signature map
                // then we know the account ID is mismatched to the private key.

                const { CryptoTransferTransaction } = await import(
                    "@hashgraph/sdk"
                );
                await new CryptoTransferTransaction(client)
                    .addSender(state.account, 0)
                    .addRecipient({ realm: 0, shard: 0, account: 3 }, 0)
                    .setTransactionFee(1)
                    .build()
                    .executeForReceipt();
            } catch (error) {
                if (error instanceof HederaError) {
                    if (
                        error.code ===
                            ResponseCodeEnum.PAYER_ACCOUNT_NOT_FOUND ||
                        error.code === ResponseCodeEnum.INVALID_ACCOUNT_ID
                    ) {
                        state.errorMessage = context.root
                            .$t("common.error.payerAccountNotFound")
                            .toString();

                        return;
                    } else if (
                        error.code === ResponseCodeEnum.INVALID_SIGNATURE
                    ) {
                        state.errorMessage = context.root
                            .$t("common.error.invalidSignature")
                            .toString();

                        return;
                    } else if (
                        error.code ===
                        ResponseCodeEnum.INVALID_TRANSACTION_START
                    ) {
                        state.errorMessage =
                            "Invalid date time. Check your current system time.";
                        return;
                    } else if (
                        error.code === ResponseCodeEnum.INSUFFICIENT_TX_FEE
                    ) {
                        // This is actually good here
                        context.emit("submit", client, state.account);
                        return;
                    } else {
                        store.dispatch(ALERT, {
                            message: `Received unhandled error from Hedera:  ${error.codeName}`,
                            level: "error"
                        });
                        throw error;
                    }
                } else if (
                    error instanceof Error &&
                    error.message === "Response closed without headers"
                ) {
                    state.errorMessage = context.root
                        .$t("common.error.noConnection")
                        .toString();

                    return;
                }

                throw error;
            } finally {
                state.isBusy = false;
            }
        }

        return {
            state,
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

    @media (max-width: 425px) {
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

    @media (max-width: 425px) {
        align-items: center;
        flex-direction: column;
    }
}
</style>
