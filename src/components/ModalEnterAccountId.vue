<template>
    <div class="enter-account-id">
        <Modal
            :is-open="isOpen"
            :not-closable="isBusy"
            title="Enter Account ID"
            @change="handleModalChangeIsOpen"
        >
            <form @submit.stop.prevent="handleSubmit">
                <div class="label">
                    Bacon ipsum dolor amet jerky
                </div>

                <TextInput
                    ref="input"
                    :value="input"
                    show-validation
                    :valid="valid"
                    :error="errorMessage"
                    placeholder="shard.realm.account"
                    @input="handleInput"
                />

                <div class="btn-container">
                    <Button
                        class="btn"
                        label="Continue"
                        :disabled="!valid"
                        :busy="isBusy"
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
import { Client, CryptoTransferTransaction } from "hedera-sdk-js";

export interface Props {
    isOpen: boolean;
    // Used to validate accuont ID
    privateKey: string | null;
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
        prop: "isOpen",
        event: "change"
    },
    props: {
        privateKey: (String as unknown) as PropType<string | null>,
        isOpen: (Boolean as unknown) as PropType<boolean>
    },
    setup(props: Props, context) {
        const regex = /\d+\.\d+\.\d+/;
        const input = value("");
        const failed: Wrapper<string | null> = value(null);
        const valid = computed(() => regex.test(input.value));

        const errorMessage = value<string | null>(null);
        const isBusy = value(false);
        const account = value<Id | null>(null);

        function handleInput(accountText: string) {
            input.value = accountText;

            if (valid.value) {
                const parts = input.value.split(".");
                account.value = {
                    shard: parseInt(parts[0]),
                    realm: parseInt(parts[1]),
                    account: parseInt(parts[2])
                };
            } else {
                account.value = null;
            }
        }

        function handleModalChangeIsOpen(isOpen: boolean) {
            context.emit("change", isOpen);
        }

        function handleDontHaveAccount() {
            context.emit("noAccount");
        }

        async function handleSubmit() {
            errorMessage.value = null;
            isBusy.value = true;

            if (account.value == null || props.privateKey == null) {
                throw new Error("unexpected submission of EnterAccountID");
            }

            let client;

            try {
                client = new Client({
                    account: account.value,
                    privateKey: props.privateKey
                });

                // In Hedera, the signature map is checked BEFORE
                // the valid duration. If we fail on the signature map
                // then we know the account ID is mismatched to the private key.

                await new CryptoTransferTransaction(client)
                    .addSender(account.value, 0)
                    // 0.0.3 is _A_ node and a system account
                    .addRecipient({ realm: 0, shard: 0, account: 3 }, 0)
                    .setTransactionFee(100_000)
                    .setTransactionValidDuration(0)
                    .build()
                    .executeForReceipt();
            } catch (error) {
                if (error instanceof Error) {
                    if (error.message === "PAYER_ACCOUNT_NOT_FOUND") {
                        errorMessage.value =
                            "This account does not exist in the network.";
                    } else if (error.message === "INVALID_SIGNATURE") {
                        errorMessage.value =
                            "This account is not associated with your private key.";
                    } else {
                        // This is actually good here
                        context.emit("submit", client, account.value);
                        return;
                    }
                }
            } finally {
                isBusy.value = false;
            }
        }

        watch(
            () => props.isOpen,
            (newVal: boolean) => {
                if (newVal) {
                    (context as Context).refs.input.focus();
                }
            }
        );

        return {
            input,
            valid,
            errorMessage,
            isBusy,
            failed,
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
