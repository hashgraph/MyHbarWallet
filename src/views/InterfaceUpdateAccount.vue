<template>
    <InterfaceForm title="Account Update">
        <IDInput
            ref="idInput"
            :error="state.idErrorMessage"
            :valid="state.idValid"
            can-copy
            label="Account"
            :spellcheck-disabled="true"
            :autocomplete-disabled="true"
            show-validation
            @valid="handleValid"
            @input="handleAccount"
        />

        <TextInput
            v-model="state.publicKey"
            :error="state.keyError"
            :valid="state.isPublicKeyValid"
            :spellcheck-disabled="true"
            :autocomplete-disabled="true"
            label="Public Key"
            show-validation
        />

        <template v-slot:footer>
            <Button
                :busy="state.isBusy"
                :disabled="!(state.idValid && state.isPublicKeyValid)"
                label="Update Account"
                @click="handleUpdateAccount"
            />
        </template>
    </InterfaceForm>
</template>

<script lang="ts">
import { Vue } from "vue/types/vue";
import TextInput from "../components/TextInput.vue";
import InterfaceForm from "../components/InterfaceForm.vue";
import Button from "../components/Button.vue";
import IDInput from "../components/IDInput.vue";
import { Id } from "../store/modules/wallet";
import {
    createComponent,
    reactive,
    SetupContext,
    ref,
    Ref,
    watch
} from "@vue/composition-api";
import store from "../store";

// Shim for IDInput ref
type IdInput = Vue & {
    clear(): void;
};

interface State {
    account: Id | null;
    accountString: string | null;
    isBusy: boolean;
    idErrorMessage: string | null;
    idValid: boolean;
    publicKey: string;
    keyError: string;
    isPublicKeyValid: boolean;
}

interface Component {
    state: State;
    idInput: Ref<Vue | null>;
    handleAccount: (value: string, account: Id | null) => void;
    handleValid: (valid: boolean) => void;
    handleUpdateAccount: () => Promise<void>;
    isPublicKeyValid: (key: string) => Promise<boolean>;
}

async function isPublicKeyValid(key: string): Promise<boolean> {
    try {
        const { Ed25519PublicKey } = await (import("@hashgraph/sdk") as Promise<
            typeof import("@hashgraph/sdk")
        >);

        Ed25519PublicKey.fromString(key);
        return true;
    } catch (error) {
        if (error instanceof Error) {
            // The exception message changes depending on the input
            if (error.message === "invalid public key: " + key) {
                return false;
            }
        }

        throw error;
    }
}

export default createComponent({
    components: {
        InterfaceForm,
        TextInput,
        Button,
        IDInput
    },
    setup(_: object | null, context: SetupContext): Component {
        const state = reactive<State>({
            account: null,
            accountString: null,
            isBusy: false,
            idErrorMessage: null,
            idValid: false,
            publicKey: "",
            keyError: "",
            isPublicKeyValid: false
        });

        const idInput: Ref<Vue | null> = ref(null);

        watch(async () => {
            state.isPublicKeyValid = await isPublicKeyValid(state.publicKey);
        });

        // eslint-disable-next-line unicorn/consistent-function-scoping
        function handleAccount(value: string, account: Id | null): void {
            state.idErrorMessage = "";
            state.account = account;
        }

        // eslint-disable-next-line unicorn/consistent-function-scoping
        function handleValid(valid: boolean): void {
            state.idValid = valid;
        }

        // eslint-disable-next-line unicorn/consistent-function-scoping
        async function handleUpdateAccount(): Promise<void> {
            state.isBusy = true;

            if (store.state.wallet.session == null) {
                throw new Error(
                    context.root
                        .$t("common.error.nullAccountOnInterface")
                        .toString()
                );
            }

            const client = store.state.wallet.session.client;

            const { HederaError, ResponseCodeEnum } = await (import(
                "@hashgraph/sdk"
            ) as Promise<typeof import("@hashgraph/sdk")>);

            const {
                AccountUpdateTransaction,
                Client,
                Ed25519PublicKey
            } = await (import("@hashgraph/sdk") as Promise<
                typeof import("@hashgraph/sdk")
            >);

            const key = Ed25519PublicKey.fromString(state.publicKey);

            try {
                await new AccountUpdateTransaction(client as InstanceType<
                    typeof Client
                >)
                    .setAccountId()
                    .setKey(key)
                    .build()
                    .executeForReceipt();
            } catch (error) {
                console.log(error);
            } finally {
                state.isBusy = false;
            }
        }

        return {
            state,
            idInput,
            handleAccount,
            handleValid,
            handleUpdateAccount,
            isPublicKeyValid
        };
    }
});
</script>
