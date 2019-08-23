<template>
    <Modal :is-open="isOpen" title="Address" @change="this.$listeners.change">
        <div class="modal-contents">
            <qrcode-vue
                v-if="key"
                :value="key.toString()"
                size="200"
                level="L"
                class="pub-qr"
            />

            <ReadOnlyInput
                v-if="key"
                class="key-input"
                :value="key.toString()"
            />

            <div class="copy-button" @click="handleClickCopy">
                Copy
            </div>
        </div>
    </Modal>
</template>

<script lang="ts">
import Modal from "../components/Modal.vue";
import ReadOnlyInput from "../components/ReadOnlyInput.vue";
import Button from "../components/Button.vue";
import {
    createComponent,
    PropType,
    value,
    watch,
    computed
} from "vue-function-api";
import QrcodeVue from "qrcode.vue";
import { writeToClipboard } from "../clipboard";
import store from "../store";

interface Props {
    isOpen: boolean;
    event: "change";
}

export default createComponent({
    components: {
        Modal,
        ReadOnlyInput,
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
        const key = computed(() =>
            store.state.wallet.session
                ? store.state.wallet.session.privateKey.publicKey
                : null
        );

        async function handleClickCopy() {
            if (key.value != null) {
                await writeToClipboard(key.value.toString());
            }
        }

        function handleHasAccount() {
            context.emit("hasAccount");
        }

        return {
            key,
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

.key-input {
    margin-block-start: 20px;
}

.copy-button {
    align-items: center;
    color: var(--color-melbourne-cup);
    cursor: pointer;
    display: flex;
    font-family: Montserrat, sans-serif;
    font-size: 14px;
    font-weight: 500;
    justify-content: center;
    margin-block-start: 20px;
    text-decoration: none;
    user-select: none;
}
</style>
