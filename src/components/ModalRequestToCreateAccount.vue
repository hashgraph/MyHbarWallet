<template>
    <Modal
        :is-open="isOpen"
        :large="false"
        not-closable
        title="Request to Create Account"
        @change="this.$listeners.change"
    >
        <div class="instructions">
            Provide your public key (available below as QR or text) to someone
            you trust with an account on the Hedera network. They can use your
            public key to create an account for you. Once they do so, record
            your new account ID in a safe place, then click "I have an Account
            ID" below to continue.
        </div>
        <template>
            <form
                class="modal-request-to-create-account"
                @submit.prevent="$emit('submit')"
            >
                <qrcode-vue
                    v-if="publicKey"
                    :value="publicKey.toString()"
                    size="180"
                    level="L"
                    class="pub-qr"
                />

                <ReadOnlyInput
                    v-if="publicKey"
                    class="key-input"
                    :value="publicKey.toString()"
                />

                <div class="buttons">
                    <Button
                        compact
                        label="Copy Public Key"
                        class="button"
                        @click="handleClickCopy"
                    />

                    <Button
                        compact
                        outline
                        label="I have an Account ID"
                        class="button"
                        @click="handleHasAccount"
                    />
                </div>
            </form>
        </template>
    </Modal>
</template>

<script lang="ts">
import Modal from "../components/Modal.vue";
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";
import { createComponent, PropType } from "vue-function-api";
import QrcodeVue from "qrcode.vue";
import { writeToClipboard } from "../clipboard";
import ReadOnlyInput from "../components/ReadOnlyInput.vue";
import Warning from "../components/Warning.vue";
import { Ed25519PublicKey } from "@hashgraph/sdk";
import { ALERT } from "../store/actions";
import store from "../store";

export default createComponent({
    components: {
        Modal,
        TextInput,
        Button,
        QrcodeVue,
        ReadOnlyInput,
        Warning
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: (Boolean as unknown) as PropType<boolean>,
        publicKey: (Object as unknown) as PropType<Ed25519PublicKey>,
        event: (String as unknown) as PropType<string>
    },
    setup(props, context) {
        async function handleClickCopy() {
            const key = props.publicKey;
            if (key != null) {
                await writeToClipboard(key.toString());
                store.dispatch(ALERT, { message: "Copied", level: "info" });
            }
        }

        function handleHasAccount() {
            context.emit("hasAccount");
        }

        return {
            handleClickCopy,
            handleHasAccount
        };
    }
});
</script>

<style lang="postcss" scoped>
.modal-request-to-create-account {
    align-items: center;
    display: flex;
    flex-direction: column;
}

.key-input {
    margin-block: 20px;
    user-select: none;
}

.instructions {
    color: var(--color-china-blue);
    font-size: 14px;
    margin-block-end: 30px;
}

.buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
</style>
