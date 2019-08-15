<template>
    <Modal
        :is-open="isOpen"
        :large="false"
        title="Request to Create Account"
        @change="this.$listeners.change"
    >
        <div class="modal-contents">
            <qrcode-vue
                :value="store.state.crypto.publicKey"
                size="180"
                level="L"
                class="pub-qr"
            />

            <TextInput
                compact
                class="input key-input"
                :value="store.state.crypto.publicKey"
            />

            <Button
                compact
                label="Copy"
                class="modal-button"
                @click="handleClickCopy"
            />

            <div class="link-container">
                <span class="link" @click="handleHasAccount"
                    >Already have an Account ID?</span
                >
            </div>
        </div>
    </Modal>
</template>

<script lang="ts">
import Modal from "@/components/Modal.vue";
import TextInput from "@/components/TextInput.vue";
import Button from "@/components/Button.vue";
import { createComponent, PropType, computed } from "vue-function-api";
import QrcodeVue from "qrcode.vue";
import { writeToClipboard } from "@/clipboard";
import store from "@/store";

interface Props {
    isOpen: boolean;
    event: "change";
}

export default createComponent({
    components: {
        Modal,
        TextInput,
        Button,
        QrcodeVue
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: (Boolean as unknown) as PropType<boolean>,
        event: (String as unknown) as PropType<string>
    },
    setup(props, context) {
        async function handleClickCopy() {
            const key = store.state.wallet.publicKey;
            if (key != null) {
                await writeToClipboard(key);
            }
        }

        function handleHasAccount() {
            context.emit("hasAccount");
        }

        const publicKey = computed(() => {
            const key = store.state.wallet.publicKey;
            return key == null ? "null" : key;
        });

        return {
            publicKey,
            handleClickCopy,
            handleHasAccount
        };
    }
});
</script>

<style lang="postcss" scoped>
.modal-contents {
    align-items: center;
    display: flex;
    flex-direction: column;
}

.modal-button {
    margin-block-start: 20px;
}

.key-input {
    margin-block-start: 40px;
}

.link-container {
    align-items: center;
    display: flex;
    justify-content: center;
    margin-block-start: 20px;
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
