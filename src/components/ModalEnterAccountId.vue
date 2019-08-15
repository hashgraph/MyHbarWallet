<template>
    <div class="enter-account-id">
        <Modal
            :is-open="state.modalIsOpen"
            :not-closable="state.isBusy"
            title="Enter Account ID"
            @change="handleModalChangeIsOpen"
        >
            <div class="label">
                Bacon ipsum dolor amet jerky
            </div>

            <TextInput
                ref="input"
                :value="input"
                show-validation
                :valid="valid"
                :error="failed"
                placeholder="shard.realm.account"
                @input="handleInput"
            />

            <div class="btn-container">
                <Button
                    class="btn"
                    label="Continue"
                    :disabled="!valid"
                    :busy="state.isBusy"
                    @click="handleSubmit"
                />
            </div>

            <div class="link-container">
                <a href="#" class="link">Don't have an Account ID?</a>
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
import { Client } from "hedera-sdk-js";
import store from "@/store";
import { SET_ACCOUNT, SET_CLIENT } from "@/store/mutations";

export interface State {
    modalIsOpen: boolean;
    account: string;
    isBusy: boolean;
}

export interface Props {
    state: State;
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
        prop: "state",
        event: "change"
    },
    props: {
        state: (Object as unknown) as PropType<State>
    },
    setup(props: Props, context) {
        const regex = /\d+\.\d+\.\d+/;
        const input = value("");
        const failed: Wrapper<string | null> = value(null);
        const valid = computed(() => regex.test(input.value));

        function handleInput(account: string) {
            input.value = account;
            context.emit("change", { ...props.state, account });
        }

        async function handleSubmit() {
            failed.value = null;
            context.emit("change", { ...props.state, isBusy: true });
            const parts = input.value.split(".");
            const key = store.state.crypto.privateKey;

            try {
                const account = {
                    shard: parseInt(parts[0]),
                    realm: parseInt(parts[1]),
                    account: parseInt(parts[2])
                };
                const client = new Client({ account, key });

                // If getting account balance doesn't throw an error then we know that
                // the account id and private key the user entered are valid
                await client.getAccountBalance();

                // Set Account and Client if `client.getBalance()` doesn't throw an error
                store.commit(SET_ACCOUNT, account);
                store.commit(SET_CLIENT, client);

                // Propagate change up to parent component
                context.emit("submit", props.state);
            } catch {
                failed.value =
                    "This account is not associated with your private key";
                // Only update isBusy if getting account balance failed
                context.emit("change", { ...props.state, isBusy: false });
            }
        }

        function handleModalChangeIsOpen(isOpen: boolean) {
            context.emit("change", { ...props.state, modalIsOpen: isOpen });
        }

        watch(
            () => props.state.modalIsOpen,
            (newVal: boolean) => {
                if (newVal) {
                    (context as Context).refs.input.focus();
                }
            }
        );

        return {
            input,
            valid,
            failed,
            handleSubmit,
            handleInput,
            handleModalChangeIsOpen
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
    font-size: 14px;
    text-decoration: none;

    :hover,
    :focus {
        text-decoration: underline;
    }
}
</style>
