<template>
    <div class="modal-request-to-create-account">
        <Modal
            :is-open="isOpen"
            :large="false"
            not-closable
            title="Request to Create Account"
            @change="this.$listeners.change"
        >
            <div class="instructions">
                <div>
                    Provide your public key (this QR code or the copied text) to
                    an existing account owner on the Hedera™ network.
                </div>
                <div>
                    They must create and fund your account, then provide you
                    with your new account ID.
                </div>
            </div>

            <form
                class="request-to-create-account"
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
                    multiline
                    :value="publicKey.toString()"
                />

                <div class="buttons">
                    <Button
                        compact
                        outline
                        label="Copy Public Key"
                        class="button"
                        @click="handleClickCopy"
                    />
                    <Button
                        compact
                        label="I have an Account ID"
                        class="button"
                        @click="handleHasAccount"
                    />
                </div>
            </form>
        </Modal>
    </div>
</template>

<script lang="ts">
import Modal from "../components/Modal.vue";
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";
import { createComponent, PropType } from "@vue/composition-api";
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
        async function handleClickCopy(): Promise<void> {
            const key = props.publicKey;
            if (key != null) {
                await writeToClipboard(key.toString());
                store.dispatch(ALERT, { message: "Copied", level: "info" });
            }
        }

        function handleHasAccount(): void {
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
.button {
    width: 213px;

    @media (max-width: 425px) {
        width: 100%;

        &:first-child {
            margin-block-end: 15px;
        }
    }
}

.request-to-create-account {
    align-items: center;
    display: flex;
    flex-direction: column;
}

.instructions {
    color: var(--color-china-blue);
    font-size: 14px;

    & div {
        padding-block-end: 15px;
    }
}

.pub-qr {
    padding-block-end: 40px;
    padding-block-start: 25px;
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
