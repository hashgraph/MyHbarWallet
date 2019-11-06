<template>
    <InterfaceForm title="Sign or Execute Transaction">
        <TextInput
            v-model="state.txInput"
            :error="state.failed"
            label="Raw Transaction"
            :valid="state.transaction != null"
            show-validation
            spellcheck-disabled
            compact
            multiline
            @input="handleTransactionInput"
        />

        <ReadOnlyInput :value="proto" multiline />

        <template v-slot:footer>
            <div class="button-container">
                <Button
                    label="Sign"
                    :disabled="state.transaction == null"
                    @click="handleSign"
                />
                <Button
                    class="execute"
                    label="Execute"
                    :disabled="state.transaction == null"
                    @click="handleExecute"
                />
            </div>
        </template>

        <ModalSuccess
            v-model="state.success"
            @dismiss="state.success.isOpen = false"
        >
            Transaction Executed
        </ModalSuccess>
    </InterfaceForm>
</template>

<script lang="ts">
import TextInput from "../components/TextInput.vue";
import InterfaceForm from "../components/InterfaceForm.vue";
import Button from "../components/Button.vue";
import ReadOnlyInput from "../components/ReadOnlyInput.vue";
import ModalSuccess, {
    State as ModalSuccessState
} from "../components/ModalSuccess.vue";
import store from "../store";
import {
    createComponent,
    computed,
    reactive,
    SetupContext
} from "@vue/composition-api";

interface State {
    txInput: string | null;
    transaction: import("@hashgraph/sdk").Transaction | null;
    failed: string | null;
    success: ModalSuccessState;
}

export default createComponent({
    components: {
        TextInput,
        InterfaceForm,
        ReadOnlyInput,
        Button,
        ModalSuccess
    },
    setup() {
        const state = reactive<State>({
            txInput: null,
            transaction: null,
            failed: null,
            success: {
                isOpen: false,
                hasAction: false
            }
        });

        const proto = computed(() => {
            if (state.transaction == null) {
                return "";
            } else {
                return state.transaction.toProto().toObject();
            }
        });

        // eslint-disable-next-line unicorn/consistent-function-scoping
        async function handleTransactionInput(input: string): Promise<void> {
            try {
                if (store.state.wallet.session != null) {
                    const client = store.state.wallet.session.client;
                    state.transaction = (await import(
                        "@hashgraph/sdk"
                    )).Transaction.fromBytes(client, Buffer.from(input, "hex"));
                }
            } catch {
                state.transaction = null;
            }
        }

        // eslint-disable-next-line unicorn/consistent-function-scoping
        async function handleSign(): Promise<void> {
            if (
                state.transaction != null &&
                store.state.wallet != null &&
                store.state.wallet.session
            ) {
                state.transaction.sign(
                    await store.state.wallet.session.wallet.getPrivateKey()
                );
                state.txInput = Buffer.from(
                    state.transaction.toBytes()
                ).toString("hex");
            }
        }

        // eslint-disable-next-line unicorn/consistent-function-scoping
        async function handleExecute(): Promise<void> {
            try {
                if (state.transaction != null) {
                    await state.transaction.executeForReceipt();
                    state.success.isOpen = true;
                }
            } catch (error) {
                state.failed = "Failed to execute" + error.toString();
            }
        }

        return {
            state,
            proto,
            handleTransactionInput,
            handleSign,
            handleExecute
        };
    }
});
</script>

<style>
.button-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    width: 75%;

    @media (max-width: 600px) {
        align-items: center;
        flex-direction: column;
        width: 100%;
    }
}

.execute {
    background-color: blue;
}
</style>
