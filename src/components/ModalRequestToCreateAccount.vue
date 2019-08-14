<template>
    <Modal
        :is-open="isOpen"
        :large="false"
        title="Request to Create Account"
        @change="this.$listeners.change"
    >
        <div class="modal-contents">
            <!-- todo: decide on a desired error correction level -->
            <qrcode-vue
                :value="publicKey"
                size="180"
                level="L"
                class="pub-qr"
            />

            <TextInput compact class="input key-input" :value="publicKey" />

            <Button
                compact
                label="copy"
                class="modal-button"
                @click="handleClickCopy"
            />

            <div class="have-id">
                <router-link to="/">
                    I have my AccountId!
                </router-link>
            </div>
        </div>
    </Modal>
</template>

<script lang="ts">
import Vue from "vue";
import Modal from "@/components/Modal.vue";
import TextInput from "@/components/TextInput.vue";
import Button from "@/components/Button.vue";
import { createComponent, PropType } from "vue-function-api";
import QrcodeVue from "qrcode.vue";
import { writeToClipboard } from "@/clipboard";

interface Props {
    isOpen: boolean;
    event: "change";
    publicKey: string;
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
        event: (String as unknown) as PropType<string>,
        publicKey: (String as unknown) as PropType<string>
    },
    setup(props) {
        async function handleClickCopy() {
            await writeToClipboard(props.publicKey);
        }

        return {
            handleClickCopy
        };
    }
});
</script>

<style lang="postcss" scoped>
.modal-contents {
    display: flex;
    flex-flow: column nowrap;
}

.modal-button {
    margin: 0 auto;
}

.key-input {
    padding-block-end: 12px;
}

.pub-qr {
    margin: 0 auto;
    padding-block-end: 30px;
}

.have-id {
    color: var(--color-china-blue);
    font-size: 14px;
    margin: 0 auto;
    padding-block-start: 12px;
}
</style>
